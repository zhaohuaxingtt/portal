<template>
  <div v-loading="loading">
    <iPage class="approval-template">
      <div class="page-header margin-bottom20">
        <div class="font20 font-weight">
          {{ form.modelId ? '编辑流程' : '新建流程' }}
        </div>
        <div class="operation-btn">
          <iButton :loading="saveLoading" @click="save">
            {{ $t('APPROVAL.SAVE') }}
          </iButton>
        </div>
      </div>

      <detailBaseForm
        :form-info="form"
        @choose-form-url="dialogFormUserVisible = true"
        @form-change="baseFormChange"
      />

      <div class="design-area" v-loading="designLoading" v-if="form.modelId">
        <iframe
          :src="designUrl"
          name="flowDesign"
          id="flowDesign"
          frameborder="0"
          border="0"
          scrolling="no"
          allowtransparency="yes"
        />
      </div>
      <detailFormUrl
        v-if="dialogFormUserVisible"
        :visible="dialogFormUserVisible"
        @handle-select-url="handleSelectUrl"
        @close="dialogFormUserVisible = false"
      />
      <choosePosition
        v-if="dialogChoosePositionVisible"
        :visible="dialogChoosePositionVisible"
        @success="dialogChoosePositionVisible = false"
        @close="dialogChoosePositionVisible = false"
      />
      <chooseOrg
        v-if="dialogChooseOrgVisible"
        :visible="dialogChooseOrgVisible"
        single-choice
        @close="dialogChooseOrgVisible = false"
        @select="handleSelectOrg"
      />
    </iPage>
  </div>
</template>

