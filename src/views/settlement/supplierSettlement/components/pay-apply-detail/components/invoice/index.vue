<template>
  <iPage v-loading="saving">
    <div>
    <!------------------------------------------------------------>
    <!---               界面切换菜单                            --->
    <!------------------------------------------------------------>
    <detailTop right lev="2" :pageMenu="detailPage" show :query="$route.query" isShowIlog credentials:true>
      <span slot="left" class="floatleft font20 font-weight"> {{ language('ZHIFUSHENQINGHAO', '支付申请号') }}: {{ $route.query.code }} </span>
    </detailTop>

    <div>
      <!-- 页面头部 -->
      <div class="pageTitle flex-between-center-center margin-botttom20">
        <!-- <span> {{ language('ZHIFUSHENQINGHAO', '支付申请号') }} :  {{ pkPayApplyId }}</span> -->
        <span></span>
        <div class="btnList flex-align-center">
          &nbsp; &nbsp; &nbsp;
          <iButton @click="subimitInvoice()">
            {{ language('提交发票', '提交发票') }}
          </iButton>
          <iButton @click="printPayApply()">
            {{ language('打印', '打印') }}
          </iButton>
          <iButton @click="exitEdit">{{ language('取消支付申请', '取消支付申请') }}</iButton>
          <iButton @click="exit">
            {{ language('SETTLEMENT_TUICHU', '关闭') }}
          </iButton>
        </div>
      </div>

      <iCard class="margin-top20">
        <div class="flex-between-center-center aTitle">
          <span> {{ language('FAPIAOXINXI', '发票信息') }} </span>
        </div>
        <div class="ceartDiv">
          <el-row :gutter="24">
            <el-col :span="12">
              <span>{{ language('未税总计', '未税总计') }}</span>
              <i-input type="text" v-model="statistics.totalValue" disabled></i-input>
            </el-col>
            <el-col :span="12">
              <span>{{ number.totalValue }} RMB</span>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
              <span>{{ language('价税总计', '价税总计') }}</span>
              <i-input type="text" v-model="statistics.totalTaxPrice" disabled></i-input>
            </el-col>
            <el-col :span="12">
              <span>{{ number.totalTaxPrice }} RMB</span>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
              <span>{{ language('税额总计', '税额总计') }}</span>
              <i-input type="text" v-model="statistics.taxValue" disabled></i-input>
            </el-col>
            <el-col :span="12">
              <span>{{ number.taxValue }} RMB</span>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <span>{{ language('发票号码', '发票号码') }}</span>
              <i-input type="text" v-model="statistics.invoiceCode"></i-input>
            </el-col>
            <el-col :span="12">
              <span>{{ language('发票数量', '发票数量') }}</span>
              <i-input type="text" v-model="statistics.invoiceQty" disabled></i-input>
            </el-col>
          </el-row>
        </div>
      </iCard>

      <iCard class="margin-top20">
        <div class="flex-between-center-center aTitle">
          <span> {{ language('FAPIAOXINXI', '发票信息') }} </span>
          <div class="btnList flex-align-center">
            <el-upload name="multipartFile" :http-request="uploadFile" :show-file-list="false" accept="image/.jpg,.ofd,.png,.pdf">
              <iButton :loading="uploadLoading" style="margin-right: 10px">{{ language('上传发票', '上传发票') }}</iButton>
            </el-upload>
            <iButton :loading="btnLoading" :disabled="selectData == '' || selectData[0].invoiceResults == 1 ? true : false" key="" @click="getInvoiceValidity()">{{ language('效验发票', '效验发票') }}</iButton>
            <iButton :loading="btnLoading" @click="eraseInvoice()">{{ language('SETTLEMENT_SHANCHU', '删除') }}</iButton>
          </div>
        </div>

        <tableList :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="tableLoading" @handleSelectionChange="handleSelectionChange">
          <template #invoiceType="scope">
            <span class="link" style="color: #1a1a1a">{{ getOpens(scope.row.invoiceType) }}</span>
          </template>

          <template #annex="scope">
            <span class="link" @click="openFile(scope.row.fileId)">{{ language('LK_XIAZAI', '下载') }}</span>
          </template>
          <template #invoiceNum="scope">
            <span class="link" @click="getDialog(scope.row)">{{ scope.row.invoiceNum }}</span>
          </template>
          <template #invoiceResults="scope">
            <span v-if="scope.row.invoiceResults == '1'">{{ language('LK_TONGGUO', '通过') }}</span>
            <span v-else>{{ language('MT_BUTONGGUO', '不通过') }}</span>
          </template>
        </tableList>

        <iPagination v-update @size-change="handleSizeChange($event, getInvoiceList)" @current-change="handleCurrentChange($event, getInvoiceList)" background :page-sizes="page.pageSizes" :page-size="page.pageSize" :layout="page.layout" :current-page="page.currPage" :total="page.totalCount"/>
      </iCard>

      <iCard class="margin-top20" v-if="show.eccIcard">
        <div class="flex-between-center-center aTitle">
          <span> {{ language('财务发票校验信息', '财务发票校验信息') }} </span>
        </div>
        <div class="ceartDiv">
          <el-row :gutter="28">
            <el-col :span="4">
              <span>{{ language('ECC发票编号', 'ECC发票编号') }}</span>
              <i-input type="text" v-model="ecc.eccInvoiceCode" disabled></i-input>
            </el-col>
            <el-col :span="4">
              <span>{{ language('清账日期', '清账日期') }}</span>
              <i-input type="text" v-model="ecc.eccInvoiceValidDate" disabled></i-input>
            </el-col>
          </el-row>
        </div>
      </iCard>

      <iCard class="margin-top20" v-if="show.InvoiceIcard">
        <div class="flex-between-center-center aTitle">
          <span> {{ language('问题发票信息', '问题发票信息') }} </span>
        </div>
        <div class="ceartDiv">
          <el-row :gutter="28">
            <el-col :span="4">
              <span>{{ language('财务联系人', '财务联系人') }}</span>
              <i-input class="is-input" type="text" v-model="paramIn.fxrName" disabled></i-input>
            </el-col>
            <el-col :span="4">
              <span>{{ language('财务联系人电话', '财务联系人电话') }}</span>
              <i-input type="text" v-model="paramIn.fxrTel" disabled></i-input>
            </el-col>
            <el-col :span="4">
              <span>{{ language('财务联系人邮箱', '财务联系人邮箱') }}</span>
              <i-input type="text" v-model="paramIn.fxrEmail" disabled></i-input>
            </el-col>
            <el-col :span="4">
              <span>{{ language('发现日期', '发现日期') }}</span>
              <i-input type="text" v-model="paramIn.fxDate" disabled></i-input>
            </el-col>
            <el-col :span="22">
              <span>{{ language('ROLE.DESCRIPTION', '描述') }}</span>
              <i-input type="text" v-model="paramIn.description" disabled></i-input>
            </el-col>
          </el-row>
        </div>
      </iCard>

      <el-dialog title="编辑发票" :visible.sync="dialogVisible" destroy-on-close width="55%">
        <div style="padding: 10px">
          <el-form :model="form" :rules="rules" ref="formName" label-position="right">
            <el-row style="padding: 0">

              <el-col :span="11">
                <el-form-item label="发票类型" :label-width="formLabelWidth" prop="invoiceType">
                  <el-select v-model="form.invoiceType" placeholder="请选择" style="left: 22px;">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12" style="display: block">
                <el-form-item prop="checkCode" :label="language('校验码', '校验码')" :label-width="formLabelWidth">
                  <el-input v-model="form.checkCode"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12" style="display: block">
                <el-form-item prop="invoiceCode" :label="language('发票代码', '校验码')" :label-width="formLabelWidth">
                  <el-input v-model="form.invoiceCode"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="display: block">
                <el-form-item prop="invoiceNum" :label="language('发票号码', '发票号码')" :label-width="formLabelWidth">
                  <el-input v-model="form.invoiceNum"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="display: block">
                <el-form-item prop="invoiceDate" :label="language('开票日期', '开票日期')" :label-width="formLabelWidth">
                  <el-date-picker v-model="form.invoiceDate" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="display: block">
                <el-form-item prop="untaxedAmount" :label="language('未税金额(小写)', '未税金额(小写)')" :label-width="formLabelWidth">
                  <el-input v-model="form.untaxedAmount"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="display: block">
                <el-form-item prop="itemTaxAmount" :label="language('税额(小写)', '税额(小写)')" :label-width="formLabelWidth">
                  <el-input v-model="form.itemTaxAmount"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="display: block">
                <el-form-item prop="priceTaxTotalFigure" :label="language('价税合计(小写)', '价税合计(小写)')" :label-width="formLabelWidth">
                  <el-input v-model="form.priceTaxTotalFigure"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="setUpInvoice('formName')">{{ language('提交查验', '提交查验') }}</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
  </iPage>
