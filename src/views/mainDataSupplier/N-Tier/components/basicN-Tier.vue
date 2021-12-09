<template>
  <div>
    <iCard collapse :title="language('供应商信息')">
      <div class="btnList" slot="header-control">
        <iButton @click="exit">{{ language('退出') }}</iButton>
        <iButton @click="save">{{ language('保存') }}</iButton>
      </div>
      <el-form
        label-position="left"
        label-width="150px"
        :rules="rules"
        :model="formContent"
        class="validate-required-form"
        ref="refRules"
      >
        <el-row gutter="24">
          <el-col :span="6">
            <iFormItem
              :label="language('供应商中文名')"
              prop="supplierNameCn"
            >
              <iInput
                v-model="formContent.supplierNameCn"
                :placeholder="language('请输入')"
                disabled
              ></iInput>
            </iFormItem>
          </el-col>
          <el-col :span="6">
            <iFormItem
              :label="language('供应商英文名')"
              prop="supplierNameEn"
            >
              <iInput
                v-model="formContent.supplierNameEn"
                :placeholder="language('请输入')"
                disabled
              ></iInput>
            </iFormItem>
          </el-col>
          <el-col :span="6">
            <iFormItem :label="language('统一社会信用代码')" prop="creditCode">
              <iInput
                v-model="formContent.creditCode"
                :placeholder="language('请输入')"
                disabled
              ></iInput>
            </iFormItem>
          </el-col>
          <el-col :span="6">
            <iFormItem :label="language('DUNS')">
              <iInput
                v-model="formContent.duns"
                :placeholder="language('请输入')"
              ></iInput>
            </iFormItem>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="6">
            <iFormItem
              :label="language('国家-省份-城市')"
              prop="addressInfoUpdateVo"
            >
              <areaSelect
                v-if="
                  formContent.addressInfoUpdateVo &&
                  Object.keys(formContent.addressInfoUpdateVo).length
                "
                :countryCode.sync="formContent.addressInfoUpdateVo.countryCode"
                :provinceCode.sync="
                  formContent.addressInfoUpdateVo.provinceCode
                "
                :cityCode.sync="formContent.addressInfoUpdateVo.cityCode"
                @change="areaChange"
                :placeholder="language('请选择')"
              />
            </iFormItem>
          </el-col>
          <el-col :span="6">
            <iFormItem :label="language('详细地址')">
              <iInput
                v-model="formContent.addressInfoUpdateVo.address"
                :placeholder="language('请输入')"
              ></iInput>
            </iFormItem>
          </el-col>
          <el-col :span="6">
            <iFormItem :label="language('邮编号码')">
              <iInput
                v-model="formContent.addressInfoUpdateVo.postCode"
                :placeholder="language('请输入')"
              ></iInput>
            </iFormItem>
          </el-col>
          <el-col :span="6">
            <iFormItem :label="language('公司性质')">
              <iInput
                v-model="formContent.enterpriseType"
                :placeholder="language('请输入')"
              ></iInput>
            </iFormItem>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="6">
            <iFormItem :label="language('公司规模')" prop="companySize">
              <iInput
                v-model="formContent.companySize"
                :placeholder="language('请输入')"
              ></iInput>
            </iFormItem>
          </el-col>
          <el-col :span="6">
            <iFormItem
              :label="language('注册资金')"
              prop="registeredCapital"
            >
              <iInput
                v-model="formContent.registeredCapital"
                :placeholder="language('请输入')"
              ></iInput>
            </iFormItem>
          </el-col>
          <el-col :span="6">
            <iFormItem :label="language('资格与认证')">
              <iInput
                v-model="formContent.certification"
                :placeholder="language('请输入')"
              ></iInput>
            </iFormItem>
          </el-col>
          <el-col :span="6">
            <iFormItem :label="language('联系邮箱')">
              <iInput
                v-model="formContent.email"
                :placeholder="language('请输入')"
                type="email"
              ></iInput>
            </iFormItem>
          </el-col>
        </el-row>
      </el-form>
      <div v-if="showFactory">
        <el-divider class="divider"></el-divider>
        <div v-for="item in factoryMessage" :key="item.id">
          <p class="title">{{ item.factoryName }}</p>
          <el-form label-position="left" label-width="150px">
            <el-row gutter="24">
              <el-col :span="6">
                <iFormItem :label="language('国家-省份-城市')">
                  <areaSelect
                    v-if="
                      item.addressInfoUpdateVo &&
                      Object.keys(item.addressInfoUpdateVo).length
                    "
                    :countryCode.sync="item.addressInfoUpdateVo.countryCode"
                    :provinceCode.sync="item.addressInfoUpdateVo.provinceCode"
                    :cityCode.sync="item.addressInfoUpdateVo.cityCode"
                    @change="areaChange"
                    disabled
                  >
                  </areaSelect>
                </iFormItem>
              </el-col>
              <el-col :span="6">
                <iFormItem :label="language('详细地址')">
                  <iInput
                    :placeholder="language('请选择')"
                    v-model="item.addressInfoUpdateVo.address"
                    disabled
                  ></iInput>
                </iFormItem>
              </el-col>
              <el-col :span="6">
                <iFormItem :label="language('邮编号码')">
                  <iInput
                    :placeholder="language('请输入')"
                    v-model="item.addressInfoUpdateVo.postCode"
                    disabled
                  ></iInput>
                </iFormItem>
              </el-col>
              <el-col :span="6">
                <iFormItem :label="language(labelContent.fatoryArea)">
                  <span slot="label" v-html="labelContent.fatoryArea"></span>
                  <iInput
                   :placeholder="language('请输入')"
                    v-model="item.areaCovered"
                    disabled
                  ></iInput>
                </iFormItem>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </iCard>
  </div>
