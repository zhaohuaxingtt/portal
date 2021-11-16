<!--
 * @Author: yz
 * @Date: 2021-09-27
-->
<template>
  <iDialog :title="$t(title)" :visible.sync="value" width="381px" top="0" @close='clearDiolog' class="iDialogCon"
           :append-to-body="true">
    <div slot="title" class="title">
      {{ language('LK_XINJIANBIAOQIAN', '新建标签') }}
    </div>
    <el-form class="content">
      <el-form-item :label="language('LK_BIAOQIANMINGCHENG', '标签名称')">
        <iInput v-model="folderName" :placeholder="language('LK_QINGSHURU', '请输入')" clearable></iInput>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <iButton @click="insert" :loading="saveLoading">{{ language('LK_QUEREN', '确认') }}</iButton>
    </span>
  </iDialog>
</template>
<script>
import { iDialog, iInput, iMessage, iButton } from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import { insert } from '@/api/partLifeCycle/partLifeCycleStar'

export default {
  mixins: [pageMixins],
  components: {
    iDialog,
    iInput,
    iButton
  },
  props: {
    value: { type: Boolean, default: false },
    priceSelect: { type: Array, default: () => [] },
    clickInfo: {
      type: Array, default: () => {
      }
    },
    factoryCode: { type: String, default: '' }
  },
  data() {
    return {
      title: '',
      folderName: '',
      resData: {},
      saveLoading: false

    }
  },
  mounted() {

  },
  methods: {
    insert() {
      this.saveLoading = true
      insert({ folderName: this.folderName }).then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 200) {
          iMessage.success(result)
          this.$emit('clearDialog', true)
        } else {
          iMessage.error(result)
        }
        this.saveLoading = false
      }).catch(() => {
        this.saveLoading = false
      })
    },
    clearDiolog() {
      this.$emit('clearDialog', false)
    }
  },
  watch: {
    value(val) {
      if (val) {
        this.folderName = ''
        // this.getMany()
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

