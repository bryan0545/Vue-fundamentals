<template>
  <h2>{{ customTitle }}</h2>
  <p>{{ count }}</p>
  <p>{{ count }}<sup>2</sup> = {{ squareCounter }}</p>
  <button @click="decrement">-</button>
  <button @click="increment">+</button>
</template>

<script>
export default {
  props: {
    title: String,
    start: {
      type: Number,
      default: 0,
      validator(value) {
        return value >= 0;
      },
      // required: true,
    },
  },
  name: "Counter",
  data() {
    return {
      count: this.start,
    };
  },
  methods: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    },
  },
  computed: {
    squareCounter() {
      return this.count * this.count;
    },
    customTitle() {
      return this.title || "Counter";
    },
  },
};
</script>

<style>
button {
  background-color: #64b687;
  border-radius: 5px;
  border: 1px solid white;
  color: white;
  cursor: pointer;
  margin: 0 5px;
  padding: 5px 15px;
  transition: 0.3s ease-in-out;
}

button:hover {
  background-color: #4b9a6f;
  transition: 0.3s ease-in-out;
}
</style>
