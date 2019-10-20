<template>
  <div>
    <el-dialog
      title="详细信息"
      :visible.sync="editDialogVisible"
      :before-close="dialogClose"
      width="800px"
    >
      <el-form ref="editForm" :inline="true" :model="menuInfo" :rules="rules" class="demo-form-inline">
        <el-row :gutter="20">
          <el-col :span="6" :offset="2">
            <el-form-item label="菜单ID" prop="menu_id">
              <el-input v-model="menuInfo.menu_id" disabled placeholder="菜单ID"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="菜单路径" prop="path">
              <el-input v-model="menuInfo.path" placeholder="菜单路径"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="模板名称" prop="component">
              <el-input v-model="menuInfo.component" placeholder="模板名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6" :offset="2">
            <el-form-item label="跳转路径">
              <el-input v-model="menuInfo.redirect" placeholder="跳转路径"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="隐藏菜单" prop="hidden">
              <el-select v-model="menuInfo.hidden" placeholder="菜单是否隐藏">
                <el-option
                  v-for="item in hiddenValues"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="菜单名称" prop="name">
              <el-input v-model="menuInfo.name" placeholder="菜单名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6" :offset="2">
            <el-form-item label="页面title" prop="meta.title">
              <el-input v-model="menuInfo.meta.title" placeholder="页面title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="图标" prop="meta.icon">
              <el-input v-model="menuInfo.meta.icon" placeholder="图标"></el-input>
            </el-form-item>
          </el-col>
          <!--<el-col :span="6">
            <el-form-item label="父级菜单ID">
              <el-input v-model="editMenuInfo.parent_id" disabled placeholder="父级菜单ID"></el-input>
            </el-form-item>
          </el-col>-->
          <el-col :span="6">
            <el-form-item label="菜单顺序" prop="order">
              <el-input v-model="menuInfo.order" type="number" placeholder="菜单顺序"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6" :offset="2">
            <el-form-item label="菜单级别" prop="depth">
              <el-input v-model="menuInfo.depth" type="number" placeholder="菜单级别" @change="checkDepthAndParentName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="父级菜单名称" prop="parent_name">
              <el-select
                v-model="menuInfo.parent_name"
                placeholder="父级菜单名称"
                :disabled="parentNameDisable"
                @change="setParentId"
              >
                <el-option
                  v-for="(parentNameOption, index) in parentNameOptions"
                  :key="index"
                  :label="parentNameOption.name"
                  :value="parentNameOption.menu_id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogClose">取 消</el-button>
        <el-button type="primary" @click="editMenu">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getDepthMenus, editMenu } from '@/api/authority/menu_manager'
export default {
  name: 'EditDataInfo',
  data() {
    const checkDepth = (rule, value, callback) => {
      if (!value || value <= 0) {
        callback(new Error('菜单级别不能为空或小于0！'))
      }
      callback()
    }
    const checkOrder = (rule, value, callback) => {
      if (!value || value <= 0) {
        callback(new Error('菜单顺序不能为空或小于0！'))
      }
      callback()
    }
    return {
      hiddenValues: [{
        value: true,
        label: '是'
      }, {
        value: false,
        label: '否'
      }],
      parentNameOptions: [],
      editParentName: this.menuInfo.parent_id,
      parentNameDisable: true,
      rules: {
        menu_id: [{ required: true, trigger: 'blur', message: '菜单ID不能为空！' }],
        path: [{ required: true, trigger: 'blur', message: '菜单路径不能为空！' }],
        component: [{ required: true, trigger: 'blur', message: '模板名称不能为空！' }],
        hidden: [{ required: true, trigger: 'blur', message: '隐藏菜单选项不能为空！' }],
        name: [{ required: true, trigger: 'blur', message: '菜单名称不能为空！' }],
        'meta.title': [{ required: true, trigger: 'blur', message: '页面title不能为空！' }],
        'meta.icon': [{ required: true, trigger: 'blur', message: '图标不能为空！' }],
        depth: [
          { required: true, validator: checkDepth, trigger: 'blur' }
        ],
        order: [
          { required: true, validator: checkOrder, trigger: 'blur' }
        ],
        parent_name: []
      }
    }
  },
  props: ['editDialogVisible', 'menuInfo', 'dialogClose', 'queryClick'],
  methods: {
    checkDepthAndParentName() {
      if (this.menuInfo.depth && this.menuInfo.depth > 1) {
        getDepthMenus({ depth: this.menuInfo.depth }).then((res) => {
          const { response } = res
          this.parentNameOptions = response.filter((item) => {
            return item.menu_id !== this.menuInfo.menu_id
          })
        })
        this.parentNameDisable = false
        this.rules.parent_name.push({ required: true, trigger: 'blur', message: '父级菜单名称不能为空！' })
      } else {
        this.parentNameDisable = true
        this.rules.parent_name = []
        this.menuInfo.parent_name = null
      }
    },
    editMenu() {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          const req_dict = {}
          for (const key in this.menuInfo) {
            if (this.menuInfo[key] != null) {
              req_dict[key] = (this.menuInfo[key].constructor === String) ? this.menuInfo[key].trim() : this.menuInfo[key]
            }
          }
          req_dict.depth = parseInt(req_dict.depth)
          req_dict.order = parseInt(req_dict.order)
          req_dict.parent_name = this.editParentName
          editMenu(req_dict).then(res => {
            this.$message({
              message: res.msg,
              type: 'success'
            })
            this.dialogClose()
            this.queryClick()
          })
        }
      })
    },
    setParentId() {
      this.editParentName = this.menuInfo.parent_name
    }
  },
  mounted() {
    this.checkDepthAndParentName()
  }
}
</script>

<style scoped>

</style>
