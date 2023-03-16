<!--
 * @author: shujie
 * @createTime: 2021-5-24 14:13:09
 * @Description:深评报告
 -->
<template>
  <iPage>
    <div class="navBox flex-between-center">
      <!-- <span class="title">{{$t("SPR_FRM_DEP_DEPREPORT")}}</span> -->
      <iNavMvp :list="depthReportRouter"
               :lev='1'
               routerPage
               :query="query" />
      <div class="flex-align-center">
        <iNavMvp v-if="$route.query.isLocal"
                 :list="interViewTabList"
                 :lev='2'
                 right
                 class="rightNav"
                 @change="changeNav" />
        <iNavMvp v-if="!$route.query.isLocal"
                 :list="interViewTabListNo"
                 :lev='2'
                 right
                 class="rightNav"
                 @change="changeNav" />
        <!--保存-->
        <iButton :disabled="$route.query.status=='报告审批中'||$route.query.status=='生效'||$route.query.status=='终止'||$route.query.status=='终止审批中'||$route.query.status=='历史'"
                 class="margin-left30"
                 v-permission="PORTAL_SUPPLIER_NAV_SHENRUPINGJI_SPBG_BAOCUN"
                 @click="save">{{ $t('LK_BAOCUN') }}</iButton>
        <iButton v-if="$route.query.status=='报告完成'||$route.query.status=='报告审批驳回'"
                 @click="submit" v-permission="PORTAL_SUPPLIER_NAV_SHENRUPINGJI_SPBG_TIJIAOSHENHE">{{ $t('SPR_FRM_DEP_TJSH') }}</iButton>
        <iButton @click='openMeeting' v-permission="PORTAL_SUPPLIER_NAV_SHENRUPINGJI_SPBG_DAOCHU">{{ $t('SPR_FRM_DEP_EXPORT') }}</iButton>
        <!--查看财报分析结果-->
        <iButton @click="jumpFinancialAnalysis()" v-permission="PORTAL_SUPPLIER_NAV_SHENRUPINGJI_SPBG_CKCWFXJG">{{ $t('SPR_FRM_DEP_CKCWFXJG') }}</iButton>
      </div>
    </div>

    <!-- 表格 -->
    <!-- v-show="false" -->
    <el-row :gutter="50"
            v-show="echartsType">
      <el-col :span="14">
        <!-- 主营业务及客户情况 -->
        <iCard title="主营业务及客户情况"
               class="margin-top20">
          <el-row :gutter="10">
            <el-col :span="12">
              <ring id="myChart"
                    :chartData="info.mainCustomerList" />
            </el-col>
            <el-col :span="12">
              <ring id="myChart"
                    :chartData="info.mainProductList" />
            </el-col>
          </el-row>
        </iCard>
      </el-col>
      <el-col :span="10">
        <iCard title="TO情况"
               class="margin-top20">
          <bar id="myChart"
               :chartData="info.toList" />
        </iCard>
      </el-col>
    </el-row>
    <img class="car_img"
         v-show="echartsType"
         :src="imgUrl==1?require('@/assets/images/红@3x.png'):imgUrl==2?require('@/assets/images/黄@3x.png'):imgUrl==3?require('@/assets/images/绿灯.png'):''"
         :fit="fit" />

    <basic id="content"
           v-if="currentNav==1"
           ref="basic"></basic>
    <business v-else-if="currentNav==2"
              ref="business"></business>
    <finance v-else-if="currentNav==3"
             ref="finance"></finance>
  </iPage>
</template>

<script>
import { iPage, iNavMvp, iButton, iMessage } from 'rise';
import { interViewTabList,interViewTabListNo } from './data';
import basic from './components/basic';
import business from './components/business';
import finance from './components/finance';
import { postExamine, getCompanyOverview, getSummarize, exportDeep } from '@/api/frmRating/depthRating/depthReport.js'
import { depthReportRouter } from "../components/data"
// import { downloadPDF, dataURLtoFile } from "@/utils/pdf";
// import { uploadUdFile } from "@/api/file/upload";
import { domSave, imgSave } from "@/utils/utils"
import ring from './components/ring'
import bar from './components/bar'

