<template>
  <div class="component-a">
    <p>Hello from component A!</p>
  </div>
</template>

<script>
export default {
  name: 'ComponentA'
}
</script>

<style scoped>
.component-a {
  display: flex;
  background: #92e09d;
  flex: 1;
  height: 100%;
  align-items: center;
  justify-content: center;
  margin: 10px;
  border: 1px solid black;
  border-radius: 5px;
}

.component-a p {
  color: black;
  font-size: 18px;
}
</style>
