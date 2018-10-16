<template>
  <div class="parts-list">
      <ul>
        <draggable v-model="partsList" :options="{group:'parts', sort: false}" @start="drag=true" @add="addEvent" @remove="removeEvent">
          <li v-for="(element, index) in partsList" :key="index">
            <div class="sample">
              <img v-bind:src="element.sample" v-bind:alt="element.name">
            </div>
            {{ element.name }}
          </li>
        </draggable>
      </ul>
      <div class="trash" v-if="trash">
        <i class="fas fa-trash-alt"></i>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import eventHub from '../ts/eventHub';
import draggable from 'vuedraggable';

@Component({
  components: { draggable }
})
export default class App extends Vue {
  bkParts: any[];
  trash: boolean = false;
  partsList: any[] = [
    {
      component: 'RetrospectBannerComponent',
      name: 'バナー',
      sample: '/assets/img/sample/main.png'
    },
    {
      component: 'RetrospectColumnImgComponent',
      name: 'カラム画像',
      sample: '/assets/img/sample/column-img.png'
    },
    {
      component: 'RetrospectFormComponent',
      name: 'フォーム',
      sample: '/assets/img/sample/form.png'
    },
  ];

  constructor() {
    super();
    this.bkParts = this.partsList;

    // ソート衝突防止用にDateTimeでHashを生成する
    this.partsList.forEach((parts, index) => {
      parts['hash'] = new Date().getTime() + index;
      this.partsList[index] = parts;
    });
  }

  mounted() {
    eventHub.$on('trash-mode', this.trashMode)
  }

  trashMode(show: boolean){
    this.trash = show;
  }

  removeEvent(env: any){
    if(env && env.oldIndex >= 0){
      // 参照渡しをさせない
      let target = this.notReference(this.bkParts[env.oldIndex]);
      target['hash'] = new Date().getTime();
      this.partsList.splice(env.oldIndex, 0, target)
    }
  }

  addEvent(env: any){
    if(env && env.newIndex >= 0){
      this.partsList.splice(env.newIndex, 1);
    }
  }

  /**
   * 参照渡し対策
   * @param val: any
   */
  notReference(val: any){
    return JSON.parse(JSON.stringify(val))
  }

}
</script>

<style lang="scss">
.parts-list {
  position: relative;
  ul li {
    font-size: 12px;
    color: #737373;
    background: #fff;
    border: 1px solid #eee;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 10px;
    text-align: center;
    box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.15);

    .sample {
      padding: 15px;
      img {
        width: 100%;
      }
    }

  }

  .trash {
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 40%;
    background: #fff;
    border: 1px solid #eee;
    border-style: dashed;
    border-radius: 10px;
    font-size: 30px;
    color: #717171;
    text-align: center;
  }
}
</style>
