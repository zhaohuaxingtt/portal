<!--
 * @Author: your name
 * @Date: 2021-09-13 16:13:59
 * @LastEditTime: 2021-10-22 16:09:44
 * @LastEditors: zbin
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\supplierManagement\NTier\alarmLetter\index.vue
-->

<template>
  <iPage class="alarmLetter">
    <div id="content">
      <div class="header">
        <span class="title">{{language('GONGYINGSHANGGONGHUOJINGQUEBAOJINGXINXIBIAO','供应商供货紧缺报警信息表')}}</span>
        <div v-show="!downLoadFlag">
          <iButton @click="tSave">
            {{language('ZANCUN','暂存')}}
          </iButton>
          <uploadButton ref="uploadButtonAttachment" :buttonText="language('SHANGCHUANBAOJINGXIN', '上传报警信')" :uploadByBusiness="true" @uploadedCallback="handleUploadForm($event)" class="margin-left20" />
          <iButton @click="download" class="margin-left20">
            {{language('XIAZAIBAOJINGXIN','下载报警信')}}
          </iButton>
          <iButton @click="handleSubmit" class="margin-left20">
            {{language('TIJIAO','提交')}}
          </iButton>

          <!-- <iButton @click="submit">
            提交
          </iButton> -->
        </div>
      </div>
      <iCard style="margin-top:20px" :body-style="{ padding: '20px' }" class="cardItem">
        <div class="formItem">
          <label for="">{{language('BAOJINGFABUDUIXIANG','报警发布对象：')}}</label>
          <div class="flex earlyWarning">
            <el-tag v-for="item in csssList" :key="item.id" color="#409EFF">
              <span style="color:#fff">csss-{{item.userName}}</span>
            </el-tag>
            <el-tag v-for="item in plrdList" :key="item.id" color="#409EFF">
              <span style="color:#fff">PLRD-{{item.userName}}</span>
            </el-tag>
            <el-tag v-for="item in mulitList" :key="item.userId" color="#409EFF" closable @close="handleCloseTag(item)">
              <span style="color:#fff">{{item.userName}}</span>
            </el-tag>
            <iButton :disabled="linieList.length===mulitList.length" icon="el-icon-circle-plus-outline" type="info" size="mini" v-show="!downLoadFlag" plain @click="addPerson">{{language('TIANJIACAIGOUYUAN','添加采购员')}}</iButton>
          </div>
        </div>
        <div class="formItem">
          <label for="">{{language('QITASOUJIANREN','其他收件人：')}}</label>
          <el-autocomplete class="inline-input" v-model="cSubcategoryNo" :fetch-suggestions="querySearch" :placeholder="language('QINGSHURUSHANGQIDAZONGNEIBUYOUXIANGCOM','请输入上汽大众内部邮箱@csvw.com')" @select="handleSelect" @change="handleFocus">
            <el-tag v-for="tag in selected" closable slot="prepend" class="tag" :disable-transitions="true" :key="tag" size="mini" type="info" @close="handleClose(tag)">
              <span class="el-select__tags-text">{{ tag }}</span>
            </el-tag>
          </el-autocomplete>
        </div>
      </iCard>
      <iCard style="margin-top:20px" class="cardItem">
        <template v-slot:header>
          <div class="flex header">
            <span class="title">{{language('GONGYINGSHANGJIBENXINGXI','供应商基本信息')}}</span>
            <span class="date">{{language('TIANBIAORIQI','填表日期：')}}{{fillingDate}}</span>
          </div>
        </template>
        <div>
          <!-- 供应商基本信息 -->
          <supplierBasicInfo  ref="supplierBasicInfo" :supplierId="supplierId" :editMode="editMode" :isTurnoverStore="isTurnoverStore" :downLoadFlag="downLoadFlag" :warningLetterProductAddressList="warningLetterProductAddressList" :baseInfo="baseInfo"></supplierBasicInfo>
        </div>
      </iCard>
      <iCard style="margin-top:20px" class="cardItem">
        <template v-slot:header>
          <div class="flex header">
            <span class="title">{{language('JINGQUEXINGXI','紧缺信息')}}</span>
          </div>
        </template>
        <div>
          <!-- 紧缺信息 -->
          <scarceInformation ref="scarceInformation" :editMode="editMode" :shortageReason="shortageReason" :downLoadFlag="downLoadFlag" :supplierId="supplierId" :shortageLevel="shortageLevel" :warningLetterPartRelList="warningLetterPartRelList"></scarceInformation>
        </div>
      </iCard>
      <iCard style="margin-top:20px" class="cardItem">
        <template v-slot:header>
          <div class="flex header">
            <span class="title">{{language('YINGDUICUOSHI','应对措施')}}</span>
            <div v-show="!downLoadFlag">
              <iButton @click="del('应对措施')">{{language('SHANCHU','删除')}}</iButton>
              <iButton @click="add('应对措施')">{{language('XINZENG','新增')}}</iButton>
            </div>
          </div>
        </template>
        <div>
          <!-- 应对措施 -->
          <countermeasures ref="countermeasures" :warningLetterSolutionList="warningLetterSolutionList"></countermeasures>
        </div>
      </iCard>
      <iCard style="margin-top:20px" class="cardItem">
        <template v-slot:header>
          <div class="flex header">
            <span class="title">{{language('BENCIJINGQUEJIANCHULIFUZHERENHELIANXIFANGSHI','本次紧缺件处理负责人和联系方式')}}</span>
            <div v-show="!downLoadFlag">
              <iButton @click="del('本次紧缺件处理负责人和联系方式')">{{language('SHANCHU','删除')}}</iButton>
              <iButton @click="add('本次紧缺件处理负责人和联系方式')">{{language('XINZENG','新增')}}</iButton>
            </div>
          </div>
        </template>
        <div>
          <!-- 本次紧缺件处理负责人和联系方式 -->
          <chargePerson ref="chargePerson" :warningLetterOwnerList="warningLetterOwnerList"></chargePerson>
        </div>
      </iCard>
      <iCard style="margin-top:20px" class="cardItem">
        <template v-slot:header>
          <div class="flex header">
            <span class="title">{{language('','附件')}}</span>
            <div v-show="!downLoadFlag">
              <uploadButton ref="uploadButtonAttachment" :buttonText="language('SHANGCHUAN', '上传')" :uploadByBusiness="true" @uploadedCallback="handleUpload($event)" class="margin-right20" />
              <iButton @click="del('附件')">{{language('SHANCHU','删除')}}</iButton>
            </div>
          </div>
        </template>
        <div>
          <!-- 附件 -->
          <enclosure ref="enclosure" :warningLetterAnnexList="warningLetterAnnexList"></enclosure>
        </div>
      </iCard>
      <div class="footer" v-show="downLoadFlag">
        <div class="left">
          <p>{{language('ZONGJINGLI_QIANMING','总经理（签名）：')}}<i style="border-bottom:1px solid #000;width:190px;line-height:28px;display:inline-block; vertical-align: bottom;"></i></p>
        </div>
        <div class="right">
          <p>{{language('GONGYINGSHANGGAIZHANG','供应商盖章：')}}<i style="border-bottom:1px solid #000;width:200px;line-height:28px;display:inline-block; vertical-align: bottom;"></i></p>
          <p>{{language('BAOJINGRIQI','报警日期：')}}<i style="border-bottom:1px solid #000;width:215px;line-height:28px;display:inline-block; vertical-align: bottom;"></i></p>
        </div>
      </div>
      <iDialog :title="language('BAOJINGFABUDUIXIANG','报警发布对象')" :visible.sync="dialogVisible" width="20%" :before-close="handleDialog">
        <label for="">{{language('XUANZHEFABUDUIXIANG','选择发布对象:')}}</label>
        <iSelect class="margin-top20" v-model="temporaryPublishObj" @change="handlePublish" multiple collapse-tags :placeholder="language('QINGXUANZHE','请选择')">
          <el-option v-for="item in publishObjList" :key="item.userId" :label="item.userName" :value="item.userId">
          </el-option>
        </iSelect>
        <!-- <iSelectCustom :data="linieList"
                       label="userName"
                       value="userId"
                       :multiple="true"
                       @change="handleMultiChange"
                       v-model="publishObj"
                       :disabled="false"
                       :search-method="handleMultiSearch"
                       :popoverClass="'popover-class'" /> -->
        <div slot="footer" class="dialog-footer">
          <iButton @click="dialogVisible = false">{{language('QUXIAO','取消')}}</iButton>
          <iButton @click="sure">{{language('QUEDING','确定')}}</iButton>
        </div>
      </iDialog>
    </div>
  </iPage>
