<template>
    <iCard class="baseInfo" v-loading="pageLoading">

        <div class="head">
            <div class="title">{{ language('LK_JICHUXINXI', '基础信息') }}</div>
            <div class="h-lables" v-if="pageData">
                <div class="lable" v-if="~~pageData.isMtz === 1">MTZ</div>
                <div class="lable" v-if="~~pageData.isAccessoriesParameter === 1">Spare</div>
                <div class="lable" v-if="~~pageData.isDb === 1">DB</div>
                <div class="lable" v-if="~~pageData.isTotal === 1">Assembly</div>
                <div class="lable" v-if="~~pageData.isMouldShare === 1">Tooling</div>
                <div class="lable" v-if="~~pageData.isDevFee === 1">Development</div>
                <div class="lable" v-if="~~pageData.isSecondary === 1">二次件</div>
            </div>
            <div class="h-r">
                <transition>
                    <i class="el-icon-arrow-down icon" @click="openPage" :class="{rotate:isOpen}"></i>
                </transition>
            </div>
        </div>

        <div class="line1">
            <div class="line1">
                <div class="title">{{ language('LK_CAILIAOZU', '材料组') }}：</div>
                <div class="content-box">
                    {{pageData && pageData.categoryName}}
                </div>
            </div>
            <div class="line1">
                <div class="title">{{ language('LK_KESHI', '科室') }}：</div>
                <div class="content-box">
                    {{pageData && pageData.deptName}}
                </div>
            </div>
        </div>

        <div class="line1">
            <div class="title">{{ language('LK_CAIGOUGONGCHANG', '采购工厂') }}：</div>
            <div class="content-box">
                {{pageData && pageData.factoryName}}
            </div>
        </div>

        <div class="line1">
            <div class="line1">
                <div class="title">{{ language('LK_QIANQICAIGOU', '前期采购') }}：</div>
                <div class="content-box">
                    {{pageData && pageData.earlyLinie}}
                </div>
            </div>
            <div class="line1">
                <div class="title">Linie：</div>
                <div class="content-box">
                    {{pageData && pageData.linie}}
                </div>
            </div>
        </div>

        <template v-if="isOpen">
            <div class="line1">
                <div class="line1">
                    <div class="title">{{ language('LK_PEIJIANQIANQI', '配件前期') }}：</div>
                    <div class="content-box">
                        {{pageData && pageData.earlyEmployee}}
                    </div>
                </div>
                <div class="line1">
                    <div class="title">{{ language('LK_ZHIBAO', '质保') }}：</div>
                    <div class="content-box">
                        {{pageData && pageData.qualityEmployee}}
                    </div>
                </div>
            </div>
            <div class="line1">
                <div class="line1">
                    <div class="title">EP：</div>
                    <div class="content-box">
                        {{pageData && pageData.epEmployee}}
                    </div>
                </div>
                <div class="line1">
                    <div class="title">{{ language('LK_EP_SHOUHOU', 'EP售后') }}：</div>
                    <div class="content-box">
                        {{pageData && pageData.epSalesEmployee}}
                    </div>
                </div>
            </div>
            <div class="line1">
                <div class="line1">
                    <div class="title">{{ language('LK_PILIANGWULIU', '批量物流') }}：</div>
                    <div class="content-box">
                        {{pageData && pageData.batchEmployee}}
                    </div>
                </div>
                <div class="line1">
                    <div class="title">{{ language('LK_PEIJIANWULIU', '配件物流') }}：</div>
                    <div class="content-box">
                        {{pageData && pageData.accessoriesEmployee}}
                    </div>
                </div>
            </div>
            <div class="line1">
                <div class="line1">
                    <div class="title">{{ language('LK_RISE_HETONGHAO', 'RISE合同号') }}：</div>
                    <div class="content-box">
                        {{pageData && pageData.contractCode}}
                    </div>
                </div>
                <div class="line1">
                    <div class="title">{{ language('LK_JIEZHIRIQI', '截至日期') }}：</div>
                    <div class="content-box">
                        {{pageData && pageData.endDate}}
                    </div>
                </div>
            </div>
            <div class="line1">
                <div class="line1">
                    <div class="title">{{ language('LK_SAP_HETONGHAO', 'SAP合同号') }}：</div>
                    <div class="content-box link" @click="jumpOrderDetails(pageData&&pageData.contractSapCode)">
                        {{pageData && pageData.contractSapCode}}
                    </div>
                </div>
                <div class="line1">
                    <div class="title">{{ language('LK_MOJUHETONGHAO', '模具合同号') }}：</div>
                    <div class="content-box link" @click="jumpContract(pageData&&pageData.contractMouldCode)">
                        {{pageData && pageData.contractMouldCode}}
                    </div>
                </div>
            </div>
        </template>

        <div class="line1">
            <div class="title">{{ language('LK_PINGPAI', '品牌') }}：</div>
            <div class="content-box">
                {{pageData && pageData.someBrand}}
            </div>
        </div>

        <div class="line1">
            <div class="title">{{ language('LK_CHEXING', '车型') }}：</div>
            <div class="content-box">
                {{pageData && pageData.someCartype}}
            </div>
        </div>

        <template v-if="isOpen">
            <div class="line1">
                <div class="title">{{ language('LK_CENGYONGCHEXING', '曾用车型') }}：</div>
                <div class="content-box oldLink">
                    {{pageData && pageData.someUsedCartype}}
                </div>
            </div>
            <div class="line1">
                <div class="line1">
                    <div class="title">{{ language('LK_LINGJIANZHONGLIANG', '零件重量') }}：</div>
                    <div class="content-box">
                        {{pageData && pageData.partsWeight ? pageData.partsWeight + 'kg' : ''}}
                    </div>
                </div>
                <div class="line1">
                    <div class="title">{{ language('LK_LINGJIANCHANG', '零件长') }}：</div>
                    <div class="content-box">
                        {{pageData && pageData.length ? pageData.length + 'mm' : ''}}
                    </div>
                </div>
            </div>
            <div class="line1">
                <div class="line1">
                    <div class="title">{{ language('LK_LINGJIANKUAN', '零件宽') }}：</div>
                    <div class="content-box">
                        {{pageData && pageData.wide ? pageData.wide + 'mm' : ''}}
                    </div>
                </div>
                <div class="line1">
                    <div class="title">{{ language('LK_LINGJIANGAO', '零件高') }}：</div>
                    <div class="content-box">
                        {{pageData && pageData.high ? pageData.high + 'mm' : ''}}
                    </div>
                </div>
            </div>
        </template>


    </iCard>
