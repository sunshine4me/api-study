<template>
  <div style="padding:20px">
    <select style="margin:5px;">
      <optgroup label="接口测试">
        <option selected>Method</option>
        <option>header设置</option>
        <option>验证</option>
      </optgroup>
      <optgroup label="变量">
        <option>变量</option>
        <option>环境变量</option>
      </optgroup>
    </select>
    <div id="monaco" style="height:400px"></div>
    <div style="margin:5px;">
      <span>环境变量：</span>
      <textarea rows="3" cols="50" placeholder="key=value" v-model="env"></textarea>
    </div>
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

      var env = this.env.replace("\r", "").split("\n");
      fetch("/home", {
        method: "POST", // or 'PUT'
        body: JSON.stringify({ code: code, env: env }), // data can be `string` or {object}!
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
    console.log(process.env.key)
   
})();`,
        language: "javascript"
      }
    );

    //注册提示信息
    // monaco.languages.registerCompletionItemProvider("javascript", {
    //   triggerCharacters: ["."], // 写触发提示的字符，可以有多个
    //   provideCompletionItems: function(model, position) {
    //     const lineContent = model.getLineContent(position.lineNumber);
    //     var word = lineContent.substr(lineContent.length - 4, 4);

    //     if (word == "res.") {
    //       return {
    //         suggestions: [
    //           {
    //             label: "asdadad",
    //             kind: monaco.languages.CompletionItemKind.Function,
    //             documentation: "cesishisjsj",
    //             insertText: "asdadad"
    //           }
    //         ]
    //       };
    //     } else {
    //       return {};
    //     }
    //   }
    // });

    window.monacoInstance = monacoInstance;
    this.monacoInstance = monacoInstance;
    // monacoInstance.dispose(); //使用完成销毁实例
  },
  data() {
    return {
      log: "",
      env: ""
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