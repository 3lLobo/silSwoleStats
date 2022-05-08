import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'

export const useD3 = (renderChartFn, svgWidth, data) => {
    const [loaded, setLoaded] = useState(false)
    const ref = useRef()

    useEffect(() => {
        console.log('BOX ', svgWidth)
        if (svgWidth > 0) {
            console.log('WE INSIRE')
            renderChartFn(d3.select(ref.current), svgWidth, svgWidth, data)
            setLoaded(true)
        }
        return () => {
            setLoaded(false)
        }
    }, [data.length, loaded, ref, svgWidth])

    return { ref, loaded, setLoaded }
}
