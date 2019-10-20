<template>
  <el-dialog
    title="新增角色"
    :visible.sync="relateRolesDialogVisible"
    :before-close="relateRolesDialogClose"
    width="800px"
  >
    <div>
      <el-form ref="form" :model="rolesForm" label-width="80px">
        <el-form-item label="角色：">
          <el-checkbox-group v-model="rolesForm.roles">
            <el-checkbox
              v-for="(roleInfo, index) in roleInfos"
              :key="index"
              :label="roleInfo.role_id"
            >{{ roleInfo.name }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="relateRolesDialogClose">取 消</el-button>
      <el-button type="primary" @click="relateRoles">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getAllRoles, getUserRoles, userRelateRoles } from '@/api/authority/user_manager'
export default {
  name: 'RelateRolesContainer',
  props: ['relateRolesDialogVisible', 'relateRolesDialogClose', 'relateRolesUserId'],
  data() {
    return {
      rolesForm: { roles: [] },
      roleInfos: [
        { name: 'SuperAdmin', role_id: 'c98fee8a-f253-11e9-8037-26c090f2019a' },
        { name: 'User', role_id: 'c98fee8a-f253-11e9-8037-26c090f2019b' }
      ]
    }
  },
  methods: {
    relateRoles() {
      userRelateRoles({ user_id: this.relateRolesUserId, role_ids: this.rolesForm.roles }).then(res => {
        this.$message({
          message: res.msg,
          type: 'success'
        })
      }).finally(() => {
        this.relateRolesDialogClose()
      })
    }
  },
  mounted() {
    getAllRoles().then(res => {
      this.roleInfos = res.response
    })
    getUserRoles({ user_id: this.relateRolesUserId }).then(res => {
      this.rolesForm.roles = res.response
    })
  }
}
</script>

<style scoped>

</style>
