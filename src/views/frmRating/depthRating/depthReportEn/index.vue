<!--
 * @author: shujie
 * @createTime: 2021-5-24 14:13:09
 * @Description:深评报告
 -->
<template>
  <iPage >
    <div class="navBox flex-between-center">
      <!-- <span class="title">{{$t("SPR_FRM_DEP_DEPREPORT")}}</span> -->
      <iNavMvp :list="depthReportRouter"
               :lev='1'
               routerPage
               :query="query" />
      <div class="flex-align-center">
        <iNavMvp :list="interViewTabList"
                 :lev='2'
                 right
                 class="rightNav"
                 @change="changeNav" />
        <!--保存-->
        <iButton :disabled="$route.query.status=='报告审批中'||$route.query.status=='生效'||$route.query.status=='终止'||$route.query.status=='终止审批中'||$route.query.status=='历史'" class="margin-left30"
                 @click="save">{{ $t('LK_BAOCUN') }}</iButton>
        <iButton v-if="$route.query.status=='报告完成'||$route.query.status=='报告审批驳回'"  @click="submit">{{ $t('SPR_FRM_DEP_TJSH') }}</iButton>
				<iButton @click='openMeeting'>{{ $t('SPR_FRM_DEP_EXPORT') }}</iButton>
        <!--查看财报分析结果-->
        <iButton @click="jumpFinancialAnalysis()">{{ $t('SPR_FRM_DEP_CKCWFXJG') }}</iButton>
      </div>
    </div>
    <basic id="content" v-if="currentNav==1"
           ref="basic"></basic>
    <business v-else-if="currentNav==2"
              ref="business"></business>
    <finance v-else-if="currentNav==3"
             ref="finance"></finance>
  </iPage>
</template>

<script>
import { iPage, iNavMvp, iButton ,iMessage} from 'rise';
import { interViewTabList } from './data';
import basic from './components/basic';
import business from './components/business';
import finance from './components/finance';
import { postExamine } from '@/api/frmRating/depthRating/depthReport.js'
import { depthReportRouter } from "../components/data"
import { downloadPDF, dataURLtoFile } from "@/utils/pdf";
import { uploadUdFile } from "@/api/file/upload";
export default {
  components: {
    iPage,
    iNavMvp,
    iButton, basic, business, finance
  },
  data () {
    return {
      interViewTabList,
      depthReportRouter,
      currentNav: 1,
      meeting: false,//会议纪要,
      id: '',
      name: '',
      supplierId: "",
     status:''
    };
  },
  computed: {
    query () {
         return { id: this.id, name: this.name, supplierId: this.supplierId,status:this.status }
    }
  },
  mounted () {
    this.id = this.$route.query.id;
    this.name = this.$route.query.name;
    this.supplierId = this.$route.query.supplierId;
     this.status = this.$route.query.status;
  },
  methods: {
    changeNav (val) {
      if (this.currentNav != val.value) {
        this.save()
        this.currentNav = val.value;
      }
    },
    // 打开会议纪要弹窗
    openMeeting () {
          this.$nextTick(() => {
        setTimeout(() => {
          downloadPDF({
            idEle: "content",
            pdfName: this.$route.query.name.replaceAll(/\./g, '_'),
            exportPdf: true,
            callback: async (pdf, pdfName) => {
              try {
                const filename = pdfName.replaceAll(/\./g, '_') + ".pdf";
                const pdfFile = pdf.output("datauristring");
                const blob = dataURLtoFile(pdfFile, filename);
                uploadUdFile({
                  applicationName: 'sourcing',
                  businessId: Math.ceil(Math.random() * 100000),
                  multifile: blob
                }).then(() => {
                  iMessage.success("生成成功");
                });
              } catch {
                iMessage.err("生成失败");
              }
            },
          });
        }, 20)
      })
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
</style>
