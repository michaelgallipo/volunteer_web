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
      organization: {},
      user_id: ""
    };
  },
  created: function() {
    axios.get("/api/organizations/" + this.$route.params.id ).then(function(response) {
      this.organization = response.data;
      console.log(this.organization);
    }.bind(this));
    axios.get("/api/users/me")
      .then(function(response) {
        this.user = response.data;
        console.log(this.user);
    }.bind(this));    
  },
  methods: {
    deleteOrganization: function(organization) {
      axios.delete("/api/organizations/" + organization.id).then(function(response) { router.push("/");
      })
      .catch(
        function(error) {
          this.errors = error.response.data.errors;
        }.bind(this)
      );
    },
    joinOrganization: function(organization) {
      var params = {
        organization_id: this.organization.id
      };
      axios
        .post("/api/members", params)
        .then(function(response) {
          router.push("/organizations/" +this.$route.params.id);
        }.bind(this)
      );
    },
    isLoggedIn: function() {
      if (localStorage.getItem("jwt")) {
        return true;
      }
        return false;
    },
    isMemberOf: function(organization) {
      organization.members.forEach(function(member) {
        if (member.id == this.user.id) {
          return true;
        }
          return false;
      });
    },
  },
  computed: {}
};

var OrganizationNewPage = {
  template: "#organization-new-page",
  data: function() {
    return {
      name: "",
      address: "",
      website: "",
      logo: "",
      contact_name: "",
      contact_email: "",
      contact_phone: "",
      mission: "",
      description: "",
      category_id: "",
      categories: [],
      needs: "",
      errors: []
    };
  },
  created: function() {
    axios.get("/api/categories").then(
      function(response) {
        this.categories = response.data;
        console.log(this.categories);
      }.bind(this));
  },
  methods: {
    submit: function() {
      var params = {
        name: this.name,
        address: this.address,
        website: this.website,
        logo: this.logo,
        contact_name: this.contact_name,
        contact_email: this.contact_email,
        contact_phone: this.contact_phone,
        mission: this.mission,
        description: this.description,
        category_id: this.category_id,
        needs: this.needs
      };
      axios
        .post("/api/organizations", params)
        .then(function(response) {
          router.push("/");
      })
      .catch(
        function(error) {
          this.errors = error.response.data.errors;
        }.bind(this)
      );
    },
  },
  computed: {}
};

var OrganizationEditPage = {
  template: "#organization-edit-page",
  data: function() {
    return {
      name: "",
      address: "",
      website: "",
      logo: "",
      contact_name: "",
      contact_email: "",
      contact_phone: "",
      mission: "",
      description: "",
      category_id: "",
      categories: [],
      needs: "",
      errors: []
    };
  },
  created: function() {
    axios.get("/api/organizations/" + this.$route.params.id ).then(function(response) {
      this.name = response.data.name;
      this.address = response.data.address;
      this.website = response.data.website;
      this.logo = response.data.logo;
      this.contact_name = response.data.contact_name;
      this.contact_email = response.data.contact_email;
      this.contact_phone = response.data.contact_phone;
      this.category_id = response.data.category_id;
      this.mission = response.data.mission;
      this.description = response.data.description;
      this.needs = response.data.needs;
    }.bind(this));
    axios.get("/api/categories").then(
      function(response) {
        this.categories = response.data;
        console.log(this.categories);
      }.bind(this));
  },
  methods: {
    submit: function() {
      var params = {
        name: this.name,
        address: this.address,
        website: this.website,
        logo: this.logo,
        contact_name: this.contact_name,
        contact_email: this.contact_email,
        contact_phone: this.contact_phone,
        mission: this.mission,
        description: this.description,
        category_id: this.category_id,
        needs: this.needs
      };
      axios
        .patch("/api/organizations/" +this.$route.params.id, params)
        .then(function(response) {
          router.push("/");
      })
      .catch(
        function(error) {
          this.errors = error.response.data.errors;
        }.bind(this)
      );
    },
  }, 
};

