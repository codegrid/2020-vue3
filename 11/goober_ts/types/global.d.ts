import vue from "vue";
import goober from "goober";

declare global {
  declare const Vue: typeof vue;
  declare const goober: typeof goober;
}
