<template>
    <div class="login">
        <el-form class="login-form" :model="loginForm" :rules="loginRules" auto-complete="on" label-position="left"
            ref="loginForm">
            <h3 class="title">
                云存储平台登录系统
            </h3>
            <el-form-item prop="account">
                <el-input type="text" placeholder="请输入账号" v-model="loginForm.account" auto-complete="on" clearable>
                    <i class="el-icon-user-solid icon" slot="prefix"></i>
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" placeholder="请输入密码" v-model="loginForm.password" auto-complete="on" show-password
                    clearable>
                    <i class="el-icon-lock icon" slot="prefix"></i>
                </el-input>
            </el-form-item>
            <el-button class="loginBtn" type="primary" style="width:100%" @click="loginBtn('loginForm')">登录</el-button>
        </el-form>
    </div>
</template>

<script>
import menuData from '../../mock/menu'
export default {
    data() {
        return {
            loginForm: {
                account: "",
                password: ""
            },
            loginRules: {
                account: [{ required: true, trigger: 'blur', message: '请输入账号' },
                { max: 30, message: '账号名称不超过30个字', trigger: 'blur' }],
                password: [{ required: true, trigger: 'blur', message: '请输入密码' }]
            },
            menuData
        }
    },
    methods: {
        loginBtn(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let { account, password } = this.loginForm;
                    let obj = {
                        user: account
                    }
                    this.$store.commit('setUser', obj)
                    this.$store.commit('setMenu', this.menuData)
                    // localStorage.setItem('user', JSON.stringify(obj))
                    this.$router.push('/')
                }
            })
        }
    }
};
</script>


<style lang="less" scoped>
.login {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: #2a4c45;

    .login-form {
        position: relative;
        width: 520px;
        max-width: 100%;
        padding: 160px 35px 0;
        margin: 0 auto;
        overflow: hidden;

        .title {
            font-size: 32px;
            color: #fff;
            text-align: center;
            margin-bottom: 40px;
        }

        .icon {
            color: #889aa4;
            font-size: 22px;
            padding-left: 10px;
            padding-top: 8px;
        }

        /deep/.el-input__inner {
            padding-left: 50px;
        }
    }

}
</style>