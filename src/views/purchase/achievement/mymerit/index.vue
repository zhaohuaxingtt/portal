<template>
    <iPage>
        <div class="navBox">
            <iNavMvp :list="tabRouterList" class="margin-bottom20" routerPage :lev="1"/>
            <div class="btnRow">
                <!-- <div class="dw" :class="btnsgroup1.length?'mr40':''"><span v-text="!show?'单位：百万元':'Unit：Mio'"></span></div> -->
                <div class="btnList flex-align-center margin-bottom20">
                    <ul class="btngroup">
                        <li v-for="(items, index) in btnsgroup1"
                            :class="indexBtn == index ? 'active' : ''"
                            :key="index"
                            @click="exchangeSelectState(items,index)">
                            <span>{{ $t(items) }}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div style="height: 100%" v-permission="ACHIEVEMENT_MYBASE">
            <keep-live
                    :include="['zfgsj', 'zfkssj','zfcgysj','zfbmsj','wfbmsj','wfkssj','pfjwfbmsj','pfjwfkssj','pfjzfbmsj','pfjzfcgysj','pfjzfgsj','pfjzfkssj']">
                <component :is="currentView" @getData="getData" :username="username" :supplier_code_name="supplier_code_name"/>
            </keep-live>
        </div>

    </iPage>

</template>

