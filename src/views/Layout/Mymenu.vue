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
    <el-menu :default-active="$route.meta.name" class="el-menu-vertical-demo" background-color="#285450" text-color="#fff"
      router :collapse="isCollapse">
      <MenuContent :menuList="$store.state.menuData"></MenuContent>
    </el-menu>
  </div>
</template>

<script>
import MenuContent from './MenuContent.vue'
export default {
  components: {
    MenuContent
  },
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    changeMenu() {
      //点击切换按钮的时候 修改父组件的数据   isCollapse
      this.$emit("changeCollapse");
    }
  },
  // created(){
  //   console.log(this.$store.state.menuData);
  // }
};
</script>

<style lang='less' scoped>
.my-menu {
  position: relative;
}

.control {
  position: absolute;
  right: 10px;
  top: 15px;
  z-index: 999;
  cursor: pointer;

  .el-button--mini {
    padding: 5px 10px;
  }

  .icon {
    font-size: 22px;
  }
}


.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style>