import * as d3 from 'd3';

class D3Component {

    containerEl;
    props;
    svg;

    constructor(containerEl, props) {
        this.containerEl = containerEl;
        this.props = props;
        const { width, height } = props;
        this.svg = d3.select(containerEl)
            .append('svg')
            // .style('background-color', 'white')
            .attr('width', width)
            .attr('height', height);

        this.updateDatapoints();
    }

    updateDatapoints = () => {
        const { svg, props: { data, width, height } } = this;
        console.log("data.", data)
        this.svg = this.chart(svg, width, height, data)
        // svg.selectAll('circle')
        //     .data(data)
        //     .enter()
        //     .append('circle')
        //     .style('fill', 'red')
        //     .attr('cx', () => Math.random() * width)
        //     .attr('cy', () => Math.random() * height)
        //     .attr('r', 10)
        //     .on('mouseup', (d, i, nodes) => console.log(d, i, nodes)); // this.setActiveDatapoint(d, nodes[i]));
    }

    setActiveDatapoint = (e, d) => {
        // d3.select(node).style('fill', 'yellow');
        this.props.onDatapointClick(e, d);
    }

    resize = (width, height) => {
        const { svg, props: { data, width: oldWidth } } = this;
        const scaleVal = Math.sqrt(Math.floor((width / oldWidth) * 100) / (100));
        console.log("THIS width", scaleVal);
        d3.selectAll("svg > g").remove();
        // svg.remove();
        svg.attr('width', width)
            .attr('height', height);
        this.svg = this.chart(svg, width, height, data)
        //     svg.selectAll('g')
        //     .attr('height', height)
        //     .attr("r", width / 6)
        //     // .attr("transform", `scale(${width / oldWidth})`)
        //     .attr("transform", `translate(${width / 4},${width / 4}) scale(${scaleVal})`);
        // this.props.width = width;
        //     .attr('cx', () => Math.random() * width)
        //     .attr('cy', () => Math.random() * height);
    }

    chart = (svg, width, height, data) => {
        // const width = 600;
        console.log("WISS ", width)
        const radius = width / 6

        const partition = (data) => {
            const root = d3.hierarchy(data)
                .sum(d => d.value)
                .sort((a, b) => b.value - a.value);
            return d3.partition()
                .size([2 * Math.PI, root.height + 1])
                (root);
        }

        const color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1))

        const format = d3.format(",d")

        const arc = d3.arc()
            .startAngle(d => d.x0)
            .endAngle(d => d.x1)
            .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
            .padRadius(radius * 1.5)
            .innerRadius(d => d.y0 * radius)
            .outerRadius(d => Math.max(d.y0 * radius, d.y1 * radius - 1))


        const root = partition(data);
        root.each(d => d.current = d);
        const g = svg.append("g")
            .attr("transform", `translate(${width / 2},${width / 2})`);

        const path = g.append("g")
            .selectAll("path")
            .data(root.descendants().slice(1))
            .join("path")
            .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
            .attr("fill-opacity", d => arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0)
            .attr("pointer-events", d => arcVisible(d.current) ? "auto" : "none")

            .attr("d", d => arc(d.current));

        path.filter(d => d.children)
            .style("cursor", "pointer")
            .on("click", clicked);

        path.append("title")
            .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);

        const label = g.append("g")
            .attr("pointer-events", "none")
            .attr("text-anchor", "middle")
            .style("user-select", "none")
            .selectAll("text")
            .data(root.descendants().slice(1))
            .join("text")
            .attr("dy", "0.35em")
            .attr("fill-opacity", d => +labelVisible(d.current))
            .attr("transform", d => labelTransform(d.current))
            .text(d => d.data.name);

        const parent = g.append("circle")
            .datum(root)
            .attr("r", radius)
            .attr("fill", "none")
            .attr("pointer-events", "all")
            .on("click", clicked);

        function clicked(event, p) {
            parent.datum(p.parent || root);
            this.setActiveDatapoint

            root.each(d => d.target = {
                x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
                x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
                y0: Math.max(0, d.y0 - p.depth),
                y1: Math.max(0, d.y1 - p.depth)
            });

            const t = g.transition().duration(750);

            // Transition the data on all arcs, even the ones that aren’t visible,
            // so that if this transition is interrupted, entering arcs will start
            // the next transition from the desired position.
            path.transition(t)
                .tween("data", d => {
                    const i = d3.interpolate(d.current, d.target);
                    return t => d.current = i(t);
                })
                .filter(function (d) {
                    return +this.getAttribute("fill-opacity") || arcVisible(d.target);
                })
                .attr("fill-opacity", d => arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0)
                .attr("pointer-events", d => arcVisible(d.target) ? "auto" : "none")

                .attrTween("d", d => () => arc(d.current));

            label.filter(function (d) {
                return +this.getAttribute("fill-opacity") || labelVisible(d.target);
            }).transition(t)
                .attr("fill-opacity", d => +labelVisible(d.target))
                .attrTween("transform", d => () => labelTransform(d.current));
        }

        function arcVisible(d) {
            return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
        }

        function labelVisible(d) {
            return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
        }

        function labelTransform(d) {
            const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
            const y = (d.y0 + d.y1) / 2 * radius;
            return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
        }
        return svg
    }
}

// const 

// const partition = data => {
//     const root = d3.hierarchy(data)
//         .sum(d => d.value)
//         .sort((a, b) => b.value - a.value);
//     return d3.partition()
//         .size([2 * Math.PI, root.height + 1])
//         (root);
// }

// const color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1))

// const format = d3.format(",d")

// const radius = width / 6

// arc = d3.arc()
//     .startAngle(d => d.x0)
//     .endAngle(d => d.x1)
//     .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
//     .padRadius(radius * 1.5)
//     .innerRadius(d => d.y0 * radius)
//     .outerRadius(d => Math.max(d.y0 * radius, d.y1 * radius - 1))

export default D3Component;