<script>
import { iPage, iButton } from 'rise'
import { form, templateStatus } from './components/data'
import filters from '@/utils/filters'
import { createTemplate, updateTemplate, queryTemplate } from '@/api/approval'
import { choosePosition, detailBaseForm, detailFormUrl } from './components'
import chooseOrg from '@/views/role/components/chooseOrg'
export default {
  mixins: [filters],
  components: {
    iPage,
    iButton,
    detailBaseForm,
    detailFormUrl,
    choosePosition,
    chooseOrg
  },
  data() {
    return {
      saveLoading: false,
      form: { ...form },
      templateStatus: templateStatus,
      dialogFormUserVisible: false,
      dialogChoosePositionVisible: false,
      designLoading: false,
      dialogChooseOrgVisible: false,
      overrideidConditions: {},
      loading: false
    }
  },
  computed: {
    designUrl() {
      return (
        process.env.VUE_APP_PUBLICPATH +
        '/process-design/modeler.html?modelId=' +
        this.form.modelId +
        '&env=' +
        process.env.NODE_ENV
      )
    }
  },
  created() {
    this.initPage()
  },
  methods: {
    initPage() {
      if (this.$route.params.id) {
        this.query()
      }
      this.designLoading = true
      window.addEventListener('message', (e) => {
        if (e && e.data) {
          try {
            const data = JSON.parse(e.data)
            if (data.value && data.key === 'choosePosition') {
              this.dialogChoosePositionVisible = true
            }
            if (data.value && data.key === 'designReady') {
              this.designLoading = false
            }
            if (data.value && data.key === 'chooseOrg') {
              this.dialogChooseOrgVisible = true
            }
            if (data.value && data.key === 'overideidCondition') {
              Vue.set(this.overrideidConditions, data.item.key, data.item.value)
            }
          } catch (error) {
            console.log('error', error)
          }
        }
      })
    },
    query() {
      this.loading = true
      queryTemplate({ id: this.$route.params.id })
        .then((res) => {
          const { data } = res
          this.form = data
        })
        .finally(() => (this.loading = false))
    },
    save() {
      if (this.form.modelId) {
        this.updateTemplate()
      } else {
        this.addTemplate()
      }
    },
    addTemplate() {
      const data = {
        ...this.form,
        businessFrom: '',
        category: '',
        createBy: this.$store.state.permission.userInfo.id,
        modelKey: '',
        paramList: {}
        // jsonXml: '',
        // '{"resourceId":"52523","properties":{"process_id":"SerialTest","name":"","documentation":"","process_author":"","process_version":"","process_namespace":"http://www.activiti.org/processdef","executionlisteners":"","eventlisteners":"","signaldefinitions":"","messagedefinitions":""},"stencil":{"id":"BPMNDiagram"},"childShapes":[],"bounds":{"lowerRight":{"x":1200,"y":1050},"upperLeft":{"x":0,"y":0}},"stencilset":{"url":"stencilsets/bpmn2.0/bpmn2.0.json","namespace":"http://b3mn.org/stencilset/bpmn2.0#"},"ssextensions":[]}',
        // svgXml: ''
        // '<svg xmlns="http://www.w3.org/2000/svg" xmlns:oryx="http://oryx-editor.org" id="sid-F764244A-C0FE-4A22-B557-B17129F22BF3" width="50" height="50" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svg="http://www.w3.org/2000/svg"><defs/><svg id="underlay-container"/><g stroke="none" font-family="Verdana, sans-serif" font-size-adjust="none" font-style="normal" font-variant="normal" font-weight="normal" line-heigth="normal" font-size="12"><g class="stencils"><g class="me"/><g class="children"/><g class="edge"/></g><g class="svgcontainer"><g display="none" transform="translate(234, 116)"><rect x="0" y="0" stroke-width="1" stroke="#777777" fill="none" stroke-dasharray="2,2" pointer-events="none" width="38" height="38"/></g><g display="none"><path stroke-width="1" stroke="silver" fill="none" stroke-dasharray="5,5" pointer-events="none"/></g><g display="none"><path stroke-width="1" stroke="silver" fill="none" stroke-dasharray="5,5" pointer-events="none"/></g><g/></g></g></svg>'
      }
      this.saveLoading = true
      createTemplate(data)
        .then((res) => {
          if (!res.result) {
            this.$message.error(this.$t('APPROVAL.SAVE_FAILED'))
          } else {
            this.$message.success(this.$t('APPROVAL.SAVE_SUCCESSFUL'))
            this.$router.replace({
              params: {
                id: res.data.id
              }
            })
          }
          this.saveLoading = false
        })
        .catch(() => {
          this.saveLoading = false
        })
    },
    updateTemplate() {
      this.saveLoading = true
      const xmls = document
        .getElementById('flowDesign')
        .contentWindow.xmlToParent()
      const { jsonXml, svgXml } = xmls
      if (jsonXml && svgXml) {
        let formData = new FormData()
        if (jsonXml && jsonXml.childShapes) {
          jsonXml.childShapes.forEach((e) => {
            if (e.properties && e.properties.useroverrideid) {
              e.properties.overrideid = e.properties.useroverrideid
              delete e.properties.useroverrideid
            }

            console.log(
              e.properties.overrideid,
              this.overrideidConditions[e.properties.overrideid]
            )
            // 存储overrideid condition
            if (
              this.overrideidConditions.hasOwnProperty(e.properties.overrideid)
            ) {
              const documentation = e.properties.documentation
              let documentationJson = {}
              if (documentation) {
                documentationJson = JSON.parse(documentation)
              }
              documentationJson['idDescription'] =
                this.overrideidConditions[e.properties.overrideid]
              e.properties.documentation = JSON.stringify(documentationJson)
            }
          })
        }
        console.log('jsonXml', jsonXml)
        const stringJsonXml = JSON.stringify(jsonXml)
        const stringSvgXml = svgXml.replace(
          /display="block"/g,
          'display="none"'
        )
        // 参数
        formData.append('jsonXml', stringJsonXml)
        formData.append('svgXml', stringSvgXml)
        formData.append('modelId', this.form.modelId)
        formData.append('modelName', this.form.modelName)
        formData.append('description', this.form.description)
        // formData.append('url', this.form.url)
        this.saveLoading = true
        updateTemplate(formData)
          .then((res) => {
            if (!res.result) {
              this.$message.error(this.$t('APPROVAL.SAVE_FAILED'))
            } else {
              this.$message.success(this.$t('APPROVAL.SAVE_SUCCESSFUL'))
              // this.$router.go(-1)
            }
            this.saveLoading = false
          })
          .catch(() => {
            this.$message.error(this.$t('APPROVAL.SAVE_FAILED'))
            this.saveLoading = false
          })
      }
    },
    handleSelectUrl(val) {
      if (val) {
        Vue.set(this.form, 'url', val.value)
        this.dialogFormUserVisible = false
      }
    },
    baseFormChange(val) {
      this.form = { ...val }
    },
    handleSelectOrg(val) {
      window.frames['flowDesign'].orgToChild(val)
      this.dialogChooseOrgVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#flowDesign {
  width: 100%;
  min-height: 1000px;
  overflow: visible;
}
.design-area {
  width: 100%;
  min-height: 1000px;
  background: #fff;
}
.approval-template {
  padding-bottom: 40px;
}
</style>
