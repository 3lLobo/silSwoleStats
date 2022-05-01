import React from "react";
// import ReactApexChart from "react-apexcharts";
import { lineChartData, lineChartOptions } from "../../variables/charts";
import dynamic from 'next/dynamic';


const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

function LineChart() {

  return (
    <ApexChart
      options={lineChartOptions}
      series={lineChartData}
      type="area"
      width="100%"
      height="100%"
    />
  );
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

export default LineChart;
