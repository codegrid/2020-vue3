export const ImageResizerPreview = Vue.defineComponent({
  inject: ['imageResizerPreviewCtx'],
  computed: {
    ctx() {
      return this.imageResizerPreviewCtx;
    },
  },
  methods: {
    changeImage() {
      this.ctx.showImageSelector();
    },
  },
  template: `
    <div class="imageResizerPreview">
      <button @click="changeImage">CHANGE IMAGE</button>
      <img :src="ctx.selectedImageSrc" :width="ctx.width" :height="ctx.height"/>
    </div>
 `,
});