</template>

<script>
import { iFormItem, iSelect, iInput, iButton, iCard } from 'rise'
import {
  getBasicDetailById,
  saveBasicDetail
} from '@/api/mainDataSupplier/N-Tier'
import { areaSelect } from '@/components/remoteSelect'
export default {
  name: 'basicN-Tier',
  components: { iFormItem, iSelect, iInput, iButton, iCard, areaSelect },
  props: {},
  data() {
    return {
      pageTitle: '基本信息',
      labelContent: {
        // supplierNameZh: '供应商中文名',
        // supplierNameEn: '供应商英文名',
        // creditCode: '统一社会信用代码',
        // DUNS: 'DUNS',
        // countryProvinceCity: '国家-省份-城市',
        // detailedAddress: '详细地址',
        // zipCode: '邮编号码',
        // companyNatur: '公司性质',
        // companySize: '公司规模',
        // registeredFund: '注册资金',
        // qualificationAndCertification: '资格与认证',
        // detailAddress: '详细地址',
        // sizeCode: '邮编号码',
        fatoryArea: `工厂占地面积${'2'.sup()}`
      },
      formContent: {
        supplierNameCn: '',
        supplierNameEn: '',
        creditCode: '',
        duns: '',
        city: '',
        address: '',
        postCode: '',
        enterpriseType: '',
        companySize: '',
        registeredCapital: '',
        certification: '',
        email: '',
        addressInfoUpdateVo: {}
      },
      factoryMessage: [],
      cityOptions: [],
      rules: {
        supplierNameCn: [
          { required: true, message: '请输入供应商中文名', trigger: 'blur' }
        ],
        creditCode: [
          { required: true, message: '请输入统一社会信用代码', trigger: 'blur' }
        ],
        addressInfoUpdateVo: [
          { required: true, message: '请选择国家-省份-城市', trigger: 'blur' }
        ],
        companySize: [
          { required: true, message: '请输入公司规模', trigger: 'blur' }
        ]
        // registeredCapital:[{required:true,message:'请输入资格与认证',trigger:'blur'}],
      },
      showFactory: false
    }
  },
  methods: {
    save() {
      this.$refs['refRules'].validate((valid) => {
        if (valid) {
          let data = {
            ...this.formContent,
            id: this.$route.query.id
          }
          saveBasicDetail(data).then((val) => {
            if (val.code == 200) {
              this.$message.success('保存成功')
            } else {
              this.$message.error(val.desZh)
            }
          })
        } else {
          return false
        }
      })
    },
    exit() {
      window.close()
    },
    getDetail() {
      let id = this.$route.query.id
      getBasicDetailById(id).then((val) => {
        if (val.code == 200) {
          this.formContent = val.data
          if (val.data.ntierSupplierPlantResVos) {
            this.factoryMessage = val.data.ntierSupplierPlantResVos
            this.showFactory = true
          }
        } else if (val.code == 1) {
          this.$message.error(val.desZh)
        }
      })
    },
    areaChange(val, valStrs) {
      if (valStrs.length > 2) {
        this.formContent.addressInfoUpdateVo.country = valStrs[0]
        this.formContent.addressInfoUpdateVo.province = valStrs[1]
        this.formContent.addressInfoUpdateVo.city = valStrs[2]
      }
    }
  },
  created() {
    this.getDetail()
  }
}
</script>

<style lang="scss" scoped>
.divider {
  margin: 20px 0px;
  border: 0.5px dashed #707070;
}
.title {
  font-size: 18px;
  // font-family: Arial;
  padding: 18px 0;
  font-weight: bold;
  line-height: 13px;
  color: #131523;
  opacity: 1;
}
</style>
