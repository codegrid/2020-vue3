# TypeScript + TSX + goober を利用したプロジェクト

## 動作確認方法

以下コマンド入力後、`http://localhost:3000/`にアクセスすることで動作確認可能です。

```
npm i
npm run dev
```

## 環境構築手順

本プロジェクトは、以下手順で環境構築しています。

```bash
npm create vite@latest
# プロジェクト名にvite-tsxを指定
# vue + typescriptを選択

cd vite-tsx
npm i
npm i -D @vitejs/plugin-vue-jsx
npm i -D goober
```

`vite.config.ts`の内容を以下に変更。

```ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
    }),
  ],
});
```

## 実装コード

以下、[`App.tsx`](https://github.com/codegrid/2020-vue3/blob/main/20/vite-tsx/src/App.tsx)のように、`setup`による初期化機能を持った構造で、返却値を TSX を使ったレンダリング関数にすることで、メモ化を要さない React + TSX のような実装が可能になります。

```ts
import { defineComponent, ref } from 'vue';
import { CounterPanel } from './components/CounterPanel';
import { ButtonClassName } from './ButtonClassName';
import { css } from 'goober';

const AppClassName = css`
  padding: 20px;
  text-align: center;
  font-size: 30px;
`;

export const App = defineComponent({
  setup() {
    const initialCount = 0;
    const count = ref(initialCount);
    const up = () => count.value++;
    const down = () => count.value--;
    const change = (changedCount: number) => (count.value = changedCount);
    const clear = () => (count.value = initialCount);
    return () => (
      <div class={AppClassName}>
        <CounterPanel initialCount={count.value} up={up} down={down} change={change} />
        <hr />
        <button class={ButtonClassName} onClick={clear}>
          clear
        </button>
      </div>
    );
  },
});
```
