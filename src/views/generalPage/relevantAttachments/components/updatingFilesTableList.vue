<!--
 * @Author: moxuan
 * @Date: 2021-04-13 17:30:36
 * @LastEditTime: 2022-03-03 18:29:59
 * @LastEditors: YoHo
 * @Description: 附件上传表格
-->
<template>
  <el-table class="table" :height="height"
            tooltip-effect='light'
            :data='tableData'
            :empty-text="$t('LK_ZANWUSHUJU')"
            v-loading='tableLoading'
            border
            @selection-change="handleSelectionChange">
    <el-table-column v-if="selection"
                     type='selection'
                     width="50"
                     align='center'></el-table-column>
    <el-table-column v-if='index'
                     type='index'
                     width='50'
                     align='center'
                     label='#'></el-table-column>
    <template v-for="(items,index) in tableTitle">
      <!-- 附件名称-->
      <el-table-column :key="index"
                       align='center'
                       :width="items.width"
                       :show-overflow-tooltip='items.tooltip'
                       v-if="items.props === 'templateName'"
                       :prop="items.props"
                       :label="items.key ? $t(items.key) : items.name"
                       :fixed="items.fixed">
        <template slot-scope="scope">
          <span :class="{
            'openLinkText': scope.row.fileId && !scope.row.isCommitment,
            'underline': scope.row.fileId && !scope.row.isCommitment}"
                @click="handleFileDownload(scope.row)">
            {{ scope.row.templateName }}</span>
          <span class="required  margin-left5"
                v-if="scope.row.required">*</span>
          <el-popover trigger="hover"
                      :content="scope.row.remark"
                      placement="top-start">
            <icon slot="reference"
                  symbol
                  name="iconxinxitishi"
                  class="exampleFileIconStyle margin-left5"
                  v-if="scope.row.remark" />
          </el-popover>
        </template>
      </el-table-column>
      <!-- 操作-->
      <el-table-column :key="index"
                       align='center'
                       :width="items.width"
                       :show-overflow-tooltip='items.tooltip'
                       v-if="items.props === 'isCommitment'"
                       :prop="items.props"
                       :label="items.key ? $t(items.key) : items.name"
                       :fixed="items.fixed">
        <template slot-scope="scope">
          <template v-if="scope.row.templateId=='21'">
            <iButton type="text"
                     class="openLinkText text-500"
                     :disabled="disabled"
                     @click="publish(scope.row)">确认并发布</iButton>
            <iButton type="text"
                     class="openLinkText text-500"
                     @click="viewPublish(scope.row)">查看已发布</iButton>
          </template>
          <span v-else-if="scope.row.isCommitment"
                class="openLinkText cursor"
                @click="handleViewAttachment(scope.row)">{{ $t('LK_CHAKAN') }}</span>
          <uploadButton :showText="true"
                        @uploadedCallback="handleUploadedCallback($event,scope.row)"
                        button-text="LK_SHANGCHUAN"
                        v-else />
        </template>
      </el-table-column>
      <!-- 上传/确认日期-->
      <el-table-column :key="index"
                       align='center'
                       :width="items.width"
                       :show-overflow-tooltip='items.tooltip'
                       v-if="items.props === 'createDateTime'"
                       :prop="items.props"
                       :label="items.key ? $t(items.key) : items.name"
                       :fixed="items.fixed">
        <template slot-scope="scope">
          <span>{{ scope.row.createDateTime }}</span>
        </template>
      </el-table-column>

      <!-- 备注说明-->
      <el-table-column :width="items.width"
                       :show-overflow-tooltip='items.tooltip'
                       :key="index"
                       align='center'
                       v-else-if="items.props === 'attachRemark'"
                       :prop="items.props"
                       :label="items.key ? $t(items.key) : items.name">
        <template slot-scope="scope">
          <i-input v-model="scope.row.attachRemark"
                   v-if="scope.row.attachId && !scope.row.isCommitment"
                   :maxlength="300" />
          <span v-else>{{ scope.row.attachRemark }}</span>
        </template>
      </el-table-column>

      <!--样例文件-->
      <el-table-column :width="items.width"
                       :show-overflow-tooltip='items.tooltip'
                       :key="index"
                       align='center'
                       v-else-if="items.props === 'templateDemoUrl'"
                       :prop="items.props"
                       :label="items.key ? $t(items.key) : items.name">
        <template #header>
          {{ items.key ? $t(items.key) : items.name }}
          <el-popover trigger="hover"
                      width="220"
                      :content="$t('SUPPLIER_EXAMPLEDSEC')"
                      placement="top-start">
            <icon slot="reference"
                  symbol
                  name="iconxinxitishi"
                  class="exampleFileIconStyle" />
          </el-popover>
        </template>
        <template slot-scope="scope">
          <span class="openLinkText cursor"
                @click="handleExampleDownload(scope.row)"
                v-if="scope.row.templateDemoUrl && !scope.row.isCommitment">{{ $t('LK_XIAZAI') }}</span>
        </template>
      </el-table-column>

      <!--不能提供原因-->
      <el-table-column :width="items.width"
                       :show-overflow-tooltip='items.tooltip'
                       :key="index"
                       align='center'
                       v-else-if="items.props === 'notAvailableReason'"
                       :prop="items.props"
                       :label="items.key ? $t(items.key) : items.name">
        <template slot-scope="scope">
          <i-input v-model="scope.row.notAvailableReason"
                   v-if="scope.row.isDisplayReason"
                   :maxlength="300" />
        </template>
      </el-table-column>

      <!--最晚提供时间-->
      <el-table-column :width="items.width"
                       :show-overflow-tooltip='items.tooltip'
                       :key="index"
                       align='center'
                       v-else-if="items.props === 'lastAvailableTime'"
                       :prop="items.props"
                       :label="items.key ? $t(items.key) : items.name">
        <template slot-scope="scope">
          <iDatePicker value-format="yyyy-MM-dd"
                       v-model="scope.row.lastAvailableTime"
                       v-if="scope.row.isDisplayLastTime"
                       type="date"
                       :placeholder="$t('SUPPLIER_XUANZERQI')"
                       :picker-options="{disabledDate(time) {return time.getTime() < Date.now() - 24 * 60 * 60 * 1000}}" />
        </template>
      </el-table-column>

      <!--证件有效期-->
      <el-table-column :width="items.width"
                       :show-overflow-tooltip='items.tooltip'
                       :key="index"
                       align='center'
                       v-else-if="items.props === 'validityOfCertificate'"
                       :prop="items.props"
                       :label="items.key ? $t(items.key) : items.name">
        <template slot-scope="scope">
          <iDatePicker value-format="yyyy-MM-dd"
                       v-model="scope.row.validityOfCertificate"
                       v-if="scope.row.isDisplayValidity"
                       type="date"
                       :placeholder="$t('SUPPLIER_XUANZERQI')"
                       :picker-options="{disabledDate(time) {return time.getTime() < Date.now() - 24 * 60 * 60 * 1000}}" />
        </template>
      </el-table-column>

    </template>
  </el-table>