<script>
  import {iPage, iNavMvp, iButton} from 'rise';
  import {tabRouterList, btnsgroup1,} from '../data';
  import {getPowerBiVal,getEklPbi} from '@/api/achievement'
  import * as pbi from 'powerbi-client';
  import zfbmsj from './components/zfbmsj.vue'
  import zfkssj from './components/zfkssj.vue'
  import zfcgysj from './components/zfcgysj.vue'
  import zfgsj from './components/zfgsj.vue'
  import pfjzfbmsj from './components/pfjzfbmsj.vue'
  import pfjzfkssj from './components/pfjzfkssj.vue'
  import pfjzfcgysj from './components/pfjzfcgysj.vue'
  import pfjzfgsj from './components/pfjzfgsj.vue'
  import wfbmsj from './components/wfbmsj.vue'
  import wfkssj from './components/wfkssj.vue'
  import pfjwfkssj from './components/pfjwfkssj.vue'
  import pfjwfbmsj from './components/pfjwfbmsj.vue'

  export default {
    components: {
      iPage,
      iNavMvp,
      iButton,
      zfbmsj,
      zfkssj,
      zfcgysj,
      zfgsj,
      pfjzfbmsj,
      pfjzfkssj,
      pfjzfcgysj,
      pfjzfgsj,
      wfbmsj,
      wfkssj,
      pfjwfkssj,
      pfjwfbmsj
    },
    data() {
      return {
        tabRouterList,
        btnsgroup1: [],
        indexBtn: 0,
        currentView: '',
        username: this.$store.state.permission.userInfo.id,
        url: {
          accessToken: "", //验证token
          embedUrl: "", //报告信息内嵌地址
          tokenExpiry: "", //token过期时间
        },
        report: null,
        name: '',
        filter: {
          $schema: "http://powerbi.com/product/schema#basic",
          target: {
            table: "app_supplier_fin_analysis_sum_nt_daily",
            column: "subject_name"
          },
          operator: "In",
          values: [],//[this.name],// values
          filterType: null,
          requireSingleSelection: true
        },
        values: [],
        show: false,
        state: false, // 控制科室采购员
        roleList: this.$store.state.permission.userInfo.roleList,
        // supplier_code_name: '10012-上海汽车地毯总厂有限公司',
      };
    },
    computed: {
      // 科室
      dept() {
        return this.$store.state.permission.userInfo.deptDTO.deptNum || this.$store.state.permission.userInfo.deptDTO.fullCode
      },
      pfjgly() {
        return this.roleList.some(item => item.code == 'PFJYJGLY')
      },
      // 角色判断
      role() {
        const deptName = this.$store.state.permission.userInfo.deptDTO.deptNum
        if (this.roleList.length == 1) {
          const Linie = this.roleList.some(item => item.code == 'LINIE')
          const zycgkzORkzzl = this.roleList.some(item => item.code == 'ZYCGKZ' || item.code == 'WS2ZYCGKZ' || item.code == 'ZYCGKSXTY')
          const zycgkz = this.roleList.some(item => item.code == 'ZYCGKZ' || item.code == 'WS2ZYCGKZ')
          const kzzl = this.roleList.some(item => item.code == 'ZYCGKSXTY' || item.code == 'ZYCGKSXTDY')
          // const zycgbzORbzzl = this.roleList.some(item => item.code == 'BZZL' || item.code == 'CGBZ')
          const zycgbzORbzzl = this.roleList.some(item => item.code == 'BZZL' || item.code == 'CGBZ' || item.code == 'CSXTGLY')
          const zycgbz = this.roleList.some(item => item.code == 'CGBZ')
          const bzzl = this.roleList.some(item => item.code == 'BZZL')
          const zycggz = this.roleList.some(item => item.code == 'WS2ZYCGGZ' || item.code == 'ZYCGGZ')
          const CGBZ_WF = this.roleList.some(item => item.code == 'CGBZ_WF')
          const ZYCGKZ_WF = this.roleList.some(item => item.code == 'ZYCGKZ_WF')
          const PFJYJGLY = this.roleList.some(item => item.code == 'PFJYJGLY')
//           if(PFJYJGLY) {
// //            this.btnsgroup1 = ['CS(Spare)', 'CSM(Spare)', 'CSEN(Spare)', 'Linie(Spare)']
// //            this.btnsgroup1 = ['CS(Spare)']
//           }else 
          if (Linie) {        // 采购员 采购员视觉
            // this.username = this.$store.state.permission.userInfo.id;
            this.btnsgroup1 = ['Linie', 'Linie(Spare)']
            return 'Linie'
          } else if (zycgkzORkzzl) { // 采购科长||科长助理 科室视觉
            if (zycgkz) {
              // this.username = this.$store.state.permission.userInfo.id;
              this.btnsgroup1 = ['CSM', 'CSM(Spare)']
              return 'KZ'

            }
            if (kzzl) {
              // this.username = this.$store.state.permission.userInfo.id;
              this.btnsgroup1 = [deptName, `${deptName}(Spare)`]
              return deptName
            }
          } else if (zycgbzORbzzl) { // 采购部长||部长助理 部门视觉
            // this.username = this.$store.state.permission.userInfo.id;
            this.btnsgroup1 = ['CS', 'CS(Spare)']
            return 'CS'
          } else if (zycggz) {       // 采购股长 股视觉
            // this.username = this.$store.state.permission.userInfo.id;
            this.btnsgroup1 = [deptName, `${deptName}(Spare)`]
            return deptName
          } else if (CGBZ_WF) {
            this.btnsgroup1 = ['CS', 'CS(Spare)']
            return 'CGBZ_WF'
          } else if (ZYCGKZ_WF) {
            this.btnsgroup1 = ['CSM', 'CSM(Spare)']
            return 'ZYCGKZ_WF'
          }
        } else {
          const Linie = this.roleList.some(item => item.code == 'LINIE') // 采购员
          const KZ = this.roleList.some(item => item.code == 'ZYCGKZ' || item.code == 'WS2ZYCGKZ') // 科长
          const KZZL = this.roleList.some(item => item.code == 'ZYCGKSXTY' || item.code == 'ZYCGKSXTDY') // 科长助理
          const BZ = this.roleList.some(item => item.code == 'CGBZ')      // 部长
          const BZZL = this.roleList.some(item => item.code == 'BZZL')    // 部长助理
          const GZ = this.roleList.some(item => item.code == 'WS2ZYCGGZ' || item.code == 'ZYCGGZ') // 股长
          const PFJYJGLY = this.roleList.some(item => item.code == 'PFJYJGLY')
          const CSXTGLY = this.roleList.some(item => item.code == 'CSXTGLY') // cs系统管理员
          // if(PFJYJGLY) {
          // //  this.btnsgroup1 = ['CS(Spare)', 'CSM(Spare)', 'CSEN(Spare)', 'Linie(Spare)']
          // //  this.btnsgroup1 = ['CS(Spare)']
          // } else 
          if (KZ && Linie) {
            // this.username = this.$store.state.permission.userInfo.id;
            this.btnsgroup1 = ['CSM', 'CSM(Spare)']
            return 'KZ&&linie'
          } else if (KZ && !Linie) {
            // this.username = this.$store.state.permission.userInfo.id;
            this.btnsgroup1 = [deptName, `${deptName}(Spare)`]
            return 'KZ'
          } else if (KZZL && Linie) {
            // this.username = this.$store.state.permission.userInfo.id;
            this.btnsgroup1 = [deptName, `${deptName}(Spare)`, 'Linie', 'Linie(Spare)']
            return `${deptName}&&Linie`
          } else if (KZZL && !Linie) {
            // this.username = this.$store.state.permission.userInfo.id;
            this.btnsgroup1 = [deptName, `${deptName}(Spare)`]
            return deptName
          } else if ((BZ && Linie) || (BZ && !Linie) || (BZZL && !Linie)) {
            this.btnsgroup1 = ['CS', 'CS(Spare)']
            if (BZZL && !Linie) {
              return 'CS'
            } else {
              return 'BZ'
            }

          } else if (BZZL && Linie) {
            // this.username = this.$store.state.permission.userInfo.id;
            this.btnsgroup1 = ['CS', 'CS(Spare)', 'Linie', 'Linie(Spare)']
            return 'CS&&Linie'
          } else if (GZ && Linie) {
            // this.username = this.$store.state.permission.userInfo.id;
            this.btnsgroup1 = [deptName, `${deptName}(Spare)`, 'Linie', 'Linie(Spare)']
            return `${deptName}&&Linie`
          } else if (GZ && !Linie) {
            // this.username = this.$store.state.permission.userInfo.id;
            this.btnsgroup1 = [deptName, `${deptName}(Spare)`]
            return deptName
          } else if (Linie) {
            // this.username = this.$store.state.permission.userInfo.id;
            this.btnsgroup1 = ['Linie', 'Linie(Spare)']
            return 'Linie'
          } else if (CSXTGLY) {
            this.btnsgroup1 = ['CS', 'CS(Spare)']
            return 'CS'
          }
        }
      },
    },

    mounted() {
        // getEklPbil().then(res=>{
        // })
        // console.log('this.$store.state.permission.userInfo.roleList', this.$store.state.permission.userInfo.roleList);
      if(this.pfjgly) {
        this.currentView = 'pfjzfbmsj'
      }else if (this.role == 'CS' || this.role == 'BZ') { // 部门 部长助理||部长
        this.currentView = 'zfbmsj'
      } else if (this.role == 'KZ&&linie' || this.role == 'KZ') { // 科长
        this.currentView = 'zfkssj'
      } else if (this.role == this.dept) { // 股长
        this.currentView = 'zfgsj'
      } else if (this.role == `${this.dept}&&Linie`) { // 股长&&采购员
        this.currentView = 'zfgsj'
      } else if (this.role == 'CSM' || this.role == this.dept) { // 科室
        this.currentView = 'zfkssj'
      } else if (this.role == `${this.dept}&&Linie`) { // 科室&&采购员
        this.currentView = 'zfkssj'
      } else if (this.role == 'Linie') { // 采购员
        this.currentView = 'zfcgysj'
      } else if (this.role == 'CGBZ_WF' || this.role == 'ZYCGKZ_WF') { // 外方部门视图
        if(this.role == 'CGBZ_WF') {
          this.currentView = 'wfbmsj'
        } else {
          this.currentView = 'wfkssj'
        }
        this.show = true
        this.tabRouterList = [{
          value: 1,
          name: '我的业绩',
          url: '/achievement/baseData/mymerit',
          activePath: '/achievement/baseData/mymerit',
          permissionKey: 'ACHIEVEMENT_MYBASE',
          key: 'LK_WDYJ'
        }]
      } else if(this.role == 'CS&&Linie') {
        //  CRW-4185
        this.currentView = 'zfbmsj'
      }
      console.log('this.currentView', this.currentView, this.role);
    },
    methods: {
      getData(data) {
        this.getReportData(data)
      },
      getReportData(data) {
        getPowerBiVal(data).then(res => {
          if (res.result) {
            this.url = res.data
            this.renderBi(data)
          }
        })
      },
      exchangeSelectState(item, index) {
        if (item == 'CS') { // 部门
          if (this.role == 'CGBZ_WF') {
            this.currentView = 'wfbmsj'
          } else {
            this.username = '';  // 为什么要置空？
            this.currentView = 'zfbmsj'
          }
          console.error(item, '===>', this.username, '===>', this.currentView);
        } else if (item == 'CS(Spare)') {
          if (this.role == 'CGBZ_WF') {
            this.currentView = 'pfjwfbmsj';
          } else if (this.role == 'BZ') { // 部长
            // this.username = this.$store.state.permission.userInfo.id;
            this.currentView = 'pfjzfbmsj';
          } else if (this.role == 'CS') { //部长助理
            // this.username = this.$store.state.permission.userInfo.id;
            this.currentView = 'pfjzfbmsj';
          } else {
            // this.username = this.$store.state.permission.userInfo.id;
            this.currentView = 'pfjzfbmsj';
          }
          console.error(item, '===>', this.username, '===>', this.currentView);
        } else if (item == 'CSM') { // 科室
          if (this.role == 'ZYCGKZ_WF') {
            this.currentView = 'wfkssj'
          } else if (this.role == 'KZ') {
            // this.username = this.$store.state.permission.userInfo.id;
            this.currentView = 'zfkssj'
          } else if (this.role == `${this.dept}&&Linie` || this.role == 'CSM') {
            // this.username = this.$store.state.permission.userInfo.id;
            this.currentView = 'zfkssj'
          }
        } else if (item == 'CSM(Spare)') {
          if (this.role == 'ZYCGKZ_WF') {
            this.currentView = 'pfjwfkssj'
          } else {
            // this.username = this.$store.state.permission.userInfo.id;
            if (this.role == `${this.dept}&&Linie` || this.role == 'CSM') {
              // this.username = this.$store.state.permission.userInfo.id;
            }
            this.currentView = 'pfjzfkssj'
          }
        } else if (item == 'CSEN(Spare)') { // 股长
          // this.username = this.$store.state.permission.userInfo.id;
          if (this.role == 'CSEN&&Linie') {
            // this.username = this.$store.state.permission.userInfo.id;
          }
          this.currentView = 'pfjzfgsj'
        } else if (item == 'CSEN') { // 股长
          // this.username = this.$store.state.permission.userInfo.id;
          this.currentView = 'zfgsj'
        } else if (item == 'Linie') { // 采购员视觉
          if (this.role == 'Linie') { // 采购员
            // this.username = this.$store.state.permission.userInfo.id;
          } else if (this.role == 'CSEN&&Linie' || this.role == 'CSEN') { // 股长&&采购员 || 股长
            // this.username = this.$store.state.permission.userInfo.id;
          } else if (this.role == 'CS&&Linie') { // 部长助理&&采购员
            // this.username = this.$store.state.permission.userInfo.id;
          } else if (this.role == `${this.dept}&&Linie`) { // 科长助理&&采购员
            // this.username = this.$store.state.permission.userInfo.id;
          }
          this.currentView = 'zfcgysj'
        } else if (item == 'Linie(Spare)') { // 采购员附件视觉
          // this.username = this.$store.state.permission.userInfo.id;
          if (this.role == 'CSEN&&Linie') { // 股长&&采购员
            // this.username = this.$store.state.permission.userInfo.id;
          } else if (this.role == 'Linie') { // 采购员
            // this.username = this.$store.state.permission.userInfo.id;
          }
          this.currentView = 'pfjzfcgysj'
        } else if (item == `${this.dept}(Spare)` || item == this.dept) {
          if(item == this.dept) {
            // this.username = this.$store.state.permission.userInfo.id;
            this.currentView = 'zfkssj'
          } else {
            // this.username = this.$store.state.permission.userInfo.id;
            this.currentView = 'pfjzfkssj'
          }
        }
        this.indexBtn = index;
      },
      // 初始化页面
      renderBi() {
        var permissions = pbi.models.Permissions.All
        var config = {
          type: 'report',
          tokenType: pbi.models.TokenType.Embed,
          accessToken: this.url.accessToken,
          embedUrl: this.url.embedUrl,
          settings: {
            panes: {
              filters: {
                visible: false
              },
              pageNavigation: {
                visible: false
              }
            }
          }
        };
        let powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
        var reportContainer = document.getElementById('powerBi');
        var report = powerbi.embed(reportContainer, config);
        // 主题颜色
        var themeJsonObject = {
          "name": "Customer_Color",
          "dataColors":
            [
              "#311B92", "#4527A0", "#512DA8", "#5E35B1", "#673AB7", "#7E57C2", "#9575CD", "#B39DDB", "#D1C4E9", "#EDE7F6",
              "#1A237E", "#283593", "#303F9F", "#3949AB", "#3F51B5", "#5C6BC0", "#7986CB", "#9FA8DA", "#C5CAE9", "#E8EAF6",
              "#01579B", "#0277BD", "#0288D1", "#039BE5", "#03A9F4", "#29B6F6", "#4FC3F7", "#81D4FA", "#B3E5FC", "#E1F5FE",
              "#006064", "#00838F", "#0097A7", "#00ACC1", "#00BCD4", "#26C6DA", "#4DD0E1", "#80DEEA", "#B2EBF2", "#E0F7FA",
              "#004D40", "#00695C", "#00796B", "#00897B", "#009688", "#26A69A", "#4DB6AC", "#80CBC4", "#B2DFDB", "#E0F2F1",
              "#1B5E20", "#2E7D32", "#388E3C", "#43A047", "#4CAF50", "#66BB6A", "#81C784", "#A5D6A7", "#C8E6C9", "#E8F5E9",
              "#827717", "#9E9D24", "#AFB42B", "#C0CA33", "#CDDC39", "#D4E157", "#DCE775", "#E6EE9C", "#F0F4C3", "#F9FBE7",
              "#FF6F00", "#FF8F00", "#FFA000", "#FFB300", "#FFC107", "#FFCA28", "#FFD54F", "#FFE082", "#FFECB3", "#FFF8E1",
              "#BF360C", "#D84315", "#E64A19", "#F4511E", "#FF5722", "#FF7043", "#FF8A65", "#FFAB91", "#FFCCBC", "#FBE9E7",
              "#880E4F", "#AD1457", "#C2185B", "#D81B60", "#E91E63", "#EC407A", "#F06292", "#F48FB1", "#F8BBD0", "#FCE4EC"
            ],
          "background": "#FFFFFF",
          "foreground": "#070f25",
          "tableAccent": "#0F1934"
        };
        report.on("pageChanged", async function (event) {
          report.applyTheme({themeJson: themeJsonObject});
        });
        var myDate = new Date();
        var year = myDate.getFullYear();
        var month = myDate.getMonth() + 1
        var date = myDate.getDate()
        var materialCode = "";
        var materialName = "";
        var supplier_code_name = this.$route.query.supplier_code_name || '';
        if(this.$route.query.materialCode){
          materialCode = this.$route.query.materialCode;
          materialName = this.$route.query.materialName;
        }
        if (date < 10) {
          month = month - 1
        }
        month = month >= 10 ? month + '' : '0' + month;
        report.on("loaded", async function () {
          var version_parameter = {
            $schema: "http://powerbi.com/product/schema#basic",
            target: {
              table: "app_proc_ekl_data_source",
              column: "data_version"
            },
            operator: "In",
            values: [year+""+month],
            filterType: pbi.models.FilterType.BasicFilter
          };
          var year_parameter = {
            $schema: "http://powerbi.com/product/schema#basic",
            target: {
              table: "app_proc_ekl_data_source",
              column: "data_year"
            },
            operator: "In",
            values: [year],
            filterType: pbi.models.FilterType.BasicFilter
          };
          console.log('year_parameteryear_parameter', year_parameter);
          var	material_group_parameter = {
              $schema: "http://powerbi.com/product/schema#basic",
              target: {
                table: "app_proc_ekl_data_source",
                column: "material_group_code_name"
              },
              operator: "In",
              values: [materialName],
              filterType: pbi.models.FilterType.BasicFilter
          };

          var	supplier_code_name_parameter = {
								$schema: "http://powerbi.com/product/schema#basic",
								target: {
									table: "app_proc_ekl_data_source",
									column: "supplier_code_name"
								},
								operator: "In",
								values: [supplier_code_name],
                filterType: pbi.models.FilterType.BasicFilter
						};
          console.log(supplier_code_name_parameter);

          const pages = await report.getPages();
          var page = pages.filter(function (page) {
            return page.isActive
          })[0];
          const visuals = await page.getVisuals();
          visuals.filter(function (visual) {
            //设置多个默认条件
            if ((visual.title == "data_version") && page.isActive == true) {
              visual.setSlicerState({
                filters: [version_parameter]
              });
            }
            if (visual.title == "data_year" && page.isActive == true) {
              visual.setSlicerState({
                filters: [year_parameter]
              });
            }

            if(visual.title == "material_group" && page.isActive==true){
              visual.setSlicerState({
                filters: [material_group_parameter]
              });				    							    						    		
            }
            
            //  供应商
            if(page.isActive == true && supplier_code_name){
              visual.setSlicerState({
                filters: [supplier_code_name_parameter]
              });				    							    						    		
            }
          });
        });
        this.report = report
      },
    },
  };
