import { useD3 } from '../../hooks/useD3'
import React from 'react'
import * as d3 from 'd3'
import { Box } from '@chakra-ui/react'
import Image from 'next/image'

function BarChart({ data }) {
    const ref = useD3(
        (svg) => {
            const height = 500
            const width = 500
            const margin = { top: 20, right: 30, bottom: 30, left: 40 }

            const x = d3
                .scaleBand()
                .domain(data.map((d) => d.year))
                .rangeRound([margin.left, width - margin.right])
                .padding(0.1)

            const y1 = d3
                .scaleLinear()
                .domain([0, d3.max(data, (d) => d.sales)])
                .rangeRound([height - margin.bottom, margin.top])

            const xAxis = (g) =>
                g.attr('transform', `translate(0,${height - margin.bottom})`).call(
                    d3
                        .axisBottom(x)
                        .tickValues(
                            d3
                                .ticks(...d3.extent(x.domain()), width / 40)
                                .filter((v) => x(v) !== undefined)
                        )
                        .tickSizeOuter(0)
                )

            const y1Axis = (g) =>
                g
                    .attr('transform', `translate(${margin.left},0)`)
                    .style('color', 'steelblue')
                    .call(d3.axisLeft(y1).ticks(null, 's'))
                    .call((g) => g.select('.domain').remove())
                    .call((g) =>
                        g
                            .append('text')
                            .attr('x', -margin.left)
                            .attr('y', 10)
                            .attr('fill', 'currentColor')
                            .attr('text-anchor', 'start')
                            .text(data.y1)
                    )

            svg.select('.x-axis').call(xAxis)
            svg.select('.y-axis').call(y1Axis)

            svg.select('.plot-area')
                .attr('fill', 'steelblue')
                .selectAll('.bar')
                .data(data)
                .join('rect')
                .attr('class', 'bar')
                .attr('x', (d) => x(d.year))
                .attr('width', x.bandwidth())
                .attr('y', (d) => y1(d.sales))
                .attr('height', (d) => y1(0) - y1(d.sales))
        },
        [data.length]
    )

    return (
        <Box>
            <svg
                ref={ref}
                style={{
                    height: 500,
                    width: '100%',
                    marginRight: '0px',
                    marginLeft: '0px',
                }}
            >
                <g id="2" data-name="2"></g>
                <g className="plot-area" />
                <g className="x-axis" />
                <g className="y-axis" />
            </svg>
            <MateSvg />
        </Box>
    )
}

export default BarChart

const MateSvg = () => {
    return (
        <Box>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 288 288">
                <g id="l" data-name="l">
                    <path
                        fill="#C4A2FC"
                        d="M269.9 130.8c-20.5-42.4-51.3-42.3-71.7 0-8.6 18.2-13.2 38.1-13.6 58.2 0 23.7 16.9 44.1 40.1 48.6-6.1 18-18 33.7-40.8 37-2.5.4-4.2 2.6-3.8 5.1s2.6 4.2 5.1 3.8c23.9-3.4 40.5-18.9 48.8-45 5.9-20.7 7.5-42.3 4.6-63.6-.4-2.5 1.3-4.7 3.8-5.1 2.5-.4 4.7 1.3 5.1 3.8 2.8 21.4 1.5 43.1-3.8 64 23.2-4.6 39.9-24.9 39.9-48.6-.5-20.1-5.1-40-13.7-58.2zM170.4 99c-23.9 3.4-40.5 18.9-48.8 45-5.8 20.7-7.3 42.3-4.6 63.6.4 2.5-1.3 4.7-3.8 5.1-2.5.4-4.7-1.3-5.1-3.8-2.8-21.4-1.5-43.1 3.8-64-23.1 4.6-39.9 25-39.9 48.6.4 20.1 5 40 13.6 58.2 20.5 42.4 51.3 42.3 71.7 0 8.6-18.2 13.2-38.1 13.6-58.2 0-23.7-16.9-44.1-40.1-48.6 6.1-18 18-33.7 40.8-37 2.5-.4 4.2-2.6 3.8-5.1s-2.6-4.1-5-3.8z"
                    />
                    <path
                        fill="#6D2ED3"
                        d="M189 202.5h-45.5c25.8-12 44.8-35 51.7-62.6s1-56.8-16.1-79.6c-.9-1.1-2.2-1.8-3.6-1.8h-42.2l18.3-36.6 38.4-8.5c1.6-.3 2.9-1.5 3.3-3 .5-1.5.1-3.2-1-4.4-1.1-1.2-2.7-1.7-4.3-1.3l-40.5 9c-1.3.3-2.4 1.2-3 2.4l-21.3 42.5H31.5c-1.4 0-2.7.7-3.6 1.8-17.1 22.8-23 52-16.1 79.6s25.9 50.6 51.7 62.6H18c-7.5 0-13.5 6-13.5 13.5s6 13.5 13.5 13.5h171c7.5 0 13.5-6 13.5-13.5 0-7.6-6-13.6-13.5-13.6zM33.8 67.5h139.4c3 4.3 5.6 8.8 7.8 13.5H26c2.2-4.7 4.8-9.3 7.8-13.5zM18 117c0-9.2 1.5-18.3 4.4-27h162.3c2.9 8.7 4.4 17.8 4.4 27 0 1.4-.1 2.8-.2 4.2l-21.2 8.9-19.7-8.3c-1.1-.5-2.4-.5-3.5 0l-19.6 8.3-19.6-8.3c-1.1-.5-2.4-.5-3.5 0l-19.6 8.3-19.6-8.3c-1.1-.5-2.4-.5-3.5 0l-19.6 8.3-21.2-8.9c-.2-1.4-.3-2.8-.3-4.2zm1.3 14.4 18.3 7.7c1.1.5 2.4.5 3.5 0l19.6-8.3 19.6 8.3c1.1.5 2.4.5 3.5 0l19.6-8.3 19.6 8.3c1.1.5 2.4.5 3.5 0l19.6-8.3 19.7 8.3c1.1.5 2.4.5 3.5 0l18.3-7.7c-1.1 6.8-3.1 13.4-5.8 19.7l-14.2 6-19.7-8.3c-1.1-.5-2.4-.5-3.5 0l-19.6 8.3-19.6-8.3c-1.1-.5-2.4-.5-3.5 0l-19.6 8.3-19.6-8.3c-1.1-.5-2.4-.5-3.5 0l-19.6 8.3-14.2-6c-2.8-6.3-4.7-12.9-5.9-19.7zM32 163.8l5.6 2.4c1.1.5 2.4.5 3.5 0l19.6-8.3 19.6 8.3c1.1.5 2.4.5 3.5 0l19.6-8.3 19.6 8.3c1.1.5 2.4.5 3.5 0l19.6-8.3 19.7 8.3c1.1.5 2.4.5 3.5 0l5.6-2.4c-15.8 24.2-42.6 38.7-71.5 38.7-28.7 0-55.6-14.6-71.4-38.7zm157 56.7H18c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5h171c2.5 0 4.5 2 4.5 4.5s-2 4.5-4.5 4.5z"
                    />
                </g>
            </svg>
        </Box>
    )
}
