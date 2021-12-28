<!--
 * @Author: yz
 * @Date: 2021-09-27
-->
<template>
  <iDialog :title="$t(title)" :visible.sync="value" width="604px" top="0" @close='clearDiolog' class="iDialogCon"
           v-loading="dialogLoging">
    <div slot="title" class="title">
      <div>
        {{ resData.mainAekoNum + '：' + resData.nodeDate }}
      </div>
    </div>
    <div class="changePrice">
      价格变化
      <iSelect
        :placeholder="language('LK_QINGXUANZHE', '请选择')"
        filterable
        @change="getAmountAxle"
        v-model="factoryCode"
      >
        <el-option
          :value="item.value"
          :label="item.name"
          v-for="(item, index) in priceSelect"
          :key="index"
        ></el-option>
      </iSelect>
    </div>
    <div class="main">
      <div class="graph">
        <div class="round">
          <div></div>
        </div>
        <div class="line"></div>
        <div class="round checked">
          <div></div>
        </div>
      </div>
      <div class="aekoList">
        <div class="left">
          <div v-for="(item, index) in resData.frontList" :key="index">{{ item }}</div>
          <!-- <Popover
            placement="bottom"
            width="200"
            class="popStyle"
            v-if="resData.frontList"
            trigger="hover">
            <div v-for="(item, index) in resData.frontList" :key="index">{{ item }}</div>
            <div slot="reference">
              {{resData.frontList[0]}}
            </div>
          </Popover> -->
        </div>
        <div class="right">
          <div v-for="(item, index) in resData.backList" :key="index">{{ item }}</div>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
    </span>
  </iDialog>
</template>
<script>
import { iDialog, iSelect, iMessage } from 'rise'
import { Popover } from 'element-ui'
import { pageMixins } from '@/utils/pageMixins'
import { getAmountAxle, getMany } from '@/api/partLifeCycle'

export default {
  mixins: [pageMixins],
  components: {
    iDialog,
    iSelect,
    Popover
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
      model1: '',
      itemChecked: '',
      resData: {},
      resDataClone: {},
      dialogLoging: false

    }
  },
  mounted() {

  },
  methods: {
    getAmountAxle() {
      this.dialogLoging = true
      getAmountAxle({
        aekoList: [this.resData.mainAekoNum, this.resData.slaveAekoNum],
        factoryCode: this.factoryCode
      }).then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 200) {
          this.resData = _.cloneDeep(this.resDataClone)
          let data = res.data
          if (data && data.length > 0) {
            this.resData.frontList.push(`${data[0].nodePartsAekoSurAmount} / Δ ${data[0].nodePartsAekoVariableAmount}`)
            this.resData.backList.push(`${data[1].nodePartsAekoSurAmount} / Δ ${data[1].nodePartsAekoVariableAmount}`)
          }
        } else {
          iMessage.error(result)
        }
        this.dialogLoging = false
      }).catch(() => {
        this.dialogLoging = false
      })
    },
    getMany() {
      this.dialogLoging = true
      getMany(this.clickInfo).then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 200) {
          this.resData = res.data
          this.resDataClone = _.cloneDeep(this.resData)
          this.getAmountAxle()
        } else {
          iMessage.error(result)
          this.dialogLoging = false
        }
      }).catch(() => {
        this.dialogLoging = false
      })
    },
    clearDiolog() {
      this.$emit('clearDiolog')
    },
    openPartInfo() {
    }
  },
  watch: {
    value(val) {
      if (val) {
        this.getMany()
      }
    }
  }
}
</script>
<style lang='scss' scoped>
// 滚动条样式
::-webkit-scrollbar {
  width: 3px;
  height: 5px;
}

::-webkit-scrollbar-thumb {
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px transparent;
  background: #E2EAFC;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px transparent;
  border-radius: 5px;
  background: transparent;
}

.iDialogCon {
  ::v-deep .el-dialog {
    height: 411px;
    top: 50%;
    transform: translateY(-50%);
    overflow-y: auto;
  }
}

.title {
  font-size: 18px;
  font-weight: bold;
  color: #000000;
}

.changePrice {
  font-size: 14px;
  font-weight: bold;
  color: #000000;
  margin-bottom: 30px;

  ::v-deep .el-select {
    font-size: 12px;
    width: 160px;
    margin-left: 10px;
  }
}

.main {
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  .graph {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    .line {
      width: 293px;
      height: 0;
      border: 2px solid #1660F1;
      opacity: 1;
    }

    .round {
      width: 28px;
      height: 28px;
      background: #C9DCFF;
      box-shadow: 0 0 8px rgba(31, 96, 222, 0.2);
      border-radius: 50%;
      position: relative;
      cursor: pointer;

      > div {
        width: 16px;
        height: 16px;
        background: #FFFFFF;
        border-radius: 50%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        position: absolute;
      }

      &.checked {
        background: #C9DCFF;

        > div {
          background: #1660F1;
        }
      }
    }
  }

  .aekoList {
    font-size: 16px;
    font-weight: 400;
    color: #41434A;
    width: 400px;
    display: flex;
    justify-content: space-between;

    > div {
      text-align: center;

      > div {
        margin-bottom: 5px;
      }
    }
  }
}

</style>

