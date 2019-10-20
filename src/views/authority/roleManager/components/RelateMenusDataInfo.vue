<template>
  <div>
    <el-dialog
      title="绑定菜单"
      :visible.sync="relateMenusDialogVisible"
      :before-close="closeRelateMenus"
      width="600px"
    >
      <el-tree
        :loading="menuTreeLoading"
        :data="menuTreeData"
        :props="defaultProps"
        ref="menuTree"
        show-checkbox
        default-expand-all
        :default-checked-keys="relatedMenuIds"
        node-key="menu_id"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeRelateMenus">取 消</el-button>
        <el-button type="primary" @click="relateMenus">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getMenuListTree, roleRelateMenus, getRelatedMenuIds } from '@/api/authority/role_manager'

export default {
  name: 'RelateMenusDataInfo',
  props: ['relateMenusDialogVisible', 'relateRoleId', 'closeRelateMenus'],
  data() {
    return {
      menuTreeData: [],
      relatedMenuIds: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      menuTreeLoading: false
    }
  },
  methods: {
    relateMenus() {
      const half_checked = this.$refs.menuTree.getHalfCheckedKeys()
      const checked = this.$refs.menuTree.getCheckedKeys()
      const menu_keys = checked.concat(half_checked)
      const menu_leaf_keys = this.$refs.menuTree.getCheckedKeys(true)
      roleRelateMenus({ role_id: this.relateRoleId, menu_ids: menu_keys, menu_leaf_keys: menu_leaf_keys }).then(res => {
        this.$message({
          type: 'success',
          message: res.msg
        })
      }).finally(() => {
        this.closeRelateMenus()
      })
    }
  },
  mounted() {
    this.menuTreeLoading = true
    getMenuListTree().then(res => {
      this.menuTreeData = res.response
      getRelatedMenuIds({ 'role_id': this.relateRoleId }).then(res => {
        this.relatedMenuIds = res.response
      }).finally(() => {
        this.menuTreeLoading = false
      })
    }).finally(() => {
      this.menuTreeLoading = false
    })
  }
}
</script>

<style scoped>

</style>
