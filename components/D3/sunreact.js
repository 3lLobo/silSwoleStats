import { Box, Text, AspectRatio, useStyleConfig } from '@chakra-ui/react';
import { useState, useEffect, useRef } from 'react';
import D3Component from './sunclass';


let vis;

export default function Sunreact({ data: propsdata, cardWidth }) {
    const [data, setData] = useState(null);
    const boxref = useRef()

    const styles = useStyleConfig('Card', {'variant': 'panel'} )

    const [active, setActive] = useState(null);
    const refElement = useRef(null);

    useEffect(fetchData, []);
    // useEffect(handleResizeEvent, []);
    useEffect(initVis, [data]);
    useEffect(updateVisOnResize, [cardWidth]);

    function fetchData() {
        Promise.resolve().then(() => setData(propsdata));
        console.log("fetchh")
    }

    function onClick(e, p) {
        console.log("Click", p)
        setActive(p.data.name + "   " +  p.value.toString());

    }

    function initVis() {
        if (cardWidth > 0) {

            if (data) {
                const d3Props = {
                    data: data,
                    width: cardWidth,
                    height: cardWidth,
                    onDatapointClick: onClick
                };
                vis = new D3Component(refElement.current, d3Props);
            }
        }
    }

    function updateVisOnResize() {
        vis && vis.resize(cardWidth, cardWidth);
    }

    return (
        <Box
        // __css={styles}
            display='flex'
            flexDirection='column'
            width='100%'
            position='relative'
            minWidth='0px'
            wordWrap='break-word'
            backgroundClip='border-box'
            boxShadow='0px 3.5px 5.5px rgba(0, 0, 0, 0.02)'
            borderRadius='15px'
            bg='white'
            // // p='6'
            ref={boxref}
        >
            <Text
            fontFamily="Helvetica"
            bg="teal.300"
            rounded="full"
            p="3"
            textAlign="center"
            >
                {active || "none"}
                </Text>
            <AspectRatio
                maxWidth={cardWidth}
                ratio={1}
            >

                {/* <div ref={refElement} /> */}
                <svg
                    ref={refElement}
                    style={{
                        height: cardWidth,
                        width: cardWidth,
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
    );
}