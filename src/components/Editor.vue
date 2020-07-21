<template>
  <div>
    <div ref="monaco" style="height:450px"></div>
  </div>
</template>

<script>
import * as monaco from "monaco-editor/esm/vs/editor/editor.api.js";
export default {
  name: 'Editor',
  props: {
    code: String
  },
  mounted() {

    const monacoInstance = monaco.editor.create(
      this.$refs.monaco,
      {
        theme: "vs-dark",
        value: this.code,
        language: "javascript"
      }
    );

    this.monacoInstance = monacoInstance;
    // monacoInstance.dispose(); //使用完成销毁实例
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
