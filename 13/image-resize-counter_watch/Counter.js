const getStepValue = ({ direction, count, step }) => {
  const fraction = count % step;
  if (fraction === 0) {
    return count + step * direction;
  }
  if (fraction * direction < 0) {
    return count + fraction * -1;
  }
  return count + fraction * -1 + step * direction;
};

export class Counter {
  constructor(count, options) {
    this._options = {
      min: -999999,
      max: 999999,
      step: 1,
      ...options,
    };
    this._count = this._initialCount = count;
  }

  get count() {
    return this._count;
  }

  set count(count) {
    if (this.validate(count)) {
      this._count = count;
    }
  }

  get initialCount() {
    return this._initialCount;
  }

  get min() {
    return this._options.min;
  }

  get max() {
    return this._options.max;
  }

  get step() {
    return Math.abs(this._options.step);
  }

  get stepUpValue() {
    const { count, step } = this;
    return getStepValue({ direction: 1, count, step });
  }

  get stepDownValue() {
    const { count, step } = this;
    return getStepValue({ direction: -1, count, step });
  }

  validate(count) {
    if (typeof count !== 'number') return false;
    return this.min <= count && count <= this.max;
  }
}
