<template>
  <div>

    <el-row>
      <el-col :span="6">
        <MyTree :handleNodeClick="handleNodeClick"></MyTree>
      </el-col>
      <el-col :span="18">
        <el-tabs v-model="editableTabsName" type="card" closable>
          <el-tab-pane v-for="(item) in editableTabs" :key="item.name" :label="item.title" :name="item.name">
            <Editor :code="item.code"></Editor>
            <el-row type="flex" justify="end" style="padding:5px">
              <el-button type="primary">保存</el-button>
            </el-row>
          </el-tab-pane>
        </el-tabs>

      </el-col>
    </el-row>
  </div>
</template>


<script>
import Editor from "../components/Editor";
import MyTree from "../components/MyTree";
export default {
  components: {
    Editor,
    MyTree
  },
  data() {
    return {
      rightMenu: {},
      tmDisplay: false,
      editableTabsName: '',
      editableTabs: []
    };
  },
  methods: {
    handleNodeClick(data) {
      for (var tab of this.editableTabs) {
        if (tab.name == data.label) return;
      }

      this.editableTabs.push({
        title: data.label,
        name: data.label,
        code: `const fetch = require('node-fetch');

(async () => {
    const response = await fetch('https://www.baidu.com/');
    const body = await response.text();

    console.log(body);
    console.log(process.env.key)
   
})();`
      })
      this.editableTabsName = data.label;
    }
  }
};
</script>

<style>
.el-tabs__header {
    margin: 0 0 2px; 
}
</style>


