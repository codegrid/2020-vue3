import { Counter } from '../models/Counter.js';
import { DialogHandleProvider } from './DialogHandleProvider.js';

const imageList = [
  './assets/images/room.jpeg',
  './assets/images/dog.jpeg',
  './assets/images/mabochoku.jpeg',
  './assets/images/umi.jpeg',
];

const makeImageResizerToolsCtx = (widthCounter, heightCounter) => {
  return {
    get widthCounter() {
      return Vue.readonly(widthCounter);
    },
    get heightCounter() {
      return Vue.readonly(heightCounter);
    },
    updateWidth(width) {
      widthCounter.count = width;
    },
    updateHeight(height) {
      heightCounter.count = height;
    },
    initializeSize() {
      widthCounter.count = widthCounter.initialCount;
      heightCounter.count = heightCounter.initialCount;
    },
  };
};

const makeImageResizerPreviewCtx = (widthCounter, heightCounter, imageState, dialogHandleCtx) => {
  return {
    get width() {
      return widthCounter.count;
    },
    get height() {
      return heightCounter.count;
    },
    get selectedImageSrc() {
      return imageState.selectedImageSrc;
    },
    showImageSelector() {
      dialogHandleCtx.showDialog();
    },
  };
};

const makeImageSelectorCtx = (imageList, imageState, dialogHandleCtx) => {
  return {
    get imageList() {
      return Vue.readonly(imageList);
    },
    updateSelectedImageSrc(imageSrc) {
      imageState.selectedImageSrc = imageSrc;
    },
    hideImageSelector() {
      dialogHandleCtx.hideDialog();
    },
  };
};

export const AppHandleProvider = Vue.defineComponent({
  components: {
    DialogHandleProvider,
  },
  inject: ['dialogHandleCtx'],
  data() {
    const options = { min: 50, max: 1000, step: 50 };
    return {
      widthCounter: new Counter(200, options),
      heightCounter: new Counter(150, options),
      imageState: {
        selectedImageSrc: imageList[0],
      },
    };
  },
  provide() {
    const { widthCounter, heightCounter, imageState, dialogHandleCtx } = this;

    const imageResizerToolsCtx = makeImageResizerToolsCtx(widthCounter, heightCounter);
    const imageResizerPreviewCtx = makeImageResizerPreviewCtx(
      widthCounter,
      heightCounter,
      imageState,
      dialogHandleCtx,
    );
    const imageSelectorCtx = makeImageSelectorCtx(imageList, imageState, dialogHandleCtx);

    return {
      imageResizerToolsCtx,
      imageResizerPreviewCtx,
      imageSelectorCtx,
    };
  },
  template: `<slot/>`,
});

// for demo
imageList.forEach(src => fetch(src));
