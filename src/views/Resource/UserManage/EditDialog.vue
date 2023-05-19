<template>
    <div class="edit-dialog">
        <el-dialog title="编辑组织" :visible.sync="dialogFormVisible" style="margin-top: 150px;">
            <el-form :model="form" :rules="formRules" label-width="100px">
                <el-form-item label="组织名称" prop="name">
                    <el-input v-model="form.name" placeholder="请输入组织名称，最多30个字"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
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
    methods: {
        confirm() {
            this.dialogFormVisible = false
            this.$message({
                showClose: true,
                message: '编辑组织成功',
                type: 'success'
            });
        }
    }
}
</script>


<style lang="less" scoped></style>