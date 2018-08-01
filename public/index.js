/* global Vue, VueRouter, axios */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      message: "Welcome to Volunteer Web!",
    };
  },
  methods: {},
  computed: {}
};

var OrganizationIndexPage = {
  template: "#organization-index-page",
  data: function() {
    return {
      message: "Organization Listing",
      organizations: [],
      categories: [],
      search_id: "",
    };
  },
  created: function() {
    axios.get("/api/organizations").then(
      function(response) {
        this.organizations = response.data;
        console.log(this.organizations);
      }.bind(this));
    axios.get("/api/categories").then(
      function(response) {
        this.categories = response.data;
        console.log(this.categories);
      }.bind(this));
  },
  methods: {
    getActiveUser: function() {
      return localStorage.getItem("active_user");
    },
  },
  computed: {}
};

var OrganizationShowPage = {
  template: "#organization-show-page",
  data: function() {
    return {
      message: "Volunteer Web",
      organization: {},
      members: [],
      user_id: ""
    };
  },
  created: function() {
    axios.get("/api/organizations/" + this.$route.params.id ).then(function(response) {
      this.organization = response.data;
      console.log(this.organization);
    }.bind(this));
    axios.get("/api/members")
      .then(function(response) {
        this.members = response.data;
        console.log(this.members);
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
    leaveOrganization: function(organization) {
      var delete_id = "";
      var active_id = localStorage.getItem("active_user");
        this.members.forEach(function(member) {
        if (member.user_id.toString() == active_id) {
          delete_id = member.id;
        }
      }.bind(this));
        var params = {
          memeber_id: delete_id
      };
        axios
          .delete("api/members/" + delete_id, params)
          .then(function(response) {
            router.push("/organizations/");
          });
    },
    // isLoggedIn: function() {
    //   if (localStorage.getItem("jwt")) {
    //     return true;
    //   }
    //     return false;
    // },
    getActiveUser: function() {
      return localStorage.getItem("active_user");
    },
    isMemberOf: function() {
      var return_value = false
      var active_id = localStorage.getItem("active_user");
      this.organization.members.forEach(function(member) {
        if (member.id.toString() == active_id) {
          return_value = true;
        }
      }.bind(this));
      return return_value;
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
          router.push("/organizations");
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

var UserIndexPage = {
  template: "#user-index-page",
  data: function() {
    return {
      message: "Volunteer Web",
      users: [],
      search: ""
    };
  },
  created: function() {
    var skills_search = localStorage.getItem("skills_search");
    var params = {
      search: skills_search
    };
    console.log(params);
    axios.get("/api/users", {params}).then(
      function(response) {
        this.users = response.data;
        console.log(this.users);
      }.bind(this));
  },
  methods: {
    getActiveUser: function() {
      return localStorage.getItem("active_user");
    },
  },
  computed: {}
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
    getActiveUser: function() {
      return localStorage.getItem("active_user");
    }
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
      password_confirmation: "",
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
        // password_confirmation: this.password_confirmation,
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
        password_confirmation: this.password_confirmation,
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

var UserSearchPage = {
  template: "#user-search-page",
  data: function() {
    return {
      message: "Volunteer Web",
      skills_search: ""
    };
  },
  methods: {
    submit: function() {
      localStorage.setItem("skills_search", this.skills_search);
      router.push("/users");
    }
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
          console.log(response);
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("active_user", response.data.user.id);
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
    localStorage.removeItem("active_user");
    router.push("/");
  }
};

var router = new VueRouter({
  routes: [
  { path: "/", component: HomePage },
  { path: "/organizations", component:OrganizationIndexPage},
  { path: "/organizations/new", component: OrganizationNewPage},
  { path: "/organizations/:id", component: OrganizationShowPage},
  { path: "/organizations/:id/edit", component: OrganizationEditPage}, 
  { path: "/users", component: UserIndexPage},   
  { path: "/users/new", component: UserNewPage},
  { path: "/users/:id", component: UserShowPage},
  { path: "/users/:id/edit", component: UserEditPage},
  { path: "/users/:id/search", component: UserSearchPage},
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