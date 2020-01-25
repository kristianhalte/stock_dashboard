# stock_dashboard

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# TODO
- [ ] Get the `Doughnut.vue` view to pass `$route.params.id` to a new `Doughnut.vue` component through `props` [Passing Props to Route Components](https://router.vuejs.org/guide/essentials/passing-props.html)
- [ ] Then, get the new `Doughnut.vue` component to update based on the `state` change in Vuex [Watch for Vuex State changes](https://dev.to/viniciuskneves/watch-for-vuex-state-changes-2mgj)
Get the `Doughnut.vue` view to update child components `state` through `props` 
- [ ] Try implement [fusioncharts](https://www.fusioncharts.com/dev/getting-started/vue/your-first-chart-using-vuejs) or [highcharts](https://www.highcharts.com/docs/chart-and-series-types/variable-radius-pie-chart)