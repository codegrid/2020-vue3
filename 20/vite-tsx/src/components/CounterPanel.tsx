import { computed, defineComponent, PropType } from 'vue';
import { ButtonClassName } from '../ButtonClassName';

import { css } from 'goober';

const CountInputClassName = css`
  padding: 0;
  box-sizing: border-box;
  width: 80px;
  height: 50px;
  font-size: 20px;
  font-family: 'Arial';
  text-align: right;
`;

export const CounterPanel = defineComponent({
  props: {
    initialCount: { type: Number, required: true },
    up: { type: Function as PropType<() => void>, required: true },
    down: { type: Function as PropType<() => void>, required: true },
    change: { type: Function as PropType<(count: number) => void>, required: true },
  },
  setup(props) {
    const count = computed({
      get: () => props.initialCount,
      set: v => props.change(v),
    });
    return () => (
      <>
        <button class={ButtonClassName} onClick={props.down}>
          -
        </button>
        <input class={CountInputClassName} v-model_number_lazy={count.value} type="number" />
        <button class={ButtonClassName} onClick={props.up}>
          +
        </button>
      </>
    );
  },
});
