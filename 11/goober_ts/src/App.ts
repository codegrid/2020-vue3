const myCss = goober.css`
  padding: 20px;
  text-align: center;
  border-radius: 100px;
  border: solid 1px black;
  background-color: yellow;
`;

export const App = Vue.defineComponent({
  template: `
    <div class="${myCss}">
      ES Modules & TypeScript & goober<br>
      component
    </div>`,
});