</template>

<script>
import detailTop from '../topComponents';
import {detailPage} from '../data';

import {iCard, iPagination, iButton, iInput, iPage} from 'rise';
import tableList from '@/views/settlement/components/tableList';
import {pageMixins} from '@/utils/pageMixins';
import resultMessageMixin from '@/utils/resultMessageMixin';

import {tableTitle, options} from './data';
import { deleteInvoice, invoiceValidity, invokeOrc, payInvoicePages, queryIsInvoice, updateInvoice, downloadUdFile, prints, getInvoiceEccs, attPay, submintInvoice } from '@/api/settlement/pay-invoice';
import {uploadUdFile2} from "@/api/file/upload";

export default {
  mixins: [pageMixins, resultMessageMixin],
  components: {
    iCard,
    tableList,
    iPagination,
    iButton,
    iInput,
    detailTop,
    iPage
  },
  data() {
    return {
      detailPage: detailPage,
      tableTitle,
      options,
      page: {
        totalCount: 0, //总条数
        pageSize: 10, //每页多少条
        pageSizes: [10, 20, 50, 100], //每页条数切换
        currPage: 1, //当前页
        layout: 'sizes, prev, pager, next, jumper'
      },
      disabled: false,
      tableListData: [],
      tableLoading: false,
      selectData: [],
      listDetailShow: false,
      detailData: [],
      btnLoading: false,
      uploadLoading: false,
      dialogVisible: false,
      form: {
        invoiceType: '请选择', //发票类型
        invoiceCode: '', //发票代码
        invoiceNum: '', //发票号码
        invoiceDate: '', //开票日期
        checkCode: '', // 校验码
        untaxedAmount: '', //未税金额(小写)
        itemTaxAmount: '', //税额(小写)
        priceTaxTotalFigure: '' //价税合计(小写)
      },
      rules: {
        invoiceCode: [{required: true, message: '请填写发票代码', trigger: 'blur'}],
        invoiceNum: [{required: true, message: '请填写发票号码', trigger: 'blur'}],
        invoiceDate: [{required: true, message: '请选择开票日期', trigger: 'blur'}],
        checkCode: [{required: true, message: '请填写校验码', trigger: 'blur'}],
        untaxedAmount: [{required: true, message: '请填写未税金额', trigger: 'blur'}],
        itemTaxAmount: [{required: true, message: '请填写税额', trigger: 'blur'}],
        priceTaxTotalFigure: [{required: true, message: '请填写价税合计', trigger: 'blur'}]
      },
      statistics: {
        totalValue: 0, //未税总计
        totalTaxPrice: 0, //价税总计
        taxValue: 0, //税额总计
        invoiceCode: '', //发票号码
        invoiceQty: 0 //发票数量
      },
      //大写中文数字
      number: {
        totalValue: '', //未税总计
        totalTaxPrice: '', //价税总计
        taxValue: '' //税额总计
      },
      ecc: {
        eccInvoiceCode: '',
        eccInvoiceValidDate: '',
        //不含可抵扣税金额
        totalValue: ''
      },
      show: {
        eccIcard: false,
        InvoiceIcard: false
      },
      paramIn: {
        fxrName: '', //财务联系人
        fxrTel: '', //财务联系人电话
        fxrEmail: '', //财务联系人邮箱
        fxDate: '', //发现日期
        description: '' //描述
      },
      formLabelWidth: '110px',
      base64String: '', //base64编码
      pkPayApplyId: this.$route.query.id, //支付申请号
      pkPayApplyCode: this.$route.query.code,
      saving: false
    };
  },
  created() {
    this.getInvoiceList();
  },
  methods: {
    getOpens(value) {
      console.log(value);
      let op = '';
      options.forEach(item => {
        if (item.value == value) {
          op = item.label;
        }
      });
      return op;
    },
    // 数据统计
    handlangStatistics(row) {
      row.forEach(item => {
        if (item.untaxedAmount != '' && item.untaxedAmount != null) {
          this.statistics.totalValue = (parseFloat(this.statistics.totalValue) + parseFloat(item.untaxedAmount)).toFixed(2);
        }
        if (item.priceTaxTotalFigure != '' && item.priceTaxTotalFigure != null) {
          this.statistics.totalTaxPrice = (parseFloat(this.statistics.totalTaxPrice) + parseFloat(item.priceTaxTotalFigure)).toFixed(2);
        }
        if (item.itemTaxAmount != '' && item.itemTaxAmount != null) {
          this.statistics.taxValue = (parseFloat(this.statistics.taxValue) + parseFloat(item.itemTaxAmount)).toFixed(2);
        }
        this.statistics.invoiceQty++;
      });
      //未税总计
      this.number.totalValue = this.computeLen(this.statistics.totalValue);
      //价税总计
      this.number.totalTaxPrice = this.computeLen(this.statistics.totalTaxPrice);
      //税额总计
      this.number.taxValue = this.computeLen(this.statistics.taxValue);
    },
    computeLen(number) {
      let ret = '';
      if (number !== '' && number != null && number !== '0') {
        let unit = '仟佰拾亿仟佰拾万仟佰拾元角分';
        let str = '';
        number += '00';
        const point = number.indexOf('.');
        if (point >= 0) {
          number = number.substring(0, point) + number.substr(point + 1, 2);
        }
        unit = unit.substr(unit.length - number.length);
        for (let i = 0; i < number.length; i++) {
          str += '零壹贰叁肆伍陆柒捌玖'.charAt(number.charAt(i)) + unit.charAt(i);
        }
        ret = str.replace(/零(仟|佰|拾|角)/g, '零')
                .replace(/(零)+/g, '零')
                .replace(/零(万|亿|元)/g, '$1')
                .replace(/(亿)万|(拾)/g, '$1$2')
                .replace(/^元零?|零分/g, '')
                .replace(/元$/g, '元') + '整';
      }
      return ret;
    },
    handleSelectionChange(list) {
      this.selectData = list;
    },

    // 初始化 查询发票信息
    getInvoiceList() {
      let params = {
        payApplyId: this.pkPayApplyId,
        current: this.page.currPage,
        size: this.page.pageSize
      };
      payInvoicePages(params).then(res => {
        if (res.data) {
          this.page.currPage = res.pageNum;
          this.page.totalCount = res.total;
          this.tableLoading = false;
          this.tableListData = res.data;
          (this.statistics = {
            totalValue: 0, //未税总计
            totalTaxPrice: 0, //价税总计
            taxValue: 0, //税额总计
            invoiceCode: '', //发票号码
            invoiceQty: 0 //发票数量
          }),
          this.handlangStatistics(res.data);
          //财务发票校验信息查询
          this.getPayApplyEcc();
        }
      });
    },
    eraseInvoice() {
      if (this.selectData == '') {
        return this.$message.warning('请选择需要删除的数据');
      }
      this.$confirm(this.language('settlement.tip.invoice_delete', '您确认要删除这些发票吗? 此操作无法撤销!'), this.language('SETTLEMENT_SHANCHU', '删除'), {
        confirmButtonText: this.language('settlement.yes', '是'),
        cancelButtonText: this.language('settlement.no', '否'),
        type: 'warning'
      }).then(() => {
        this.saving = true;
        deleteInvoice(this.selectData).then(res => {
          this.saving = false;
          if (res.data == true) {
            this.$message.success('发票删除成功');
            this.getInvoiceList();
          }
        }).catch(e => {
          console.log(e);
          this.saving = false;
        });
      });
    },
    beforeUpload() {
      this.uploadLoading = true;
    },

    //发票编辑
    getDialog(row) {
      this.form = {
        id: row.id,
        invoiceType: row.invoiceType,
        invoiceCode: row.invoiceCode,
        invoiceNum: row.invoiceNum,
        checkCode: row.checkCode,
        invoiceDate: row.invoiceDate,
        untaxedAmount: row.untaxedAmount,
        itemTaxAmount: row.itemTaxAmount,
        priceTaxTotalFigure: row.priceTaxTotalFigure
      };
      this.dialogVisible = true;
    },

    //发票信息编辑
    setUpInvoice(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.tableLoading = true;
          updateInvoice(this.form).then(res => {
            if (res.data == true) {
              this.$message.success('发票编辑成功');
            } else {
              this.$message.error('发票校验失败');
            }
            this.dialogVisible = false;
            this.tableLoading = false;
            this.getInvoiceList();
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    //ECC发票号、ECC发票校验时间
    getPayApplyEcc() {
      getInvoiceEccs(this.pkPayApplyId).then(res => {
        if (res.code == 200 && res.data != null) {
          this.ecc = res.data;
          this.statistics.invoiceCode = res.data.invoiceCode;
          this.show.eccIcard = true;
        }
        //问题发票信息查询
        this.getIsInvoice();
      });
    },

    //问题发票信息
    getIsInvoice() {
      queryIsInvoice(this.pkPayApplyId).then(res => {
        if (res.code == 200 && res.data != null && 0 != res.data.length) {
          this.paramIn = res.data[0];
          this.show.InvoiceIcard = true;
        }
      });
    },

    //提交发票
    subimitInvoice() {
      if (this.ecc.totalValue >= this.statistics.totalValue) {
        this.$message.error('不含可抵扣税金额不可大于未税总计金额');
        return;
      }
      let parem = {
        pkPayApplyId: this.pkPayApplyId,
        totalValue: this.statistics.totalValue,
        totalTaxPrice: this.statistics.totalTaxPrice,
        taxValue: this.statistics.taxValue,
        invoiceCode: this.statistics.invoiceCode,
        invoiceQty: this.statistics.invoiceQty,
        submitFlag: 'saveInvoice'
      };
      submintInvoice(parem).then(res => {
        if (res.ok) {
          this.$message.success('提交发票成功');
        } else {
          this.$message.error(res.msg);
        }
      });
    },

    // 发票效验接口调用
    getInvoiceValidity() {
      let params = [];
      this.selectData.forEach(item => {
        var items = {
          id: item.id,
          invoiceType: item.invoiceType,
          invoiceCode: item.invoiceCode,
          invoiceNum: item.invoiceNum,
          invoiceDate: item.invoiceDate,
          checkCode: item.checkCode.substring(item.checkCode.length - 6, item.checkCode.length)
        };
        params.push(items);
      });
      this.tableLoading = true;
      invoiceValidity(params).then(res => {
        if (JSON.parse(res.data).code == 200) {
          this.getInvoiceList();
          this.$message.success('发票查验成功');
          this.tableLoading = false;
        } else {
          this.getInvoiceList();
          this.$message.error(JSON.parse(res.data).message);
          this.tableLoading = false;
        }
      });
    },

    //文件上传按钮：上传发票
    uploadFile(e) {
      //获取文件的Base64编码
      this.getBase64(e);
      //文件后缀
      var fileSuffix = e.file.name.substring(e.file.name.lastIndexOf(".") + 1);
      var whiteList = ["pdf", "jpg", "png", "ofd"];
      // 文件格式校验
      if (whiteList.indexOf(fileSuffix) === -1) {
        this.$message.error('上传文件只能是 pdf、jpg、png、ofd格式');
        return false;
      }
      //文件大小校验
      var isSize = e.file.size / 1024 / 1024 < 10;
      if (!isSize) {
        this.$message.error('上传文件大小不能超过 10MB');
        return false;
      }
      if (e) {
        this.tableLoading = true;
        //文件上传obs
        uploadUdFile2({multifile: e.file}).then(res => {
          let params = {
            pkPayApplyId: this.pkPayApplyId, //支付申请id
            fileBase64: this.base64String, // bass64
            fileName: res.data[0].name, // 文件名称
            fileId: res.data[0].id, //文件保存在服务器的id
            fileSaveName: res.data[0].name,
            filePath: res.data[0].path, //文件路径
            objectUrl: res.data[0].objectUrl //obs文件访问路径
          };
          this.getOcrInvoice(params);
        }).catch(rej => {
          this.uploadError(rej, e.file);
          this.tableLoading = false;
        });
      }
    },

    //OCR发票识别接口：获取Base64
    getBase64(e) {
      // 选择的文件
      let file = e.file;
      // 判断文件是否读取完毕，读取完毕后执行
      // if (window.FileReader) {
      //   let reader = new FileReader();
      //   reader.readAsText(file, "GB2312");//"GB2312"解决读取中文乱码问题
      //   reader.onload = e => {
      //     this.base64String = Buffer.from(e.target.result).toString("base64");
      //   }
      // }

      if (window.FileReader) {
        let reader = new FileReader();
        reader.readAsDataURL(e.file);
        reader.onload = e => {
          this.base64String = e.target.result.substr(e.target.result.indexOf(',') + 1);
        };
      }
    },

    //调用ocr发票识别接口
    getOcrInvoice(params) {
      invokeOrc(params).then(res => {
        if (JSON.parse(res.data).code == 200) {
          this.getInvoiceList();
          this.$message.success('发票识别成功');
          this.tableLoading = false;
        } else {
          this.getInvoiceList();
          //识别失败删除obs文件
          //this.deleteFile(params.fileId);
          this.$message.success(JSON.parse(res.data).message);
          this.tableLoading = false;
        }
      }).catch(e => {
        console.log(e);
        this.tableLoading = false;
      });
    },

    //根据文件ID删除obs文件
    deleteFile(id) {
      downloadUdFile(id).then(res => {
        console.log(res)
      });
    },

    // 下载文档
    async openFile(id) {
      window.open('/fileApi/fileud/udDown?fileIds=' + id, '_blank');
    },

    //支付申请PDF打印
    printPayApply() {
      prints(1).then(res => {
        console.log(res);
        let filename = 'EPQMS';
        let url = window.URL.createObjectURL(res); // 创建下载链接
        let aLink = document.createElement('a'); // 赋值给a标签的href属性
        aLink.style.display = 'none';
        aLink.href = url;
        aLink.setAttribute('download', filename);
        document.body.appendChild(aLink); // 将a标签挂载上去
        aLink.click(); // a标签click事件
        document.body.removeChild(aLink); // 移除a标签
        window.URL.revokeObjectURL(url); // 销毁下载链接
      });
    },

    //退出
    exit() {
      let win = window.open('', '_self', '');
      win.close();
    },

    exitEdit() {
      let params = {
        id: this.pkPayApplyId,
        payApplyCode: this.pkPayApplyCode
      }
      attPay().then(res => {
        console.log(res)
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.is-input .el-input__inner {
  text-align: center;
}

.el-form-item__label {
  text-align: center;
}

.cursor {
  cursor: pointer;
}

.openPage {
  color: $color-blue;
  font-size: 14px;
  text-decoration: underline;
  width: 100px;
  @include text_;
}

.pageTitle {
  padding-top: 30px;

  > span {
    font-size: 20px;
    font-weight: bold;
  }
}

.aTitle {
  > span {
    font-size: 20px;
    font-weight: bold;
  }

  padding-bottom: 2.6375rem;
}

.btnList {
  > span {
    font-size: 20px;
    margin-left: 20px;
  }

  .log {
    font-size: 16px;
    color: #67C23A;
    margin-left: 5px;
  }

  .logopic {
    width: 47px;
    height: 54px;
    background-size: 90%;
  }
}

//.el-row {
//  padding: 1.875rem;
//}

.el-col-4 {
  width: 25%;
  display: flex;
}

.el-col-22 {
  display: flex;
}

.el-col-4 span {
  width: 14.25rem;
  margin: auto;
  text-align: inherit;
}

.el-col-22 {
  margin-top: 20px;
  width: 100%;
}

.el-col-22 span {
  //width: 8.15rem;
  width: 9.75rem;
  margin: auto;
  text-align: inherit;
}

.el-col-15 span {
  width: 23.85rem;
  margin: auto;
  text-align: inherit;
}

.el-col-15 {
  display: flex;
  margin-bottom: 20px;
}

.el-col-12 {
  width: 47.7%;
  display: flex;
  margin-bottom: 20px;

  > span {
    width: 18rem;
  }
}

.el-form-item__content .el-input {
  width: 85%;
  margin-left: 30px;
}

.el-col-11 {
  width: 47.83333%;
}

.el-select {
  width: 85%;
}

.el-form-item__label {
  text-align: initial;
}

.el-form-item__content .el-input[data-v-21c39e25] {
  width: 85%;
  margin-left: 0;
}

::v-deep .el-form {
  .el-form-item__label {
    width: 150px;
  }

  .row1 {
    margin-bottom: 15px;
  }
}

.ceartDiv .el-row {
  padding: 0;
  line-height: 2;
}
</style>
