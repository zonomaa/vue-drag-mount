// 共通スタイルをインポート
import 'scss/common.scss';
// indexスタイルをインポート
import 'scss/index.scss';
// Font Awesome
import 'assets/css/all.css';
// theme retrospectをインポート
import 'components/parts/retrospect/sass/main.scss';

// vueをインポート
import Vue from "vue";
// vue componentをインポート
import PartsEditorComponent from 'components/parts-editor.vue';
import TabsComponent from 'components/tabs.vue';
import ViewComponent from 'components/view.vue';

new Vue({
  el: "#parts-editor-component",
  template: `<parts-editor-component />`,
  components: {
    PartsEditorComponent
  },
});

new Vue({
  el: "#view-component",
  components: {
    ViewComponent
  },
});

new Vue({
  el: "#tabs-component",
  components: {
    TabsComponent
  },
});