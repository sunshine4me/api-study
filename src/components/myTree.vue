<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" label-width="120px" :model="createForm" ref="createForm">
        <el-form-item label="名称" prop="name">
          <el-input autocomplete="off" v-model="createForm.name"></el-input>
        </el-form-item>
        <el-form-item label="类型" v-if="dialogTypeVisible" prop="type">
          <el-select placeholder="请选类型" v-model="createForm.type">
            <el-option label="nodejs" value="1"></el-option>
            <el-option label="python" value="2"></el-option>
            <el-option label="java" value="3"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onCreate">确 定</el-button>
      </div>
    </el-dialog>

    <div id="perTreeMenu" v-if="tmDisplay" class="tree_menu" :style="{...rightMenu}">
      <ul>
        <li @click="createFolder"><i class="el-icon-folder-add"></i> 新建文件夹</li>
        <li @click="createScript"><i class="el-icon-document-add"></i> 新建代码</li>
      </ul>
    </div>
    <el-tree class="mytree" :data="treeData" :expand-on-click-node="false" @node-click="handleNodeClick" @node-contextmenu="rightClick">
      <span class="custom-tree-node" slot-scope="{ node,data }">
        <span>
          <i :class="data.type==0?'el-icon-folder':'el-icon-document'"></i>{{ data.label }}
        </span>
      </span>

    </el-tree>
  </div>
</template>

<script>
import { testCase } from "../utils/api";
export default {
  name: 'myTree',
  data() {
    return {
      treeData: [{
        id: null,
        label: "我的用例",
        type: 0,
      }],
      rightMenu: {},
      tmDisplay: false,
      dialogFormVisible: false,
      dialogTypeVisible: false,
      title: "新建文件夹",
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择类型', trigger: 'change' }
        ]
      },
      createForm: {
        name: "",
        type: ""
      }
    }
  },
  props: {
    "handleNodeClick": Function,
  },
  mounted() {
    testCase.getRoots().then(data => {
      for (var c of data) {
        this.treeData[0].push({
          id: c.id,
          label: c.name,
          icon: c.type == 1 ? "el-icon-document" : "el-icon-folder",
        })
      }
    })

  },
  methods: {
    createFolder() {
      this.dialogFormVisible = true
      this.dialogTypeVisible = false
      this.title = "新建文件夹"
    },
    createScript() {
      this.dialogFormVisible = true
      this.dialogTypeVisible = true
      this.title = "新建代码"
    },
    onCreate() {
      this.$refs["createForm"].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          return false;
        }
      });

    },
    rightClick(e, data, node, comp) {
      this.rightMenu = { top: e.pageY + 'px', left: e.pageX + 'px' }
      this.tmDisplay = true
      const self = this
      document.onclick = function (ev) {
        if (ev.target !== document.getElementById('perTreeMenu')) {
          self.tmDisplay = false
        }
      }

    },
  }
}
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

.el-input,
.el-select {
  width: 300px;
}
</style>

