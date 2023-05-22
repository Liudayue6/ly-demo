<template>
    <div class="edit-user">
        <div class="title">编辑用户</div>
        <div class="myForm">
            <!-- 基础信息 -->
            <div class="basic">
                <span class="text">基本信息</span>
                <div class="form1">
                    <el-form label-position="top" :model="basicForm" :rules="basicRules" ref="basicForm">
                        <el-form-item label="用户姓名" prop="userName">
                            <el-input placeholder="请输入真实姓名，最多30个字" style="width: 600px;"
                                v-model="basicForm.userName"></el-input>
                        </el-form-item>
                        <el-form-item label="人员编号" prop="number">
                            <el-input placeholder="请输入人员编号，7-20位，须含字母、符号" style="width: 600px;"
                                v-model="basicForm.number"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <!-- 账号信息 -->
            <div class="account">
                <span class="text">账号信息</span>
                <div class="form2">
                    <el-form label-position="top" :model="accountForm" :rules="accountRules" ref="accountForm">
                        <el-form-item label="账号名称" prop="nickName">
                            <el-input placeholder="请输入账号名称，最多30个字" style="width: 600px;"
                                v-model="accountForm.nickName"></el-input>
                        </el-form-item>
                        <el-form-item label="账号角色" prop="role">
                            <el-select placeholder="请选择账号角色，可多选" style="width: 600px;" v-model="accountForm.role" multiple>
                                <el-option label="中心管理员" value="center"></el-option>
                                <el-option label="综合管理员" value="overall"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="账号所属" prop="belong">
                            <el-cascader :options="options" :props="{ checkStrictly: true }" clearable style="width: 600px;"
                                v-model="accountForm.belong" placeholder="请选择账号所属，支持选任意一级"></el-cascader>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input type="password" placeholder="请输入密码，6-20位，须含字母、数字、符号" style="width: 600px;"
                                v-model="accountForm.password" show-password></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
        <!-- 按钮区域 -->
        <div class="button">
            <el-button size="small" @click="cancel">取消</el-button>
            <el-button type="primary" size="small" @click="submit(['basicForm', 'accountForm'])">提交</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            basicForm: {
                userName: '',
                number: ''
            },
            basicRules: {
                userName: [{ required: true, message: '用户姓名不能为空', trigger: 'blur' },
                { max: 30, message: '用户姓名不超过30个字', trigger: 'blur' }],
                number: [{ required: true, message: '人员编号不能为空', trigger: 'blur' },
                { pattern: /^(?=.*[A-Za-z])(?=.*[@#$%^&+=])[A-Za-z@#$%^&+=]{7,20}$/, message: '请输入正确的人员编号', trigger: 'blur' }]
            },
            accountForm: {
                nickName: '',
                role: [],
                belong: [],
                passwword: ''
            },
            accountRules: {
                nickName: [{ required: true, message: '账号名称不能为空', trigger: 'blur' },
                { max: 30, message: '账号名称不超过30个字', trigger: 'blur' }],
                role: [{ required: true, message: '账号角色不能为空', trigger: 'blur' }],
                belong: [{ required: true, message: '账号所属不能为空', trigger: 'blur' }],
                password: [{ pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=.])[A-Za-z\d@#$%^&+=.]{6,20}$/, message: '请输入正确的密码格式', trigger: 'blur' }]
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
            validForm1: false,
            validForm2: false,
        }
    },
    methods: {
        cancel() {
            this.$router.back()
        },
        submit(formName) {
            this.$refs[formName[0]].validate((valid) => {
                if (valid) {
                    this.validForm1 = true
                } else {
                    console.log("error submit!!");
                    return false;
                }
            })
            this.$refs[formName[1]].validate((valid) => {
                if (valid) {
                    this.validForm2 = true
                } else {
                    console.log("error submit!!");
                    return false;
                }
            })
            if (this.validForm1 && this.validForm2) {
                this.$message({
                    showClose: true,
                    message: '编辑用户账号成功',
                    type: 'success'
                });
            }
        }
    },
    created() {
        this.basicForm = this.$route.query.rowData
        this.accountForm = this.$route.query.rowData
        console.log(this.basicForm);
    }
}
</script>


<style lang="less" scoped>
.edit-user {
    width: 1220px;
    height: 680px;
    margin: 0 auto;
    margin-top: 90px;
    background-color: #fff;

    .title {
        line-height: 60px;
        font-size: 16px;
        margin: 0 30px;
        border-bottom: 1px solid #d7d7d7;
    }

    .myForm {
        background-color: #fafbfc;
        width: 1160px;
        height: 536px;
        margin: 0 auto;
        margin-top: 20px;
        border: 1px solid #d7d7d7;

        /deep/.el-form-item__label {
            line-height: 20px;
        }

        /deep/.el-form-item {
            margin-bottom: 15px;
        }

        .basic {
            display: flex;
            height: 160px;
            border-bottom: 1px solid #d7d7d7;
            padding: 10px 20px;

            .text {
                font-size: 16px;
                font-weight: 600;
                margin-right: 60px;
            }
        }

        .account {
            display: flex;
            padding: 10px 20px;

            .text {
                font-size: 16px;
                font-weight: 600;
                margin-right: 60px;
            }
        }
    }

    .button {
        margin-left: 30px;
        margin-top: 16px;
    }
}
</style>