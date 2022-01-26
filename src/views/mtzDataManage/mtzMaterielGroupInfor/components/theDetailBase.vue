<template>
  <iCard :title="language('基础信息')" collapse>
    <div class="actions" slot="header-control">
      <iButton
        v-show="!editable"
        @click="editable = true"
        v-permission="'BUTTON_MATERIEL_DATA_MTZ_GROUP_RAW_BASEINFO_MODIFY'"
        >{{ language('编辑') }}</iButton
      >
      <iButton
        v-show="editable"
        @click="save"
        v-permission="
          'BUTTON_MATERIEL_DATA_MTZ_GROUP_RAW_BASEINFO_MODIFY|BUTTON_MATERIEL_DATA_MTZ_GROUP_RAW_ADD'
        "
        >{{ language('保存') }}</iButton
      >
      <iButton
        v-show="editable"
        @click="cancel"
        v-permission="'BUTTON_MATERIEL_DATA_MTZ_GROUP_RAW_BASEINFO_MODIFY'"
        >{{ language('取消') }}</iButton
      >
    </div>
    <el-form
      label-position="left"
      label-width="130px"
      :model="form"
      :rules="rules"
      ref="ruleForm"
      class="validate-required-form"
    >
      <el-row :gutter="20">
        <el-col :span="8">
          <iFormItem
            :label="language('MTZ材料组编号')"
            prop="materialGroupCode"
          >
            <iInput
              v-model="form.materialGroupCode"
              :placeholder="language('请输入')"
              :disabled="this.$route.query.id"
            />
          </iFormItem>
        </el-col>
        <el-col :span="8">
          <iFormItem
            :label="language('MTZ材料组名称(中)')"
            prop="materialGroupNameZh"
          >
            <iInput
              v-model="form.materialGroupNameZh"
              :placeholder="language('请输入')"
              :disabled="!editable"
            />
          </iFormItem>
        </el-col>
        <el-col :span="8">
          <iFormItem
            :label="language('MTZ材料组名称(英)')"
            prop="materialGroupNameEn"
          >
            <iInput
              v-model="form.materialGroupNameEn"
              :placeholder="language('请输入')"
              :disabled="!editable"
            />
          </iFormItem>
        </el-col>

        <el-col :span="8">
          <iFormItem :label="language('中类名称')" prop="rawMaterialCodes">
            <iSelect
              v-model="form.rawMaterialCodes"
              :placeholder="language('请选择')"
              :disabled="!editable"
              filterable
              multiple
            >
              <el-option
                v-for="item in rawMaterial4SelectOptions"
                :key="item.id"
                :value="item.code"
                :label="item.name"
              />
            </iSelect>
          </iFormItem>
        </el-col>
        <el-col :span="8">
          <iFormItem :label="language('备注')">
            <iInput
              v-model="form.remark"
              :placeholder="language('请输入')"
              :disabled="!editable"
            />
          </iFormItem>
        </el-col>
        <el-col :span="8">
          <iFormItem :label="language('科室')" prop="depts">
            <orgSelect
              v-model="form.depts"
              :disabled="!editable"
              multiple
              :default-options="defaultDeptOptions"
              @change="handleOrgChange"
            />
          </iFormItem>
        </el-col>
      </el-row>
    </el-form>
  </iCard>
</template>

