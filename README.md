# Sils Swoleness

An MVP WebApp to track Sil's clients Swoleness.

[![Netlify Status](https://api.netlify.com/api/v1/badges/3b5d21b5-8fbc-4e96-8bf9-d4043e0f2db5/deploy-status)](https://app.netlify.com/sites/swolestats/deploys)

[![Wallaby.js](https://img.shields.io/badge/wallaby.js-powered-g.svg?logo=github)](https://wallabyjs.com/oss/)

This page shall have double sided purpose:

-   for once, the client shall be able to log his stats
-   secondly, his data shall be visualized together with additional information.

Mockup data should be weight, big lifts and waist measurements for client data and protein/carbohydrate/fat caloric distribution for nutrition.

## Roadmap

1. Find nice template ✅
1. Implement Graphic interface
1. Set up Database structure
1. Set up Auth with Google and LinkedIn
1. Populate with dummy data
1. Plot with D3

Idea: Get food-data from the [MyFitnessPallApi](https://myfitnesspalapi.com/).

## Setup-so-far

Template: [Purity UI Dashboard](https://demos.creative-tim.com/purity-ui-dashboard)

Formating and Linting: [DevPost](https://dev.to/chgldev/getting-prettier-eslint-and-vscode-to-work-together-3678)

### Dashboard

The components are renderer [here](src/views/Dashboard/Dashboard/index.js).

We start with a Table for the **BIG LIFTS** and one for the bodyfat percentage.

**BIG LIFTS**:

-   Bench
-   Squat
-   Deadlift
-   Clean

table structure should looks like this:

| lift_id | user_id | lift_type | lift_weight | reps | date           |
| ------- | ------- | --------- | ----------- | ---- | -------------- |
| 1       | 11      | Bench     | 110         | 8    | 20220411-11:11 |

**Body composition**:

| weightin_id | user_id | weight_kg | bodyfat_perc | date           |
| ----------- | ------- | --------- | ------------ | -------------- |
| 1           | 11      | 111       | 11           | 20220411-11:11 |

### Tables

Here we want either the weekly checkin, or the food/meelplan graphs.
Edit the template [here](src/views/Dashboard/Tables/index.js)

[ApexChart](https://apexcharts.com/docs/series/) dicumentation.

### Billing

Shows the current plan and price.

## React / NextJS and D3

Browsing the web we got along two different methods. Both rely on passing the D3 svg (`svg.node()`) to the `useRef()` React hook, then setting this ref as refference to either an `<svg />` or a `<div />` element. We didn't figure out yet how to use it with NextJS optimized `<Image />` component. Here the two alternatives:

-   Using [D3 inside a react hook](https://www.pluralsight.com/guides/using-d3.js-inside-a-react-app). The chart gets rendered inside the `useD3()` hook and returns the ref object. Simple but too simple for challenges like component resizing and getting data in/out of the chart.
-   More complex solution by building a [D3 chart class](https://levelup.gitconnected.com/react-hooks-and-d3-39be1d900fb). Again the class takes a `ref` hook-element as input for the constructor which likes to the chart. The class can be enhanced with `onClick()` functions and further props. Inside the React component, events such as resizing or data updates are handled by React `useEffect()` hooks. Tricky is here the NextJS server-side renderer. We pass the React component as `dynamic` and opt out of SSR. Here a nice [gist](https://gist.github.com/stopyransky/fe3fd908055be08f2c8df4600962ff0e#file-reactcomponent-js)

On LinkedIn I saw a workshop video of a lady who also wrote a book on how to integrate D3 in React. Can't find it anymore 🙄

TODO:

-   how to change the `<svg />` font and color.
-   pull data out of the chart to React

## Notes 2 myself

Don't try to configure ESLint your self!!! Use `npx create-next-app` instead and stick to the default.
Same for stroybook.

To redirect automatically from one page to another use [middleware](https://nextjs.org/docs/messages/middleware-relative-urls).

Allowing SVGs inside nexjs Image - [here](https://nextjs.org/docs/api-reference/next/image#dangerously-allow-svg).

Changing or adding Fonts to the NextJS website:

-   Frst choose your font on [Google fonts](https://fonts.google.com/specimen/Montserrat)
-   Next follow [these instructions](https://nextjs.org/docs/basic-features/font-optimization)
-   Only the last `<link />` tag is necessary. Don't forget to close the tag.
-   In ChakraUI, extand the theme with something like this:

```json
{styles: {
        global: (props) => ({
            body: {
                fontFamily: 'Montserrat, sans-serif',
            },
            html: {
                fontFamily: 'Montserrat, sans-serif',
            },
        }}}
```

Set up an Auth Api with [Google](https://support.google.com/googleapi/answer/6158849?hl=en).