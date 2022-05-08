import * as d3 from 'd3'
import { useD3 } from '../../hooks/useD3'
import React, { useRef, useState, useEffect } from 'react'
import { AspectRatio, Box } from '@chakra-ui/react'
import Image from 'next/image'
import mateSvg from './mate.svg'
import dynamic from 'next/dynamic'
import Card from '../Card/Card'

export function Sunburst({ data }) {
    const boxref = useRef()
    const [svgWidth, setSvgWidth] = useState()
    const { ref, loaded, setLoaded } = useD3(sunburstD3, svgWidth, data)

    // const screenSize = useRef();
    // var screenSize;

    // useEffect(() => {
    //     window.addEventListener("resize", () => {
    //         screenSize = window.innerWidth;
    //         setLoaded(false)
    //     });
    //     return () => {
    //         window.removeEventListener("resize", () => {
    //             screenSize = window.innerWidth;
    //         })
    //     }
    // }, []);

    useEffect(() => {
        console.log('LOADED?', loaded)
        setSvgWidth(boxref.current?.clientWidth)
        // if (boxref.current?.clientWidth) {
        //     if (boxref.current?.clientWidth !== svgWidth) {
        //         console.log("Reset", boxref.current?.clientWidth, "i", svgWidth);
        //         console.log("i", svgWidth);
        //         setSvgWidth(boxref.current?.clientWidth)
        //         setLoaded(true)
        //     }
        // }
        setSvgWidth(boxref.current?.clientWidth)
        // setLoaded(true)
        console.log('Exit!!!')
    })

    console.log('REF: ', ref)
    return (
        <Box
            display="flex"
            flexDirection="column"
            width="100%"
            position="relative"
            minWidth="0px"
            wordWrap="break-word"
            backgroundClip="border-box"
            boxShadow="0px 3.5px 5.5px rgba(0, 0, 0, 0.02)"
            borderRadius="15px"
            bg="white"
            p="6"
        >
            <AspectRatio maxWidth={svgWidth} ratio={1}>
                <Box ref={boxref}>
                    {loaded && (
                        <svg
                            ref={ref}
                            style={{
                                height: svgWidth,
                                width: svgWidth,
                                // marginRight: '0px',
                                // marginLeft: '0px',
                            }}
                        >
                            {/* <g id="2" data-name="2"></g>
                <g className="plot-area" />
                <g className="x-axis" />
            <g className="y-axis" /> */}
                        </svg>
                    )}
                </Box>
            </AspectRatio>
        </Box>
    )
}

export const sunburstD3 = (svg, width, length, data) => {
    // const width = 600;
    console.log('WISS ', width)
    const radius = width / 6

    const partition = (data) => {
        const root = d3
            .hierarchy(data)
            .sum((d) => d.value)
            .sort((a, b) => b.value - a.value)
        return d3.partition().size([2 * Math.PI, root.height + 1])(root)
    }

    const color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1))

    const format = d3.format(',d')

    const arc = d3
        .arc()
        .startAngle((d) => d.x0)
        .endAngle((d) => d.x1)
        .padAngle((d) => Math.min((d.x1 - d.x0) / 2, 0.005))
        .padRadius(radius * 1.5)
        .innerRadius((d) => d.y0 * radius)
        .outerRadius((d) => Math.max(d.y0 * radius, d.y1 * radius - 1))

    const root = partition(data)
    root.each((d) => (d.current = d))
    const g = svg.append('g').attr('transform', `translate(${width / 2},${width / 2})`)

    const path = g
        .append('g')
        .selectAll('path')
        .data(root.descendants().slice(1))
        .join('path')
        .attr('fill', (d) => {
            while (d.depth > 1) d = d.parent
            return color(d.data.name)
        })
        .attr('fill-opacity', (d) => (arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0))
        .attr('pointer-events', (d) => (arcVisible(d.current) ? 'auto' : 'none'))

        .attr('d', (d) => arc(d.current))

    path.filter((d) => d.children)
        .style('cursor', 'pointer')
        .on('click', clicked)

    path.append('title').text(
        (d) =>
            `${d
                .ancestors()
                .map((d) => d.data.name)
                .reverse()
                .join('/')}\n${format(d.value)}`
    )

    const label = g
        .append('g')
        .attr('pointer-events', 'none')
        .attr('text-anchor', 'middle')
        .style('user-select', 'none')
        .selectAll('text')
        .data(root.descendants().slice(1))
        .join('text')
        .attr('dy', '0.35em')
        .attr('fill-opacity', (d) => +labelVisible(d.current))
        .attr('transform', (d) => labelTransform(d.current))
        .text((d) => d.data.name)

    const parent = g
        .append('circle')
        .datum(root)
        .attr('r', radius)
        .attr('fill', 'none')
        .attr('pointer-events', 'all')
        .on('click', clicked)

    function clicked(event, p) {
        parent.datum(p.parent || root)

        root.each(
            (d) =>
                (d.target = {
                    x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
                    x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
                    y0: Math.max(0, d.y0 - p.depth),
                    y1: Math.max(0, d.y1 - p.depth),
                })
        )

        const t = g.transition().duration(750)

        // Transition the data on all arcs, even the ones that aren’t visible,
        // so that if this transition is interrupted, entering arcs will start
        // the next transition from the desired position.
        path.transition(t)
            .tween('data', (d) => {
                const i = d3.interpolate(d.current, d.target)
                return (t) => (d.current = i(t))
            })
            .filter(function (d) {
                return +this.getAttribute('fill-opacity') || arcVisible(d.target)
            })
            .attr('fill-opacity', (d) => (arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0))
            .attr('pointer-events', (d) => (arcVisible(d.target) ? 'auto' : 'none'))

            .attrTween('d', (d) => () => arc(d.current))

        label
            .filter(function (d) {
                return +this.getAttribute('fill-opacity') || labelVisible(d.target)
            })
            .transition(t)
            .attr('fill-opacity', (d) => +labelVisible(d.target))
            .attrTween('transform', (d) => () => labelTransform(d.current))
    }

    function arcVisible(d) {
        return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0
    }

    function labelVisible(d) {
        return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03
    }

    function labelTransform(d) {
        const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI
        const y = ((d.y0 + d.y1) / 2) * radius
        return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`
    }
}
