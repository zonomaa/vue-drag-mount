<template>
  <div class="parts_editor" v-bind:class="{ active: !isPreview }">
    <div class="editor">
      <div class="inner">
        <draggable ref="compos" v-model="useParts" :options="{group:'parts', handle: '.my-handle', animation: 150}" @update="onUpdate" @start="dEvn(true)" @end="dEvn(false)">
          <div class="comp" v-for="comp in useParts" :key="comp.hash">
            <div class="my-handle">
              <span>::</span>
              <span class="name">{{ comp.name }}</span>
            </div>
            <div class="content">
              <component  v-bind:is="comp.component" :hash="comp.hash"></component>
            </div>
          </div>
        </draggable>
      </div>
    </div>

    <div class="list">
        <div class="inner">
            <parts-list-component></parts-list-component>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

import eventHub from '../ts/eventHub';
import draggable from 'vuedraggable';
import * as parts from '../components/parts/module';
import PartsListComponent from 'components/parts-list.vue';

@Component({
  components: { 
    draggable,
    PartsListComponent,
    ...parts.module
  }
})
export default class App extends Vue {
  isPreview: boolean = false;
  useComponent: string = 'TitleComponent'
  text: string = '';
  type: string = 'h1';
  useParts: any[] = [];
  constructor() {
    super();
  }

  mounted() {
    this.useParts.push({
      hash: 1,
      component: 'RetrospectColumnImgComponent',
      name: 'カラム画像'
    });

    eventHub.$on('view-mode', (mode: 'preview'|'editor') => {
      this.build();
      this.isPreview = mode === 'preview'? true: false;
    })
  }

  onUpdate(){
    this.build();
  }

  dEvn(flag: boolean){
    eventHub.$emit('trash-mode', flag)
  }

  build(){
    let result: any[] = [];
    // パーツのコンポーネントからビルドしたHTMLを取得する
    const compos: any = this.$refs.compos;
    let comp_builds: any = {};
    compos.$children.forEach((comp: any) => {
      comp_builds[comp.hash] = comp.build();
    });

    // 並び順どおりに書き出す
    this.useParts.forEach(parts => {
      result.push({
        component: parts.component,
        model: comp_builds[parts.hash]
      })
    })

    eventHub.$emit('change-view', result)

  }

}
</script>

<style lang="scss">

.parts_editor {
  display: none;

  &.active {
    display: block;
  }
  
  & > div {
    flex-grow: 1;
  }

  .editor {
    padding: 20px;
    padding-right: calc(25% + 20px);
    
    .inner > div {
      padding: 10px;
    }
    & > div {
      border: 1px solid #d2d2d2;
      border-radius: 10px;
      padding: 20px;
    }
    .comp {
      display: flex;
      justify-content: center;
      & > * {
        padding: 10px;
      }
      border: 1px solid #eee;
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0px;
      }

      .my-handle {
        position: relative;
        width: 5%;
        text-align: center;
        cursor: move;
        cursor: -webkit-grabbing;
        background: #eee;
        color: #ababab;

        .name {
          position: absolute;
          top: 40%;
          left: 35%;
          right: 35%;
          writing-mode: vertical-rl;
          letter-spacing: 3px;
        }
      }

      .content {
        width: 95%;
        background: #fbfbfb;
      }
    }

    li.sortable-chosen {
      font-size: 12px;
      color: #737373;
      list-style: none;
      text-align: center;
      background: #f5f5f5;
      border: 1px solid #eee;
      padding: 10px;
      margin-bottom: 10px;
    }
  }

  .list {
    position: fixed;
    top: 0;
    right: 0;
    max-width: 25%;
    background: #f9f9f9;
    .inner {
      padding: 20px;
    }
  }

}

</style>
