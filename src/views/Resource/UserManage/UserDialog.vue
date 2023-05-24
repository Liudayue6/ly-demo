<template>
    <div class="user-dialog">
        <el-dialog :title="title" :visible.sync="dialogFormVisible" style="margin-top: 150px;">
            <el-form :model="form" :rules="formRules" label-width="100px" v-if="title === '添加组织' || title === '编辑组织'">
                <el-form-item label="组织名称" prop="name">
                    <el-input v-model="form.name" placeholder="请输入组织名称，最多30个字"></el-input>
                </el-form-item>
            </el-form>
            <span v-else><span>{{ text }}</span><span :style="{ color: fontColor }">{{ '[' + title + ']' }}</span>吗?</span>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="ensure">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialogFormVisible: false,
            form: {
                name: ''
            },
            formRules: {
                name: [{ required: true, message: '组织名称不能为空', trigger: 'blur' },
                { max: 30, message: '组织名称不超过30个字', trigger: 'blur' }],
            }
        }
    },
    props: {
        title: {
            type: String,
            default: "删除",
        },
        fontColor: {
            type: String,
            default: "red",
        },
        text: {
            type: String,
            default: "",
        }
    },
    methods: {
        ensure() {
            this.dialogFormVisible = false
            if (this.text === "此组织及其下方组织和人员将一并删除，确定要操作") {
                this.$message({
                    showClose: true,
                    message: '删除组织成功',
                    type: 'success'
                });
            } else if (this.title === '删除') {
                this.$message({
                    showClose: true,
                    message: '删除用户账号成功',
                    type: 'success'
                });
            } else if (this.title === '启用') {
                this.$message({
                    showClose: true,
                    message: '启用用户账号成功',
                    type: 'success'
                });
            } else if (this.title === '禁用') {
                this.$message({
                    showClose: true,
                    message: '禁用用户账号成功',
                    type: 'success'
                });
            } else if (this.title === '批量启用') {
                this.$message({
                    showClose: true,
                    message: '批量启用用户账号成功',
                    type: 'success'
                });
            } else if (this.title === '批量禁用') {
                this.$message({
                    showClose: true,
                    message: '批量禁用用户账号成功',
                    type: 'success'
                });
            } else if (this.title === '批量删除') {
                this.$message({
                    showClose: true,
                    message: '批量删除用户账号成功',
                    type: 'success'
                });
            } else if (this.title === "添加组织") {
                this.$message({
                    showClose: true,
                    message: '添加组织成功',
                    type: 'success'
                });
            } else {
                this.$message({
                    showClose: true,
                    message: '编辑组织成功',
                    type: 'success'
                });
            }
        }
    }
}
</script>


<style lang="less" scoped>
/deep/.el-dialog {
    width: 30%;
    border-radius: 3px;
}

// /deep/.el-dialog__body {
//     padding: 30px 30px 30px 0;
// }

.el-input {
    width: 75%;
    margin-left: 30px;
}
</style>