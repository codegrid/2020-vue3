export const ImageSelector = Vue.defineComponent({
  inject: ['imageSelectorCtx'],
  computed: {
    ctx() {
      return this.imageSelectorCtx;
    },
  },
  methods: {
    changeSelectedImage(imageSrc) {
      this.ctx.updateSelectedImageSrc(imageSrc);
      this.ctx.hideImageSelector();
    },
  },
  template: `
    <div class="imageSelector">
      <p>click image</p>
      <button v-for="imageSrc in ctx.imageList" @click="changeSelectedImage(imageSrc)">
        <img :src="imageSrc"/>
      </button>
    </div>
  `,
});
