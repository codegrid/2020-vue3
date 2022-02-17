<script>
import { defineComponent, computed } from 'vue'

export default defineComponent({
  emits: ['up', 'down', 'change'],
  props: {
    initialCount: {type:Number, required:true}
  },
  setup(props, context){
    const up = () => context.emit('up')
    const down = () => context.emit('down')
    const count = computed({
      get: () => props.initialCount,
      set: v => context.emit('change', v),
    })
    return {
      count,
      up,
      down,
    }
  }
})
</script>

<template>
  <button @click="down">-</button>
  <input v-model.number.lazy="count" type="number"/>
  <button @click="up">+</button>
</template>

<style lang="scss" scoped>
@import "../Button";

button {
  @include Button;
}
input[type='number'] {
  padding: 0;
  box-sizing: border-box;
  width: 80px;
  height: 50px;
  font-size: 20px;
  font-family: 'Arial';
  text-align: right;
}
</style>
