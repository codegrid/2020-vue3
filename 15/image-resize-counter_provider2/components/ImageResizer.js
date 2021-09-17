export const ImageResizer = Vue.defineComponent({
  template: `
    <div>
      <slot name="tools"/>
      <hr/>
      <slot name="preview"/>
    </div>
  `,
});