</template>

<script>
  import {iCard, iSearch, icon, iMessage} from 'rise';
  import {findPartsInfo, getLatestOrderId} from '@/api/partLifeCycle';

  export default {
    name: 'baseInfo',
    components: {
      iCard, icon
    },

    data() {
      return {
        isOpen: false,
        pageLoading: false,
        pageData: null,
        partsNum: '',
        baseUrl: process.env.NODE_ENV == 'dev' ? 'http://10.122.17.38' : process.env.NODE_ENV != 'production' ? process.env.VUE_APP_HOST : 'http://rise-nginx-internal.apps.vmocp-test.csvw.com'
      }
    },

    created() {
      this.partsNum = this.$route.query.partsNum
      this.findPartsInfo();
    },

    methods: {
      handleJumpData(data) {
        let path = '';
        const {id, isOrder, type} = data;
        console.log(data)
        if (type) {
          if (type == 55) {
            path = `ws2/createbatchframework?frameItemTye=${type}&type=1&scheduleAgreementId=${id}`;
          }//  批量件
          else if (type == 411) {
            path = `ws2/order/Outsourcing/details/OutsourcingOrderDetails/1/${id}`;
          }//  工序委外
          else if (type == 42) {
            path = `ws2/modeler/details/ModelOrderDetailsPage/1/${id}`;
          }//  模具订单
          else if (type == 'db' || type == 52) {
            path = `ws2/dbframework/create?isSelf=1&frameItemTye=${type}&type=1&scheduleAgreementId=${id}`;
          } //  db框架
          else if (type == 'spare') {
            path = `ws2/framedetail?frameItemTye=${type}&scheduleAgreementId=${id}&status=formal`;
          }   //  配附件
          else if (type == 'steel' && isOrder) {
            path = `ws2/steel/components/order/SteelOrderDetailsPage/1/${id}`;
          }  //  钢材订单
          else if (type == 'steel' && !isOrder) {
            path = `ws2/steel/components/frame/SteelFrameDetailsPage/1/${id}`;
          } //  钢材框架
          else {
            return iMessage.error(`${type}类型的订单无法跳转！`)
          }
        } else {
          return iMessage.error('返回数据类型不存在，无法跳转！')
        }
        console.log(path)
        if (path) window.open(this.baseUrl + `/order/#/${path}`, '_blank');
      },

      jumpOrderDetails(code) {
        getLatestOrderId({
          contractCode: '',
          // contractSapCode: '5500060048'
          contractSapCode: code,
        }).then(res => {
          this.handleJumpData(res.data);
        })
      },

      //  跳转合同号
      jumpContract(code) {
        getLatestOrderId({
          contractCode: code,
          contractSapCode: ''
          // contractSapCode: code,
        }).then(res => {
          this.handleJumpData(res.data);
        })
      },

      findPartsInfo() {
        this.pageLoading = true;
        findPartsInfo({
          partsNum: this.partsNum
        }).then(res => {
          this.pageData = res.data;
          let title = ''
          if (this.pageData.partsNumNameZh && this.pageData.partsNumNameDe) {
            title = this.partsNum + '-' + this.pageData.partsNumNameZh + this.pageData.partsNumNameDe
          }
          if (this.pageData.partsNumNameZh && !this.pageData.partsNumNameDe) {
            title = this.partsNum + '-' + this.pageData.partsNumNameZh
          }
          if (!this.pageData.partsNumNameZh && this.pageData.partsNumNameDe) {
            title = this.partsNum + '-' + this.pageData.partsNumNameDe
          }
          if (!this.pageData.partsNumNameZh && !this.pageData.partsNumNameDe) {
            title = this.partsNum
          }
          this.$emit('getHeaderTitle', title)
          this.pageLoading = false;
        }).catch(() => {
          this.pageLoading = false;
        })
      },

      openPage() {
        this.isOpen = !this.isOpen;
      }
    }
  }
