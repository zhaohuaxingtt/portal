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
  import {iDialog, iInput, iSelect, iMessage, iButton} from 'rise'
  import {pageMixins} from '@/utils/pageMixins'
  import {getFolderCombo, multipleAndCollect, getTagList, insert} from '@/api/partLifeCycle/partLifeCycleStar'

  export default {
    mixins: [pageMixins],
    components: {
      iDialog,
      iInput,
      iSelect,
      iButton
    },
    props: {
      value: {type: Boolean, default: false},
    },
    data() {
      return {
        title: '',
        ids: [],
        folderName: '',
        resData: [],
        saveLoading: false,
        contentLoading: false
      }
    },
    methods: {
      save() {
        this.saveLoading = true
        let partsFolderComboVOList = this.resData
        partsFolderComboVOList.map(item => {
          item.isThere = 1
          item.isDelete = 1
          item.isTrue = 1
          this.ids.forEach(it => {
            if (item.id == it) {
              item.isDelete = 0
              item.isThere = 0
              item.isTrue = 0
            }
          })
        })
        let obj = {
          folderName: this.folderName,
          partsNum: this.$route.query.partsNum,
          partsFolderComboVOList
        }
        insert(obj).then(res => {
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
        let partNum = this.$route.query.partsNum
        getFolderCombo({partNum}).then(res => {
          const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
          if (Number(res.code) === 200) {
            this.resData = res.data
            this.resData = this.resData.filter(item => {
              return item.folderName != '我的收藏'
            })
            this.ids = []
            this.resData.map(item => {
              if(item.isThere==0) {
                this.ids.push(item.id)
              }
            })
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