var UserShowPage = {
  template: "#user-show-page",
  data: function() {
    return {
      message: "Volunteer Web",
      user: {}
    };
  },
  created: function() {
    axios.get("/api/users/" + this.$route.params.id ).then(function(response) {
      this.user = response.data;
      console.log(this.user);
    }.bind(this));
  },
  methods: {
    deleteUser: function(user) {
      axios.delete("/api/users/" + user.id).then(function(response) { router.push("/");
      })
      .catch(
        function(error) {
          this.errors = error.response.data.errors;
        }.bind(this)
      );
    },
  },
  computed: {}
};

var UserNewPage = {
  template: "#user-new-page",
  data: function() {
    return {
      full_name: "",
      user_name: "",
      password: "",
      confirm_password: "",
      address: "",
      email: "",
      phone: "",
      visibility: "",
      bio: "",
      skills: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        full_name: this.full_name,
        user_name: this.user_name,
        password: this.password,
        confirm_password: this.confirm_password,
        address: this.address,
        email: this.email,
        phone: this.phone,
        visibility: this.visibility,
        bio: this.bio,
        skills: this.skills
    };
      axios
        .post("/api/users", params)
        .then(function(response) {
          router.push("/");
      })
      .catch(
        function(error) {
          this.errors = error.response.data.errors;
        }.bind(this)
      );
    },
  },
  computed: {}
};

var UserEditPage = {
  template: "#user-edit-page",
  data: function() {
    return {
      full_name: "",
      user_name: "",
      password: "",
      confirm_password: "",
      address: "",
      email: "",
      phone: "",
      visibility: true,
      bio: "",
      skills: "",
      errors: []
    };
  },
  created: function() {
    axios.get("/api/users/" + this.$route.params.id ).then(function(response) {
        this.full_name = response.data.full_name;
        this.user_name = response.data.user_name;
        // password: this.password,
        // confirm_password: this.confirm_password,
        this.address = response.data.address;
        this.email = response.data.email;
        this.phone = response.data.phone;
        this.visibility = response.data.visibility;
        this.bio = response.data.bio;
        this.skills = response.data.skills;
    }.bind(this));
  },

  methods: {
    submit: function() {
      var params = {
        full_name: this.full_name,
        user_name: this.user_name,
        password: this.password,
        onfirm_password: this.confirm_password,
        address: this.address,
        email: this.email,
        phone: this.phone,
        visibility: this.visibility,
        bio: this.bio,
        skills: this.skills
    };
      axios
        .patch("/api/users/" +this.$route.params.id, params)
        .then(function(response) {
          router.push("/users/me");
      })
      .catch(
        function(error) {
          this.errors = error.response.data.errors;
        }.bind(this)
      );
    },
  },
  computed: {}
};





var LoginPage = {
  template: "#login-page",
  data: function() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        auth: { email: this.email, password: this.password }
      };
      axios
        .post("/user_token", params)
        .then(function(response) {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          router.push("/");
        })
        .catch(
          function(error) {
            this.errors = ["Invalid email or password."];
            this.email = "";
            this.password = "";
          }.bind(this)
        );
    }
  }
};

var LogoutPage = {
  template: "<h1>Logout</h1>",
  created: function() {
    axios.defaults.headers.common["Authorization"] = undefined;
    localStorage.removeItem("jwt");
    router.push("/");
  }
};


var router = new VueRouter({
  routes: [
  { path: "/", component: HomePage },
  { path: "/organizations/new", component: OrganizationNewPage},
  { path: "/organizations/:id", component: OrganizationShowPage},
  { path: "/organizations/:id/edit", component: OrganizationEditPage},
  { path: "/users/new", component: UserNewPage},
  { path: "/users/:id", component: UserShowPage},
  { path: "/users/:id/edit", component: UserEditPage},
  { path: "/login", component: LoginPage },
  { path: "/logout", component: LogoutPage }
  ],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#vue-app",
  router: router,
    created: function() {
    var jwt = localStorage.getItem("jwt");
    if (jwt) {
      axios.defaults.headers.common["Authorization"] = jwt;
    }
  },
  methods: {
    isLoggedIn: function() {
      if (localStorage.getItem("jwt")) {
        return true;
      }
      return false;
    },
  }
});