import { Box, Text, AspectRatio } from '@chakra-ui/react';
import { useState, useEffect, useRef } from 'react';
import D3Component from './sunclass';


let vis;

export default function Sunreact({ data: propsdata, cardWidth }) {
    const [data, setData] = useState(null);
    const boxref = useRef()
    // const [width, setWidth] = useState(boxref.current?.clientWidth);
    // const [height, setHeight] = useState(boxref.current?.clientWidth);
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

    function handleResizeEvent() {
        let resizeTimer;
        const handleResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () {
                console.log("BOX", boxref.current.clientWidth)
                setWidth(boxref.current.clientWidth);
                setHeight(boxref.current.clientHeight);
            }, 300);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }

    function onClick(e) {
        console.log("Click", e)
    }

    function initVis() {
        if (cardWidth > 0) {
            console.log('INIT')

            if (data) {
                const d3Props = {
                    data: data,
                    width: cardWidth,
                    height: cardWidth,
                    onDatapointClick: setActive
                };
                console.log("PROPS", d3Props)
                vis = new D3Component(refElement.current, d3Props);
            }
        }
    }

    function updateVisOnResize() {
        console.log("RESIZEE")
        vis && vis.resize(cardWidth, cardWidth);
    }

    return (
        <Box
            display='flex'
            flexDirection='column'
            width='100%'
            position='relative'
            minWidth='0px'
            wordWrap='break-word'
            backgroundClip='border-box'
            boxShadow='0px 3.5px 5.5px rgba(0, 0, 0, 0.02)'
            borderRadius='15px'
            bg='gray.300'
            p='6'
            ref={boxref}
            id='stupidBox'
        >
            <Text>{active || "none"}</Text>
            <AspectRatio
                maxWidth={cardWidth}
                ratio={1}
            >

                <div ref={refElement} />
            </AspectRatio>
        </Box>
    );
}