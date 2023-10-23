<template>
  <iPage>
    <!------------------------------------------------------------>
    <!---               界面切换菜单                            --->
    <!------------------------------------------------------------>
    <detailTop right lev="2" :pageMenu="detailPage" show :query="$route.query" isShowIlog credentials:true>
      <span slot="left" class="floatleft font20 font-weight"> {{ language('ZHIFUSHENQINGHAO', '支付申请号') }}: {{ $route.query.code }} </span>
    </detailTop>
    <div>
      <!-- 页面头部 -->
      <div class="pageTitle flex-between-center-center margin-botttom20">
        <!-- <span> {{ language('ZHIFUSHENQINGHAO', '支付申请号') }} {{payApplyId}}</span> -->
        <span></span>
        <div class="btnList flex-align-center">
          <iButton @click="exit">
            {{ language('SETTLEMENT_TUICHU', '关闭') }}
          </iButton>
        </div>
      </div>
      <iCard class="margin-top20">
        <div style="display: flex">
          <div class="flex-between-center-center aTitle" style="width: 62%">
            <span> {{ language('审批人信息', '审批人信息') }} </span>
          </div>
          <div class="flex-between-center-center aTitle">
            <span> {{ language('审批人信息', '审批人信息') }} </span>
          </div>
        </div>

        <div style="display: flex; padding: 5px">
          <div style="width: 80%">
            <el-table class="table" ref="table" :data="tableListData" min-width="100%" v-loading="loading">
              <el-table-column min-width="7%" :render-header="h => h('span', { domProps: { innerHTML: `${language('序号', '序号')}` } })" type=“index” align="center" ></el-table-column>
              <el-table-column min-width="15%" :render-header="h => h('span', { domProps: { innerHTML: `${language('XUHAO', '行项目编号')}` } })" prop="vettingSeq" align="center" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column min-width="15%" :render-header="h => h('span', { domProps: { innerHTML: `${language('LEIXING', '类型')}` } })" prop="vettingType" align="center" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column min-width="20%" :render-header="h => h('span', { domProps: { innerHTML: `${language('ZHUANGTAI', '状态')}` } })" prop="vettingStatus" align="center" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <span v-if="'draft' == scope.row.vettingStatus">暂存</span>
                  <span v-if="'approving' == scope.row.vettingStatus">审批中</span>
                  <span v-if="'return-material' == scope.row.vettingStatus">审批退回-补充材料</span>
                  <span v-if="'return-rejected' == scope.row.vettingStatus">审批退回-拒绝</span>
                  <span v-if="'pending-sending' == scope.row.vettingStatus">待送票</span>
                  <span v-if="'comparing' == scope.row.vettingStatus">比对中</span>
                  <span v-if="'received' == scope.row.vettingStatus">已收票</span>
                  <span v-if="'comparing-email' == scope.row.vettingStatus">比对失败-邮件通知</span>
                  <span v-if="'comparing-rejected' == scope.row.vettingStatus">比对失败-拒绝</span>
                  <span v-if="'audit-passed' == scope.row.vettingStatus">审核通过</span>
                  <span v-if="'audit-invoice' == scope.row.vettingStatus">审核不通过-问题发票</span>
                  <span v-if="'written-off' == scope.row.vettingStatus">冲销</span>
                  <span v-if="'cancelled' == scope.row.vettingStatus">已取消</span>
                  <span v-if="'audit-rescan' == scope.row.vettingStatus">审核不通过-补充材料（重扫）</span>
                  <span v-if="'audit-norescan' == scope.row.vettingStatus">审核不通过-补充材料（不重扫）</span>
                  <span v-if="'audit-reject' == scope.row.vettingStatus">审核不通过-拒绝</span>
                  <span v-if="'cancel' == scope.row.vettingStatus">取消支付申请</span>
                  <span v-if="'delete' == scope.row.vettingStatus">刪除</span>
                  <span v-if="'cancellation' == scope.row.vettingStatus">作废</span>
                </template>
              </el-table-column>
              <el-table-column min-width="25%" :render-header="h => h('span', { domProps: { innerHTML: `${language('settlement.receiveDate', '接收日期')}` } })" prop="receiveDate" align="center" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  {{scope.row.receiveDate}} {{scope.row.receiveTime}}
                </template>
              </el-table-column>
              <el-table-column min-width="25%" :render-header="h => h('span', { domProps: { innerHTML: `${language('settlement.processDate', '处理日期')}` } })" prop="processDate" align="center" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  {{scope.row.processDate}} {{scope.row.processTime}}
                </template>
              </el-table-column>
              <el-table-column min-width="20%" :render-header="h => h('span', { domProps: { innerHTML: `${language('备注', '备注')}` } })" prop="processTime" align="center" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div style="width: 50%; padding-left: 70px">
            <div class="approval-note">
              <div class="container" v-html="note"></div>
            </div>
            <br>
            <a @click="OpenEditVisible()" style="cursor: pointer">{{ language('settlement.title.note', '添加审批注释') }}</a>
          </div>
        </div>
      </iCard>

      <iDialog :title="language('settlement.title.note', '添加审批注释')" style="margin-top: 16vh" :visible.sync="editVisible" v-if="editVisible" width="40%" @close="editVisible = false" append-to-body>
        <div>
          <i-form-group :model="form" ref="note" :rules="rules" row="1">
            <el-row>
              <el-col :span="24">
                <i-form-item :label="language('settlement.approvelComment', '审批注释')" prop="note">
                  <i-input type="textarea" :placeholder="language('QINGSHURU', '请输入')" v-model.trim="form.note"/>
                </i-form-item>
              </el-col>
            </el-row>
          </i-form-group>
        </div>
        <div slot="footer" class="dialog-footer">
          <iButton @click="editVisible = false" class="color-gray">{{ language('QUXIAO', '取消') }}</iButton>
          <iButton @click="addPayAppNoteInfo">{{ language('QUEDING', '确定') }}</iButton>
        </div>
      </iDialog>
    </div>
  </iPage>
