<script>
import { defineComponent, readonly, ref } from 'vue';
import CounterPanel from './components/CounterPanel.vue'

export default defineComponent({
  components:{
    CounterPanel
  },
  setup() {
    const initialCount = 0
    const count = ref(initialCount)
    const up = () => count.value ++
    const down = () => count.value --
    const change = (changedCount) => (count.value = changedCount);
    const clear = () => (count.value = initialCount);
    return {
      count: readonly(count),
      up,
      down,
      change,
      clear
    }
  }
})
</script>

<template>
  <div class="App">
    <CounterPanel
      :initialCount="count"
      @up="up"
      @down="down"
      @change="change"
    />
    <hr/>
    <button @click="clear">clear</button>
  </div>
</template>

<style lang="scss" scoped>
@import "./Button";

.App {
  padding: 20px;
  text-align: center;
  font-size: 30px;
}
button {
  @include Button;
}

</style>
