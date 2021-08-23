import { ImageResizer } from './components/ImageResizer.js';
import { ImageSelector } from './components/ImageSelector.js';
import { Counter } from './models/Counter.js';

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

const makeImageResizerPreviewCtx = (widthCounter, heightCounter, imageState) => {
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
      imageState.imageSelectorVisible = true;
    },
  };
};

const makeImageSelectorCtx = (imageList, imageState) => {
  return {
    get imageList() {
      return Vue.readonly(imageList);
    },
    updateSelectedImageSrc(imageSrc) {
      imageState.selectedImageSrc = imageSrc;
    },
    hideImageSelector() {
      imageState.imageSelectorVisible = false;
    },
  };
};

export const App = Vue.defineComponent({
  components: {
    ImageResizer,
    ImageSelector,
  },
  data() {
    const options = { min: 50, max: 1000, step: 50 };
    return {
      widthCounter: new Counter(200, options),
      heightCounter: new Counter(150, options),
      imageState: {
        selectedImageSrc: imageList[0],
        imageSelectorVisible: false,
      },
      bar: false,
    };
  },
  provide() {
    const { widthCounter, heightCounter, imageState } = this;

    const imageResizerToolsCtx = makeImageResizerToolsCtx(widthCounter, heightCounter);
    const imageResizerPreviewCtx = makeImageResizerPreviewCtx(
      widthCounter,
      heightCounter,
      imageState,
    );
    const imageSelectorCtx = makeImageSelectorCtx(imageList, imageState);

    return {
      imageResizerToolsCtx,
      imageResizerPreviewCtx,
      imageSelectorCtx,
    };
  },
  template: `
    <ImageResizer/>
    <ImageSelector v-if="imageState.imageSelectorVisible"/>
  `,
});

// for demo
imageList.forEach(src => fetch(src));
