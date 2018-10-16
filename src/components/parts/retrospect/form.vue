<template>
  <div class="form">
    <div ref="editor" class="text_field" editor-panel>
      <input v-model="model.title" type="text" placeholder="タイトル">
      <textarea type="text" rows="5" v-model="model.description" placeholder="テキスト"></textarea>
    </div>

    <div ref="view">
      <div theme-retrospect>
        <section class="wrapper style2 special">
          <div class="inner">
            <h2>{{ model.title }}</h2>
            <p>{{ model.description }}</p>
            <form action="#" method="POST">
              <div class="container 75%">
                <div class="row uniform 50%">
                  <div class="6u 12$xsmall">
                    <input name="name" placeholder="Name" type="text" />
                  </div>
                  <div class="6$ 12$xsmall">
                    <input name="email" placeholder="Email" type="email" />
                  </div>
                  <div class="12$">
                    <textarea name="message" placeholder="Message" rows="4"></textarea>
                  </div>
                </div>
              </div>
              <ul class="actions">
                <li><input type="submit" class="special" value="Submit" v-on:click="submit"/></li>
              </ul>
            </form>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import BaseParts from "@components/base-parts";

interface form {
  title: string;
  description: string;
  link: string;
}

@Component
export default class App extends BaseParts {
  model: form = {
    title: "",
    description: "",
    link: ""
  };

  submit() {
    console.log("submit");
  }
}
</script>

<style lang="scss">
.\31 2,
.\31 2\24 {
  width: 100%;
  clear: none;
  margin-left: 0;
}
.\36,
.\36 \24 {
  width: 50%;
  clear: none;
  margin-left: 0;
}

</style>
