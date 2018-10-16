<template>
  <div class="column-img">
    <div ref="editor" class="editor_panel" editor-panel>
      <div v-for="(section, index) in model" :key="index" class="white_box">
        <div class="close">
          <i class="fas fa-times modal-close-button" v-on:click="removeList(index)"></i>
        </div>
        <div class="align">
          <div class="radios">
            <div class="radio">
              <label>
                <input v-model="section.align" type="radio" v-bind:name="`align-${hash}-${index}`" value="left">
                  <div class="inner">
                    左
                  </div>
              </label>
            </div>
            <div class="radio">
              <label>
                <input v-model="section.align" type="radio" v-bind:name="`align-${hash}-${index}`" value="right">
                  <div class="inner">
                    右
                  </div>
              </label>
            </div>
          </div>
        </div>
        <div class="section_edit" v-bind:class="section.align">
          <div class="img">
            <img v-if="section.thumbnail" v-bind:src="section.thumbnail" v-bind:alt="section.name">
            <img v-if="!section.thumbnail" src="/assets/img/pic01.jpg" alt="dummy">
          </div>
          <div class="text_field">
            <input v-model="section.title" type="text" placeholder="タイトル">
            <textarea v-if="section" type="text" rows="5" v-model="section.description" placeholder="テキスト"></textarea>
          </div>
        </div>
        <div class="text_field">
          <input v-model="section.link" type="text" placeholder="リンク先 例)http://example.com">
        </div>
      </div>

      <div class="ta_center">
        <button v-on:click="addList">カラムを追加する</button>
      </div>
    </div>


    <div ref="view" theme-retrospect>
      <section class="wrapper style1">
        <div class="inner">
          <article v-for="(section, index) in model" :key="index" class="feature" v-bind:class="section.align">
            <span class="image"><img src="/assets/img/pic01.jpg" alt="" /></span>
            <div class="content">
              <h2>{{ section.title }}</h2>
              <p>{{ section.description }}</p>
              <ul class="actions">
                <li>
                  <a v-bind:href="section.link" class="button alt">More</a>
                </li>
              </ul>
            </div>
          </article>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import BaseParts from "@components/base-parts";

interface columnImg{
  title:string
  description:string
  thumbnail:string
  align:"left"|"right"
  link: string
}

@Component
export default class App extends BaseParts {
  model: columnImg[] = [{
    title: '',
    description: '',
    thumbnail: '',
    align: 'right',
    link: ''
  }];
  select_index: number = 0;

  addList(){
    this.model.push({
      title: '',
      description: '',
      thumbnail: '',
      align: 'right',
      link: ''
    });
  }

  removeList(index: number){
    this.model.splice(index, 1);
  }
}
</script>

<style lang="scss">

.column-img {
  .white_box {
    .close {
      text-align: right;
      padding-bottom: 10px;
    }
  
    .align i.fas {
      float: right;
    }

    .align {
      padding-bottom: 10px;

      .radios {
        display: flex;
        .radio {
          flex-grow: 1;
          text-align: center;
          .inner {
            padding: 10px;
            background: #f7f7f7;
          }

          input:checked + .inner {
            color: #fff;
            background: #51BAA4;
          }
        }
      }

      select {
        padding: 10px 25px;
      }
    }
  }
  
  .section_edit {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    & > div {
      flex: 1;
    }
  
    &.right {
      float: none !important;
      flex-direction: row-reverse;
    }

    &.left {
      float: none !important;
    }
  
    .img {
      max-width: 350px;
      text-align: center;
      padding: 15px;
      img {
        width: 100%;
      }
      input {
        width: 150px;
      }
    }

  }
  
}

</style>
