import { Box, Text, AspectRatio, useStyleConfig, useColorModeValue } from '@chakra-ui/react'
import { useState, useEffect, useRef } from 'react'


export default function D3Card({ cardWidth, d3component }) {
    // const onClickFunction = onSunburstClick
    let vis
    const svgBoxBg = useColorModeValue('white', 'gray.700')

    const [data, setData] = useState(null)
    const boxref = useRef()
    const paddingBox = 22
    const [svgWidth, setSvgWidth] = useState(cardWidth - 2 * paddingBox)

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
    // useEffect(handleResizeEvent, []);
    useEffect(initVis, [data])
    useEffect(updateVisOnResize, [svgWidth])

    // function fetchData() {
    //     Promise.resolve(fetch('/api/flareData')).then((res) => setData(res.json().flareData))
    //     console.log('fetchh')
    // }

    function onClick(e, p) {
        console.log('Click', p)
        
        setActive(p.data.name + '   ' + p.value.toString())
    }

    function initVis() {
        if (svgWidth > 0) {
            if (data) {
                const d3Props = {
                    data: data,
                    width: svgWidth,
                    height: svgWidth,
                    onDatapointClick: onClick,
                }
                vis = new d3component(refElement.current, d3Props)
            }
        }
    }

    function updateVisOnResize() {
        vis && vis.resize(svgWidth, svgWidth)
    }

    return (
        <Box
            // __css={styles}
            display="flex"
            flexDirection="column"
            width="100%"
            position="relative"
            minWidth="0px"
            wordWrap="break-word"
            backgroundClip="border-box"
            boxShadow="0px 3.5px 5.5px rgba(0, 0, 0, 0.02)"
            borderRadius="15px"
            bg={svgBoxBg}
            p={paddingBox}
            ref={boxref}
        >
            <Text
                fontFamily="Helvetica"
                bg="teal.300"
                rounded="full"
                p="3"
                mb="22"
                textAlign="center"
            >
                {active || 'none'}
            </Text>
            <AspectRatio maxWidth={svgWidth} ratio={1}>
                {/* <div ref={refElement} /> */}
                <svg
                    ref={refElement}
                    style={{
                        height: svgWidth,
                        width: svgWidth,
                        marginRight: '0px',
                        marginLeft: '0px',
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
