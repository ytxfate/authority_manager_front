<template>
  <div>
    <el-dialog
      title="新增角色"
      :visible.sync="editDialogVisible"
      :before-close="editDialogClose"
      width="800px"
    >
      <el-form
        :model="roleInfo"
        label-width="150"
        :rules="rules"
        ref="addRoleForm"
      >
        <el-row>
          <el-col :span="20" :offset="2">
            <el-form-item label="角色名称" prop="name">
              <el-input v-model="roleInfo.name" placeholder="角色名称"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20" :offset="2">
            <el-form-item label="角色描述" prop="desc">
              <el-input type="textarea" v-model="roleInfo.desc" :rows="3"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogClose">取 消</el-button>
        <el-button type="primary" @click="editRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { editRole } from '@/api/authority/role_manager'
export default {
  name: 'EditDataInfo',
  props: ['editDialogVisible', 'editDialogClose', 'queryClick', 'roleInfo'],
  data() {
    return {
      newRoleData: {
        name: '',
        desc: ''
      },
      rules: {
        name: [{ required: true, trigger: 'blur', message: '角色名称不能为空！' }],
        desc: [{ required: true, trigger: 'blur', message: '角色描述不能为空！' }]
      }
    }
  },
  methods: {
    editRole() {
      this.$refs.addRoleForm.validate(valid => {
        if (valid) {
          const req_dict = {
            role_id: this.roleInfo.role_id,
            name: this.roleInfo.name.trim(),
            desc: this.roleInfo.desc
          }
          editRole(req_dict).then((res) => {
            this.$message({
              type: 'success',
              message: res.msg
            })
            this.editDialogClose()
            this.queryClick()
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
