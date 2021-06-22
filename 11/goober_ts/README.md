# goober と TypeScript を用いた Vue アプリケーション

このディレクトリには、goober と TypeScript を用い実装した Vue アプリケーションのサンプルコードが置いてあります。

## インストール

最初に開発環境を整えます。
Node.js がインストールされた状態で、次のコマンドをターミナルから実行しモジュールのインストールを行います。

```
npm ci
```

## TypeScript によるコードのコンパイル

ソースコードは`./src`配下にある`*.ts`形式の TypeScript ベースのコードです。
このコードのコンパイルは、ターミナルから次のコマンドで行います。

```
npx tsc
```

コンパイルされたコードは`./scripts`に、`*.js`形式で出力され、この処置を前提に`index.html`からは、`./scripts/main.js`を読み込んでいます。

尚、コンパイル結果の出力先は [https://github.com/codegrid/2020-vue3/blob/main/11/goober_ts/tsconfig.json#L18](https://github.com/codegrid/2020-vue3/blob/main/11/goober_ts/tsconfig.json#L18) にて設定しています。

## アプリケーションの実行

このディレクトリがルートになるように HTTP サーバを起動し、ブラウザの URL から`index.html`にアクセスしてください。

VS Code を使っている場合は、[LiveServer](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) という拡張機能を導入すると、`index.html`ファイルを右クリックし「Open with Live Server」を選択すると HTTP サーバが起動できます。

## goober と Vue の読み込み

前提として、goober と Vue はグローバルに展開されるコードを [CDN から直接読み込んでいる](https://github.com/codegrid/2020-vue3/blob/main/11/goober_ts/index.html#L9-L10)構成になります。

一方で、次のように`package.json`では、npm モジュールとしてもインストールされる設定になっています。

```
"devDependencies": {
  "goober": "^2.0.38",
  "typescript": "^4.3.4",
  "vue": "^3.1.2"
}
```

これらは`./types/global.d.ts`にて次のようにアンビエント宣言することで、TypeScript 上で型推論を効かせるために行っています。

```
import vue from "vue";
import goober from "goober";

declare global {
  declare const Vue: typeof vue;
  declare const goober: typeof goober;
}
```
