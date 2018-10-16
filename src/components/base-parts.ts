import { Component, Vue } from "vue-property-decorator";
import './base-parts.scss';

@Component({
  props: ["hash", "data", "mode"]
})
export default class BaseParts extends Vue {
  _editor: Element|null = null;;
  _view: Element|null = null;;
  panelMode: "edit"|"view" = "edit";
  model: any;

  constructor() {
    super();
  }

  mounted(): void {
    this.model = this.$props['data'] || this.model;
    this.panelMode = this.$props['mode'] || "edit";

    if (this.$refs['editor']) {
      this._editor = (<Element>this.$refs['editor']);
    } else {
      console.error(`[BaseParts] ref="editor"が設定されていません。必ず設定してください。`);
      return;
    }

    if (this.$refs['view']) {
      this._view = (<Element>this.$refs['view']);
    } else {
      console.error(`[BaseParts] ref="view"が設定されていません。必ず設定してください。`);
      return;
    }

    if (this.panelMode === 'edit') {
      this._view.classList.add('hide');
    } else if (this.panelMode === 'view') {
      const parent = this._editor.parentNode;
      parent? parent.removeChild(this._editor) : null;
    }

  }

  /**
   * Build前にやっておきたい作業があるときに使用する
   */
  beforeBuild(){ }

  build(): object {
    this.beforeBuild();
    return this.model;
  }
}