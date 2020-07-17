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
    msg: String
  },
  mounted() {

    const monacoInstance = monaco.editor.create(
      this.$refs.monaco,
      {
        theme: "vs-dark",
        value: `const fetch = require('node-fetch');

(async () => {
    const response = await fetch('https://www.baidu.com/');
    const body = await response.text();

    console.log(body);
    console.log(process.env.key)
   
})();`,
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
