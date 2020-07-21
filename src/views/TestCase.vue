<template>
  <div>
    <div id="perTreeMenu" v-if="tmDisplay" class="tree_menu" :style="{...rightMenu}">
      <ul>
        <li><i class="el-icon-tickets"></i> 详情</li>
        <li><i class="el-icon-edit"></i> 编辑</li>
      </ul>
    </div>
    <el-row>
      <el-col :span="6">
        <div class="mytree">
          <el-tree :data="treeData" :props="defaultProps" :expand-on-click-node="false" @node-click="handleNodeClick" @node-contextmenu="rightClick">
            <span class="custom-tree-node" slot-scope="{ node,data }">
              <span>
                <i :class="data.type==0?'el-icon-folder':'el-icon-document'"></i>{{ data.label }}
              </span>
            </span>

          </el-tree>
        </div>
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
export default {
  components: {
    Editor
  },
  data() {
    return {
      rightMenu: {},
      tmDisplay: false,
      treeData: [
        {
          label: "一级 1",
          type: 0,
          children: [
            {
              label: "二级 1-1",
              type: 0,
              children: [
                {
                  label: "三级 1-1-1",
                  type: 1,
                }
              ]
            }
          ]
        },
        {
          label: "一级 2",
          type: 0,
          children: [
            {
              label: "二级 2-1",
              type: 0,
              children: [
                {
                  label: "三级 2-1-1",
                  type: 1,
                }
              ]
            },
            {
              label: "二级 2-2",
              type: 0,
              children: [
                {
                  type: 1,
                  label: "三级 2-2-1"
                }
              ]
            }
          ]
        },
        {
          label: "一级 3",
          type: 0,
          children: [
            {
              label: "二级 3-1",
              type: 0,
              children: [
                {
                  type: 1,
                  label: "三级 3-1-1"
                }
              ]
            },
            {
              label: "二级 3-2",
              children: [
                {
                  type: 1,
                  label: "三级 3-2-1"
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      editableTabsName: '',
      editableTabs: []
    };
  },
  methods: {
    handleSelect() {
      console.log(arguments)
    },
    rightClick(e, data, node, comp) {
      console.log('e:', e, 'data', data)
      this.rightMenu = { top: e.pageY + 'px', left: e.pageX + 'px' }
      this.tmDisplay = true
      const self = this
      document.onclick = function (ev) {
        if (ev.target !== document.getElementById('perTreeMenu')) {
          self.tmDisplay = false
        }
      }

    },
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

<style scoped>
.tree_menu {
  position: fixed;
  display: block;
  z-index: 20000;
  background-color: #fff;
  padding: 5px 0;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.tree_menu ul {
  margin: 0;
  padding: 0;
}

.tree_menu ul li {
  list-style: none;
  margin: 0;
  padding: 0 15px;
  font-size: 14px;
  line-height: 30px;
  cursor: pointer;
}
.tree_menu ul li:hover {
  background-color: #ebeef5;
}
</style>