</template>

<script>
import { iPage, iCard, iButton, iMessage, iSelectCustom, iDialog, iSelect } from 'rise'
// import iSelectCustom from './components/iSelectCustom'
import supplierBasicInfo from './components/supplierBasicInfo'
import scarceInformation from './components/scarceInformation'
import countermeasures from './components/countermeasures'
import chargePerson from './components/chargePerson'
import enclosure from './components/enclosure'
import uploadButton from '@/components/uploadButton';
import { downloadPDF, dataURLtoFile } from "@/utils/pdf";
import { uploadUdFile } from "@/api/file/upload";
import { queryWarningLetter, getFeedBackInfoById, uploadAnnex, saveFeedbackInfo, doCache, getCache } from '@/api/supplierManagement/supplyChainRisk'
export default {
  name: "AlarmLetter",
  data() {
    return {
      restaurants: [],
      cSubcategoryNo: '',
      selected: [], // 获得value值
      selectedValue: [],  //获得code值,
      isTurnoverStore: "",//是否在上汽大众周边建了周转库
      fillingDate: '',//填报日期
      shortageReason: "",//紧急原因
      shortageLevel: "",//紧急级别
      warningLetterPartRelList: [],//紧缺零件详情列表
      warningLetterSolutionList: [],//应对措施列表
      warningLetterOwnerList: [],//报警信负责人信息联系方式表
      warningLetterAnnexList: [],//上传的附件列表
      warningLetterAnnexIdList: [],
      warningLetterProductAddressList: [],//报警信生产工厂地址
      warningLetterReceiverList: [],
      impactDetail: "",
      impactEndDate: "",
      impactStartDate: "",
      isWarningLetter: "",
      baseInfo: {
        sapCode: "",
        supplierName: "",
        fillingUserName: "",
        fillingUserPost: "",
        fillingUserPhone: "",
        fillingUserEmail: "",
        isTurnoverStore: ""
      },
      csssList: [],//csss人员列表
      plrdList: [],//plrd人员列表
      linieList: [],//plrd人员列表
      publishObjList: [],//plrd人员列表
      temporaryPublishObj: [],//plrd人员列表
      supplierId: "",
      dialogVisible: false,
      publishObj: [],
      id: "",
      mulitList: [],
      downLoadFlag: false,
      editMode: true,
      PdfUrl: ""
    }
  },
  components: {
    iPage,
    iCard,
    iButton,
    supplierBasicInfo,//供应商基本信息
    scarceInformation,//紧缺信息
    countermeasures,  //应对措施
    chargePerson, //本次紧缺件处理负责人和联系方式
    enclosure,//附件
    uploadButton,
    iSelectCustom,
    iDialog,
    iButton,
    iSelect,
  },

  methods: {
    init() {
      this.impactDetail = this.$route.query.impactDetail
      this.impactEndDate = this.$route.query.impactEndDate
      this.impactStartDate = this.$route.query.impactStartDate
      this.isWarningLetter = this.$route.query.isWarningLetter
      this.id = this.$route.query.id
      this.flag = this.$route.query.flag
      const currentTime = window.moment(new Date()).format("YYYY-MM-DD")
      this.fillingDate = currentTime
      if (this.flag === 'view') {
        this.editMode = false
        this.downLoadFlag = true
        queryWarningLetter(this.id).then(res => {
          try {
            if (res.code === '200') {
              let data = res.data
              this.isTurnoverStore = data.isTurnoverStore //是否在上汽大众周边建了周转库
              this.fillingDate = data.fillingDate //填报日期
              this.shortageReason = data.shortageReason  //紧急原因
              this.shortageLevel = data.shortageLevel  //紧急级别
              this.warningLetterPartRelList = data.warningLetterPartRelList//紧缺零件详情列表
              this.warningLetterPartRelList.forEach(item => {
                this.$set(item, 'involveCarType', item.involveCarType.split(','));
                this.$set(item, 'sparePartSupplierAddress', item.sparePartSupplierAddress.split(','));
              })
              this.warningLetterSolutionList = data.warningLetterSolutionList//报警信应对措施 
              this.warningLetterOwnerList = data.warningLetterOwnerList//报警信负责人信息联系方式表 
              this.warningLetterAnnexList = data.warningLetterAnnexList//上传的附件列表
              this.warningLetterReceiverList = data.warningLetterReceiverList//报警信接收人员信息表
              this.warningLetterProductAddressList = data.warningLetterProductAddressList// 报警信生产工厂地址
              // this.warningLetterProductAddressList.forEach(item => {
              //   item.cityList = []
              // })
            } else {
              iMessage.error(res.desZh)
            }
          } catch (err) {
            iMessage.error(err.desZh)
          }
        })
      }
      if (this.flag === 'add') {
        getCache({
          id: this.id
        }).then(res => {
          if (res.code === '200') {
            
            if (res.data) {

              let data = res.data.warningLetterInfo
              this.isTurnoverStore = data.isTurnoverStore //是否在上汽大众周边建了周转库
              // this.fillingDate = data.fillingDate //填报日期
              this.shortageReason = data.shortageReason  //紧急原因
              this.shortageLevel = data.shortageLevel  //紧急级别
              this.warningLetterPartRelList = data.warningLetterPartRelList//紧缺零件详情列表
              this.warningLetterSolutionList = data.warningLetterSolutionList//报警信应对措施 
              this.warningLetterOwnerList = data.warningLetterOwnerList//报警信负责人信息联系方式表 
              this.warningLetterAnnexList = data.warningLetterAnnexList//上传的附件列表
              this.warningLetterReceiverList = data.warningLetterReceiverList//报警信接收人员信息表
              this.warningLetterProductAddressList = data.warningLetterProductAddressList// 报警信生产工厂地址
            }
          } else {
            iMessage.error(res.desZh)
          }
        })
      }
      getFeedBackInfoById(this.id).then((res) => {
        try {
          if (res.code === '200') {
            this.$nextTick(() => {
              let data = res.data
              this.baseInfo.sapCode = data.sapCode
              this.baseInfo.supplierName = data.supplierName
              this.baseInfo.fillingUserName = data.fillingUserName
              this.baseInfo.fillingUserPost = data.fillingUserPost
              this.baseInfo.fillingUserPhone = data.fillingUserPhone
              this.baseInfo.fillingUserEmail = data.fillingUserEmail
              this.csssList = data.csssList
              this.plrdList = data.plrdList
              this.linieList = _.cloneDeep(data.linieList)
              this.mulitList = _.cloneDeep(data.linieList)
              this.handleFilter()
              this.publishObj = this.mulitList.map(item => item.userId)
              this.supplierId = data.supplierId

console.log(this.supplierId)
            });
          } else {
            iMessage.error(res.desZh)
          }
        } catch (err) {
          iMessage.error(err.desZh)
        }
      })
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    loadAll() {
      return [];
    },
    handleMultiChange(val) {
      // this.mulitList = val
    },
    handlePublish(val) {
      console.log(val);
      this.publishObj = [...this.publishObj, ...val]
      console.log(this.publishObj);
    },
    sure() {
      this.dialogVisible = false
      let newArr = []
      console.log(this.mulitList)
      this.linieList.forEach(item => {
        if (this.publishObj.includes(item.userId)) {
          newArr.push(item)
        }
      })
      this.mulitList = newArr
      console.log(this.mulitList);
      this.warningLetterReceiverList = this.mulitList
      this.handleFilter()
      console.log(this.publishObjList);
    },
    handleFilter() {
      this.publishObjList = this.publishObjList.filter(item => {
        if (!this.publishObj.includes(item.userId)) {
          return item
        }
      })
      console.log(this.publishObjList);
    },
    //多选栏中的删除
    handleClose(tag) {
      let item = this.selected.indexOf(tag);
      this.selected.splice(item, 1);
      this.selectedValue.splice(item, 1);
      console.log(this.selectedValue)
    },
    addPerson() {
      this.temporaryPublishObj = []
      this.dialogVisible = true
    },
    handleDialog(done) {
      done()
    },
    //值
    handleSelect(item) {
      let obj = {
        deptId: null,
        deptName: null,
        email: item,
        id: "",
        userId: "",
        userName: "",
        userType: 4
      }
      this.warningLetterReceiverList.push(obj)
      console.log(this.warningLetterReceiverList)
      this.selected.push(item.value)
      this.selectedValue.push(item.address)
      this.cSubcategoryNo = ""

    },
    handleFocus(item) {
      var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@(csvw)+\.(com)$/;
      if (!reg.test(item)) {
        this.cSubcategoryNo = ""
        iMessage.error(this.language('QINGTIANXIEDAZONGNEIBUYOUXIANG', '请填写大众内部邮箱'))
        return
      }
      let obj = {
        deptId: null,
        deptName: null,
        email: item,
        id: "",
        userId: "",
        userName: "",
        userType: 4
      }
      this.warningLetterReceiverList.push(obj)
      console.log(this.warningLetterReceiverList)
      this.selected.push(item)
      this.selectedValue.push(item.address)
      this.cSubcategoryNo = ""
    },

    add(val) {
      let obj = {}
      switch (val) {
        case '应对措施':
          obj = {
            id: this.random(1, 100),
            solutionDetail: "",
            solutionStartDate: "",
            solutionEndDate: "",
            solutionOwner: ""
          }
          this.$refs.countermeasures.tableList.push(obj)
          break;
        case '本次紧缺件处理负责人和联系方式':
          obj = {
            id: this.random(1, 100),
            userName: "",
            userPost: "",
            userPhone: "",
            userEmai: ""
          }
          this.$refs.chargePerson.tableList.push(obj)
          break;
      }
    },
    del(val) {
      switch (val) {
        case '应对措施':
          this.$refs.countermeasures.multipleSelection.forEach(item => {
            this.$refs.countermeasures.tableList.forEach((i, ind) => {
              if (item.id === i.id) {
                this.$refs.countermeasures.tableList.splice(ind, 1)
              }
            })
          })
          break;
        case '本次紧缺件处理负责人和联系方式':
          this.$refs.chargePerson.multipleSelection.forEach(item => {
            this.$refs.chargePerson.tableList.forEach((i, ind) => {
              if (item.id === i.id) {
                this.$refs.chargePerson.tableList.splice(ind, 1)
              }
            })
          })
          break;
        case '附件':
          this.$refs.enclosure.multipleSelection.forEach(item => {
            this.$refs.enclosure.tableList.forEach((i, ind) => {
              if (item.fileId === i.fileId) {
                this.$refs.enclosure.tableList.splice(ind, 1)
              }
            })
          })
          break;
      }
    },
    handleCloseTag(tag) {
      this.mulitList.forEach((item, index) => {
        if (item.userId === tag.userId) {
          this.mulitList.splice(index, 1)
        }
      })
      this.publishObj.forEach((item, idx) => {
        if (item == tag.userId) {
          this.publishObj.splice(idx, 1)
        }
      })
      console.log(tag);
      this.publishObjList.push(tag)
    },
    random(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    async handleUpload(content) {
      this.cardLoading = true;
      const formData = new FormData();
      formData.append('files', content.file);
      const res = await uploadAnnex(formData);
      res.data.forEach(item => {
        this.warningLetterAnnexList.push(item)
        this.warningLetterAnnexIdList.push(item.fileId)
      })
    },

    download() {
      this.downLoadFlag = true
      this.editMode = false
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      setTimeout(() => {
        downloadPDF({
          idEle: "content",
          pdfName: "报警信",
          exportPdf: true,
          waterMark: true,
          callback: async (pdf, pdfName) => {
            try {
              loading.close()
              const filename = pdfName.replaceAll(/\./g, '_') + ".pdf";
              const pdfFile = pdf.output("datauristring");
              const blob = dataURLtoFile(pdfFile, filename);
              this.downLoadFlag = false
              this.editMode = true
            } catch {
              iMessage.error(this.language('SHENGCHENGSHIBAI', '生成失败'));
            }
          },
        });
      }, 500)

    },
    handleUploadForm(val) {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      uploadUdFile({
        applicationName: 'sourcing',
        businessId: Math.ceil(Math.random() * 100000),
        multifile: val.file
      }).then(res => {
        this.PdfUrl = res.data[0].path
        loading.close();
      })
    },
    handleSubmit(val) {
        this.$refs.scarceInformation.tableList.forEach(item => {
          if (item.involveCarType instanceof Array) {
            this.$set(item, 'involveCarType', item.involveCarType.join(','))
          }
        })
        let params = {
          id: this.id,
          impactDetail: this.impactDetail || null,
          impactEndDate: this.impactEndDate || null,
          impactStartDate: this.impactStartDate || null,
          isWarningLetter: this.isWarningLetter || null,
          warningLetterInfo: {
            fillingDate: this.fillingDate,
            fillingUserEmail: this.baseInfo.fillingUserEmail,
            fillingUserName: this.baseInfo.fillingUserName,
            fillingUserPhone: this.baseInfo.fillingUserPhone,
            fillingUserPost: this.baseInfo.fillingUserPost,
            isTurnoverStore: this.baseInfo.isTurnoverStore === '是' ? true : false,
            otherShortageReason: this.$refs.scarceInformation.otherShortageReason,
            pdfUrl: this.PdfUrl,
            shortageLevel: this.$refs.scarceInformation.select,
            shortageReason: this.$refs.scarceInformation.checkList.toString(),
            warningLetterAnnexIdList: this.warningLetterAnnexIdList || null,
            warningLetterOwnerList: this.$refs.chargePerson.tableList,
            warningLetterPartRelList: this.$refs.scarceInformation.tableList,
            warningLetterProductAddressList: this.$refs.supplierBasicInfo.tableData,
            warningLetterReceiverList: this.warningLetterReceiverList,
            warningLetterSolutionList: this.$refs.countermeasures.tableList,
            warningLetterTitle: ""
          }
        }
        console.log(params)
      this.$confirm(this.language('SHIFOUTIJIAOBAOJINGXING', '是否提交报警信?'), this.language('TISHI', '提示'), {
        confirmButtonText: this.language('QUEDING', '确定'),
        cancelButtonText: this.language('QUXIAO', '取消'),
        type: 'warning'
      }).then(() => {
        if (!this.PdfUrl) {
          iMessage.error(this.language('QINGTIJIAOBAOJINGXING', '请提交报警信'))
          return
        }

        this.$refs.scarceInformation.tableList.forEach(item => {
          if (item.involveCarType instanceof Array) {
            this.$set(item, 'involveCarType', item.involveCarType.join(','))
          }
        })
        let params = {
          id: this.id,
          impactDetail: this.impactDetail || null,
          impactEndDate: this.impactEndDate || null,
          impactStartDate: this.impactStartDate || null,
          isWarningLetter: this.isWarningLetter || null,
          warningLetterInfo: {
            fillingDate: this.fillingDate,
            fillingUserEmail: this.baseInfo.fillingUserEmail,
            fillingUserName: this.baseInfo.fillingUserName,
            fillingUserPhone: this.baseInfo.fillingUserPhone,
            fillingUserPost: this.baseInfo.fillingUserPost,
            isTurnoverStore: this.baseInfo.isTurnoverStore === '是' ? true : false,
            otherShortageReason: this.$refs.scarceInformation.otherShortageReason,
            pdfUrl: this.PdfUrl,
            shortageLevel: this.$refs.scarceInformation.select,
            shortageReason: this.$refs.scarceInformation.checkList.toString(),
            warningLetterAnnexIdList: this.warningLetterAnnexIdList || null,
            warningLetterOwnerList: this.$refs.chargePerson.tableList,
            warningLetterPartRelList: this.$refs.scarceInformation.tableList,
            warningLetterProductAddressList: this.$refs.supplierBasicInfo.tableData,
            warningLetterReceiverList: this.warningLetterReceiverList,
            warningLetterSolutionList: this.$refs.countermeasures.tableList,
            warningLetterTitle: ""
          }
        }
        saveFeedbackInfo(params).then((res) => {
          if (res.code === '200') {
            iMessage.success(this.language('BAOCUNCHENGGONG', '保存成功'));
          } else {
            iMessage.error(res.desZh)
          }
        })

      })

    },
    tSave() {
      this.$refs.scarceInformation.tableList.forEach(item => {
        this.$set(item, 'involveCarType', item.involveCarType.join(','));
      })
      let params = {
        id: this.id,
        impactDetail: this.impactDetail || null,
        impactEndDate: this.impactEndDate || null,
        impactStartDate: this.impactStartDate || null,
        isWarningLetter: this.isWarningLetter || null,
        warningLetterInfo: {
          fillingDate: this.fillingDate,
          fillingUserEmail: this.baseInfo.fillingUserEmail,
          fillingUserName: this.baseInfo.fillingUserName,
          fillingUserPhone: this.baseInfo.fillingUserPhone,
          fillingUserPost: this.baseInfo.fillingUserPost,
          isTurnoverStore: this.baseInfo.isTurnoverStore === '是' ? true : false,
          otherShortageReason: this.$refs.scarceInformation.otherShortageReason,
          pdfUrl: '',
          shortageLevel: this.$refs.scarceInformation.select,
          shortageReason: this.$refs.scarceInformation.checkList.toString(),
          warningLetterAnnexIdList: this.warningLetterAnnexIdList || null,
          warningLetterOwnerList: this.$refs.chargePerson.tableList,
          warningLetterPartRelList: this.$refs.scarceInformation.tableList,
          warningLetterProductAddressList: this.$refs.supplierBasicInfo.tableData,
          warningLetterReceiverList: this.warningLetterReceiverList,
          warningLetterSolutionList: this.$refs.countermeasures.tableList,
          warningLetterTitle: ""
        }
      }
      doCache(params).then((res) => {
        if (res.code === '200') {
          iMessage.success(this.language('ZANCUNCHENGGONG', '暂存成功'));
        } else {
          iMessage.error(res.desZh)
        }
      })
    }
  },
  mounted() {

    this.restaurants = this.loadAll();
  },
  created() {
    this.init()
  }


}
</script>

<style lang="scss" scoped>
::v-deep .el-input__inner {
  height: 2.1875rem;
  box-shadow: 0 0 0.1875rem rgb(0 38 98 / 15%);
  border-color: transparent;
}
.alarmLetter {
  .header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .title {
      font-size: 20px;
      font-weight: bold;
    }
  }
  .inline-input {
    width: 100%;
  }

  .cardItem {
    .header {
      justify-content: space-between;
    }
    .formItem {
      margin-top: 20px;
      display: flex;
      label {
        font-size: 18px;
        font-weight: bold;
        width: 150px;
      }
      .tag {
        margin-right: 20px;
      }
      .earlyWarning {
        width: 100%;
        flex-wrap: wrap;
        // text-overflow: ellipsis;
        // white-space: wrap;
        // overflow: hidden;
        border: 1px solid #ccc;
        box-shadow: 0 0 0.1875rem rgb(0 38 98 / 15%);
        border-color: transparent;
      }
    }
    .title {
      font-size: 18px;
      font-weight: bold;
    }
    .date {
      font-size: 18px;
      font-weight: bold;
    }
  }
}
.popover-class {
  width: 400px;
  height: 200px;
}
.footer {
  display: flex;
  justify-content: flex-end;
  .left {
    margin-right: 40px;
    margin-top: 60px;
    font-size: 16px;
    font-weight: bold;
  }
  .right {
    margin-top: 60px;
    margin-right: 40px;
    font-size: 16px;
    font-weight: bold;
    p {
      margin-bottom: 40px;
    }
  }
}
// ::v-deep .el-table .el-table__row .el-input {
//   width: 220px !important;
// }
// :v-deep .el-input__inner {
//   width: 220px !important;
// }
</style>