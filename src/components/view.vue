<template>
  <div v-if="isView" class="view-component">
      <component v-for="(comp, index) in useParts" :key="index" v-bind:is="comp.component" :data="comp.model" :mode="'view'"></component>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import eventHub from '../ts/eventHub';
import * as parts from '../components/parts/module';

@Component({
  props: ['parts'],
  components: {
    ...parts.module
  }
})
export default class App extends Vue {
  useParts: any[] = [];
  isView: boolean = true;
  constructor() {
    super();
  }

  mounted() {
    this.useParts = this.$props['parts'] || this.useParts;
    console.log(this.useParts);

    eventHub.$on('change-view', this.build);
    eventHub.$on('view-mode', (mode: 'preview'|'editor') => {
      this.isView = mode === 'preview'? true: false;
    })
  }

  build(useParts: any[]){
    this.useParts = useParts;
  }

}
</script>

<style lang="scss">

</style>
