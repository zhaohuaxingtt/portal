<template>
  <iPage style="flex: 1">
    <div class="page--top">
      <div>
        {{
          ruleForm.id != ''
            ? category[ruleForm.category]
            : language('NEWS_XINJIANXINWEN', '新建新闻')
        }}
      </div>
      <div>
        <iButton v-if="showButton" @click="handleSave" :disabled="saveFlag">{{
          language('NEWS_BAOCUN', '保存')
        }}</iButton>
        <iButton v-if="showButton" @click="handleReset" :disabled="saveFlag">{{
          language('LK_ZHONGZHI', '重置')
        }}</iButton>
        <iButton @click="handleBack" :disabled="saveFlag">{{
          language('NEWS_FANHUI', '返回')
        }}</iButton>
        <iButton
          v-if="
            !showButton &&
            ruleForm.status === 0 &&
            userNewsClassify.length > 0 &&
            newsClassifyCode.includes(ruleForm.category)
          "
          @click="handleEdit"
          >{{ language('NEWS_BIANJI', '编辑') }}</iButton
        >
        <iButton @click="handlePreview" :disabled="saveFlag">{{
          language('NEWS_YULAN', '预览')
        }}</iButton>
      </div>
    </div>
    <component
      ref="formComponent"
      v-if="formComponent"
      v-model="ruleForm"
      :is="formComponent"
      :userNewsClassify="userNewsClassify"
      v-loading="resetLoading"
    ></component>
  </iPage>
</template>

