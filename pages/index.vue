<template>
  <div class="container">
    <div>
      <h1 class="title">
        nuxt-mock-client-only example
      </h1>
      <div class="components">
        <ComponentA />
        <client-only>
          <ComponentB />
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
import ComponentA from '~/components/ComponentA.vue'
import ComponentB from '~/components/ComponentB.vue'

export default {
  components: {
    ComponentA,
    ComponentB
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.container .components {
  height: 60px;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 40px;
  color: #35495e;
  letter-spacing: 1px;
}
</style>
