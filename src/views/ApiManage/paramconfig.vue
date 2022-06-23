<template>
  <div>
    <nx-tree-table
      :data="data"
      :columns="columns"
      border
      :scopedSlots="scopedSlots"
    >
      <div slot="required" slot-scope="user">{{ user }}</div>
      <div slot="paramtype" slot-scope="user">{{ user }}</div>
      <div slot="headname" slot-scope="user">{{ user }}</div>
      <div slot="operation" slot-scope="user">{{ user }}</div>
    </nx-tree-table>
  </div>
</template>
<script>
import nxTreeTable from '@/components/nx-tree-table'
export default {
  name: 'treeTableDemo',
  components: { nxTreeTable },
  data() {
    return {
      scopedSlots: ['required', 'paramtype', 'headname', 'operation'],
      columns: [
        {
          text: '参数名称',
          value: 'property',
          width: 200
        },
        {
          text: '是否必填',
          value: 'required'
        },
        {
          text: '验证类型',
          value: 'paramtype'
        },
        {
          text: '验证提示',
          value: 'headname'
        },
        {
          text: '操作',
          value: 'operation'
        }
      ],
      data: [
        {
          property: 'body',
          required: 100,
          paramtype: '无',
          type: 'object',
          headname: '',
          children: [],
          headname: ''
        },
        {
          property: 'query',
          required: 50,
          type: 'object',
          comment: '无'
        },
        {
          property: 'header',
          required: 50,
          type: 'object',
          paramtype: '无',
          headname: ''
        }
      ]
    }
  },
  methods: {
    loadAll() {
      return [
        { value: 'V_INTEGER', name: '整数' },
        { value: 'V_Z_INDEX', name: '正整数' },
        { value: 'V_NEGATIVE_INTEGER', name: '负数' },
        { value: 'V_FLOAT', name: '浮点数' },
        { value: 'V_POSTTIVE_FLOAT', name: '正浮点数' },
        { value: 'V_NEGATIVE_FLOAT', name: '负浮点数' },
        { value: 'V_UNPOSITIVE_FLOAT', name: '非负浮点数（正浮点数 + 0）' },
        { value: 'V_UN_NEGATIVE_FLOAT', name: '非正浮点数（负浮点数 + 0）' },
        { value: 'V_EMAIL', name: '邮件' },
        { value: 'V_COLOR', name: '颜色' },
        { value: 'V_URL', name: 'url' },
        { value: 'V_CHINESE', name: '仅中文' },
        { value: 'V_ASCII', name: '仅ACSII字符' },
        { value: 'V_ZIPCODE', name: '邮编' },
        { value: 'V_MOBILE', name: '手机' },
        { value: 'V_IP4', name: 'ip地址' },
        { value: 'V_PICTURE', anameddress: '图片' },
        { value: 'V_RAR', name: '压缩文件' },
        { value: 'V_DATE', name: '日期' },
        { value: 'V_QQ_NUMBER', name: 'QQ号码' },
        {
          value: 'V_TEL',
          name: '电话号码的函数(包括验证国内区号,国际区号,分机号)'
        },
        { value: 'V_LETTER', name: '字母' },
        { value: 'V_LETTER_U', name: '大写字母' },
        { value: 'V_LETTER_I', name: '小写字母' },
        { value: 'V_IDCARD', name: '身份证' },
        { value: 'V_PASSWORD_REG', name: '验证密码(数字和英文同时存在)' },
        { value: 'V_PASSWORD_LENGTH', name: '验证密码长度(6-18位)' },
        { value: 'V_TWO＿POINT', name: '验证两位数' }
      ]
    }
  }
}
</script>
