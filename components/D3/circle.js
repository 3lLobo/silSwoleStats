import { useD3 } from '../../hooks/useD3'
import React from 'react'
import * as d3 from 'd3'
import { Box } from '@chakra-ui/react'
import Image from 'next/image'
import mateSvg from './mate.svg'
import dynamic from 'next/dynamic'
// import {d3bars} from './bars'


function BarChart({ data }) {
    // const ref = useD3( (svg, data) => d3bars(svg, data), [data.length]
    // )

    return (
        <Box>
            {/* <svg
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
            </svg> */}
            <MateSvg />
        </Box>
    )
}

const DynamicD3 = dynamic(() => BarChart, { ssr: false })


const MateSvg = () => {

    return (
        <Box>
            <Image
                alt="svgPic"
                src={mateSvg}
            />

        </Box>
    )
}

export default BarChart