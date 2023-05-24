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
        display: flex;
        height: 92vh;

        .menu {
            background: #285450;
            padding-top: 50px;
        }

        .content {
            width: calc(100% - 280px);
            margin: 30px 40px;
            transition: all 0.3s;
        }

        .isActive {
            margin: 30px 100px;
        }
    }
}</style>