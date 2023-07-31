<!-- 支付申请详情 -->
<template>
  <iPage class="orderClassBox" v-loading="saving">
    <div class="pageTitle flex-between-center-center margin-botttom20">
      <span></span>
      <div class="btnList flex-align-center">
        <iButton v-if="btn.check" @click="check">
          {{ language('JIANCHA', '检查') }}
        </iButton>
        <iButton v-if="btn.save" @click="save">
          {{ language('SETTLEMENT_BAOCUN', '保存') }}
        </iButton>
        <iButton v-if="btn.submit" @click="submit">
          {{ language('SETTLEMENT_TIJIAO', '提交') }}
        </iButton>
        <iButton v-if="btn.del" @click="del">
          {{ language('SETTLEMENT_SHANCHU', '删除') }}
        </iButton>
        <iButton v-if="btn.cancel" @click="cancel">
          {{ language('SETTLEMENT_QUXIAOZHIFUSHENQING', '取消支付申请') }}
        </iButton>
        <iButton @click="exit">
          {{ language('SETTLEMENT_TUICHU', '关闭') }}
        </iButton>
      </div>
    </div>

    <iCard :title="language('TOUBUXINXI', '头部信息')" class="margin-top20" collapse>
      <i-form-group :model="payApplyDetail" ref="detail" :rules="rules" row="1">
        <el-row :gutter="24">
          <el-col :span="6">
            <i-form-item :label="language('HETONGBIANHAO', '合同编号')" prop="orderCode">
              <i-text>{{ payApplyDetail.orderCode }}</i-text>
            </i-form-item>
          </el-col>
          <el-col :span="6">
            <i-form-item :label="language('HETONGHUOBI', '合同货币')" prop="orderCurrency">
              <i-text>{{ payApplyDetail.orderCurrency }}</i-text>
            </i-form-item>
          </el-col>
          <el-col :span="6">
            <i-form-item :label="language('SHIFOUYOUYUZHI', '是否有预支')" prop="hasAdvance">
              <i-text>{{ payApplyDetail.hasAdvance }}</i-text>
            </i-form-item>
          </el-col>
          <el-col :span="6">
            <i-form-item :label="language('SHENQINGBUMEN', '申请部门')" prop="applyDept">
              <i-text>{{ payApplyDetail.applyDept }}</i-text>
            </i-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="6">
            <i-form-item :label="language('DANJULEIXING', '单据类型')" prop="applyDept">
              <i-text>{{ payApplyDetail.billType }}</i-text>
            </i-form-item>
          </el-col>
          <el-col :span="6">
            <i-form-item :label="language('GONGYINGSHANGBIANHAO', '供应商编号')" prop="suppCode">
              <i-text>{{ payApplyDetail.suppCode }}</i-text>
            </i-form-item>
          </el-col>
          <el-col :span="12">
            <i-form-item :label="language('GONGYINGSHANGMINGCHENG', '供应商名称')" prop="suppName">
              <i-text>{{ payApplyDetail.suppName }}</i-text>
            </i-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <i-form-item :label="language('GONGYINGSHANGYINHANGZHANGHAO', '供应商银行账号')" prop="suppBankNum">
              <i-text>{{ payApplyDetail.suppBankNum }}</i-text>
            </i-form-item>
          </el-col>
          <el-col :span="12">
            <i-form-item :label="language('LIANXIRENDIANHUA', '联系人电话')" prop="suppTel">
              <i-input :placeholder="language('QINGSHURU', '请输入')" v-model.trim="payApplyDetail.suppTel"
                :disabled="edit" />
            </i-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <i-form-item :label="language('GONGYINGSHANGYINHANGMINGCHENG', '供应商银行名称')" prop="suppBankName">
              <i-text>{{ payApplyDetail.suppBankName }}</i-text>
            </i-form-item>
          </el-col>
          <el-col :span="12">
            <i-form-item :label="language('LIANXIRENYOUJIAN', '联系人邮件')" prop="suppEmail">
              <i-input :placeholder="language('QINGSHURU', '请输入')" v-model.trim="payApplyDetail.suppEmail"
                :disabled="edit" />
            </i-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <i-form-item :label="language('FUKUANFANGSHIJIQIXIAN', '付款方式及期限')" prop="payTypeDisp">
              <i-text>{{ payApplyDetail.payTypeDisp }}</i-text>
            </i-form-item>
          </el-col>
          <el-col :span="12">
            <i-form-item :label="language('BEIZHU', '备注')" prop="note">
              <i-input type="textarea" :placeholder="language('QINGSHURU', '请输入')" v-model.trim="payApplyDetail.note"
                :disabled="edit" />
            </i-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <!-- 上传文件 -->
            <i-form-item :label="language('FUJIAN', '附件') + ':'">
              <i-text class="not-bg">
                <div class="left" v-if="attachmentList.length == 0">
                  <icon symbol name="iconzengjiacailiaochengben_lan" class="journal"></icon>
                  {{ language('LK_ZANWUFUJIANQINGSHANGCHUAN', '暂无附件，请上传') }}
                </div>
                <div class="file-box" v-if="attachmentList.length > 0">
                  <div class="list" v-for="(item, index) in attachmentList" :key="index">
                    <icon symbol name="iconfujian" class="icon1" @click.native="downloadPicture(item)" />
                    <span @click.native="downloadPicture(item)">{{ item.name }}</span>
                    <icon symbol name="iconlingjianshanchu" class="icon2" @click.native="deleteFileFun(item.id)"></icon>
                  </div>
                </div>
                <el-upload class="upload" :show-file-list="false" :data="{ applicationName: 'rise' }" name="multipartFile"
                  with-credentials :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload"
                  :http-request="attachmentUpload"
                  accept=".jpg,.jpeg,.gif,.png,.bmp,.xlsx,.xls,.pdf,.doc,.docx,.ppt,.pptx">
                  <icon symbol name="iconzichanfujianshangchuan" class="icon-upload"></icon>
                </el-upload>
              </i-text>
            </i-form-item>
          </el-col>
        </el-row>
      </i-form-group>
    </iCard>

    <iCard class="changeSummary margin-top20">
      <template #header>
        <div class="title">
          <span>{{ `${language('HANGXIANGMUXINXI', '行项目信息')}` }}</span>
        </div>
        <!-- <div class="header-control">
          <div class="btn">
            <iButton @click="handleAdd">{{ language("TIANJIAHANG", "添加行") }}</iButton>
          </div>
        </div> -->
      </template>
      <div class="body margin-top20">
        <el-table class="table" ref="table" :data="tableData" min-width="100%" v-loading="loading"
          @selection-change="handleSelectionChange">
          <!-- 行项目编号 -->
          <el-table-column min-width="8%" :render-header="h => h('span', { domProps: { innerHTML: `${language('HANGXIANGMUBIANHAO', '行项目编号')}` } })" align="center" :show-overflow-tooltip="true">
            <template v-slot="scope">
              <span>{{ scope.row.itemNo }}</span>
            </template>
          </el-table-column>
          <!-- 行项目名称 -->
          <el-table-column min-width="8%" :render-header="h => h('span', { domProps: { innerHTML: `${language('HANGXIANGMUMINGCHENG', '行项目名称')}` } })" align="center" :show-overflow-tooltip="true">
            <template v-slot="scope">
              <span>{{ scope.row.itemName }}</span>
            </template>
          </el-table-column>
          <!-- 本次支付数量 -->
          <el-table-column min-width="8%" :render-header="h => h('span', { domProps: { innerHTML: `${language('BENCIZHIFUSHULIANG', '本次支付数量')}<span class='require'>*</span>` } })" align="center" :show-overflow-tooltip="true">
            <template v-slot="scope">
              <iInput v-model="scope.row.currPayNum" class="input-center"
                @input="handleInputByNumber($event, 'currPayNum', scope.row, 4, updateCurrPayAmount)" />
            </template>
          </el-table-column>
          <!-- 待支付数量 -->
          <el-table-column min-width="8%" :label="language('DAIZHIFUSHULIANG', '待支付数量')" align="center" prop="waitPayNum" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              {{ fixNumber(scope.row.waitPayNum) }}
            </template>
          </el-table-column>
          <!-- 订单行项目总数 -->
          <el-table-column min-width="8%" :render-header="h => h('span', { domProps: { innerHTML: `${language('DINGDANHANGXIANGMUZONGSHU', '订单行项目总数')}` } })" align="center" :show-overflow-tooltip="true">
            <template v-slot="scope">
              <span>{{ floatFixNum(scope.row.itemQuantity) }}</span>
            </template>
          </el-table-column>
          <!-- 单位 -->
          <el-table-column min-width="8%" :render-header="h => h('span', { domProps: { innerHTML: `${language('DANWEI', '单位')}` } })" align="center" :show-overflow-tooltip="true">
            <template v-slot="scope">
              <span>{{ scope.row.unit }}</span>
            </template>
          </el-table-column>
          <!-- 价格单位 -->
          <el-table-column min-width="8%" :render-header="h => h('span', { domProps: { innerHTML: `${language('JIAGEDANWEI', '价格单位')}` } })" align="center" :show-overflow-tooltip="true">
            <template v-slot="scope">
              <span>{{ floatFixNum(scope.row.priceUnit) }}</span>
            </template>
          </el-table-column>
          <!-- 单价 -->
          <el-table-column min-width="8%" :render-header="h => h('span', { domProps: { innerHTML: `${language('DANJIA', '单价')}` } })" align="center" :show-overflow-tooltip="true">
            <template v-slot="scope">
              <span>{{ floatFixNum(scope.row.netPrice) }}</span>
            </template>
          </el-table-column>
          <!-- 本次支付金额 -->
          <el-table-column min-width="8%" :label="language('BENCIZHIFUJINE', '本次支付金额')" align="center" prop="currPayAmount" :show-overflow-tooltip="true">
            <template #template="{ row }">
              {{ floatFixNum(row.currPayAmount) }}
            </template>
          </el-table-column>
          <!-- 待支付金额 -->
          <el-table-column min-width="8%" :render-header="h => h('span', { domProps: { innerHTML: `${language('DAIZHIFUJINE', '待支付金额')}` } })" align="center" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ floatFixNum(scope.row.waitPayAmount) }}</span>
            </template>
          </el-table-column>
          <!-- 订单行项目总金额 -->
          <el-table-column min-width="10%" :render-header="h => h('span', { domProps: { innerHTML: `${language('DINGDANHANGXIANGMUZONGJINE', '订单行项目总金额')}` } })" align="center" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ floatFixNum(scope.row.itemTotalAmount) }}</span>
            </template>
          </el-table-column>
          <!-- 货币 -->
          <el-table-column min-width="8%" :render-header="h => h('span', { domProps: { innerHTML: `${language('HUOBI', '货币')}` } })" align="center" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.currency }}</span>
            </template>
          </el-table-column>
          <template #append>
            <div class="summary">
              <span>不含可抵扣税金额</span>
              <span>RMB {{ floatFixNum(total) }} </span>
            </div>
          </template>
        </el-table>
      </div>
    </iCard>
  </iPage>
