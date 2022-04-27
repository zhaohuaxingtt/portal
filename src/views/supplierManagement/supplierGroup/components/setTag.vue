<!--
 * @Author: caopeng
 * @Date: 2021-11-5
-->
<template>
  <iDialog
    @close="closeDiolog()"
    :title="language('GONGYINGSHANGZUBIAOQIAN', '供应商组标签')"
    :visible.sync="value"
    width="30%"
  >
    <el-form label-position="top">
      <el-form-item :label="language('CAOZUOLEIXING', '操作类型')">
        <iSelect :placeholder="language('请选择')" v-model="form.type">
          <el-option
            v-for="item in tagTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </iSelect>
      </el-form-item>
      <el-form-item :label="language('BIAOQIANMINGCHENG', '标签名称')">
        <iSelect
          multiple
          collapse-tags
          filterable
          :placeholder="language('QINGSHURUXUANZE', '请输入/选择')"
          v-model="form.labelIds"
        >
          <el-option
            v-for="item in tagList"
            :key="item.tagId"
            :label="item.tagName"
            :value="item.tagId"
          >
          </el-option>
        </iSelect>
      </el-form-item>
    </el-form>
    <div class="bottom">
      <i-button @click="handleBtn()">{{
        language('QUEDING', '确定')
      }}</i-button>
    </div>
  </iDialog>
</template>

<script>
import { iButton, iMessage, iDialog, iSelect } from 'rise'
import {
  saveGroupLabel,
  queryGroupTagList
} from '@/api/supplier360/supplierGroup.js'
export default {
  props: {
    selectTableData: { type: Array },
    value: {
      type: Boolean,
      default: false
    }
  },
  components: {
    iButton,
    iDialog,
    iSelect
  },

  data() {
    return {
      form: {
        type: '',
        labelIds: []
      },
      tagList: [],
      processingList: [],
      tableListData: [],
      tagTypeList: [
        { label: this.language('XINZENG', '新增'), value: 1 },
        { label: this.language('SHANCHU', '删除'), value: -1 }
      ]
    }
  },
  created() {
    this.getTagListObj()
  },
  methods: {
    //获取标签列表
    getTagListObj() {
      queryGroupTagList({}).then((res) => {
        if (res && res.code == 200) {
          this.tagList = res.data
        }
      })
    },
    //保存
    handleBtn() {
      if (this.form.type == '' || this.form.labelIds.length == 0) {
        iMessage.warn(this.language('QINGWANCHENGXUANZE', '请完成选择'))
        return false
      }
      let params = {
        groupIds:this.selectTableData.map(item=>item.id),
        ...this.form,
      }
      saveGroupLabel(params).then((res) => {
        if (res && res.code == 200) {
          this.$emit('closeDiolog', 1)
          iMessage.success(res.desZh)
        } else iMessage.error(res.desZh)
      })
    },

    // 关闭弹窗
    closeDiolog() {
      this.$emit('closeDiolog')
    }
  }
}
</script>

<style lang="scss" scoped>
.bottom {
  display: flex;
  justify-content: flex-end;
  padding: 20px 0;
}
</style>
