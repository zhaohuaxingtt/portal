<template>
  <iPage>
    <div class="title">
      <pageHeader v-if="this.$route.query.id"
        >{{ this.formContent.code }}
        {{ language(formContent.pgNameZh) }}</pageHeader
      >
      <pageHeader v-else>{{ language(pageTitle) }}</pageHeader>
    </div>
    <div class="content">
      <iCard :title="language('基础信息')" collapse>
        <div slot="header-control">
          <div v-if="editSta">
            <iButton
              @click="edit"
              v-permission="'BUTTON_MATERIEL_DATA_PRODUCT_GROUP_MODIFY'"
              >{{ language('编辑') }}</iButton
            >
          </div>
          <div v-else>
            <iButton
              @click="save('ruleForm')"
              v-permission="
                'BUTTON_MATERIEL_DATA_PRODUCT_GROUP_MODIFY|BUTTON_MATERIEL_DATA_PRODUCT_GROUP_ADD'
              "
              >{{ language('保存') }}</iButton
            >
            <iButton
              @click="cancel"
              v-permission="
                'BUTTON_MATERIEL_DATA_PRODUCT_GROUP_MODIFY|BUTTON_MATERIEL_DATA_PRODUCT_GROUP_ADD'
              "
              >{{ language('取消') }}</iButton
            >
          </div>
        </div>
        <div class="foemItem">
          <el-form
            label-width="140px"
            label-position="left"
            :rules="rules"
            :model="formContent"
            class="validate-required-form"
            ref="ruleForm"
          >
            <el-row gutter="24">
              <el-col :span="6">
                <iFormItem :label="language('产品组编号')" prop="code">
                  <iInput
                    :placeholder="language('请输入')"
                    :disabled="readOnly || this.$route.query.id"
                    v-model="formContent.code"
                  ></iInput>
                </iFormItem>
              </el-col>
              <el-col :span="6">
                <iFormItem :label="language('产品组名称(中)')" prop="pgNameZh">
                  <iInput
                    :placeholder="language('请输入')"
                    :disabled="readOnly"
                    v-model="formContent.pgNameZh"
                  ></iInput>
                </iFormItem>
              </el-col>
              <el-col :span="6">
                <iFormItem :label="language('产品组名称(德)')" prop="pgNameDe">
                  <iInput
                    :placeholder="language('请输入')"
                    :disabled="readOnly"
                    v-model="formContent.pgNameDe"
                  ></iInput>
                </iFormItem>
              </el-col>
              <el-col :span="6">
                <iFormItem
                  :label="language('释放--定点日期的周数')"
                  prop="releaseNomiWeek"
                >
                  <iInput
                    :placeholder="language('请输入')"
                    :disabled="readOnly"
                    v-model.number="formContent.releaseNomiWeek"
                  ></iInput>
                </iFormItem>
              </el-col>
            </el-row>
            <el-row gutter="24">
              <el-col :span="6">
                <iFormItem
                  :label="language('定点--BF的周数')"
                  prop="nomiToBffWeek"
                >
                  <iInput
                    :placeholder="language('请输入')"
                    :disabled="readOnly"
                    v-model.number="formContent.nomiToBffWeek"
                  ></iInput>
                </iFormItem>
              </el-col>
              <el-col :span="6">
                <iFormItem
                  :label="labelTitle.BFtryoutDate"
                  prop="bfFirstTryoutWeek"
                >
                  <span slot="label" v-html="labelTitle.BFtryoutDate"></span>
                  <iInput
                    :placeholder="language('请输入')"
                    :disabled="readOnly"
                    v-model.number="formContent.bfFirstTryoutWeek"
                  ></iInput>
                </iFormItem>
              </el-col>
              <el-col :span="6">
                <iFormItem :label="labelTitle.tryoutOTS" prop="firstTryOtsWeek">
                  <span slot="label" v-html="labelTitle.tryoutOTS"></span>
                  <iInput
                    :placeholder="language('请输入')"
                    :disabled="readOnly"
                    v-model.number="formContent.firstTryOtsWeek"
                  ></iInput>
                </iFormItem>
              </el-col>
              <el-col :span="6">
                <iFormItem :label="labelTitle.tryoutEM" prop="firstTryEmWeek">
                  <span slot="label" v-html="labelTitle.tryoutEM"></span>
                  <iInput
                    :placeholder="language('请输入')"
                    :disabled="readOnly"
                    v-model.number="formContent.firstTryEmWeek"
                  ></iInput>
                </iFormItem>
              </el-col>
            </el-row>
          </el-form>
        </div>

        <div class="tabelList" v-if="showList">
          <el-divider></el-divider>
          <div class="tabelBtn">
            <iButton
              @click="add"
              v-permission="'BUTTON_MATERIEL_DATA_PRODUCT_GROUP_SIX_NUMBER_ADD'"
              >{{ language('新增') }}</iButton
            >
            <iButton
              @click="del"
              :disabled="selectedItem.length == 0"
              v-permission="
                'BUTTON_MATERIEL_DATA_PRODUCT_GROUP_SIX_NUMBER_DELETE'
              "
              >{{ language('删除') }}</iButton
            >
          </div>
          <div class="tabelConten">
            <iTableCustom
              ref="partSixNumTabel"
              :loading="loading"
              :columns="detailTabelList"
              :data="detailData"
              @open="open"
              @handle-selection-change="handleSelectionChange"
            ></iTableCustom>
            <!-- <iPagination
            v-update
            @size-change="handleSizeChange($event, querry)"
            @current-change="handleCurrentChange($event, querry)"
            background
            :current-page="page.currPage"
            :page-sizes="page.pageSizes"
            :page-size="page.pageSize"
            :layout="page.layout"
            :total="page.totalCount"
            ></iPagination> -->
          </div>
        </div>
      </iCard>
    </div>
    <iDialogPage
      v-if="openSta"
      :openStatus="openSta"
      :inputId="inputId"
      @closeDialog="closeDialog"
      @upSearch="getFormContent"
      :productId="productId"
    ></iDialogPage>
  </iPage>