<script>
import { orgSelect } from '@/components/remoteSelect'
import { iCard, iInput, iFormItem, iButton, iMessage, iSelect } from 'rise'
import { DETAIL_FORM } from './data'
import {
  saveBaseGroup,
  fetchBaseGroup,
  fetchRawMaterial4SelectDict,
  searchDepartmentList
} from '@/api/materiel/mtzMaterielGroup'
export default {
  name: 'TheDetailBase',
  components: { iCard, iInput, orgSelect, iFormItem, iButton, iSelect },
  data() {
    return {
      form: { ...DETAIL_FORM },
      editable: false,
      originalForm: { ...DETAIL_FORM },
      rawMaterial4SelectOptions: [],
      rules: {
        materialGroupCode: [
          {
            required: true,
            message: 'MTZ材料组编号必填',
            trigger: 'blur'
          }
        ],
        materialGroupNameZh: [
          {
            required: true,
            message: 'MTZ材料组中文名称必填',
            trigger: 'blur'
          }
        ],
        materialGroupNameEn: [
          {
            required: true,
            message: 'MTZ材料组英文名称必填',
            trigger: 'blur'
          }
        ],
        depts: [
          {
            required: true,
            message: '科室必填',
            trigger: 'blur'
          }
        ],
        rawMaterialCodes: [
          {
            required: true,
            message: '中类必填',
            trigger: 'blur'
          }
        ]
      },
      defaultDeptOptions: []
    }
  },
  created() {
    this.queryRawMaterial4SelectDict()
    if (!this.$route.query.id) {
      this.editable = true
    } else {
      this.query()
    }
  },
  methods: {
    handleOrgChange(val, options) {
      // console.log('orgChange', val, options)
      // let  arrayDeptInfo =[]
      const depts = options.filter((e) => val.includes(e.id))
      const arrayDeptInfo = depts.map((e) => {
        return {
          deptCode: e.deptNum,
          deptId: e.id,
          deptName: e.nameZh
        }
      })
      this.form.simpleDeptInfos = [...arrayDeptInfo]
      /* this.form.simpleDeptInfos = []
      console.log(options,'====');
      if(this.form.depts){
        this.form.depts.forEach((item) => {
          options.forEach((element) => {
            if(element.id == item ){
              this.form.simpleDeptInfos.push({deptCode:element.deptNum,deptId:element.id,deptName:element.nameZh})
            }
          })
        })
        
      }
      console.log('this.form.simpleDeptInfos', this.form.simpleDeptInfos) */
    },
    async queryRawMaterial4SelectDict() {
      const { data } = await fetchRawMaterial4SelectDict()
      this.rawMaterial4SelectOptions = data
    },
    query() {
      fetchBaseGroup({ id: this.$route.query.id })
        .then((res) => {
          if (res.result) {
            const simpleDeptInfos = res.data.simpleDeptInfos || []
            const depts = simpleDeptInfos.map((e) => e.deptId)

            this.defaultDeptOptions = simpleDeptInfos.map((e) => {
              return { id: e.deptId, deptNum: e.deptCode, nameZh: e.deptName }
            })

            const mtzGroupMaterialRelationVos =
              res.data.mtzGroupMaterialRelationVos || []

            const rawMaterialCodes = mtzGroupMaterialRelationVos.map(
              (e) => e.rawMaterialCode
            )
            this.form = { ...res.data, depts, rawMaterialCodes }
            this.originalForm = _.cloneDeep(this.form)
          } else {
            iMessage.error(res.desZh || '获取数据失败')
          }
        })
        .catch((err) => {
          iMessage.error(err.desZh || '获取数据失败')
        })
    },
    save() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          searchDepartmentList(this.form.depts).then((val) => {
            if (val.code == 200) {
              const list = val.data
              this.form.simpleDeptInfos = list.map((e) => {
                return {
                  deptCode: e.deptNum,
                  deptId: e.id,
                  deptName: e.nameZh
                }
              })
              saveBaseGroup(this.form)
                .then((res) => {
                  if (res.result) {
                    iMessage.success(res.desZh || '保存成功')
                    this.editable = false
                    const { id, materialGroupCode } = res.data
                    if (!this.$route.query.id) {
                      this.$router.replace({
                        query: { id, code: materialGroupCode }
                      })
                    }
                    this.query()
                  } else {
                    iMessage.error(res.desZh || '保存失败')
                  }
                })
                .catch((err) => {
                  iMessage.error(err.desZh || '保存失败')
                })
            } else {
              iMessage.error(val.desZh)
            }
          })
        }
      })
    },
    cancel() {
      this.form = _.cloneDeep(this.originalForm)
      this.editable = false
      this.query()
    }
  }
}
</script>

<style lang="scss" scoped></style>