</template>

<script>
import { iPage, iCard, iFormGroup, iFormItem, iText, iInput, iButton, icon, iMessage } from 'rise';
import { tableTitle, handleInputByNumber, floatFixNum, fixNumber } from './data';
// 引入要调用的后端方法
import { savePayApply, getPayApplyInfo, submitPayApply, checkPayApply, deletePayApply, cancelPayApply } from '@/api/settlement/pay-apply';
import { uploadUdFile2 } from '@/api/file/upload';
import { math } from '@/utils';

export default {
  name: 'PayApplyInfo',
  components: {
    iPage,
    iCard,
    iFormGroup,
    iFormItem,
    iText,
    iInput,
    iButton,
    icon,
  },
  props: {
    attachmentList: { type: Array, default: () => [] }
  },
  data() {
    return {
      saving: false,
      // 按钮控制
      edit: false,
      payApplyDetail: {
        orderCode: '', //合同编号
        orderCurrency: '', //合同货币
        hasAdvance: '', //是否有预支
        applyDept: '', //申请部门
        billType: '', // 单据类型
        suppCode: '', //供应商编号
        suppName: '', //供应商名称
        suppBankNum: '', //供应商银行账号
        suppTel: '', //联系人电话
        suppBankName: '', //供应商银行名称
        suppEmail: '', //联系人邮件
        payTypeDisp: '', //付款方式及期限
        note: '', // 备注,
        totalValue: null
      },
      tableData: [],
      getContractDto: {
        suppCode: '',
        orderCode: ''
      },
      rules: {
        suppTel: [{ required: true, message: this.language('settlement.rules.suppTel', '请输入联系人电话') }],
        suppEmail: [{ required: true, validator: this.checkEmail, }]
      },
      btn: {
        check: false, save: false, submit: false, del: false, close: false
      },
      status: null,
      statusMsg: null,
      delFileIds: [], //要删除的文件id,
      total: null,
      id: this.$route.query.id,
      contractCode: this.$route.query.contractCode, //合同号
      payApplyCode: this.$route.query.code // 支付申请号
    };
  },
  computed: {
    isFS() {
      return this.$route.path.includes('proconfirm');
    },
    tableTitle() {
      if (this.isFS) {
        return tableTitle.filter(item => item.key !== 'QUERENSHIJIAN');
      } else {
        return tableTitle;
      }
    }
  },
  created() {
    this.getPayApplyInfo();
  },
  methods: {
    checkEmail(rule, value, callback) {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      }
      if (mailReg.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的邮箱格式'))
      }
    },
    floatFixNum,
    fixNumber,
    // 根据支付申请号查询
    getPayApplyInfo() {
      getPayApplyInfo(this.id).then(res => {
        if (res.code == 200) {
          this.status = res.data.payApplyStatus;
          this.statusMsg = res.data.statusMsg;
          this.payApplyDetail = res.data;
          this.tableData = res.data.lines;
          for (let e in this.tableData) {
            this.tableData[e].oldWaitPayNum = this.tableData[e].waitPayNum;
          }
          this.attachmentList = res.data.atts;
          this.total = res.data.totalValue;
          if (this.status == '02' || this.status == '03' || this.status == '04') {
            this.edit = true;
          }
          this.setBtnVisible();
        } else {
          iMessage(this.$i18n.locale === 'zh' ? res.desZh : res.desEn);
        }
      });
    },
    setBtnVisible() {
      this.btn.check = '01' == this.status;
      this.btn.save = '01' == this.status;
      this.btn.submit = '01' == this.status;
      this.btn.del = 'draft' == this.statusMsg;
      this.btn.cancel = ['03', '09', '20'].includes(this.status);
    },
    // 检查
    check() {
      this.saving = true;
      checkPayApply(this.id).then(res => {
        if (res.code == 200) {
          if ('E' == res.data.type) {
            iMessage.error(res.data.msgText);
          } else if ('W' == res.data.type) {
            iMessage.warn(res.data.msgText);
          } else if ('I' == res.data.type) {
            iMessage.success(res.data.msgText);
          } else {
            iMessage.success(res.data.msgText);
          }
        } else {
          iMessage.error(res.data.msgText);
        }
        this.saving = false;
      }).catch(e => {
        console.log(e);
        this.saving = false;
      });
    },
    // 保存
    save() {
      this.$refs.detail.validate(valid => {
        if (valid) {
          this.saving = true;
          this.payApplyDetail.totalValue = this.total;
          savePayApply(this.id, {
            payApplyCode: this.$route.query.payApplyCode,
            totalValue: this.total,
            ...this.payApplyDetail,
            lines: this.tableData,
            atts: this.attachmentList
          }).then(res => {
            if (res.code == 200) {
              iMessage.success(res.desZh);
            } else {
              iMessage.error(res.desZh);
            }
            this.saving = false;
          }).catch(e => {
            console.log(e);
            this.saving = false;
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 提交
    submit() {
      this.$confirm(this.language('settlement.tip.submit', '您确认提交支付申请? 确认支付申请内填写的联系人, 邮箱及支付支付数量都填写正确!'), this.language('SETTLEMENT_SHANCHU', '删除'), {
        confirmButtonText: this.language('settlement.yes', '是'),
        cancelButtonText: this.language('settlement.no', '否'),
        type: 'warning'
      }).then(() => {
        this.saving = true;
        submitPayApply(this.id).then(res => {
          if (res.code == 200) {
            if ('E' == res.data.type) {
              iMessage.error(res.data.msgText);
            } else if ('W' == res.data.type) {
              iMessage.warn(res.data.msgText);
            } else if ('I' == res.data.type) {
              iMessage.success(res.data.msgText);
            } else {
              iMessage.success(res.data.msgText);
            }
          } else {
            iMessage.error(res.desZh);
          }
          this.saving = false;
        }).catch(e => {
          console.log(e);
          this.saving = false;
        });
      });
    },
    // 删除
    del() {
      this.$confirm(this.language('settlement.tip.delete', '您确认要删除此支付申请吗? 此操作无法撤销!'), this.language('SETTLEMENT_SHANCHU', '删除'), {
        confirmButtonText: this.language('settlement.yes', '是'),
        cancelButtonText: this.language('settlement.no', '否'),
        type: 'warning'
      }).then(() => {
        this.saving = true;
        deletePayApply(this.id).then(res => {
          if (res.code == 200) {
            if (res.data.msgText != null || res.data.msgText != '') {
              if ('E' == res.data.type) {
                iMessage.error(res.data.msgText);
              } else if ('W' == res.data.type) {
                iMessage.warn(res.data.msgText);
              } else if ('I' == res.data.type) {
                iMessage.success(res.data.msgText);
              } else {
                iMessage.success(res.data.msgText);
              }
            } else {
              iMessage.success(res.desZh);
            }
          } else {
            iMessage.error(res.desZh);
          }
          this.saving = false;
        }).catch(e => {
          console.log(e);
          this.saving = false;
        });
      });
    },
    // 取消支付申请
    cancel() {
      this.$confirm(this.language('settlement.tip.cancel', '您确认取消支付申请? 此操作无法撤销!'), this.language('QUXIAO', '删除'), {
        confirmButtonText: this.language('settlement.yes', '是'),
        cancelButtonText: this.language('settlement.no', '否'),
        type: 'warning'
      }).then(() => {
        this.saving = true;
        cancelPayApply(this.id).then(res => {
          if (200 == res.code) {
            if (res.data.msgText != null || res.data.msgText != '') {
              if ('E' == res.data.type) {
                iMessage.error(res.data.msgText);
              } else if ('W' == res.data.type) {
                iMessage.warn(res.data.msgText);
              } else if ('I' == res.data.type) {
                iMessage.success(res.data.msgText);
              } else {
                iMessage.success(res.data.msgText);
              }
            } else {
              iMessage.success(res.desZh);
            }
          } else {
            iMessage.error(res.desZh);
          }
          this.saving = false;
        }).catch(e => {
          console.log(e);
          this.saving = false;
        });
      });
    },
    // 退出
    exit() {
      let win = window.open('', '_self', '');
      win.close();
    },
    // 附件上传
    async attachmentUpload(content) {
      const res = await uploadUdFile2({
        multifile: content.file
      });
      if (res.code == '200') {
        iMessage.success('上传成功');
        this.attachmentList.push(res.data[0]);
        this.$emit('refresh', true);
      }
    },
    // 删除附件
    deleteFileFun(id) {
      this.attachmentList.some((item, i) => {
        if (item.id == id) {
          this.attachmentList.splice(i, 1);
        }
      })
      this.$emit('refresh', true);
    },
    // 打开文件
    downloadPicture(e) {
      window.open(e.path);
    },
    handleInputByNumber,
    updateCurrPayAmount(value, key, row) {
      console.log('1')
      this.computeCurrPayAmount(value, key, row);
    },
    computeCurrPayAmount(originValue, originKey, row) {
      if (row.currPayNum || row.currPayNum === 0) {
        // 待支付数量 = 未支付数量 - 本次支付数量
        this.$set(row, 'waitPayNum', this.accSub(math.bignumber(row.itemQuantity || 0), math.bignumber(row.currPayNum || 0)));
        // 本次支付金额：本次支付数量 * 单价 / 价格单位
        this.$set(row, 'currPayAmount', math.divide(math.multiply(math.bignumber(row.currPayNum || 0), math.bignumber(row.netPrice || 0)), math.bignumber(`${row.priceUnit}`.trim() || 0)).toFixed(2));
        this.computeTotal(originValue, originKey);
      } else {
        this.$set(row, 'waitPayNum', row.oldWaitPayNum);
        this.$set(row, 'currPayAmount', null);
        this.computeTotal();
      }
    },
    // 添加行
    handleAdd() {
      this.tableData.push({
        itemNo: 1,
        itemName: 2,
        // waitPayNum: ,
        itemQuantity: 100,
        unit: '个',
        priceUnit: 1,
        netPrice: 1.2,
        waitPayAmount: 100000,
        itemTotalAmount: 700000,
        currency: 'RMB'
      });
    },
    computeTotal() {
      let num = 0;
      this.tableData.forEach(function (i) {
        num = math.add(math.bignumber(num), math.bignumber(i.currPayAmount)).toFixed(3);
      });
      this.total = num;
      this.$emit('updateTotal', this.total);
    },
    // 减法
    accSub(arg1, arg2) {
      var r1, r2, m;
      try {
        r1 = arg1.toString().split('.')[1].length;
      } catch (e) {
        r1 = 0;
      }
      try {
        r2 = arg2.toString().split('.')[1].length;
      } catch (e) {
        r2 = 0;
      }
      m = Math.pow(10, Math.max(r1, r2));
      // n = (r1 >= r2) ? r1 : r2;
      return (arg1 * m - arg2 * m) / m;
    }
  }
};
</script>

<style lang="scss" scoped>
.btnList {
  display: flex;
  justify-content: flex-end;
}

.measurement,
.tabelList,
.basicMessage,
.elForm {
  margin-top: 20px;
}

.btn {
  display: flex;
  justify-content: flex-end;
}

.measuretitle {
  font-size: 16px;
  font-weight: bold;
}

.measure {
  display: flex;
  justify-content: space-between;
}

.numbers {
  ::v-deep .el-input__inner {
    padding: 6px;
  }
}

.materiel {
  position: relative;

  .repeateMa {
    position: absolute;
    color: red;
    font-size: 12px;
    left: 126px;
    top: 46px;
    zoom: 0.9;
  }
}

.red {
  color: red;
  float: left;
}

.unit {
  ::v-deep .el-form-item {
    margin-bottom: 0px;
  }
}

.partNum {
  ::v-deep .el-input__inner {
    padding-left: 0px;
    padding-right: 0px;
    text-align: center;
    font-size: 12px;
  }
}

.partNum-input {
  width: 35px;
}

::v-deep .form-row {
  .el-form-item {
    display: flex;

    .el-form-item__label {
      line-height: 35px;
      width: 134px;
      text-align: left;
      font-size: 16px;
      color: #4b4b4c;
      letter-spacing: 0;
      margin-bottom: 0;
      padding-right: 0;
    }

    .el-form-item__content {
      flex: 1;
    }
  }
}

.button-list {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 18px 0 40px;

  .el-form-item {
    margin-bottom: 0;

    .el-button {
      height: 35px;
      width: 100px;
    }

    .cancel {
      margin-right: 20px;
    }
  }
}

.orderClassBox {
  position: relative;

  .pageTitle {
    >span {
      font-size: 20px;
      font-weight: bold;
    }
  }

  .btnList {
    >span {
      font-size: 20px;
      margin-left: 20px;
    }

    .log {
      font-size: 16px;
      color: #1660f1;
      margin-left: 5px;
    }

    .logopic {
      width: 47px;
      height: 54px;
      /* background: url('../../../../../../../../assets/images/w2/logo7269.png') no-repeat; */
      background-size: 90%;
    }
  }
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
      margin: 2.5px 5px;
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

    .email-box {
      border: 0;
      width: 100%;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      box-shadow: 0 0 0.1875rem rgb(0 38 98 / 15%);
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

.card-head-from {
  display: flex;

  .enclosure-box {
    display: flex;
    align-items: center;
    color: #000000;
    opacity: 0.42;

    .txt {
      font-size: 16px;
      font-weight: normal;
      margin-left: 8px;
    }

    .journal {
      width: 16px;
      height: 16px;
    }
  }
}

.item_title {
  >span {
    font-size: 18px;
    font-weight: bold;
  }
}

.upload {
  display: inline-block;
}

.card-head-from {
  display: flex;

  .enclosure-box {
    display: flex;
    align-items: center;
    color: #000000;
    opacity: 0.42;

    .txt {
      font-size: 16px;
      font-weight: normal;
      margin-left: 8px;
    }

    .journal {
      width: 16px;
      height: 16px;
    }
  }

  .from {
    display: flex;
    align-items: center;
    font-weight: bold;
    color: #4b4b4c;
    font-size: 18px;

    .file-box {
      display: flex;
      align-items: center;
      flex-direction: row;
      color: #1660f1;
      text-decoration: underline;

      .list {
        &:not(:first-child) {
          margin-left: 10px;
        }
      }

      .icon1 {
        width: 15px;
        height: 16px;
      }

      .icon2 {
        width: 14px;
        height: 14px;
      }
    }
  }
}

.not-bg {
  background-color: #fff !important;

  .left {
    opacity: 0.5;
  }

  ::v-deep .child,
  ::v-deep .el-tooltip {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .icon-upload {
    width: 22px;
    height: 18px;
    cursor: pointer;
  }

  .journal {
    width: 16px;
    height: 16px;
  }

  .file-box {
    display: flex;
    align-items: center;
    flex-direction: row;
    color: #1660f1;
    text-decoration: underline;
    font-weight: normal;
    font-size: 16px;

    .list {
      &:not(:first-child) {
        margin-left: 10px;
      }
    }

    .icon1 {
      width: 15px;
      height: 16px;
    }

    .icon2 {
      width: 14px;
      height: 14px;
    }
  }
}

::v-deep .el-form {
  .el-form-item__label {
    width: 150px;
  }

  .row1 {
    margin-bottom: 15px;
  }
}

.changeSummary {
  ::v-deep .cardHeader {
    padding-bottom: 20px;
  }

  ::v-deep .title {
    .tip {
      font-size: 14px;
      font-weight: 400;
      line-height: 16px;
      color: #485465;
      opacity: 0.7;
    }
  }

  .header-control {
    .btn {
      display: inline-block;
    }
  }

  .isChangeCheckbox {
    ::v-deep .el-checkbox__inner {
      border: 1px solid #50565d;
    }

    ::v-deep .el-checkbox__label {
      padding-left: 10px;
      font-size: 16px;
      font-weight: 400;
      color: #000;
    }

    ::v-deep .el-checkbox__input.is-checked+.el-checkbox__label {
      color: #1763f7;
    }
  }

  .isChangeCheckboxSpace {
    margin-right: 32px;
  }

  .table {
    // .manufacturingMethodColumn {
    //   position: relative;

    //   ::v-deep .iconFont {
    //     width: 30px;
    //     position: absolute;
    //     top: 50%;
    //     left: 0;
    //     transform: translate(0, -50%);

    //     svg {
    //       vertical-align: middle;
    //       float: left;
    //     }
    //   }

    //   & > div:not(.iconFont) {
    //     padding-left: 30px;
    //   }
    // }

    ::v-deep td {
      border-right: 0;
      border-bottom: 1px solid rgba(112, 112, 112, 0.1);
    }

    ::v-deep .require {
      margin-left: 3px;
      color: #e30d0d;
    }

    .summary {
      height: 50px;
      line-height: 50px;
      background: #f7faff;
      font-weight: bold;
      display: flex;
      justify-content: flex-end;

      span:first-of-type {
        padding-left: 19px;
      }

      span:last-of-type {
        padding-right: 12px;
      }
    }
  }
}
</style>
