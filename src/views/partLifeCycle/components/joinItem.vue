<!--
 * @Author: yz
 * @Date: 2021-09-27
-->
<template>
  <iDialog :title="$t(title)" :visible.sync="value" width="381px" top="0" @close='clearDiolog' class="iDialogCon"
           :append-to-body="true">
    <div slot="title" class="title">
      {{ language('LK_JIARUBIAOQIAN', '加入标签') }}
    </div>
    <el-form class="content" v-loading="contentLoading">
      <el-form-item :label="language('LK_YIYOUBIAOQIAN', '已有标签')">
        <iSelect
          class="multipleSelect"
          :placeholder="language('LK_QINGXUANZHE', '请选择')"
          filterable
          clearable
          collapse-tags
          multiple
          v-model="ids"
        >
          <el-option
            :value="item.id"
            :label="item.folderName"
            v-for="(item, index) in resData"
            :key="index"
          ></el-option>
        </iSelect>
      </el-form-item>
      <el-form-item :label="language('LK_XINJIANBIAOQIAN', '新建标签')">
        <iInput :loading="saveLoading" v-model="folderName" :placeholder="language('LK_QINGSHURU', '请输入')"
                clearable></iInput>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <iButton @click="save">{{ language('LK_QUEREN', '确认') }}</iButton>
    </span>
  </iDialog>
</template>
<script>
import { iDialog, iInput, iSelect, iMessage, iButton } from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import { getFolderCombo, multipleAndCollect } from '@/api/partLifeCycle/partLifeCycleStar'

export default {
  mixins: [pageMixins],
  components: {
    iDialog,
    iInput,
    iSelect,
    iButton
  },
  props: {
    value: { type: Boolean, default: false }
  },
  data() {
    return {
      title: '',
      ids: [],
      folderName: '',
      resData: {},
      saveLoading: false,
      contentLoading: false

    }
  },
  mounted() {

  },
  methods: {
    save() {
      if(this.ids.length === 0 && this.folderName === ''){
        iMessage.warn(this.language('LK_QINGXUANZHE', '请选择'))
        return
      }
      this.saveLoading = true
      multipleAndCollect({
        folderName: this.folderName,
        ids: this.ids,
        partsNum: this.$route.query.partsNum
      }).then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 200) {
          iMessage.success(result)
          this.clearDiolog()
        } else {
          iMessage.error(result)
        }
        this.saveLoading = false
      }).catch(() => {
        this.saveLoading = false
      })
    },
    getFolderCombo() {
      this.contentLoading = true
      getFolderCombo().then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 200) {
          this.resData = res.data
        } else {
          iMessage.error(result)
        }
        this.contentLoading = false
      }).catch(() => {
        this.contentLoading = false
      })
    },
    clearDiolog() {
      this.$emit('clearDiolog')
    }
  },
  watch: {
    value(val) {
      if (val) {
        this.ids = []
        this.folderName = ''
        this.getFolderCombo()
      }
    }
  }
}
</script>
<style lang='scss' scoped>

.iDialogCon {
  ::v-deep .el-dialog {
    top: 50%;
    transform: translateY(-50%);
  }
}

.title {
  font-size: 18px;
  font-weight: bold;
  color: #000000;

  span {
    font-size: 14px;
    font-weight: 400;
    color: #6D7B96;
  }
}

.content {
  ::v-deep .el-form-item__label {
    font-size: 14px;
    color: #000000;
  }
}

</style>

