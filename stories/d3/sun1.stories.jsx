// import React from 'react';
import { flareData } from './flareData'

import { Sunburst } from '../../components/D3/sunburst'

export default {
    title: 'd3/Sun1',
    component: Sunburst,
    parameters: {
        // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
    },
}

const Template = (args) => <Sunburst {...args} />

export const MyChart = Template.bind({})
MyChart.args = {
    data: flareData,
}
