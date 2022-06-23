<template>
  <!--工具条-->
  <el-row class="tac">
    <el-col :span="5">
      <el-card class="box-card" style="margin: 5px;">
        <div slot="header" class="clearfix">
          <span
            >接口目录
            <el-button
              type="text"
              class="el-icon-edit"
              style="position:relative;right: 5px;top: -5px;float: right;"
              @click="addFunPage()"
              >添加</el-button
            ></span
          >
        </div>
        <div class="component-item">
          <a-tree
            default-expand-all
            @select="onSelect"
            show-icon
            @rightClick="onRightClick"
            :tree-data="packageInterfaceData"
            :default-selected-keys="['0-0-0']"
          >
            <a-icon slot="switcherIcon" type="down" />
            <a-icon slot="smile" type="home" />
            <a-icon slot="meh" type="folder" />
            <a-icon slot="custom" type="api" />
          </a-tree>
        </div>
      </el-card>
    </el-col>
    <el-col :span="19">
      <el-card class="box-card" style="margin: 5px;">
        <div class="component-item" style="margin:10px;">
          <div style="width: 100%">
            <a-tabs
              v-model="activeKey"
              default-active-key="1"
              @prevClick="callback"
              @nextClick="callback"
              type="editable-card"
              :hideAdd="true"
              @edit="onEdit"
            >
              <a-tab-pane
                v-for="(item, index) in tabs"
                :key="item.callMethodCode"
                :closable="item.closable"
              >
                <template v-if="index === 0">
                  <span slot="tab">
                    <a-icon type="home" />
                    {{ item.title }}
                  </span>
                  <p>
                    软件开发核心工作就是讨论需求，撰写概要设计，然后详细设计，最后写代码，然后测试报告。讨论需求，概要设计，详细设计都是在整理数据存贮方式，输出方式，最后再通过代码去实现，测试验证是否按照我们需求，设计进行的。
                    核心工作简述一下就是整理数据，保存数据，然后输出数据，因为整理有考虑不周全，所有存在需求的不断变更，因为访问人数亿万，保存数据的量亿万，所以需要各种辅助手段保证系统的稳定性和正常使用，MQ队列，Readis，微服务，负载均衡来护航。
                  </p>
                  <p>
                    MyBatis 是支持普通
                    SQL查询，存储过程和高级映射的优秀持久层bai框架。MyBatis
                    消除了几乎所有的JDBC代码和参数的手工设置以及结果集的检索。
                  </p>
                  <p>
                    MyBatis使用简单的 XML或注解用于配置和原始映射，将接口和 Java
                    的POJOs（Plain Ordinary Java Objects，普通的
                    Java对象）映射成数据库中的记录，它能很好的整理数据的存贮方式和输出方式，只需要我们整理好输入实体和输出实体格式即可
                  </p>
                  <p>
                    该功能设计思路就是参照了Mybatis这种实现原理，通过随意提交的JSON对象，按照JSON属性名称进行映射成数据库中可执行的Sql脚本，进行存贮和输出，从而实现前端与数据库的交互。
                  </p>
                </template>
                <template v-else>
                  <span slot="tab">
                    <nx-svg-icon
                      class-name="'apiyun-icon'"
                      icon-class="apiyun"
                      slot="avatar"
                      style=" width: 1em;height: 1em;    color: rgb(16, 142, 233);"
                    />

                    {{ item.title }}
                  </span>
                  <apihelpdetail :apiid="item.id"></apihelpdetail>
                </template>
              </a-tab-pane>
            </a-tabs>
          </div></div
      ></el-card>
    </el-col>
    <zhlDialog
      title="接口编辑"
      ref="apiconfiginfodialog"
      width="1060px"
      class="my-dialog"
    >
      <apiconfigedit
        :apiId="apiId"
        :pageId="pageId"
        @confirm="apiConfigInfoconfirm"
        @close="$refs.apiconfiginfodialog.visible = false"
      ></apiconfigedit>
    </zhlDialog>
    <zhlDialog
      title="类名编辑"
      ref="pagedialog"
      width="360px"
      class="my-dialog"
    >
      <el-form ref="elForm" :model="formData" size="medium" label-width="50px">
        <el-form-item label="类名">
          <a-input
            v-model="formData.pageName"
            placeholder="类名"
            @input="accountInput"
            clearable
            :style="{ width: '100%' }"
          ></a-input>
        </el-form-item>
        <el-form-item label="描述">
          <a-input
            type="textarea"
            v-model="formData.description"
            placeholder="请输入描述"
            :rows="2"
            :style="{ width: '100%' }"
          ></a-input>
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="$refs.pagedialog.visible = false">关闭</el-button>
        </el-form-item>
      </el-form>
    </zhlDialog>

    <v-contextmenu ref="apiMenu">
      <v-contextmenu-item @click="editFunPackageInterface"
        >修改</v-contextmenu-item
      >
      <v-contextmenu-item @click="delFunPackageInterface"
        >删除</v-contextmenu-item
      >
    </v-contextmenu>
    <v-contextmenu ref="pageMenu">
      <v-contextmenu-item @click="editFunPackage">修改</v-contextmenu-item>
      <v-contextmenu-item @click="delFunPackage">删除</v-contextmenu-item>
      <v-contextmenu-item @click="addFunPackageInterface"
        >添加接口</v-contextmenu-item
      >
    </v-contextmenu>
  </el-row>
