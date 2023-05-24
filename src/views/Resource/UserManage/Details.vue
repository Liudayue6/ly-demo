<template>
    <div class="details">
        <div class="title">
            用户详情
        </div>
        <!-- 面包屑 -->
        <div class="Breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">用户列表</el-breadcrumb-item>
                <el-breadcrumb-item>用户详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!-- 详情区域 -->
        <div class="content">
            <div class="message">
                <div class="simple">
                    <span>基本信息</span>
                    <span style="float: right;margin-left: 20px;">创建时间：{{ message.time }}</span>
                    <span style="float: right;">创建账号：{{ message.account }}</span>
                </div>
                <ul class="more">
                    <li>用户名称：<span>{{ message.userName }}</span></li>
                    <li>账号角色：<span>{{ roleMessage }}</span></li>
                    <li>人员编号：<span>{{ message.number }}</span></li>
                    <li>账号所属：<span>{{ message.role }}</span></li>
                    <li>账号状态：<span>{{ message.status }}</span></li>
                    <li>账号名称：<span>{{ message.nickName }}</span></li>
                </ul>
            </div>
            <!-- 分割线 -->
            <el-divider></el-divider>
            <!-- 按钮区域 -->
            <div class="button">
                <el-button size="medium" @click="goBack">返回</el-button>
                <el-button type="primary" size="medium">编辑</el-button>
                <el-button type="warning" size="medium">禁用</el-button>
                <el-button type="primary" size="medium">下载密钥</el-button>
                <el-button type="danger" size="medium">删除</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            message: {},
        }
    },
    computed: {
        roleMessage() {
            return this.message.role.join('、')
        }
    },
    created() {
        this.message = this.$route.query.message
    },
    methods:{
        /* 返回操作 */
        goBack(){
            this.$router.back()
        },
        /* 编辑操作 */
        // edit() {
        //     this.$router.push({
        //         path:'/edit-user'
        //     })
        // }
    }
}
</script>


<style lang="less" scoped>
.title {
    line-height: 80px;
    background-color: #fff;
    font-size: 16px;
    padding-left: 30px;
}

.Breadcrumb {
    margin: 20px 30px;
}

.content {
    height: 500px;
    background-color: #fff;
    border-radius: 4px;
    padding: 30px;

    .message {
        height: 300px;
        border: 1px solid #e9e9e9;
        margin-bottom: 30px;
        border-radius: 4px;

        .simple {
            line-height: 60px;
            padding: 0 20px;
            background-color: #f9f9fc;
            color: #5A5B5F;
        }

        .more {
            padding: 30px 20px;
            color: #909199;
            display: flex;
            flex-wrap: wrap;

            li {
                width: 50%;
                line-height: 55px;

                span {
                    color: #5A5B5F;
                    margin-left: 20px;
                }
            }
        }
    }

    .button {
        margin-top: 30px;
    }
}
</style>