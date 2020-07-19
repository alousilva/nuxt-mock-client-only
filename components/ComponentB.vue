<template>
  <div class="component-b">
    <p>Hello from component B!</p>
  </div>
</template>

<script>
export default {
  name: 'ComponentB'
}
</script>

<style scoped>
.component-b {
  display: flex;
  background: #8cc9db;
  flex: 1;
  height: 100%;
  align-items: center;
  justify-content: center;
  margin: 10px;
  border: 1px solid black;
  border-radius: 5px;
}

.component-b p {
  color: black;
  font-size: 18px;
}
</style>