</template>

<script>
import {iCard, iButton, iDialog, iPage, iFormGroup, iFormItem, iInput} from 'rise';
import {pageMixins} from '@/utils/pageMixins';
import resultMessageMixin from '@/utils/resultMessageMixin';
import {tableTitle} from './data';
import {getApplyNote, vettingList, savePayApplyNote} from '@/api/settlement/pay-invoice';

// 引入要调用的后端方法
import detailTop from '../topComponents';
import {detailPage} from '../data';

export default {
  mixins: [pageMixins, resultMessageMixin],
  components: {
    iCard,
    iButton,
    iPage,
    iDialog,
    iFormGroup,
    iFormItem,
    iInput,
    detailTop
  },
  data() {
    return {
      detailPage: detailPage,
      tableTitle,
      tableListData: [],
      tableLoading: false,
      editVisible: false,
      //支付申请ID
      id: this.$route.query.id,
      form: {
        note: ''
      },
      note: '',
      rules: {
        note: [{required: true, message: this.language('settlement.rules.note', '请输入审批注释')}],
      }
    };
  },
  created() {
    this.getVettingList();
  },
  methods: {
    // 审批列表查询
    getVettingList() {
      vettingList(this.id).then(res => {
        if (res.data) {
          this.tableLoading = false;
          this.tableListData = res.data;
          this.getPayApplyNote();
        }
      });
    },
    //查询审批备注
    getPayApplyNote() {
      getApplyNote(this.id).then(res => {
        if (res.code == 200) {
          let html = '';
          res.data.forEach(e => {
            html += '<p class="message">' + e.note + '</p>';
            html += '<p>' + e.time + '</p>';
            html += '<br>';
          });
          this.note = html;
        }
      });
    },
    // 添加审批备注
    addPayAppNoteInfo() {
      this.$refs.note.validate(valid => {
        if (valid) {
          savePayApplyNote(this.id, {note: this.form.note}).then(res => {
            console.log(res);
            if (res.data == true) {
              this.$message.success('审批备注添加成功');
              this.form.note = null;
              this.getPayApplyNote();
              this.editVisible = false;
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //打开添加审批备注弹出框
    OpenEditVisible() {
      this.form.note = "";
      this.editVisible = true;
    },
    // 退出当前页
    exit() {
      let win = window.open('', '_self', '');
      win.close();
    },
  }
};
</script>

<style lang="scss" scoped>
.color-gray {
  color: #6d7689 !important;
}

.color-gray:hover {
  background-color: #c0c6d2 !important;
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

.approval-note {
  width: 100%;
  min-height: 100px;
  background: rgba(248, 248, 250);
  border-radius: 5px;
  max-height: 600px;
  overflow-y: scroll;

  ::v-deep .container {
    padding: 5px;

    .message {
      font-size: 14px;
      color: #3152be;
    }
  }
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

  padding-bottom: 10px;
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
</style>
