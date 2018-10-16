<template>
  <div class="banner">
    <div ref="editor" class="main_area" editor-panel>
      <div class="flex_center_field">
        <div class="img">
          <img v-if="model.bg" v-bind:src="model.bg" v-bind:alt="model.name" >
          <img v-if="!model.bg" src="/assets/img/banner.jpg" alt="dummy">
        </div>
        <div class="text_field">
          <input v-model="model.title" type="text" placeholder="タイトル">
          <textarea type="text" rows="5" v-model="model.description" placeholder="テキスト"></textarea>
        </div>
      </div>
      <div class="text_field">
        <input v-model="model.link" type="text" placeholder="リンク先 例)http://example.com">
      </div>
    </div>


    <div ref="view">
      <div theme-retrospect>
        <section id="banner" style="background-image: url(/assets/img/overlay.png), url(/assets/img/banner.jpg);">
          <h2>{{ model.title }}</h2>
          <p>{{ model.description }}</p>
          <ul class="actions">
            <li>
              <a v-bind:href="model.link" class="button big special">Learn More</a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BaseParts from "@components/base-parts";

interface main{
  title:string
  description:string
  bg:string
  link: string
}

@Component
export default class App extends BaseParts {
  model: main = {
    title: '',
    description: '',
    bg: '',
    link: ''
  };
}
</script>

<style lang="scss">

.banner {
  .flex_center_field {
    .img {
      max-width: 350px;
      text-align: center;
      padding: 15px 15px 10px 0;
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