</script>

<style scoped lang="scss">
    .navBox {
        position: relative;
        height: 60px;
        .btnRow {
            position: absolute;
            right: 0;
            top: 0px;
            .btnList {
                display: inline-block;
                .btngroup {
                    display: flex;
                    flex-direction: row;
                    cursor: pointer;
                    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.08);
                    opacity: 1;
                    border-radius: 10px;
                    > li {
                        font-size: 16px;
                        width: 104px;
                        height: 35px;
                        line-height: 35px;
                        background: #F5F6F7;
                        text-align: center;
                        color: #727272;
                        &:first-child {
                            border-radius: 10px 0px 0px 10px;
                        }
                        &:last-child {
                            border-radius: 0px 10px 10px 0px;
                        }

                    }
                    > li.active {
                        color: #67C23A;
                        font-weight: bold;
                        background: #FFFFFF;
                    }
                }
            }
            .dw {
                display: inline-block;
                width: 104px;
                height: 20px;
                font-size: 14px;
                text-align: right;
                font-family: Arial;
                font-weight: 400;
                line-height: 16px;
                color: #6D7B96;
                letter-spacing: 2px;
            }
        }
    }

    .mr40 {
        margin-right: 40px;
    }

    #powerBi {
        width: 100%;
        height: 100%;
    }

    ::v-deep #powerBi iframe {
        border: solid 1px #eee !important;
    }
</style>
