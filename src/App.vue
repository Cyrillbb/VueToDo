<template>
  <div id="app">
    <h1>{{msg}}</h1>
    <hr />
    <nav>
      <router-link class="link" to="/">Home</router-link>
      <router-link class="link" to="/todos">todos</router-link>
    </nav>
    <h2 v-if="awesome">Awesome</h2>
    <button v-on:click="awesomeHandler">Handle Awesomness</button>
    <button v-on:click="handleFetch">Fetch some stuff</button>
    <!-- <button v-on:click="fetchPosts">Fetch some data</button> -->
    <router-view
      v-bind:arr="todos"
      v-bind:fetching="fetching"
      v-on:submit-todo="handleAdd"
      v-on:delete-todo="handleDelete"
    />
  </div>
</template>

<script>
//import List from "./components/List";
export default {
  name: "App",

  data() {
    return {
      msg: "Hello Vue",
      awesome: false,
      todos: [],
      fetching: true,
    };
  },

  async mounted() {
    const resp = await fetch(
      "https://jsonplaceholder.typicode.com/posts?_page=1&_limit=10"
    );
    const result = await resp.json();
    this.todos = [...this.todos, ...result.map((i) => ({ ...i, done: false }))];
    this.fetching = false;
  },

  methods: {
    awesomeHandler: function () {
      if (this.awesome) {
        this.awesome = false;
      } else {
        this.awesome = true;
      }
    },

    handleFetch: async function () {
      const resp = await fetch(
        "https://jsonplaceholder.typicode.com/posts?_page=1&_limit=10"
      );
      const result = await resp.json();
      this.todos = [
        ...this.todos,
        ...result.map((i) => ({ ...i, done: false })),
      ];
      this.fetching = false;
    },

    handleDelete: function (id) {
      this.todos = this.todos.filter((i) => i.id !== id);
    },

    handleAdd: function (e) {
      console.log(this.todos);
      this.todos = [...this.todos, e];
    },
  },

  components: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.link {
  text-decoration: none;
  margin: 5px;
}
</style>
