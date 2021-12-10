<!--
 * @Author: yz
 * @Date: 2021-09-27
-->
<template>
  <iSearch class="evolutionProcess" v-loading="evolutionProcessLoading">
    <template v-slot:button>
      <div></div>
    </template>
    <div>
      <div class="head">
        <h3>{{ language('LK_YANBIANJINCHENG', '演变进程') }}</h3>
        <iButton @click="exportFile">{{ language('LK_DAOCHU', '导出') }}</iButton>
      </div>
      <div class="content">
        <div class="left">
          <h4>{{ 'Aeko /AeA' }}</h4>
          <div>
            {{ language('LK_JIAGEBIANHUA', '价格变化') }}
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
        </div>
        <div class="right">
          <div class="item" v-for="(item, index) in partsAxleData" :key="index"
               :class="{checked: index === itemChecked}">
            <div class="date">{{ item.nodeDate }}</div>
            <div class="aeko">{{ item.aekoNum }}</div>
            <div class="roundLine">
              <div class="line"></div>
              <div v-if="Number(item.isMulti) === 1" class="round">
                <span
                  v-if="Number(item.type) === 1"
                  @click="oneToMany(item.caseType, index)"
                >
                  <icon class="icon"
                        symbol
                        name="iconlingjianyanbianjinchengfenzhijiedian"></icon>
                </span>
                <span
                  v-if="Number(item.type) === 2"
                  @click.prevent="manyToMany(item.caseType, index)"
                >
                  <icon class="icon"
                        symbol
                        name="iconlingjianyanbianjinchengfenzhijiedianduoduiduo"></icon>
                </span>
              </div>
              <div v-else class="round" @click="openPartInfo(item.nodePartsNum)">
                <div></div>
              </div>
              <div class="line"></div>
            </div>
            <div class="part">{{ item.nodePartsNum }}</div>
            <div class="price">
              <Popover
                placement="bottom"
                v-if="item.nodePartsAekoSurAmount || item.nodePartsAekoVariableAmount"
                width="200"
                class="popStyle"
                trigger="hover">
                <div style="font-size: 14px; font-weight: 400; color: #000000;">
                  <div style="margin-bottom: 10px;">原零件号：{{ item.aekoOriginalPartsNum }}</div>
                  <div style="margin-bottom: 10px;">实施价格：{{ getTousandNum(item.nodePartsAekoCarryAmount) }}元</div>
                  <div style="margin-bottom: 10px;">投资：Δ {{ getTousandNum(item.variableInvestmentAmount) }}元</div>
                  <div>开发：Δ {{ getTousandNum(item.variableDevAmount) }}元</div>
                </div>
                <div slot="reference">
                  {{ Number(item.isPermission) === 1 ? item.nodePartsAekoSurAmount : '-' }} / Δ
                  {{ item.nodePartsAekoVariableAmount }}
                </div>
              </Popover>
              <div v-else>-</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <partInfo :title="'E12354：2023-06-10'"
              :value="partInfoShow"
              @clearDiolog="partInfoShow = false"
              :priceSelect="priceSelect"
              :clickInfo="clickInfo"
              :factoryCode="factoryCode"
    ></partInfo>
    <partInfoMoreToMore :value="partInfoMoreToMoreShow"
                        @clearDiolog="partInfoMoreToMoreShow = false"
                        :priceSelect="priceSelect"
                        :clickInfo="clickInfo"
                        :factoryCode="factoryCode"
    ></partInfoMoreToMore>
  </iSearch>
</template>

<script>
import { iSearch, iSelect, iButton, iMessage, icon } from 'rise'
import { Popover } from 'element-ui'
import partInfo from './partInfo'
import partInfoMoreToMore from './partInfoMoreToMore'
import { getDeptComBoxByPartsNum, partsAxle, getAmountAxle, exportFile2 } from '@/api/partLifeCycle'
import { getTousandNum } from '@/utils/tool'

