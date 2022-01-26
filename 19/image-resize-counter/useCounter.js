const getStepValue = ({ direction, count, step }) => {
  if (direction !== -1 && direction !== 1)
    throw new Error('directionに -1 or 1 以外の値が指定されました。');
  const fraction = count % step;
  if (fraction === 0) {
    return count + step * direction;
  }
  if (fraction * direction < 0) {
    return count + fraction * -1;
  }
  return count + fraction * -1 + step * direction;
};

export const useCounter = (initialCount, _options) => {
  const options = {
    min: -999999,
    max: 999999,
    step: 1,
    ..._options,
  };
  const count = Vue.ref(initialCount);
  const stepUpValue = Vue.computed(() =>
    getStepValue({ direction: 1, count: count.value, step: options.step }),
  );
  const stepDownValue = Vue.computed(() =>
    getStepValue({ direction: -1, count: count.value, step: options.step }),
  );
  const set = newCount => {
    if (options.min <= newCount && newCount <= options.max) {
      count.value = newCount;
    }
  };
  const up = () => set(stepUpValue.value);
  const down = () => set(stepDownValue.value);
  const initialize = () => set(initialCount);

  return {
    count: Vue.readonly(count),
    stepUpValue,
    stepDownValue,
    set,
    up,
    down,
    initialize,
  };
};
