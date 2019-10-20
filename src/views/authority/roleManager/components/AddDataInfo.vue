<template>
  <div>
    <el-dialog
      title="新增角色"
      :visible.sync="addDialogVisible"
      :before-close="addDialogClose"
      width="800px"
    >
      <el-form
        :model="newRoleData"
        label-width="150"
        :rules="rules"
        ref="addRoleForm"
      >
        <el-row>
          <el-col :span="20" :offset="2">
            <el-form-item label="角色名称" prop="name">
              <el-input v-model="newRoleData.name" placeholder="角色名称"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20" :offset="2">
            <el-form-item label="角色描述" prop="desc">
              <el-input type="textarea" v-model="newRoleData.desc" :rows="3"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogClose">取 消</el-button>
        <el-button type="primary" @click="addNewRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addRole } from '@/api/authority/role_manager'
export default {
  name: 'AddDataInfo',
  props: ['addDialogVisible', 'addDialogClose', 'queryClick'],
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
    addNewRole() {
      this.$refs.addRoleForm.validate(valid => {
        if (valid) {
          const req_dict = {
            name: this.newRoleData.name.trim(),
            desc: this.newRoleData.desc
          }
          addRole(req_dict).then((res) => {
            this.$message({
              type: 'success',
              message: res.msg
            })
            this.addDialogClose()
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
