/* global Vue, VueRouter, axios */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      message: "Welcome to Volunteer Web!",
      organizations: []
    };
  },
  created: function() {
    axios.get("/api/organizations").then(
      function(response) {
        this.organizations = response.data;
        console.log(this.organizations);
      }.bind(this));
  },
  methods: {},
  computed: {}
};

var OrganizationShowPage = {
  template: "#organization-show-page",
  data: function() {
    return {
      message: "Volunteer Web",
      organization: {}
    };
  },
  created: function() {
    axios.get("/api/organizations/" + this.$route.params.id ).then(function(response) {
      this.organization = response.data;
      console.log(this.organization);
    }.bind(this));
  },
  methods: {},
  computed: {}
};

var router = new VueRouter({
  routes: [
  { path: "/", component: HomePage },
  { path: "/organizations/:id", component: OrganizationShowPage}
  ],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#vue-app",
  router: router
});