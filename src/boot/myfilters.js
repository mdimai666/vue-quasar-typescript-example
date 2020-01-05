import myfilters from '../js/filters'
//https://stackoverflow.com/questions/47004702/how-to-add-a-bunch-of-global-filters-in-vue-js

export default ({ app, router, Vue }) => {

  for (let filter in myfilters) {
    Vue.filter(filter, myfilters[filter])
  }

}
