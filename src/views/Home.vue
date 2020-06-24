<template>
  <div style="padding:20px">
    <div id="monaco" style="height:300px"></div>
  </div>
</template>


<script>
import * as monaco from "monaco-editor/esm/vs/editor/editor.api.js";
export default {
  methods: {
    handleClick(row) {
      console.log(row);
    }
  },
  mounted() {
    console.log(111);
    const monacoInstance = monaco.editor.create(
      document.getElementById("monaco"),
      {
        value: JSON.stringify({ a: "asdads" }),
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
    // monacoInstance.dispose(); //使用完成销毁实例
  },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1519 弄",
          zip: 200333
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333
        }
      ]
    };
  }
};
</script>

<style scoped>
.el-table td,
.el-table th {
  padding: 2px 0;
}
</style>