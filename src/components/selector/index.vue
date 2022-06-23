<template>
  <div>
    <div class="filter-search">
      <div class="filter-flex">
        <div class="filter-search-border">
          <span style="margin-right:10px;cursor: pointer;" @click="returnfun()">
            <nx-svg-icon
              class-name="return-icon"
              icon-class="return"
              slot="avatar"
              style=" width: 25px;height:25px;    color: dimgray;"
          /></span>
          <a-input-search
            placeholder="请输入搜索词"
            enter-button="搜索"
            size="large"
            v-model="searchwordkey"
            @search="onSearch"
            @keydown="onSearch"
            @keyup="onKeyup"
            class="inputsearch"
          >
            <a-icon slot="prefix" type="user" /> ></a-input-search
          >
        </div>
      </div>
    </div>
    <el-row class="filtermain">
      <a-list item-layout="horizontal" :data-source="data">
        <div style="display:none">{{ data }}</div>
        <div class="ant-empty" v-if="data.length === 0">
          <div class="ant-empty-image">
            <svg
              width="184"
              height="152"
              viewBox="0 0 184 152"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="none" fillRule="evenodd">
                <g transform="translate(24 31.67)">
                  <ellipse
                    fillOpacity=".8"
                    fill="#F5F5F7"
                    cx="67.797"
                    cy="106.89"
                    rx="67.797"
                    ry="12.668"
                  ></ellipse>
                  <path
                    d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
                    fill="#AEB8C2"
                  ></path>
                  <path
                    d="M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z"
                    fill="url(#linearGradient-1)"
                    transform="translate(13.56)"
                  ></path>
                  <path
                    d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
                    fill="#F5F5F7"
                  ></path>
                  <path
                    d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
                    fill="#DCE0E6"
                  ></path>
                </g>
                <path
                  d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
                  fill="#DCE0E6"
                ></path>
                <g transform="translate(149.65 15.383)" fill="#FFF">
                  <ellipse
                    cx="20.654"
                    cy="3.167"
                    rx="2.849"
                    ry="2.815"
                  ></ellipse>
                  <path
                    d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z"
                  ></path>
                </g>
              </g>
            </svg>
          </div>
          <p class="ant-empty-description">暂无数据</p>
        </div>
        <a-list-item
          slot="renderItem"
          slot-scope="item"
          @click="selected(item)"
        >
          <template v-if="item.isDept < 3 - typemode">
            <a-list-item-meta :description="item.description">
              <a slot="title" @click.stop="loadData(item.no)">
                {{ item.Name }}</a
              >
              <nx-svg-icon
                :class-name="item.iconName + '-icon'"
                :icon-class="item.iconName"
                slot="avatar"
                style=" width: 40px;height: 40px;color: rgb(16, 142, 233);"
              />
            </a-list-item-meta>
            <a slot="actions" @click.stop="loadData(item.no)">
              <nx-svg-icon
                class-name="jinru-icon"
                icon-class="jinru"
                slot="avatar"
                style=" width: 25px;height: 25px;color: rgb(16, 142, 233);"
            /></a>
          </template>
          <template v-else>
            <a-list-item-meta :description="item.description">
              <a slot="title">{{ item.Name }}</a>
              <nx-svg-icon
                :class-name="item.iconName + '-icon'"
                :icon-class="item.iconName"
                slot="avatar"
                style=" width: 40px;height: 40px;    color: rgb(16, 142, 233);"
              />
            </a-list-item-meta>
            <a slot="actions">
              <nx-svg-icon
                class-name="gou-icon"
                icon-class="gou"
                slot="avatar"
                v-if="item.checked"
                style=" width: 16px;height: 16px;    color: rgb(16, 142, 233);"
              />
            </a>
          </template>
        </a-list-item>
      </a-list>
    </el-row>
    <el-row class="filterbottom">
      <div class="selectlist">
        <span v-for="item in selectlist" v-bind:key="item.no">
          <a-tag color="#108ee9" closable @close="removeCheacked(item)">
            {{ item.Name }}
          </a-tag>
        </span>
      </div>
      <div class="operation">
        <el-button @click="close()">关闭</el-button>
        <el-button type="primary" @click="confirm()">确定</el-button>
      </div>
    </el-row>
  </div>