</template>
<script>
import { iInput, icon, iDatePicker, iButton } from 'rise'
import uploadButton from '../../../../../src/components/uploadButton'

export default {
  props: {
    tableData: { type: Array },
    tableTitle: { type: Array },
    tableLoading: { type: Boolean, default: false },
    selection: { type: Boolean, default: true },
    index: { type: Boolean, default: false },
    height: { type: Number || String },
    disabled: { type: Boolean, default: false },
  },
  components: {
    iInput,
    icon,
    uploadButton,
    iDatePicker,
    iButton
  },
  methods: {
    handleSelectionChange (val) {
      this.$emit('handleSelectionChange', val)
    },
    handleSelectChange (type, val, time) {
      const res = {
        type,
        val,
        time
      }
      this.$emit('handleSelectChange', res)
    },
    openPage (params) {
      this.$emit('openPage', params)
    },
    handleExampleDownload (row) {
      this.$emit('handleExampleDownload', row)
    },
    handleViewAttachment (row) {
      this.$emit('handleViewAttachment', row)
    },
    viewPublish (row) {
      this.$emit('viewPublish', row)
    },
    publish (row) {
      this.$emit('publish', row)
    },
    handleUploadedCallback (event, row) {
      this.$emit('handleUploadedCallback', event, row)
    },
    handleFileDownload (row) {
      if (row.fileId && !row.isCommitment) {
        this.$emit('handleFileDownload', row)
      } else {
        return false
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.openLinkText {
  color: $color-blue;
}
::v-deep .text-500 {
  span {
    font-weight: 500 !important;
  }
}
.el-select {
  margin: 2px 0;
}

.table{
  
  ::v-deep .el-table__row .el-input {
    height: 35px !important;
    width: 100% !important;
    .el-input__inner {
      height: 35px !important;
    }
  }
}

.underline {
  text-decoration: underline;
}

.icon {
  color: $color-blue;
}

.exampleFileIconStyle {
  font-size: 16px;
}

.required {
  font-size: 14px;
  color: red;
}
</style>