export default {
  components: {
    iPage,
    iNavMvp,
    iButton, basic, business, finance,
    ring,
    bar
  },
  data () {
    return {
      interViewTabList,
      interViewTabListNo,
      depthReportRouter,
      currentNav: 1,
      meeting: false,//会议纪要,
      id: '',
      name: '',
      supplierId: "",
      status: '',
      isLocal:"",

      info: {
        supplier: {}
      },
      imgUrl: '',
      echartsType: true,
      loading: null
    };
  },
  computed: {
    query () {
      return { id: this.id, name: this.name, supplierId: this.supplierId, status: this.status,isLocal:this.isLocal }
    }
  },
  created () {
    this.loading = this.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(255,255,255,0.7)'
    });
  },
  mounted () {
    this.id = this.$route.query.id;
    this.name = this.$route.query.name;
    this.supplierId = this.$route.query.supplierId;
    this.status = this.$route.query.status;
    this.isLocal = this.$route.query.isLocal;

    this.getOverView();
  },
  methods: {
    getOverView () {
      getSummarize(this.$route.query.id, 'zh').then((result) => {
        if (result.data) {
          let color = result.data.deepCommentRatingResults;
          switch (color) {
            case "RED":
              this.imgUrl = 1
              break;
            case "YELLOW":
              this.imgUrl = 2
              break;
            case "GREEN":
              this.imgUrl = 3
              break;
            case "":
              this.imgUrl = ""
              break;
          }
        }
      }).catch(() => {

      });


      getCompanyOverview(this.$route.query.id).then((result) => {
        if (result && result.data !== null) {
          this.info = result.data
          this.echartsType = false;
          this.loading.close()
        }
      }).catch((err) => {

      });
    },





    changeNav (val) {
      if (this.currentNav != val.value) {
        if(this.$route.query.status=='报告审批中'||this.$route.query.status=='生效'||this.$route.query.status=='终止'||this.$route.query.status=='终止审批中'||this.$route.query.status=='历史'){
          this.currentNav = val.value;
        }else{
          this.save()
          this.currentNav = val.value;
        }
      }
    },
    // 打开会议纪要弹窗
    openMeeting () {
      var echartsBase64 = domSave("#myChart")
      var imgBase64 = imgSave(".car_img")

      var loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(255,255,255,0.7)'
      });
      exportDeep({
        deepCommentSupplierId: this.$route.query.id,
        oneImage: echartsBase64[0].split(",")[1],
        twoImage: echartsBase64[1].split(",")[1],
        threeImage: echartsBase64[2].split(",")[1],
        results: imgBase64[0].split(",")[1],
        lang: "en"
      }).then(res => {
        let blob = new Blob([res], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });
        let objectUrl = URL.createObjectURL(blob);
        let link = document.createElement("a");
        link.href = objectUrl;
        let fname = "深入评级报告.pdf";
        link.setAttribute("download", fname);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        iMessage.success("导出成功！")
        loading.close();
      }).catch(red => {
        loading.close();
      })




      // this.$nextTick(() => {
      //   setTimeout(() => {
      //     downloadPDF({
      //       idEle: "content",
      //       pdfName: this.$route.query.name.replaceAll(/\./g, '_'),
      //       exportPdf: true,
      //       callback: async (pdf, pdfName) => {
      //         try {
      //           const filename = pdfName.replaceAll(/\./g, '_') + ".pdf";
      //           const pdfFile = pdf.output("datauristring");
      //           const blob = dataURLtoFile(pdfFile, filename);
      //           uploadUdFile({
      //             applicationName: 'sourcing',
      //             businessId: Math.ceil(Math.random() * 100000),
      //             multifile: blob
      //           }).then(() => {
      //             iMessage.success("生成成功");
      //           });
      //         } catch {
      //           iMessage.err("生成失败");
      //         }
      //       },
      //     });
      //   }, 20)
      // })
    },
    save () {
      let page = 'basic'
      if (this.currentNav === 2) {
        page = 'business'
      } else if (this.currentNav === 3) {
        page = 'finance'
      }
      this.$refs[page].postOverView()
    },
    submit () {
      postExamine({
        ids: ['' + this.id]
      }).then((result) => {
        if (result.code == 200) {
          this.$message.success(result.desZh)
          this.getOverView()
        } else {
          this.$message.error(result.desZh)
        }
      }).catch((err) => {

      });
    },
    // 查看财报分析
    jumpFinancialAnalysis () {
      // this.$router.push('/supplier/frmrating/depthRating/financialAnalysis')
      let routeData = this.$router.resolve({
        path: "/supplier/frmrating/depthRating/financialAnalysis",
        query: {
          id: this.id,
          name: this.name,
          supplierId: this.supplierId
        }
      });
      window.open(routeData.href)
    }
  }
};
</script>

<style scoped lang="scss">
.title {
  font-weight: bold;
  font-size: 20px;
  color: $color-black;
}
.car_img {
  width: 12px;
  height: 12px;
}
</style>