</template>
<script>
import { SelectUser, SearchUser } from '@/api/tappUser'
import { SearchOrgan, SelectOrgan } from '@/api/tappOrgan'
import { SelectDept, SearchDept } from '@/api/tappDept'
import nxSvgIcon from '@/components/nx-svg-icon/index'
export default {
  name: 'selector',
  components: { nxSvgIcon },
  props: {
    typemode: {
      type: Number,
      default() {
        return 1
      }
    },
    checklisted: {
      type: Array,
      default() {
        return []
      }
    },
    ismulti: {
      type: Boolean,
      default() {
        return true
      }
    }
  },
  data() {
    return {
      data: [],
      searchwordkey: '',
      selectlist: [],
      oldsearchwordkey: '',
      historyqueryworkkey: []
    }
  },
  methods: {
    onSearch() {
      if (this.oldsearchwordkey === this.searchwordkey) {
        return
      }
      this.oldsearchwordkey = this.searchwordkey
      if (this.searchwordkey === '' || this.searchwordkey === undefined) {
        this.loadData(
          this.historyqueryworkkey[this.historyqueryworkkey.length - 1]
        )
      } else {
        switch (this.typemode) {
          case 1:
            SearchUser(this.searchwordkey).then(res => {
              this.data = res.data
              this.data.forEach(element => {
                this.getdescription(element)
                element.checked = false
                const findlist = this.selectlist.filter(item => {
                  return item.no === element.no
                })
                if (findlist.length > 0) {
                  element.checked = true
                }
              })
            })
            break
          case 2:
            SearchDept(this.searchwordkey).then(res => {
              this.data = res.data
              this.data.forEach(element => {
                this.getdescription(element)
                element.checked = false
                const findlist = this.selectlist.filter(item => {
                  return item.no === element.no
                })
                if (findlist.length > 0) {
                  element.checked = true
                }
              })
            })
            break
          case 3:
            SearchOrgan(this.searchwordkey).then(res => {
              this.data = res.data
              this.data.forEach(element => {
                this.getdescription(element)
                element.checked = false
                const findlist = this.selectlist.filter(item => {
                  return item.no === element.no
                })
                if (findlist.length > 0) {
                  element.checked = true
                }
              })
            })
            break
          default:
            break
        }
      }
    },
    loadData(wordkey) {
      if (wordkey === '' || wordkey === undefined || wordkey === '10001') {
        this.historyqueryworkkey = []
        wordkey = '10001'
        this.historyqueryworkkey.push(wordkey)
      } else if (this.historyqueryworkkey.indexOf(wordkey) < 0) {
        this.historyqueryworkkey.push(wordkey)
      }
      console.log(this.typemode === '1')
      switch (this.typemode) {
        case 1:
          SelectUser(wordkey).then(res => {
            this.data = res.data
            this.data.forEach(element => {
              this.getdescription(element)
              element.checked = false
              const findlist = this.selectlist.filter(item => {
                return item.no === element.no
              })
              if (findlist.length > 0) {
                element.checked = true
              }
            })
            // this.data.
          })
          break
        case 2:
          SelectDept(wordkey).then(res => {
            this.data = res.data
            this.data.forEach(element => {
              this.getdescription(element)
              element.checked = false
              const findlist = this.selectlist.filter(item => {
                return item.no === element.no
              })
              if (findlist.length > 0) {
                element.checked = true
              }
            })
          })
          break
        case 3:
          SelectOrgan(wordkey).then(res => {
            this.data = res.data
            this.data.forEach(element => {
              this.getdescription(element)
              element.checked = false
              const findlist = this.selectlist.filter(item => {
                return item.no === element.no
              })
              if (findlist.length > 0) {
                element.checked = true
              }
            })
          })
          break
        default:
          break
      }
    },
    selected(item) {
      if (!(item.isDept < 3 - this.typemode)) {
        if (this.ismulti === false) {
          if (this.selectlist.length === 0) {
            this.selectlist.push(item)
          } else {
            this.selectlist.splice(0, 1)
            this.selectlist.push(item)
          }
        } else {
          const findlist = this.selectlist.filter(element => {
            return item.no === element.no
          })
          if (findlist.length === 0) {
            this.selectlist.push(item)
            item.checked = true
          } else {
            this.selectlist.splice(this.selectlist.indexOf(item), 1)
            item.checked = false
          }
        }
      }
    },
    removeCheacked(item) {
      item.checked = false
      this.selectlist.splice(this.selectlist.indexOf(item), 1)
    },
    onKeyup(e) {
      if (e.code === 'Backspace' || e.code === 'Space' || e.code === 'Enter') {
        this.onSearch()
      }
    },
    getdescription(element) {
      if (element.isDept === 2) {
        element.description =
          '用户名：' +
          element.no +
          '        所属机构：' +
          element.grandName +
          '        所属部门：' +
          element.deptPName +
          '        类型：人员'
        element.iconName = 'user'
      } else if (element.isDept === 1) {
        element.description =
          '上级机构：' +
          element.deptPName +
          (element.grandName !== null
            ? '        上级部门：' + element.grandName
            : '') +
          '        类型：部门'
        element.iconName = 'peoples'
      }
      if (element.isDept === 0) {
        element.description =
          '上级机构：' + element.deptPName + '        类型：机构'
        element.iconName = 'tree'
      }
    },
    returnfun() {
      if (
        this.searchwordkey !== undefined &&
        this.searchwordkey !== '' &&
        this.searchwordkey !== null
      ) {
        this.loadData(
          this.historyqueryworkkey[this.historyqueryworkkey.length - 1]
        )
        this.searchwordkey = undefined
      } else if (this.historyqueryworkkey.length > 1) {
        this.loadData(
          this.historyqueryworkkey[this.historyqueryworkkey.length - 2]
        )
        this.historyqueryworkkey.splice(this.historyqueryworkkey.length, 1)
      }
    },
    confirm() {
      this.$emit('confirm', this.selectlist)
    },
    close() {
      this.$emit('close')
    }
  },
  mounted() {
    this.loadData()
  }
}
</script>
<style>
.ant-input-lg {
  font-size: 14px;
}
.ant-btn-lg {
  font-size: 14px;
}
.ant-tag {
  padding: 5px 10px;
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
.filter-flex {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -ms-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
}
.inputsearch {
  width: calc(100% - 40px);
}
.ant-empty {
  margin-top: 30px;
  margin-bottom: 30px;
}
.filter-search {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding: 5px 10px;
  background: #eee;

  display: block;
}
.filtermain {
  margin-left: 15px;
  margin-right: 10px;
  min-height: 400px;
}
.filterbottom {
  margin-top: 8px;
  margin-left: 15px;
  margin-right: 10px;
}
.filterbottom button {
  float: right;
  margin-right: 10px;
  margin-bottom: 20px;
}
.selectlist {
  width: calc(100% - 200px);
  float: left;
}
.operation {
  width: 200px;
  float: right;
}
</style>
