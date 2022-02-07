<template>
  <div id="app">你好珠峰</div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    fetch("/asimov/subscriptions/recommended_collections")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  },
};
</script>
