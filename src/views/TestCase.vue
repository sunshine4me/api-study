<template>
  <div>
    <el-row>
      <el-col :span="6">
        <el-tree :data="data" :props="defaultProps" :expand-on-click-node="false" @node-click="handleNodeClick"></el-tree>
      </el-col>
      <el-col :span="18">
        <el-tabs v-model="editableTabsName" type="card" closable>
          <el-tab-pane v-for="(item) in editableTabs" :key="item.name" :label="item.title" :name="item.name">
            <Editor></Editor>
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
      data: [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1"
                }
              ]
            }
          ]
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1"
                }
              ]
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1"
                }
              ]
            }
          ]
        },
        {
          label: "一级 3",
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1"
                }
              ]
            },
            {
              label: "二级 3-2",
              children: [
                {
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
    handleNodeClick(data) {
      for (var tab of this.editableTabs) {
        if (tab.name == data.label) return;
      }

      this.editableTabs.push({
        title: data.label,
        name: data.label,
      })
      this.editableTabsName = data.label;
    }
  }
};
</script>

<style>
.el-tabs__header {
    margin: 2px;
}
</style>