<script>
import { iCard, iPage, iButton } from 'rise'
import newsBaseEdit from './components/newsBaseEdit.vue'
import newsPreview from './components/newsPreview.vue'
import {
  findNewsById,
  updateNews,
  saveNews,
  findAdminPermission,
  increasePageViews
} from '@/api/news/news'
import { newsClassify, newsTypes } from './components/data'
import { reloadOpener } from '@/utils'
import dayjs from 'dayjs'
export default {
  components: {
    iPage,
    iButton,
    newsBaseEdit,
    newsPreview
  },
  data() {
    return {
      ruleForm: {
        id: '',
        category: '',
        isNew: '',
        isTop: 0,
        linkUrl: '',
        providerName: '',
        providerType: '',
        publishDate: dayjs().format('YYYY-MM-DD'),
        source: '',
        status: 1,
        summary: '',
        title: '',
        videoUrl: '',
        content: '',
        newsAtlas: [],
        newsAttachments: [],
        publishRange: { code: 0, name: '全体用户' },
        tags: [],
        type: 0,
        picUrl: '',
        userGroup: [],
        disabledAll: false
      },
      type: '',
      id: '',
      newsClassify,
      userNewsClassify: [],
      newsClassifyCode: [],
      jsonStr: '',
      resetLoading: false,
      saveFlag: false
    }
  },
  computed: {
    formComponent() {
      if (
        this.type !== undefined &&
        this.type &&
        (this.type === 'edit' || this.type === 'add')
      ) {
        return 'newsBaseEdit'
      } else if (
        (this.type === '' || this.type === undefined) &&
        this.id !== '' &&
        this.id !== undefined
      ) {
        return 'newsPreview'
      }
      return ''
    },
    showButton() {
      return this.type != '' && this.type != undefined
    },
    category() {
      let obj = this.newsClassify?.reduce((obj, item) => {
        return { ...obj, [item.value]: item.label }
      }, {})
      return obj
    }
  },
  create() {},
  mounted() {
    this.type = this.$route.params.type
    this.id = this.$route.params.id
    if (this.$route.params.id !== '' && this.$route.params.id !== undefined) {
      this.handleResetDate()
    } else if (
      this.$route.params.type === undefined &&
      this.$route.params.id === undefined
    ) {
      this.$router.push({
        name: 'newsContent'
      })
    }
    findAdminPermission().then((res) => {
      this.userNewsClassify = res?.filter((item) => {
        return item.code < 4
      })
      this.newsClassifyCode = this.userNewsClassify?.map((item) => item.code)
      if (this.ruleForm.id === '') {
        this.ruleForm.category = res[0].code
        if (res[0].code === 3) {
          this.ruleForm.type = 1
        }
        this.jsonStr = JSON.stringify(this.ruleForm)
      }
    })
  },
  methods: {
    handleResetDate() {
      this.query({ id: this.id })
    },
    handleSave() {
      let wPath = window.document.location.href
      let path = process.env.VUE_APP_PUBLICPATH
      let pos = wPath.indexOf(path)
      let locationPath = wPath.substring(0, pos)
      const newsAtlas = this.ruleForm.newsAtlas?.map((item) => {
        return {
          atlasId: item.atlasId,
          atlasName: item.atlasName,
          atlasUrl: item.atlasUrl,
          sort: item.sort
        }
      })
      const formData = {
        ...this.ruleForm,
        newsAtlas
      }

      let dateTime = this.ruleForm.publishDate
      if (
        dayjs(dayjs(dateTime).format('YYYY-MM-DD')).valueOf() >
        dayjs(dayjs().format('YYYY-MM-DD')).valueOf()
      ) {
        formData.publishDate =
          dayjs(dateTime).format('YYYY-MM-DD') + ' 00:00:00'
        formData.status = 0
      } else {
        formData.publishDate = dayjs().format('YYYY-MM-DD HH:mm:ss')
        formData.status = 1
      }
      this.$refs['formComponent'].$refs[
        formData.category !== 2 ? 'ruleForm' : 'gysRuleForm'
      ].validate((valid) => {
        if (valid) {
          let text = formData.content
            .replace(/(\n)/g, '')
            .replace(/(\t)/g, '')
            .replace(/(\r)/g, '')
            .replace(/<\/?[^>]*>/g, '')
            .replace(/\s*/g, '')
            .replace(/ /gi, ' ')
            .replace(/(&nbsp;)/g, '')
          if (formData.picUrl === null || formData.picUrl === '') {
            if (formData.category !== 2) {
              this.$message.error(
                this.language('NEWS_XWFMWSC', '新闻封面未上传！')
              )
              return
            }
          } else if (
            formData.category === 0 &&
            formData.type === 0 &&
            (formData.linkUrl === null || formData.linkUrl === '') &&
            (formData.content === null ||
              formData.content === '' ||
              text === '')
          ) {
            this.$message.error(
              this.language(
                'NEWS_TTLJHZWNRBNTSWK',
                '头条链接和正文内容不能同时为空！'
              )
            )
            return
          } else if (
            formData.category > 0 &&
            formData.type === 0 &&
            (formData.content === null ||
              formData.content === '' ||
              text === '')
          ) {
            this.$message.error(
              this.language('NEWS_ZWNRBNWK', '正文内容不能为空！')
            )
            return
          } else if (formData.type === 1 && formData.newsAtlas.length == 0) {
            this.$message.error(
              this.language('NEWS_TJZSSCYZ', '图集至少上传一张！')
            )
            return
          } else if (
            formData.type === 2 &&
            (formData.videoUrl === null || formData.videoUrl === '')
          ) {
            this.$message.error(this.language('NEWS_SHBNWK', '视频不能为空！'))
            return
          }
          formData.baseUrl = locationPath
          if (
            dayjs(dayjs(dateTime).format('YYYY-MM-DD')).valueOf() >
            dayjs(dayjs().format('YYYY-MM-DD')).valueOf()
          ) {
            this.save(formData)
          } else {
            this.$confirm(
              this.language('NEWS_SFQDFBCXW', '是否确定发布此新闻 ？'),
              this.language('NEWS_TISHI', '提示'),
              {
                confirmButtonText: this.language('TERMS_SHI', '是'),
                cancelButtonText: this.language('TERMS_FOU', '否'),
                type: 'warning'
              }
            ).then(() => {
              this.save(formData)
            })
          }
        }
      })
    },
    save(formData) {
      this.saveFlag = true
      if (this.id !== '' && this.id !== undefined) {
        formData.id = this.id
        //更新
        updateNews(formData).then((res) => {
          this.$message.success(
            this.language('NEWS_GENGXINCHENGGONG', '更新成功')
          )
          this.saveFlag = false
          reloadOpener()
          window.close()
        })
      } else {
        //新增
        saveNews(formData).then((res) => {
          this.$message.success(
            this.language('NEWS_XINZENGCHENGGONG', '新增成功')
          )
          this.saveFlag = false
          this.$router.push({
            name: 'newsContent'
          })
        })
      }
    },
    handlePreview() {
      let { href } = this.$router.resolve({
        name: 'newsDetails'
      })
      if (this.showButton) {
        const newsAtlas = this.ruleForm.newsAtlas.map((item) => {
          return {
            atlasId: item.atlasId,
            atlasName: item.atlasName,
            atlasUrl: item.atlasUrl,
            sort: item.sort
          }
        })
        const formData = {
          ...this.ruleForm,
          newsAtlas
        }

        let dateTime = this.ruleForm.publishDate
        if (
          dayjs(dayjs(dateTime).format('YYYY-MM-DD')).valueOf() >
          dayjs(dayjs().format('YYYY-MM-DD')).valueOf()
        ) {
          formData.publishDate =
            dayjs(dateTime).format('YYYY-MM-DD') + ' 00:00:00'
        } else {
          formData.publishDate = dayjs().format('YYYY-MM-DD HH:mm:ss')
        }
        this.$refs['formComponent'].$refs['ruleForm'].validate((valid) => {
          if (valid) {
            console.log('formData', formData)
            if (formData.picUrl === null || formData.picUrl === '') {
              if (formData.category !== 2) {
                this.$message.error(
                  this.language('NEWS_XWFMWSC', '新闻封面未上传！')
                )
                return
              }
            } else if (
              formData.category === 0 &&
              formData.type === 0 &&
              (formData.linkUrl === null || formData.linkUrl === '') &&
              (formData.content === null || formData.content === '')
            ) {
              this.$message.error(
                this.language(
                  'NEWS_TTLJHZWNRBNTSWK',
                  '头条链接和正文内容不能同时为空！'
                )
              )
              return
            } else if (
              formData.category > 0 &&
              formData.type === 0 &&
              (formData.content === null || formData.content === '')
            ) {
              this.$message.error(
                this.language('NEWS_ZWNRBNWK', '正文内容不能为空！')
              )
              return
            } else if (formData.type === 1 && formData.newsAtlas.length == 0) {
              this.$message.error(
                this.language('NEWS_TJZSSCYZ', '图集至少上传一张！')
              )
              return
            } else if (
              formData.type === 2 &&
              (formData.videoUrl === null || formData.videoUrl === '')
            ) {
              this.$message.error(
                this.language('NEWS_SHBNWK', '视频不能为空！')
              )
              return
            }
            this.saveFlag = true
            if (this.id !== '' && this.id !== undefined) {
              //更新
              updateNews(formData).then((res) => {
                this.saveFlag = false
                if (this.ruleForm.category === 0 && this.ruleForm.linkUrl) {
                  increasePageViews({ id: res.id })
                  window.open(this.ruleForm.linkUrl, '_blank')
                } else {
                  window.open(href + `?id=${res.id}`, '_blank')
                }
              })
            } else {
              //草稿
              formData.status = 2
              //新增
              saveNews(formData).then((res) => {
                this.saveFlag = false
                this.id = res.id
                this.ruleForm.id = this.ruleForm.id || res.id
                if (this.ruleForm.category === 0 && this.ruleForm.linkUrl) {
                  increasePageViews({ id: res.id })
                  window.open(this.ruleForm.linkUrl, '_blank')
                } else {
                  window.open(href + `?id=${res.id}`, '_blank')
                }
              })
            }
          }
        })
      } else {
        if (this.ruleForm.category === 0 && this.ruleForm.linkUrl) {
          increasePageViews({ id: this.ruleForm.id })
          window.open(this.ruleForm.linkUrl, '_blank')
        } else {
          window.open(href + `?id=${this.ruleForm.id}`, '_blank')
        }
      }
    },
    handleEdit() {
      this.type = 'edit'
    },
    handleReset() {
      this.resetLoading = true
      if (this.id) {
        this.handleResetDate()
      } else {
        this.ruleForm = {
          id: '',
          category: '',
          isNew: '',
          isTop: 0,
          linkUrl: '',
          providerName: '',
          providerType: '',
          publishDate: dayjs().format('YYYY-MM-DD'),
          source: '',
          status: 0,
          summary: '',
          title: '',
          videoUrl: '',
          content: '',
          newsAtlas: [],
          newsAttachments: [],
          publishRange: { code: 0, name: '全体用户' },
          tags: [],
          type: 0,
          picUrl: '',
          userGroup: [],
          disabledAll: false
        }
        this.$refs['formComponent'].$refs['newsTextEdit'].editor.txt.html('')
        this.$refs['formComponent'].picUrl = []
        this.$refs['formComponent'].$refs['newsTextEdit'].videoUrlList = []
        this.ruleForm.category = this.userNewsClassify[0].code
        if (this.ruleForm.category === 3) {
          this.ruleForm.type = 1
        }
        this.resetLoading = false
      }
    },
    handleBack() {
      let data = { ...this.ruleForm }
      data.disabledAll = false
      data.newsAtlas?.forEach((item) => {
        item.status = null
        delete item.uid
      })
      if (this.jsonStr == JSON.stringify(data)) {
        if (this.type !== 'add') {
          window.close()
        } else {
          this.$router.push({
            name: 'newsContent'
          })
        }
      } else {
        this.$confirm(
          this.language(
            'NEWS_QDFHHBXWXGNRBHBC',
            '确定返回后，本新闻修改内容不会保存。'
          ),
          this.language('NEWS_SFQDFH', '是否确定返回？'),
          {
            confirmButtonText: this.language('TERMS_SHI', '是'),
            cancelButtonText: this.language('TERMS_FOU', '否'),
            type: 'warning'
          }
        ).then(() => {
          if (this.type !== 'add') {
            window.close()
          } else {
            this.$router.push({
              name: 'newsContent'
            })
          }
        })
      }
    },
    query(e) {
      findNewsById(e).then((res) => {
        this.ruleForm = {
          ...res,
          disabledAll: false,
          newsAtlas: res.newsAtlas || [],
          newsAttachments: res.newsAttachments || []
        }
        if (this.ruleForm.publishRange?.code === 15) {
          if (this.ruleForm.userGroup === null) {
            this.ruleForm.publishRange = null
          }
        }
        this.jsonStr = JSON.stringify(this.ruleForm)
        if (this.$refs['formComponent'].$refs['newsTextEdit']) {
          this.$refs['formComponent'].$refs['newsTextEdit'].editor.txt.html(
            this.ruleForm.content
          )
          this.resetLoading = false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.page--top {
  display: flex;
  justify-content: space-between;
  font-size: 28px;
  font-weight: bold;
  height: 40px;
  margin-bottom: 20px;
}
</style>