</template>

<script>
import {
  getPackageInterfaceInfo,
  addPackageInfo,
  delPackageInfo,
  editPackageInfo,
  deleteMappingApiConfig
} from '@/api/packageInterface'
import apihelpdetail from './apihelpdetail.vue'
import apiconfigedit from './apiconfigedit.vue'
import nxSvgIcon from '@/components/nx-svg-icon/index'
export default {
  data() {
    return {
      packageInterfaceData: [],
      apiId: 0,
      pageId: 0,
      formData: { pageName: '', description: '' },
      parentnode: {},
      selectnode: {},
      tabs: [{ title: '首页', id: 0, closable: false, callMethodCode: '0' }],
      activeKey: '0',
      selectcallMethodCode: ''
    }
  },
  components: { apihelpdetail, apiconfigedit, nxSvgIcon },
  methods: {
    onSelect(selectedKeys, info) {
      if (info.node.dataRef.typeName === 'api') {
        let isAdd = true
        for (let i = 0; i < this.tabs.length; i++) {
          if (
            this.tabs[i].callMethodCode === info.node.dataRef.callMethodCode
          ) {
            if (this.tabs.indexOf(info.node.dataRef) < 0) {
              this.tabs.splice(i, 1)
              this.tabs.push(info.node.dataRef)
            }
            this.activeKey = info.node.dataRef.callMethodCode
            isAdd = false
            break
          }
        }
        if (isAdd) {
          this.tabs.push(info.node.dataRef)
          this.activeKey = info.node.dataRef.callMethodCode
        }
      }
    },
    onRightClick({ event, node }) {
      const answer = node._props.dataRef.anwer
      if (answer) {
        this.$refs.pageMenu.hide()
        this.answer = answer
        return
      }
      this.parentnode = null
      if (node.$parent.dataRef !== null && node.$parent.dataRef !== undefined) {
        this.parentnode = node.$parent.dataRef
      }
      this.selectnode = node.dataRef
      console.log(node.dataRef)
      const postition = {
        top: event.y,
        left: event.x
      }
      this.$refs.pageMenu.hide()
      this.$refs.apiMenu.hide()
      switch (this.selectnode.slots.icon) {
        case 'meh':
          this.$refs.pageMenu.show(postition)
          break
        case 'custom':
          this.$refs.apiMenu.show(postition)
          break
        default:
          break
      }
    },
    callback(val) {
      console.log(val)
    },
    addFunPackageInterface() {
      this.pageId = this.selectnode.id
      this.apiId = -1
      this.selectcallMethodCode = ''
      this.$refs.apiconfiginfodialog.visible = true
    },
    editFunPackage() {
      this.formData = this.selectnode
      this.$refs.pagedialog.visible = true
    },
    editFunPackageInterface() {
      this.apiId = this.selectnode.id
      this.pageId = this.selectnode.parentId
      this.selectcallMethodCode = this.selectnode.callMethodCode
      this.$refs.apiconfiginfodialog.visible = true
    },
    updateTabs(id) {
      if (
        this.selectcallMethodCode !== undefined ||
        this.selectcallMethodCode !== ''
      ) {
        this.tabs.forEach(obj => {
          if (obj.callMethodCode === this.selectcallMethodCode) {
            obj.id = id
          }
        })
      }
    },
    apiConfigInfoconfirm(res) {
      this.updateTabs(res.data)
      this.$refs.apiconfiginfodialog.visible = false
      this.loadData()
    },
    delFunPackageInterface() {
      deleteMappingApiConfig(this.selectnode.id).then(res => {
        this.$message.success(res.msg)
        this.loadData()
      })
    },
    delFunPackage() {
      if (this.selectnode.children.length > 0) {
        this.$message.error('请先删除子项！')
        return false
      }
      delPackageInfo(this.selectnode.id).then(res => {
        this.$message.success(res.msg)
        this.loadData()
      })
    },
    loadData() {
      getPackageInterfaceInfo().then(res => {
        const parent = { key: '', children: [] }
        this.recombination(res.data, parent)
        this.packageInterfaceData = parent.children
      })
    },
    onEdit(targetKey, action) {
      if (action === 'remove') {
        for (let i = 0; i < this.tabs.length; i++) {
          if (this.tabs[i].callMethodCode === targetKey) {
            this.tabs.splice(i, 1)
            this.activeKey = '0'
            break
          }
        }
      }
    },
    recombination(treelist, parent) {
      for (let i = 0; i < treelist.length; i++) {
        const itemdata = {
          title: treelist[i].pageName,
          key: parent.key + '-' + treelist[i].fid,
          id: treelist[i].fid,
          parentId: treelist[i].parentId,
          name: treelist[i].pageName,
          pageName: treelist[i].pageName,
          description: treelist[i].description,
          typeName: treelist[i].typeName,
          callMethodCode: treelist[i].callMethodCode,
          slots: {
            icon: 'smile'
          },
          children: []
        }
        switch (treelist[i].typeName) {
          case 'page':
            itemdata.slots.icon = 'meh'
            break
          case 'api':
            itemdata.slots.icon = 'custom'
            break
          default:
            break
        }
        this.recombination(treelist[i].children, itemdata)
        parent.children.push(itemdata)
      }
    },
    addFunPage() {
      this.formData = {}
      this.formData.pageName = ''
      this.formData.description = ''
      this.$refs.pagedialog.visible = true
    },
    submitForm() {
      if (this.formData.pageName === '') {
        this.$message.error('包名不能为空！')
        return
      }
      if (this.formData.fid !== undefined) {
        editPackageInfo(this.formData).then(res => {
          this.$message.success(res.msg)
          this.$refs.pagedialog.visible = false
          this.loadData()
        })
      } else {
        addPackageInfo(this.formData).then(res => {
          console.log(res)
          this.$message.success('保存成功！')
          this.$refs.pagedialog.visible = false
          this.loadData()
        })
      }
    },
    accountInput(e) {
      const valstr = e.target.value
      const codeReg = new RegExp('[A-Za-z]+')
      const len = valstr.length
      let str = ''
      for (let i = 0; i < len; i++) {
        if (codeReg.test(valstr[i])) {
          str = str + valstr[i]
        }
      }
      e.target.value = str
      this.formData.pageName = str
    },
    SaveAs(rowitem) {
      console.log(rowitem)
    }
  },
  mounted() {
    this.loadData()
  }
}
</script>
<style scoped>
.el-card__body {
  padding-top: 5px;
  padding-right: 5px;
  padding-left: 0px;
  padding-bottom: 10px;
}
.el-card__header {
  padding: 10px 15px;
}
</style>

<style lang="less" scoped>
.wrapper {
  display: flex;
  align-content: center;
  height: auto;
  padding-top: 6px;
  background-color: #fff;
  border-bottom: 1px solid #ccc;
  height: 35px;
  span {
    height: 18px;
    line-height: 18px;
    color: #333;
    font-weight: bold;
  }
  .left-block {
    width: 6px;
    height: 18px;
    margin-right: 6px;
    background-color: #409eff !important;
  }
}
</style>
