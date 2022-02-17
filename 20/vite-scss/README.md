# Scoped CSS + SCSS を利用したプロジェクト

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
# プロジェクト名にvite-scssを指定
# vueを選択

cd vite-scss
npm i
npm install -D sass
```

## 実装コード

以下、[`components/CounterPanel.vue`](https://github.com/codegrid/2020-vue3/blob/main/20/vite-scss/src/components/CounterPanel.vue)内のスタイルの記述が示すように、`<style lang="scss" scoped>`と記述することで、スタイルの適用をコンポーネント内に限定しつつ、`scss`記法の利用が可能になります。

```
<style lang="scss" scoped>
@import "../Button";

button {
  @include Button;
}
input[type='number'] {
  padding: 0;
  box-sizing: border-box;
  width: 80px;
  height: 50px;
  font-size: 20px;
  font-family: 'Arial';
  text-align: right;
}
</style>
```
