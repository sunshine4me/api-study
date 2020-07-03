<template>
  <div style="padding:20px">
    <div id="monaco" style="height:400px"></div>
    <button v-on:click="run">运行</button>
    <pre>{{log}}</pre>
  </div>
</template>


<script>
import * as monaco from "monaco-editor/esm/vs/editor/editor.api.js";
export default {
  methods: {
    run() {
      this.log = "执行中......";
      var code = this.monacoInstance.getValue();
      fetch("/home", {
        method: "POST", // or 'PUT'
        body: JSON.stringify({ code }), // data can be `string` or {object}!
        headers: new Headers({
          "Content-Type": "application/json"
        })
      })
        .then(response => {
          return response.text();
        })
        .catch(error => {
          this.log = error + "";
        })
        .then(response => {
          this.log = response;
        });
    }
  },
  mounted() {
    console.log(111);
    const monacoInstance = monaco.editor.create(
      document.getElementById("monaco"),
      {
        theme: "vs-dark",
        value: `const fetch = require('node-fetch');

(async () => {
    const response = await fetch('https://www.baidu.com/');
    const body = await response.text();

    console.log(body);

   
})();`,
        language: "javascript"
      }
    );

    monaco.languages.registerCompletionItemProvider("javascript", {
      triggerCharacters: ["."], // 写触发提示的字符，可以有多个
      provideCompletionItems: function(model, position) {
        const lineContent = model.getLineContent(position.lineNumber);
        var word = lineContent.substr(lineContent.length - 4, 4);

        if (word == "res.") {
          return {
            suggestions: [
              {
                label: "asdadad",
                kind: monaco.languages.CompletionItemKind.Function,
                documentation: "cesishisjsj",
                insertText: "asdadad"
              }
            ]
          };
        } else {
          return {};
        }
      }
    });
    window.monacoInstance = monacoInstance;
    this.monacoInstance = monacoInstance;
    // monacoInstance.dispose(); //使用完成销毁实例
  },
  data() {
    return {
      log: ""
    };
  }
};
</script>

<style scoped>
pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>