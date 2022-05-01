import React, { Component } from "react";
import Card from "../Card/Card";
// import Chart from "react-apexcharts";
import dynamic from 'next/dynamic';
import { barChartData, barChartOptions } from "../../variables/charts";


const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

function BarChart(props) {

  return (
    <Card
      py="1rem"
      height={{ sm: "200px" }}
      width="100%"
      bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
      position="relative"
    >
      <Chart
        options={barChartOptions}
        series={barChartData}
        type="bar"
        width="100%"
        height="100%"
      />
    </Card>
  );
}

// class BarChart extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       chartData: [],
//       chartOptions: {},
//     };
//   }

//   componentDidMount() {
//     this.setState({
//       chartData: barChartData,
//       chartOptions: barChartOptions,
//     });
//   }

//   render() {
//     return (
//       <Card
//         py="1rem"
//         height={{ sm: "200px" }}
//         width="100%"
//         bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
//         position="relative"
//       >
//         <Chart
//           options={this.state.chartOptions}
//           series={this.state.chartData}
//           type="bar"
//           width="100%"
//           height="100%"
//         />
//       </Card>
//     );
//   }
// }

export default BarChart;
