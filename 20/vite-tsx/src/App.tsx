import { defineComponent, ref } from 'vue';
import { CounterPanel } from './components/CounterPanel';
import { ButtonClassName } from './ButtonClassName';
import { css } from 'goober';

const AppClassName = css`
  padding: 20px;
  text-align: center;
  font-size: 30px;
`;

export const App = defineComponent({
  setup() {
    const initialCount = 0;
    const count = ref(initialCount);
    const up = () => count.value++;
    const down = () => count.value--;
    const change = (changedCount: number) => (count.value = changedCount);
    const clear = () => (count.value = initialCount);
    return () => (
      <div class={AppClassName}>
        <CounterPanel initialCount={count.value} up={up} down={down} change={change} />
        <hr />
        <button class={ButtonClassName} onClick={clear}>
          clear
        </button>
      </div>
    );
  },
});
