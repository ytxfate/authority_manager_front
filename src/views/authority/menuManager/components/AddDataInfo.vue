<template>
  <div>
    <el-dialog
      title="新增菜单"
      :visible.sync="addDialogVisible"
      :before-close="closeAddDialog"
      width="800px"
    >
      <el-form
        :inline="true"
        :model="newMenuData"
        class="demo-form-inline"
        label-width="150"
        :rules="rules"
        ref="addMenuForm"
      >
        <el-row :gutter="20">
          <el-col :span="6" :offset="2">
            <el-form-item label="菜单路径" prop="path">
              <el-input v-model="newMenuData.path" placeholder="菜单路径" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="模板名称" prop="component">
              <el-input v-model="newMenuData.component" placeholder="模板名称" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="跳转路径">
              <el-input v-model="newMenuData.redirect" placeholder="跳转路径" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6" :offset="2">
            <el-form-item label="菜单名称" prop="name">
              <el-input v-model="newMenuData.name" placeholder="菜单名称" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="页面title" prop="title">
              <el-input v-model="newMenuData.title" placeholder="页面title" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="图标" prop="icon">
              <el-input v-model="newMenuData.icon" placeholder="图标" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6" :offset="2">
            <el-form-item label="菜单顺序" prop="order">
              <el-input v-model="newMenuData.order" type="number" placeholder="菜单顺序" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="菜单级别" prop="depth">
              <el-input
                v-model="newMenuData.depth"
                type="number"
                placeholder="菜单级别"
                @change="checkDepthAndParentName"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="父级菜单名称" prop="parent_name">
              <el-select v-model="newMenuData.parent_name" placeholder="父级菜单名称" :disabled="parentNameDisable">
                <el-option
                  v-for="(parentNameOption, index) in parentNameOptions"
                  :key="index"
                  :label="parentNameOption.name"
                  :value="parentNameOption.menu_id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6" :offset="2">
            <el-form-item label="隐藏菜单" prop="hidden">
              <el-select v-model="newMenuData.hidden" placeholder="菜单是否隐藏">
                <el-option
                  v-for="item in hiddenValues"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeAddDialog">取 消</el-button>
        <el-button type="primary" @click="addNewMenu">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addMenu, getDepthMenus } from '@/api/authority/menu_manager'

export default {
  name: 'AddDataInfo',
  props: ['addDialogVisible', 'closeAddDialog', 'queryClick'],
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
      newMenuData: {
        order: 1,
        depth: 1
      },
      parentNameDisable: true,
      parentNameOptions: [],
      rules: {
        path: [{ required: true, trigger: 'blur', message: '菜单路径不能为空！' }],
        component: [{ required: true, trigger: 'blur', message: '模板名称不能为空！' }],
        name: [{ required: true, trigger: 'blur', message: '菜单名称不能为空！' }],
        hidden: [{ required: true, trigger: 'blur', message: '隐藏菜单选项不能为空！' }],
        title: [{ required: true, trigger: 'blur', message: '页面title不能为空！' }],
        icon: [{ required: true, trigger: 'blur', message: '图标不能为空！' }],
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
  methods: {
    addNewMenu() {
      this.$refs.addMenuForm.validate((valid) => {
        if (valid) {
          const req_dict = {}
          for (const key in this.newMenuData) {
            req_dict[key] = (this.newMenuData[key].constructor === String) ? this.newMenuData[key].trim() : this.newMenuData[key]
          }
          if (JSON.stringify(req_dict) !== '{}') {
            if (req_dict.title || req_dict.icon) {
              req_dict.meta = {}
              if (req_dict.title) {
                req_dict.meta.title = req_dict.title
                delete req_dict.title
              }
              if (req_dict.icon) {
                req_dict.meta.icon = req_dict.icon
                delete req_dict.icon
              }
            }
            req_dict.depth = parseInt(req_dict.depth)
            req_dict.order = parseInt(req_dict.order)
            addMenu(req_dict).then(() => {
              this.closeAddDialog()
              this.newMenuData = { order: 1, depth: 1 }
              this.queryClick()
            }).catch(error => {
              console.log(error)
            })
          } else {
            this.$message({
              message: '数据不完整',
              type: 'warning'
            })
          }
        }
      })
    },
    checkDepthAndParentName() {
      if (this.newMenuData.depth && this.newMenuData.depth > 1) {
        getDepthMenus({ depth: this.newMenuData.depth }).then((res) => {
          const { response } = res
          this.parentNameOptions = response
        })
        this.parentNameDisable = false
        this.rules.parent_name.push({ required: true, trigger: 'blur', message: '父级菜单名称不能为空！' })
      } else {
        this.parentNameDisable = true
        this.rules.parent_name = []
      }
    }
  }
}
</script>

<style scoped>

</style>
