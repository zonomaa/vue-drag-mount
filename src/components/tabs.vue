<template>
  <div class="tabs">
      <div class="tab">
        <label>
          <input type="radio" v-model="mode" name="tab" value="editor" v-on:change="modeChanged">
          <div class="inner">
            Editor
          </div>
        </label>
      </div>
      <div class="tab">
        <label>
          <input type="radio" v-model="mode" name="tab" value="preview" v-on:change="modeChanged">
          <div class="inner">
            Preview
          </div>
        </label>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import eventHub from '../ts/eventHub';

@Component
export default class App extends Vue {
  mode: 'preview'|'editor' = 'editor';
  constructor() {
    super();
  }

  modeChanged(){
    eventHub.$emit('view-mode', this.mode)
  }

}
</script>

<style lang="scss">
.tabs {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  border-top: 1px solid #eee;

  .tab {
    flex-grow: 1;
    text-align: center;
    font-size: 18px;
    cursor: pointer;

    label {
      width: 100%;
      margin-bottom: 0px;
    }

    .inner {
      padding: 15px 10px;
      background: #fbfbfb;
      color: #3a3a3a;
    }

    input:checked + .inner {
      background: #219470;
      color: #fff;
    }
    
    input {
      display: none;
    }

    &:first-child {
      border-right: 1px solid #eee;
    }
  }
}
</style>
