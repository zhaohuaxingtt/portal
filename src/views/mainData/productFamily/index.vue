<template>
  <iPage v-loading="loading">
    <!-- <carTypeLifeCycle /> -->

    <div class="main">
      <div class="top">
        <iCard>
          <el-form>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item :label="formTitle.pName">
                  <iInput
                    :placeholder="formTitle.inputPlaceholder"
                    v-model="formData.productName"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="formTitle.tName">
                  <iSelect
                    :placeholder="formTitle.inputPlaceholder"
                    v-model="formData.carTypeName"
                    remote
                    filterable
                    :remote-method="querySearchAsync"
                    :loading="carModelLoading"
                  >
                    <el-option
                      v-for="item in carTypeNames"
                      :key="item.id"
                      :label="item.name"
                      :value="item.value"
                    >
                    </el-option>
                  </iSelect>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="formTitle.pType">
                  <iSelect
                    :placeholder="formTitle.iSelectPlaceholder"
                    v-model="formData.productType"
                  >
                    <el-option
                      v-for="item in productTypeList"
                      :key="item.parentId"
                      :label="item.name"
                      :value="item.code"
                    >
                    </el-option>
                  </iSelect>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <div class="buttons">
                  <iButton @click="searchBtnClick">
                    {{ formTitle.search }}
                  </iButton>
                  <iButton @click="resetBtnClick">
                    {{ formTitle.reset }}
                  </iButton>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item :label="formTitle.PID">
                  <iInput
                    :placeholder="formTitle.inputPlaceholder"
                    v-model="formData.productCode"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="formTitle.cCarTypeYear">
                  <iInput
                    :placeholder="formTitle.inputPlaceholder"
                    v-model="formData.modelYear"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="formTitle.isValid">
                  <iSelect
                    :placeholder="formTitle.iSelectPlaceholder"
                    v-model="formData.effect"
                  >
                    <el-option
                      v-for="item in formIsValidSelect"
                      :key="item.label"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </iSelect>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </iCard>
      </div>
      <div class="content">
        <iCard>
          <div class="export">
            <button-download :download-method="exportBtnClick" />
          </div>
          <iTableCustom
            ref="testTable"
            :columns="tableColumnSetting"
            :data="tableListData"
            @showDetail="showDetail"
          />
          <iPagination
            v-update
            background
            @size-change="handleSizeChange($event, getTableList)"
            @current-change="handleCurrentChange($event, getTableList)"
            :current-page="page.currPage"
            :page-sizes="page.pageSizes"
            :page-size="page.pageSize"
            :layout="page.layout"
            :total="page.totalCount"
          />
        </iCard>
      </div>
    </div>
    <iDialog
      v-if="isVisible"
      :visible="isVisible"
      @close="closeDetail"
      :title="pageTitle"
      width="88%"
    >
      <carTypeDetail :PID="PID" />
    </iDialog>
  </iPage>
</template>

<script>
import {
  iPage,
  iCard,
  iSelect,
  iInput,
  iButton,
  iPagination,
  iDialog,
  iMessage
} from 'rise'
import iTableCustom from '@/components/iTableCustom'
import { pageMixins } from '@/utils/pageMixins'
import { tableColumnSetting } from './data'
import {
  familyList,
  productTypeList,
  cartypeNameList,
  familyExport
} from '@/api/mainData/productFamily'
import carTypeDetail from './carTypeDetail'
export default {
  methods: {
    getProductTypeList() {
      productTypeList().then(val => {
        if (val.code == 200) {
          this.productTypeList = val.data.product_family_product_type
        }
      })
    },
    getTableList() {
      //获取列表数据
      let param = {
        ...this.formData,
        size: this.page.pageSize,
        current: this.page.currPage
      }
      familyList(param)
        .then(val => {
          if (val.code == 200) {
            this.tableListData = val.data
            this.page.totalCount = val.total
          }
        })
        .catch(error => {
          iMessage.error(error.desZh || '获取数据失败')
        })
    },
    searchBtnClick() {
      this.page.currPage = 1
      this.getTableList()
    },
    async querySearchAsync(queryString) {
      if (queryString == null || queryString.length == 0) {
        return
      }
      let param = { param: queryString }
      this.carModelLoading = true
      const { data } = await cartypeNameList(param).finally(() => {
        this.carModelLoading = false
      })
      this.carTypeNames = data || []
    },
    resetBtnClick() {
      this.formData = this.defaulFormData()
      this.page.currPage = 1
      this.getTableList()
    },
    exportBtnClick() {
      //导出列表
      let param = { ...this.formData }
      return familyExport(param)
    },
    closeDetail() {
      this.isVisible = false
    },
    showDetail(val) {
      this.PID = val.productCode
      this.isVisible = true
    },
    defaulFormData() {
      return {
        carTypeName: '',
        effect: '',
        modelYear: '',
        productCode: '',
        productName: '',
        productType: ''
      }
    }
  },
  created() {
    this.page.pageSizes = [10, 20, 50, 100, 200, 300]
    this.getProductTypeList() //获取产品类型
    this.getTableList()
  },
  data() {
    return {
      PID: '',
      pageTitle: '车型列表',
      isVisible: false,
      tableListData: [],
      productTypeList: [],
      carTypeNames: [],
      tableColumnSetting,
      formData: {
        carTypeName: '',
        effect: '',
        modelYear: '',
        productCode: '',
        productName: '',
        productType: ''
      },
      formTitle: {
        pName: '产品家族名称',
        tName: '车型名称',
        pType: '产品类型',
        PID: 'PID',
        cCarTypeYear: '当前车型年',
        isValid: '是否有效',
        search: '查询',
        reset: '重置',
        inputPlaceholder: '请输入',
        iSelectPlaceholder: '请选择'
      },
      formIsValidSelect: [
        {
          value: true,
          label: '是'
        },
        {
          value: false,
          label: '否'
        }
      ],
      loading: false,
      carModelLoading: false
    }
  },
  components: {
    iPage,
    iCard,
    iSelect,
    iInput,
    iButton,
    iTableCustom,
    iPagination,
    iDialog,
    carTypeDetail
  },
  mixins: [pageMixins]
}
</script>

<style lang="scss" scoped>
.buttons {
  display: flex;
  justify-content: flex-end;
  button {
    margin-top: 43px;
  }
}

.export {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.content {
  margin-top: 20px;
}
</style>
