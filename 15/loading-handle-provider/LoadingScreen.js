const loadingScreenCss = `
  padding:20px;
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  height:100%;
  color:#fff;
  background-color: rgba(0,0,0,0.5);
  text-align:center;
`;

export const LoadingScreen = Vue.defineComponent({
  inject: ['loadingHandleCtx'],
  template: `
    <div v-if="loadingHandleCtx.loadingVisible" style="${loadingScreenCss}">
      now loading...
    </div>
  `,
});
