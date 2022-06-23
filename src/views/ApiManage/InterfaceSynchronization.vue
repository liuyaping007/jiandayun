<template>
  <div>
    <el-row>
      <el-col :span="24" class="inputform">
        <span>接口地址:</span>
        <a-input default-value="mysite"
          ><a-select
            slot="addonBefore"
            default-value="POST"
            style="width: 90px"
          >
            <a-select-option value="POST">
              POST
            </a-select-option>
            <a-select-option value="GET">
              GET
            </a-select-option>
          </a-select>
        </a-input>
      </el-col></el-row
    >
    <el-row style="margin-top: 10px;">
      <el-col :span="24">
        <span style="margin-left: 10px;">Header信息：</span>
      </el-col></el-row
    >
    <el-row style="margin-top: 10px;">
      <el-col :span="24">
        <el-table :data="headlist" border height="150">
          <el-table-column label="列头名称">
            <template slot-scope="scope">
              <el-input
                placeholder="请输入内容"
                v-model="scope.row.headname"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="绑定字段">
            <template slot-scope="scope">
              <el-input
                placeholder="请输入内容"
                v-model="scope.row.bindname"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <a
                class="margin-a"
                href="javascript:;"
                style="margin-right: 5px;"
                @click="del(scope.row)"
                >删除</a
              >
              <a
                class="margin-a"
                href="javascript:;"
                style="margin-right: 5px;"
                v-if="scope.$index !== 0"
                @click="move(scope.$index, scope.$index - 1)"
                >上移</a
              >
              <a
                class="margin-a"
                href="javascript:;"
                style="margin-right: 5px;"
                @click="move(scope.$index, scope.$index + 1)"
                v-if="headlist.length !== scope.$index + 1"
                >下移</a
              >
              <a
                class="margin-a"
                href="javascript:;"
                style="margin-right: 5px;"
                @click="move(scope.$index, 0)"
                v-if="scope.$index !== 0"
                >置顶</a
              >
              <a
                class="margin-a"
                href="javascript:;"
                style="margin-right: 5px;"
                @click="move(scope.$index, data.length - 1)"
                v-if="headlist.length !== scope.$index + 1"
                >置底</a
              >
            </template>
          </el-table-column>
        </el-table></el-col
      ></el-row
    >
    <el-row style="margin-top: 10px;">
      <el-col :span="24" class="inputform">
        <span>Body：</span>
        <a-textarea
          v-model="queryparam.remarks"
          placeholder="接口说明"
          :auto-size="{ minRows: 2, maxRows: 3 }"
        /> </el-col
    ></el-row>
  </div>
</template>
