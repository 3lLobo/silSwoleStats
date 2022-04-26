# Sils Swoleness

An MVP WebApp to track Sil's clients Swoleness.

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

## Setup-so-far

Template: [Purity UI Dashboard](https://demos.creative-tim.com/purity-ui-dashboard)

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

### Billing

Shows the current plan and price.
