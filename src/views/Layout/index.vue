<template>
<div class="layout">
    <!-- 头部导航区域 -->
    <Head></Head>
    <!-- 主体区域 -->
    <div class="mainBody">
        <!-- 左侧导航区域 -->
        <MyMenu class="menu" :isCollapse='isCollapse' @changeCollapse='changeCollapse'/>
        <!-- 右侧内容区域 -->
        <Content class="content" :class="{isActive:isCollapse}"/>
    </div>
</div>
</template>

<script>
import Head from "./head.vue";
import MyMenu from './Mymenu.vue'
import Content from './Content.vue'
export default {
    components:{
        Head,
        MyMenu,
        Content
    },
    data(){
        return {
            isCollapse:false,
        }
    },
    methods:{
        changeCollapse(){
            this.isCollapse = !this.isCollapse;
        }
    }
}
</script>

<style lang='less' scoped>
.layout{
    .menu{
        // width: 200px;
        // min-height: 500px;
        background: #285450;
        position: fixed;
        top:65px;
        bottom:0;
    }
    .content{
        margin-top: 65px;
        margin-left: 200px;
        transition: all 0.3s;
    }
    .isActive{
        margin-left: 64px;
    }
}

</style>