</script>

<style scoped lang="scss">
    .baseInfo {
        margin-bottom: 20px;

        .rotate {
            transform: rotate(180deg);
            top: -16px !important;
        }

        .line1 {
            display: flex;
            align-items: flex-start;
            flex: 1;
            margin-bottom: 20px;

            .oldLink {
                color: #777777;
            }

            .link {
                color: #1660F1;
                cursor: pointer;
                text-decoration: underline;
            }

            .content-box {
                font-size: 14px;
                width: calc(100% - 100px);
            }

            .title {
                /*width: 120px;*/
                /*overflow:hidden;*/
                /*text-overflow:ellipsis;*/
                /*white-space:nowrap;*/
                margin-right: 5px;
                font-size: 14px;
            }
        }

        .h-r {

            .icon {
                width: 25px;
                height: 14px;
                color: #D3D3DB;
                cursor: pointer;
                transform-origin: 10px 8px;
            }
        }

        .h-lables {
            display: flex;
            align-items: center;
            flex-wrap: wrap;

            .lable {
                width: auto;
                height: 20px;
                background-color: #65C8D4;
                color: #fff;
                padding: 0 5px;
                border-radius: 5px;
                margin-left: 10px;
                margin-bottom: 10px;
            }
        }

        .title {
            font-size: 18px;
            font-weight: bold;
            color: #131523;
            white-space: nowrap;
        }

        .h-l {
            display: flex;
            align-items: center;

        }

        .head {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
        }
    }
</style>