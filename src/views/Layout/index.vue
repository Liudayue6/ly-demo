<template>
    <div class="layout">
        <!-- 头部导航区域 -->
        <div class="head">
            <div class="head-left">
                <div class="image"></div>
                <div class="title">云存储平台</div>
            </div>
        </div>
        <div class="mainBody">
            <!-- 左侧导航区域 -->
            <MyMenu class="menu" :isCollapse="isCollapse" @changeCollapse='changeCollapse' />
            <!-- 右侧内容区域 -->
            <div class="content" :class="{ isActive: isCollapse }">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
import MyMenu from './Mymenu.vue'
export default {
    components: {
        MyMenu
    },
    data() {
        return {
            isCollapse: false,
        }
    },
    methods: {
        changeCollapse() {
            this.isCollapse = !this.isCollapse;
        }
    }
}
</script>

<style lang='less' scoped>

.layout {
    width: 100%;
    .head {
        position: fixed;
        z-index: 999;
        left: 0;
        right: 0;
        line-height: 8vh;
        background-color: #2A4C45;

        .head-left {
            display: flex;
            color: #FFFFFF;
            align-items: center;
            margin-left: 30px;
            font-size: 18px;

            .image {
                width: 27px;
                height: 27px;
                background-color: #fff;
                margin-right: 10px;
            }
        }
    }

    .mainBody {
        width: 100%;
        height: 92vh;
        padding-top: 8vh;

        .menu {
            background: #285450;
            padding-top: 50px;
            position: fixed;
            top: 8vh;
            bottom: 0;
            z-index: 999;
        }

        .content {
            width: calc(100% - 280px);
            margin: 30px 40px;
            transition: all 0.3s;
            padding-left: 200px;
        }

        .isActive {
            margin: 30px 100px;
            padding-left: 64px;
        }
    }
}</style>