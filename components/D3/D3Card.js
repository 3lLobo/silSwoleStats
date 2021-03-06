import { Box, Text, AspectRatio, useStyleConfig, useColorModeValue, Heading } from '@chakra-ui/react'
import { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3'


// let vis
export default function D3Card({ cardWidth, d3component }) {
    // const onClickFunction = onSunburstClick
    const svgBoxBg = useColorModeValue('white', 'gray.700')
    const svgFontColor = useColorModeValue('black', 'whitesmoke')

    const [data, setData] = useState(null)
    const boxref = useRef()
    const paddingBox = 22
    const [svgWidth, setSvgWidth] = useState(cardWidth - 2 * paddingBox)
    const [vis, setVis] = useState()

    useEffect(() => {
        async function fetchApi() {
            const resFlare = await (await fetch('/api/flareData')).json()
            setData(resFlare.flareData)
        }
        fetchApi()
        // fetchData()
    }, [])

    useEffect(() => {
        setSvgWidth(() => cardWidth - 2 * paddingBox)
    }, [cardWidth, paddingBox])

    const [active, setActive] = useState(null)
    const refElement = useRef(null)

    // useEffect(fetchData, [])
    useEffect(initVis, [data, svgWidth,])

    useEffect(() => {
        console.log(svgFontColor)
        d3.selectAll('svg#sunburst').selectAll('text').style('fill', svgFontColor);
    }, [svgFontColor])
    // useEffect(updateVisOnResize, [svgWidth, svgFontColor])

    // function fetchData() {
    //     Promise.resolve(fetch('/api/flareData')).then((res) => setData(res.json().flareData))
    //     console.log('fetchh')
    // }

    function onClick(e, p) {
        console.log('Click', p)

        setActive(p.data.name + ': ' + p.value.toString())
    }

    function initVis() {
        if (svgWidth > 0) {
            if (data) {
                const d3Props = {
                    data: data,
                    width: svgWidth,
                    height: svgWidth,
                    onDatapointClick: onClick,
                    fontColor: svgFontColor,
                }
                if (!vis) {
                    setVis(() => new d3component(refElement.current, d3Props))
                } else {
                    vis.updateDatapoints(d3Props)
                }
            }
        }
    }


    return (
        <Box
            // __css={styles}
            // display="flex"
            fontSize='xs'
            flexDirection="column"
            width="100%"
            position="relative"
            minWidth="0px"
            backgroundClip="border-box"
            boxShadow="0px 3.5px 5.5px rgba(0, 0, 0, 0.02)"
            borderRadius="15px"
            bg={svgBoxBg}
            p={paddingBox}
            ref={boxref}
        >
            <Text
            // textAlign="center"
            fontSize='2xl'            
            > 
            Mealplan kcal
            </Text>
            <Text
                fontFamily="Helvetica"
                bg="rgba(245, 245, 245, 0.07)"
                rounded="full"
                px="3"
                my="11"
                // width="min"
                maxWidth='initial'
                // textAlign="center"
                // fontSize='xl'
                fontWeight='bold'
            >
                {active || '*select a datapoint*'}
            </Text>
            <AspectRatio maxWidth={svgWidth} ratio={1}>
                {/* <div ref={refElement} /> */}
                <svg
                    ref={refElement}
                    style={{
                        // height: svgWidth,
                        // width: svgWidth,
                        marginRight: '0px',
                        marginLeft: '0px',
                        fontWeight: 'lighter',
                        fontColor: svgFontColor,
                    }}
                >
                    <g id="2" data-name="2"></g>
                    <g className="plot-area" />
                    <g className="x-axis" />
                    <g className="y-axis" />
                </svg>
            </AspectRatio>
        </Box>
    )
}