</template>

<script>
import { iPage, iCard, iFormItem, iInput, iButton } from 'rise'
import pageHeader from '@/components/pageHeader'
import iTableCustom from '@/components/iTableCustom'
import iDialogPage from './components/iDialogPage'
import { pageMixins } from '@/utils/pageMixins'
import { detailTabelList } from './data.js'
import {
  saveProductData,
  getProductById,
  delProSixNum
} from '@/api/materiel/productData.js'

export default {
  name: '产品主数据详情',
  mixins: [pageMixins],
  components: {
    iPage,
    pageHeader,
    iCard,
    iFormItem,
    iInput,
    iButton,
    iTableCustom,
    iDialogPage
  },
  computed: {},
  data() {
    var validatePass = (rule, value, callback) => {
      let pattern = /^[1-9][0-9]*$/

      if (pattern.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正整数'))
      }
    }
    return {
      loading: false,
      editSta: true,
      productId: null,
      readOnly: true,
      openSta: false, //控制idialog显示
      showList: false,
      pageTitle: '新增产品组',
      inputId: '',
      detailTabelList,
      detailData: [],
      labelTitle: {
        productNum: '产品组编号',
        productCh: '产品组名称(中)',
        productDe: '产品组名称(德)',
        releaseDate: '释放--定点日期的周数',
        BFDate: '定点--BF的周数',
        BFtryoutDate: `BF--1${'st'.sup()} tryout的周数`,
        tryoutOTS: `1${'st'.sup()} tryout--OTS的周数`,
        tryoutEM: `1${'st'.sup()} tryout--EM的周数`
      },
      formContent: {
        code: '',
        pgNameZh: '',
        pgNameDe: '',
        releaseNomiWeek: '',
        nomiToBffWeek: '',
        bfFirstTryoutWeek: '',
        firstTryOtsWeek: '',
        firstTryEmWeek: ''
      },
      iniFormContent: {
        code: '',
        pgNameZh: '',
        pgNameDe: '',
        releaseNomiWeek: '',
        nomiToBffWeek: '',
        bfFirstTryoutWeek: '',
        firstTryOtsWeek: '',
        firstTryEmWeek: ''
      },
      // btnTitle:{
      //   edit:'编辑',
      //   save:'保存',
      //   cancel:'取消',
      //   add:'新增',
      //   del:'删除'
      // },
      placeholderText: '请输入',
      rules: {
        code: [
          { required: true, message: '请输入产品组编号', trigger: 'blur' }
        ],
        pgNameZh: [
          { required: true, message: '请输入产品组中文名称', trigger: 'blur' }
        ],
        pgNameDe: [
          { required: true, message: '请输入产品组德文名称', trigger: 'blur' }
        ]
        // releaseNomiWeek:[{validator:validatePass,trigger:'blur'}],
        // nomiToBffWeek:[{validator:validatePass,trigger:'blur'}],
        // bfFirstTryoutWeek:[{validator:validatePass,trigger:'blur'}],
        // firstTryOtsWeek:[{validator:validatePass,trigger:'blur'}],
        // firstTryEmWeek:[{validator:validatePass,trigger:'blur'}],
      },
      selectedItem: []
    }
  },
  methods: {
    save(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {}
          if (this.productId) {
            data = {
              ...this.formContent,
              id: this.productId
            }
          } else {
            data = { ...this.formContent }
          }
          saveProductData(data)
            .then((val) => {
              if (val.code == 200) {
                let requireData = val.data
                // this.formContent = requireData
                this.productId = requireData.id
                if (this.pageTitle == '新增产品组') {
                  this.$router.replace({ query: { id: this.productId } })
                }
                // this.pageTitle = '编辑'
                this.readOnly = true
                this.showList = true
                this.editSta = true
                this.$message.success('保存成功')
              } else if (val.code == 1) {
                this.$message.error(val.desZh)
              }
            })
            .catch(() => {
              this.$message.error('保存失败')
            })
            .finally(() => {
              this.getFormContent()
            })
        } else {
          return false
        }
      })
    },
    closeDialog(val) {
      this.openSta = val
    },
    edit() {
      this.readOnly = false
      this.editSta = false
    },
    open(row) {
      this.openSta = true
      this.inputId = row.id
    },
    add() {
      this.openSta = true
      this.inputId = ''
    },
    del() {
      this.$confirm('是否删除已选中选项', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let ids = []
          this.selectedItem.forEach((item) => {
            return ids.push(item.id)
          })
          delProSixNum(ids)
            .then((val) => {
              if (val.code == 200) {
                this.getFormContent()
                this.$message.success('删除成功')
              } else if (val.code == 1) {
                this.$message.error(val.desZh)
              }
            })
            .catch(() => {
              this.$$message.error('删除失败')
            })
        })
        .catch(() => {
          this.$refs.partSixNumTabel.clearSelection()
        })
    },
    handleSelectionChange(val) {
      this.selectedItem = val
    },
    getFormContent() {
      this.loading = true
      getProductById(this.productId)
        .then((val) => {
          if (val.code == 200) {
            let data = val.data
            this.formContent.code = data.code
            this.formContent.pgNameZh = data.pgNameZh
            this.formContent.pgNameDe = data.pgNameDe
            this.formContent.releaseNomiWeek = data.releaseNomiWeek
            this.formContent.nomiToBffWeek = data.nomiToBffWeek
            this.formContent.bfFirstTryoutWeek = data.bfFirstTryoutWeek
            this.formContent.firstTryOtsWeek = data.firstTryOtsWeek
            this.formContent.firstTryEmWeek = data.firstTryEmWeek

            this.iniFormContent.code = JSON.parse(JSON.stringify(val.data.code))
            this.iniFormContent.pgNameZh = JSON.parse(
              JSON.stringify(val.data.pgNameZh)
            )
            this.iniFormContent.pgNameDe = JSON.parse(
              JSON.stringify(val.data.pgNameDe)
            )
            this.iniFormContent.releaseNomiWeek = JSON.parse(
              JSON.stringify(val.data.releaseNomiWeek)
            )
            this.iniFormContent.nomiToBffWeek = JSON.parse(
              JSON.stringify(val.data.nomiToBffWeek)
            )
            this.iniFormContent.bfFirstTryoutWeek = JSON.parse(
              JSON.stringify(val.data.bfFirstTryoutWeek)
            )
            this.iniFormContent.firstTryOtsWeek = JSON.parse(
              JSON.stringify(val.data.firstTryOtsWeek)
            )
            this.iniFormContent.firstTryEmWeek = JSON.parse(
              JSON.stringify(val.data.firstTryEmWeek)
            )

            this.detailData = data.vos
          } else if (val.code == 1) {
            this.$message.error(val.desZh)
          }
        })
        .catch(() => {
          // this.$message.error('获取数据失败')
          this.loading = false
        })
        .finally(() => {
          this.loading = false
        })
    },
    cancel() {
      if (!this.productId) {
        window.close()
      }
      if (
        JSON.stringify(this.iniFormContent) !=
          JSON.stringify(this.formContent) &&
        this.productId
      ) {
        this.$confirm('数据有改动，是否取消此次的改动', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.getFormContent()
          this.editSta = true
          this.readOnly = true
        })
      } else {
        this.editSta = true
        this.readOnly = true
      }
    }
  },
  created() {
    this.productId = this.$route.query.id
    if (this.productId) {
      this.getFormContent()
    }
    // this.pageTitle = this.$route.query.id ? '编辑' : '新增'
    this.readOnly = this.$route.query.id ? true : false
    this.editSta = this.$route.query.id ? true : false
    this.showList = this.$route.query.id ? true : false
  }
}
</script>

<style lang="scss" scoped>
.content,
.foemItem,
.tabelConten,
.tabelList {
  margin-top: 20px;
}
.tabelBtn {
  display: flex;
  justify-content: flex-end;
}
</style>
