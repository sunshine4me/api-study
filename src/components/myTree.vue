<template>
  <div>
    <div id="perTreeMenu" v-if="tmDisplay" class="tree_menu" :style="{...rightMenu}">
      <ul>
        <li><i class="el-icon-tickets"></i> 详情</li>
        <li><i class="el-icon-edit"></i> 编辑</li>
      </ul>
    </div>
    <el-tree class="mytree" :data="treeData" :indent='4' :props="defaultProps" :expand-on-click-node="false" @node-click="handleNodeClick" @node-contextmenu="rightClick">
      <span class="custom-tree-node" slot-scope="{ node,data }">
        <span>
          <i :class="data.type==0?'el-icon-folder':'el-icon-document'"></i>{{ data.label }}
        </span>
      </span>

    </el-tree>
  </div>
</template>

<script>

export default {
  name: 'myTree',
  data: {
    rightMenu: {},
    tmDisplay: false,
  },
  props: {
      "handleNodeClick":Function
  },
  mounted() {


  },
  methods: {
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
</style>

