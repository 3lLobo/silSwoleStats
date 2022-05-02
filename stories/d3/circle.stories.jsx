// import React from 'react';
import { data } from './data';

import BarChart from '../../components/D3/circle';

export default {
  title: 'd3/BarChart',
  component: BarChart,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

const Template = (args) => <BarChart {...args} />;

export const MyChart = Template.bind({});
MyChart.args = {
  data: data
};
