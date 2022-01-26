import { useCounter } from './useCounter.js';

export const useSizeCounter = ({ initialSize, counterOptions, onInvalidSize }) => {
  const widthCounter = useCounter(initialSize.width, counterOptions);
  const heightCounter = useCounter(initialSize.height, counterOptions);

  const validateSize = (width, height) => {
    if (width >= height) {
      return true;
    }
    onInvalidSize();
    return false;
  };
  const downWidth = () => {
    if (validateSize(widthCounter.stepDownValue.value, heightCounter.count.value)) {
      widthCounter.down();
    }
  };
  const upHeight = () => {
    if (validateSize(widthCounter.count.value, heightCounter.stepUpValue.value)) {
      heightCounter.up();
    }
  };
  const setWidth = width => {
    if (validateSize(width, heightCounter.count.value)) {
      widthCounter.set(width);
    }
  };
  const setHeight = height => {
    if (validateSize(widthCounter.count.value, height)) {
      heightCounter.set(height);
    }
  };
  const initializeSize = () => {
    widthCounter.initialize();
    heightCounter.initialize();
  };

  return {
    width: widthCounter.count,
    upWidth: widthCounter.up,
    downWidth,
    setWidth,
    height: heightCounter.count,
    upHeight,
    downHeight: heightCounter.down,
    setHeight,
    initializeSize,
  };
};
