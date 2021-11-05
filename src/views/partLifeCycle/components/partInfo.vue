<!--
 * @Author: yz
 * @Date: 2021-09-27
-->
<template>
  <iDialog :title="$t(title)" :visible.sync="value" width="95%" top="0" @close='clearDiolog' class="iDialogCon">
    <div slot="title" class="title">
      <div>
        {{ (resData.length > 0 ? resData[0].mainAekoNum : '') + '：' + (resData.length > 0 ? resData[0].nodeDate : '') }}
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
    <div class="main" v-loading="dialogLoging">
      <div v-for="(x, xIndex) in resData" :key="xIndex">
        <div class="moreLine" :class="{ first: aIndex === 0 }" v-for="(a, aIndex) in x.listLine" :key="aIndex">
          <div class="item" :class="{checked: index === itemChecked}" v-if="aIndex === 0">
            <div class="date">{{ x.nodeDate }}</div>
            <div class="aeko">{{ x.aekoNum }}</div>
            <div class="roundLine">
              <div class="line"></div>
              <div class="round" @click="openPartInfo(b.nodePartsNum)">
                <div></div>
              </div>
              <div class="line"></div>
            </div>
            <div class="part">{{ x.nodePartsNum }}</div>
            <div class="price">
              <div v-if="Number(x.isPermission) === 1">
                {{ x.nodePartsAekoSurAmount }} / Δ {{ x.nodePartsAekoVariableAmount }}
              </div>
              <div v-else>-</div>
            </div>
          </div>
          <div class="item" v-for="(b, index) in a" :key="index" :class="{checked: index === itemChecked}">
            <div class="date">{{ b.nodeDate }}</div>
            <div class="aeko">{{ b.aekoNum }}</div>
            <div class="roundLine">
              <div class="line"></div>
                <div v-if="Number(b.isMulti) === 1" class="round">
                    <span
                            v-if="Number(b.type) === 1"
                            @click="openPartInfo(b.caseType, index, a)"
                    >
                      <icon class="icon"
                            symbol
                            name="iconlingjianyanbianjinchengfenzhijiedian"></icon>
                    </span>
                        <span
                                v-if="Number(b.type) === 2"
                                @click.prevent="openPartInfo(b.caseType, index, a)"
                        >
                      <icon class="icon"
                            symbol
                            name="iconlingjianyanbianjinchengfenzhijiedianduoduiduo"></icon>
                    </span>
                </div>
              <div v-else class="round">
                <div></div>
              </div>
              <div class="line"></div>
            </div>
            <div class="part">{{ b.nodePartsNum }}</div>
            <div class="price">
              <div v-if="b.nodePartsAekoSurAmount || b.nodePartsAekoVariableAmount">
                {{ Number(b.isPermission) === 1 ? b.nodePartsAekoSurAmount : '-' }} / Δ {{ b.nodePartsAekoVariableAmount }}
              </div>
              <div v-else>-</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
    </span>
  </iDialog>
</template>
<script>
import { iDialog, iSelect, iMessage, icon } from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import { getAmountAxle, getOneToMany } from '@/api/partLifeCycle'

export default {
  mixins: [pageMixins],
  components: {
    iDialog,
    iSelect,
    icon
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
      itemChecked: '',
      dialogLoging: false,
      resData: [],
      promiseAll: []
    }
  },
  mounted() {

  },
  methods: {
    clearDiolog() {
      this.$emit('clearDiolog')
    },
    getAmountAxle() {
      this.dialogLoging = true
      let promiseAll = []
      this.resData.map((a, index) => {
        a.listLine.map(item => {
          if(!promiseAll[index]){
            promiseAll[index] = []
          }
            promiseAll[index].push(getAmountAxle({
                aekoList: item.map(item => item.aekoNum),
                factoryCode: this.factoryCode
              })
            )
          }
        )
      })
      promiseAll.map((a, index) => {
        Promise.all(a).then(res => {
          for (let i = 0; i < res.length; i++) {
            let item = res[i]
            const result = this.$i18n.locale === 'zh' ? item.desZh : item.desEn
            if(Number(item.code) === 200){
              this.resData[index].listLine[i].forEach(a => {
                a.nodePartsAekoSurAmount = ''
                a.nodePartsAekoVariableAmount = ''
                item.data.map(b => {
                  if (a.aekoNum === b.aekoNum) {
                    a.nodePartsAekoSurAmount = b.nodePartsAekoSurAmount
                    a.nodePartsAekoVariableAmount = b.nodePartsAekoVariableAmount
                    a.isPermission = b.isPermission
                  }
                })
              })
            } else {
              iMessage.error(result)
            }
          }
          this.dialogLoging = false
        }).catch(() => {
          this.dialogLoging = false
        })
      })
    },
    getMany() {
      this.dialogLoging = true
      getOneToMany(this.clickInfo).then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 200) {
          this.resData = res.data
          this.getAmountAxle()
        } else {
          iMessage.error(result)
          this.dialogLoging = false
        }
      }).catch(() => {
        this.dialogLoging = false
      })
    },
    openPartInfo(caseType, index, data) {
      let key = Number(caseType) === 1 ? 1 : -1
      if(data[index].nodePartsNum){
        key = 0
      }
      let nodePartsNum = data[index + key].nodePartsNum
      if(nodePartsNum){
        if(this.$route.query.partsNum === nodePartsNum){
          return
        }
        const router =  this.$router.resolve({query: {partsNum: nodePartsNum}})
        window.open(router.href,'_blank')
      } else {
        iMessage.warn('没有零件号')
      }
    },
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
    height: 90%;
    top: 50%;
    transform: translateY(-50%);

    .el-dialog__body {
      height: calc(100% - 114px);
      overflow: hidden;
    }
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

  .moreLine {
    display: flex;
    width: 100%;
    margin-bottom: 80px;
    margin-left: 146px;

    .item {
      font-size: 14px;
      font-weight: 400;
      text-align: center;
      color: #5F6879;
      position: relative;

      .date {
        color: #41434A;
        margin-bottom: 12px;
        height: 17px;
      }

      .aeko{
        height: 17px;
      }

      .part {
        font-size: 16px;
        color: #41434A;
        margin-bottom: 31px;
        height: 20px;
      }

      .roundLine {
        display: flex;
        align-items: center;
        margin: 20px 0;

        .round {
          width: 28px;
          height: 28px;
          background: #C9DCFF;
          box-shadow: 0 0 8px rgba(31, 96, 222, 0.2);
          border-radius: 50%;
          position: relative;

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
            .icon {
                width: 28px;
                height: 28px;
                cursor: pointer;
            }
        }

        .line {
          height: 6px;
          width: 59px;
          background-color: #739FF6;
        }
      }

      &.checked {
        .date, .aeko {
          color: #000000;
        }

        .part, .price {
          font-weight: bold;
          color: #1660F1;
        }

        .roundLine {
          .round {
            background: #C9DCFF;

            > div {
              background: #1660F1;
            }
          }
        }
      }

      &:first-of-type {
        &::before {
          content: '';
          display: block;
          width: 6px;
          height: 262px;
          background-color: #739FF6;
          position: absolute;
          left: 0;
          bottom: 104px;
        }
      }

      &:last-of-type {
        .roundLine {
          .line:last-of-type {
            background: #ffffff;
          }
        }
      }
    }

    &.first {
      margin-left: 0;

      .item {
        &:first-of-type {
          .roundLine {
            .line:first-of-type {
              background: #ffffff;
            }
          }

          &::before {
            width: 0;
          }
        }
      }
    }
  }
}

</style>