export default {
  name: 'index',
  components: {
    iSearch,
    Popover,
    iSelect,
    iButton,
    icon,
    partInfo,
    partInfoMoreToMore
  },
  data() {
    return {
      itemChecked: '',
      checkedItem: {},
      clickInfo: {},
      partInfoShow: false,
      partInfoMoreToMoreShow: false,
      evolutionProcessLoading: false,
      factoryCode: '',
      priceSelect: [],
      partsAxleData: [],
      partsAxleDataClone: [],
      partsNum: '',
      getTousandNum
    }
  },
  created() {
    this.partsNum = this.$route.query.partsNum
    this.getRecordDetail()
  },
  methods: {
    exportFile() {
      this.exportLoading = true
      exportFile2({
        aekoNum: this.checkedItem.aekoNum,
        factoryCode: this.factoryCode,
        nodePartsNum: this.checkedItem.nodePartsNum
      }).then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 200) {
          console.log('导出成功')
        } else {
          iMessage.error(result)
        }
        this.exportLoading = false
      }).catch(() => {
        this.exportLoading = false
      })
    },
    getAmountAxle() {
      this.evolutionProcessLoading = true
      getAmountAxle({
        aekoList: this.partsAxleData.map(item => item.aekoNum),
        factoryCode: this.factoryCode
      }).then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 200) {
          this.partsAxleData = this.partsAxleDataClone.map(a => {
            // 防止map改变原数组
            let temp = { ...a }
            res.data.map(b => {
              if (a.aekoNum === b.aekoNum) {
                temp.nodePartsAekoSurAmount = b.nodePartsAekoSurAmount
                temp.nodePartsAekoVariableAmount = b.nodePartsAekoVariableAmount
                temp.aekoOriginalPartsNum = b.aekoOriginalPartsNum
                temp.nodePartsAekoCarryAmount = b.nodePartsAekoCarryAmount
                temp.variableInvestmentAmount = b.variableInvestmentAmount
                temp.variableDevAmount = b.variableDevAmount
                temp.isPermission = b.isPermission
              }
            })
            return temp
          })
        } else {
          iMessage.error(result)
        }
        this.evolutionProcessLoading = false
      }).catch(() => {
        this.evolutionProcessLoading = false
      })
    },
    partsAxle() {
      if (!this.partsNum) {
        this.evolutionProcessLoading = false
        iMessage.error('请输入零件号')
        return
      }
      this.evolutionProcessLoading = true
      partsAxle({ partsNum: this.partsNum }).then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 200) {
          this.partsAxleData = res.data.map((item, index) => {
            item.nodePartsAekoSurAmount = ''
            item.nodePartsAekoVariableAmount = ''
            if (item.nodePartsNum === this.partsNum) {
              this.itemChecked = index
              this.checkedItem = item
            }
            return item
          })
          this.partsAxleDataClone = _.cloneDeep(this.partsAxleData)
          if(this.partsAxleData&&this.partsAxleData.length) {
            this.getAmountAxle()
          }
        } else {
          iMessage.error(result)
        }
        this.evolutionProcessLoading = false
      }).catch(() => {
        this.evolutionProcessLoading = false
      })
    },
    getRecordDetail() {
      this.evolutionProcessLoading = true
      getDeptComBoxByPartsNum({ partsNum: this.partsNum }).then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 200) {
          this.priceSelect = res.data
          this.factoryCode = this.priceSelect.length ? this.priceSelect[0].value : ''
          this.partsAxle()
        } else {
          this.evolutionProcessLoading = false
          iMessage.error(result)
        }
      }).catch(() => {
        this.evolutionProcessLoading = false
      })
    },
    openPartInfo(nodePartsNum) {
      if (nodePartsNum) {
        if (this.partsNum === nodePartsNum) {
          return
        }
        const router = this.$router.resolve({ query: { partsNum: nodePartsNum } })
        window.open(router.href, '_blank')
      } else {
        iMessage.warn('没有零件号')
      }
    },
    oneToMany(caseType, index) {
      const map = {
        1: 1,
        2: -1,
        3: 0,
        4: 0,
      }
      let key = map[caseType];
      // let key = Number(caseType) === 1 ? 1 : -1
      // if(this.partsAxleData[index].nodePartsNum){
      //   key = 0
      // }
      this.clickInfo = this.partsAxleData[index + key]
      this.clickInfo['caseType'] = this.partsAxleData[index].caseType
      this.partInfoShow = true
    },
    manyToMany(caseType, index) {
      const map = {
        1: 1,
        2: -1,
        3: 0,
        4: 0,
      }
      let key = map[caseType];
      // let key = Number(caseType) === 1 ? 1 : -1
      // if(this.partsAxleData[index].nodePartsNum){
      //   key = 0
      // }
      this.clickInfo = this.partsAxleData[index + key]
      this.clickInfo['caseType'] = this.partsAxleData[index].caseType
      this.partInfoMoreToMoreShow = true
    }
  }

}
</script>

<style scoped lang="scss">
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


::v-deep .cardBody {
  padding: 20px 30px;
}

h3 {
  color: #131523;
  font-size: 18px;
  font-weight: bold;
}

.evolutionProcess {
  ::v-deep .cardBody {
    padding: 20px 30px;
  }

  .head {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    ::v-deep .el-button {
      margin-right: 42px;
    }
  }

  .content {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;

    .left {
      font-size: 14px;
      font-weight: bold;
      width: 270px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      h4 {
        margin-top: 26px;
      }

      ::v-deep .el-select {
        font-size: 12px;
        width: 140px;
        margin-left: 10px;
        margin-bottom: 2px;
      }
    }

    .right {
      display: flex;
      overflow-x: auto;
      width: 100%;
      margin-left: 40px;
      margin-right: 50px;
      padding-bottom: 5px;

      .item {
        font-size: 14px;
        text-align: center;
        color: #5F6879;

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

            .icon {
              width: 28px;
              height: 28px;
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
          .roundLine {
            .line:first-of-type {
              background: #ffffff;
            }
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
    }
  }

}
</style>