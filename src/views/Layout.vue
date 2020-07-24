<template>
  <div class="myHeader">

    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="6">
        <h2></h2>
      </el-col>

      <el-menu class="el-menu-demo" mode="horizontal" menu-trigger="click">
        <el-menu-item index="1">处理中心</el-menu-item>
        <el-submenu index="2">
          <template slot="title">我的工作台</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="3" disabled>消息中心</el-menu-item>
        <el-submenu index="4" popper-class="aaa">
          <template slot="title">{{user.email}}</template>
          <el-menu-item index="4-1">登出</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-row>

    <router-view></router-view>

  </div>

</template>

<script>

export default {
  data() {
    return {
      user: {
        id: 0,
        name: ""
      }
    }
  },
  mounted() {
    this.user = this.$route.params.user
  }
};
</script>

<style>
.myHeader .el-menu.el-menu--horizontal {
  border-bottom: 0px;
}

.aaa .el-menu--popup {
  margin-left: 50px;
  min-width: 100px;
}
</style>
