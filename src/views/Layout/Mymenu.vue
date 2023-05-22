<template>
  <div class="my-menu">
    <!-- 菜单栏收缩按钮 -->
    <div class="control">
      <el-button type="primary" size="mini" @click="changeMenu">
        <i v-if="!isCollapse" class="icon el-icon-s-fold"></i>
        <i v-else class="icon el-icon-s-unfold"></i>
      </el-button>
    </div>
    <!-- 菜单栏 -->
    <el-menu :default-active="$route.path" class="el-menu-vertical-demo" background-color="#285450" text-color="#fff" router :collapse="isCollapse">
      <el-submenu index="/">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>资源管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/user-manage">
            <span slot="title" style="margin-left:20px;">用户管理</span>
          </el-menu-item>
          <el-menu-item index="/que-manage">
            <span slot="title" style="margin-left:20px;">试题管理</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/train">
        <i class="el-icon-menu"></i>
        <span slot="title">实训管理</span>
      </el-menu-item>
      <el-menu-item index="/plan">
        <i class="el-icon-document"></i>
        <span slot="title">训练计划管理</span>
      </el-menu-item>
      <el-menu-item index="/synthesis">
        <i class="el-icon-setting"></i>
        <span slot="title">综合管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: ["isCollapse"],
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    changeMenu() {
      //点击切换按钮的时候 修改父组件的数据   isCollapse
      this.$emit("changeCollapse");
    }
  }
};
</script>

<style lang='less' scoped>
.my-menu{
  position: relative;
}
  .control {
    position: absolute;
    right: 10px;
    top: 15px;
    z-index: 999;
    cursor: pointer;

    .el-button--mini{
      padding: 5px 10px;
    }

    .icon {
      font-size: 22px;
    }
  }

  .el-menu {
    border-right: 0;

    .is-active {
      background: #0F352D !important;
      color: #fff !important;
    }
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }
</style>