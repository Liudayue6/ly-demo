<template>
    <div class="user-message">
        <div class="title">{{ $route.query.title }}</div>
        <!-- 表单 -->
        <div class="myForm">
            <span class="text">基本信息</span>
            <div class="form">
                <el-form label-position="top" :model="form" :rules="rules" ref="form">
                    <el-form-item label="用户姓名" prop="userName">
                        <el-input placeholder="请输入真实姓名，最多30个字" v-model="form.userName"></el-input>
                    </el-form-item>
                    <el-form-item label="人员编号" prop="number">
                        <el-input placeholder="请输入人员编号，7-20位，须含字母、符号" v-model="form.number"></el-input>
                    </el-form-item>
                    <div class="line"></div>
                    <div class="white"></div>
                    <span class="text account">账号信息</span>
                    <el-form-item label="账号名称" prop="nickName">
                        <el-input placeholder="请输入账号名称，最多30个字" v-model="form.nickName"></el-input>
                    </el-form-item>
                    <el-form-item label="账号角色" prop="role">
                        <el-select placeholder="请选择账号角色，可多选" v-model="form.role" multiple>
                            <el-option label="中心管理员" value="center"></el-option>
                            <el-option label="综合管理员" value="overall"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="账号所属" prop="belong">
                        <el-cascader :options="options" :props="{ checkStrictly: true }" clearable v-model="form.belong"
                            placeholder="请选择账号所属，支持选任意一级"></el-cascader>
                    </el-form-item>
                    <el-form-item label="初始密码" prop="password">
                        <el-input type="password" placeholder="请输入初始密码，6-20位，须含字母、数字、符号" v-model="form.password"
                            show-password></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <!-- 按钮区域 -->
        <div class="button">
            <el-button size="small" @click="cancel">取消</el-button>
            <el-button type="primary" size="small" @click="submit('form')">提交</el-button>
        </div>
    </div>
</template>

<script>
import tableData from '../../../mock/tableData.js';
export default {
    data() {
        return {
            tableData,
            form: {
                userName: '',
                number: '',
                nickName: '',
                role: [],
                belong: [],
                passwword: ''
            },
            rules: {
                userName: [{ required: true, message: '用户姓名不能为空', trigger: 'blur' },
                { max: 30, message: '用户姓名不超过30个字', trigger: 'blur' }],
                number: [{ required: true, message: '人员编号不能为空', trigger: 'blur' },
                { pattern: /^(?=.*[A-Za-z])(?=.*[@#$%^&+=])[A-Za-z@#$%^&+=]{7,20}$/, message: '请输入正确的人员编号', trigger: 'blur' }],
                nickName: [{ required: true, message: '账号名称不能为空', trigger: 'blur' },
                { max: 30, message: '账号名称不超过30个字', trigger: 'blur' }],
                role: [{ required: true, message: '账号角色不能为空', trigger: 'blur' }],
                belong: [{ required: true, message: '账号所属不能为空', trigger: 'blur' }],
                password: [{ required: true, message: '初始密码不能为空', trigger: 'blur' },
                { pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=.])[A-Za-z\d@#$%^&+=.]{6,20}$/, message: '请输入正确的密码格式', trigger: 'blur' }]
            },
            options: [{
                value: 'zhongxin',
                label: '中心',
                children: [{
                    value: 'zhan',
                    label: '站',
                    children: [{
                        alue: 'zhan',
                        label: 'gy-2一组',
                    }]
                }, {
                    value: 'hxyzhan',
                    label: 'hxy站',
                }, {
                    value: 'gyzhan',
                    label: 'gy站',
                }]
            }],
            validForm: false,
        }
    },
    methods: {
        cancel() {
            this.$router.back()
        },
        submit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.validForm = true
                } else {
                    console.log("error submit!!");
                    return false;
                }
            })
            if (this.validForm && this.$route.query.title === "创建用户") {
                this.$message({
                    showClose: true,
                    message: '创建用户账号成功',
                    type: 'success'
                });
            } else if (this.validForm && this.$route.query.title === "编辑用户") {
                this.$message({
                    showClose: true,
                    message: '编辑用户账号成功',
                    type: 'success'
                });
            }
        }
    },
    created() {
        if (this.$route.query.title === "编辑用户") {
            // console.log(tableData);
            // console.log(this.$route.query.id);
            const userData = this.tableData.find(item => item.id == this.$route.query.id)
            // console.log(userData);
            this.form = userData
        }
    }
}
</script>


<style lang="less" scoped>
.user-message {
    background-color: #fff;
    padding: 0 30px 10px;

    .title {
        line-height: 60px;
        font-size: 16px;
        border-bottom: 1px solid #d7d7d7;
    }

    .myForm {
        background-color: #fafbfc;
        margin: 20px 0;
        border: 1px solid #d7d7d7;
        display: flex;
        position: relative;
        padding: 10px 20px;

        /deep/.el-input__inner {
            width: 600px;
        }

        /deep/.el-form-item__label {
            line-height: 20px;
        }

        /deep/.el-form-item {
            margin-bottom: 15px;
        }

        .text {
            font-size: 16px;
            font-weight: 600;
            margin-right: 60px;
        }

        .account {
            position: absolute;
            left: 20px;
        }

        .line {
            position: absolute;
            left: 0;
            right: 0;
            border-bottom: 1px solid #d7d7d7;
        }

        .white {
            height: 10px;
        }
    }

    .button {
        margin: 10px 30px;
    }
}
</style>