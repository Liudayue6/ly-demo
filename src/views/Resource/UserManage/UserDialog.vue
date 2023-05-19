<template>
    <div class="remove-user-dialog">
        <el-dialog :title="title" :visible.sync="dialogFormVisible" style="margin-top: 150px;">
            <span>确定要对所选中的用户账号操作<span :style="{ color: fontColor }">{{ '[' + title + ']' }}</span>吗?</span>
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
    },
    methods: {
        ensure() {
            this.dialogFormVisible = false
            if (this.title === '删除') {
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
            } else {
                this.$message({
                    showClose: true,
                    message: '批量删除用户账号成功',
                    type: 'success'
                });
            }
        }
    }
}
</script>


<style lang="less" scoped></style>