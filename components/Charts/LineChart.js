import React from 'react'
// import ReactApexChart from "react-apexcharts";
// import { lineChartData, lineChartOptions } from "../../variables/charts";
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

function LineChart({data, options}) {
    

    return (
        <Box
        >
            {/* {data ? ( */}
                <ApexChart options={options} series={data} type="area" width="100%" height="100%" />
            {/* ) : (
                <Box />
            )} */}
        </Box>
    )
}

// class LineChart extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       chartData: [],
//       chartOptions: {},
//     };
//   }

//   componentDidMount() {
//     this.setState({
//       chartData: lineChartData,
//       chartOptions: lineChartOptions,
//     });
//   }

//   render() {
//     return (
//       <ApexChart
//         options={this.state.chartOptions}
//         series={this.state.chartData}
//         type="area"
//         width="100%"
//         height="100%"
//       />
//     );
//   }
// }

export default LineChart
