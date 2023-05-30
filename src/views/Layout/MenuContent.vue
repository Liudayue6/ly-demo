<template>
    <div>
        <template v-for="(item, index) in menuList">
            <el-submenu index="/" v-if="item.children && item.children.length > 0">
                <template slot="title">
                    <i :class="item.icon"></i>
                    <span>{{ item.title }}</span>
                </template>
                <el-menu-item-group>
                    <MenuItem :menuList="item.children">
                    </MenuItem>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item :index="item.name" :route="{ path: item.path }" v-else>
                <i :class="item.icon"></i>
                <span slot="title">{{ item.title }}</span>
            </el-menu-item>
        </template>
    </div>
</template>


<script>
export default {
    name: 'MenuItem',
    props: {
        menuList: {
            type: Array,
            default: () => []
        }
    },
    // created() {
    //     console.log('hhh', menuList);
    // }
}
</script>


<style lang="less" scoped>
.el-menu {
    border-right: 0;

    .is-active {
        background: #0F352D !important;
        color: #fff !important;
    }
}

/deep/.el-submenu .el-menu-item span{
    margin-left: 20px;
}
</style>
