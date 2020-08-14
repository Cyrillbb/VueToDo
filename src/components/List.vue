<template>
  <div>
    <h1>Todos</h1>
    <form v-on:submit.prevent="handleSubmitTodo">
      <input type="text" placeholder="...todo" v-model="input" />
      <button type="submit">Submit Todo</button>
    </form>
    <Loader v-if="!arr.length" />
    <div v-else>
      <select v-model="todoType">
        <option value="all">All</option>
        <option value="comleted">Completed</option>
        <option value="pending">Pending</option>
      </select>
      <ul class="list">
        <li class="item" v-for="item in filterdTodos" :key="arr.indexOf(item)">
          <p v-bind:class="{done: item.done}">
            {{item.body}}
            <input type="checkbox" v-on:change="item.done = !item.done" />
            <button v-on:click="$emit('delete-todo', item.id)">&#10008;</button>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Loader from "./Loader";
export default {
  name: "List",
  data() {
    return {
      input: "",
      todoType: "all",
    };
  },
  mounted() {
    alert('mounted')
  },
  props: {
    arr: Array,
  },
  computed: {
    filterdTodos() {
      if (this.todoType === "all") {
        return this.arr;
      } else if (this.todoType === "pending") {
        return this.arr.filter((i) => !i.done);
      } else {
        return this.arr.filter((i) => i.done);
      }
    },
  },
  methods: {
    handleSubmitTodo: function () {
      this.$emit("submit-todo", {
        body: this.input,
        id: this.arr.length,
        done: false,
      });
    },
  },
  components: {
    Loader,
  },
};
</script>

<style>
.list {
  list-style: none;
  max-width: 600px;
  margin: 0 auto;
}

.item {
  border: solid black 1px;
  border-radius: 3px;
  margin: 10px;
}

.done {
  text-decoration: line-through;
}
</style>