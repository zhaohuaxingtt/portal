<template>
  <iPage>
    <pageHeader class="title">{{ title }}</pageHeader>
    <iCard class="report" v-loading="loading">
      <div class="report-box">
        <div class="flex">
          <span>{{ language('搜索') }}</span>
          <iInput
            v-model="keyword"
            class="search"
            @keydown.enter.native="handleIconClick"
            clearable
          >
            <i
              class="el-icon-search el-input__icon"
              slot="suffix"
              @click="handleIconClick"
            >
            </i>
          </iInput>
          <iButton @click="$router.back()">{{ language('返回') }}</iButton>
        </div>

        <div class="detail">
          <div class="detail-item" v-for="(value, name) in dataMap" :key="name">
            <h3 class="title" v-text="value.categoryName"></h3>
            <div class="file" v-for="item in value.list" :key="item.id">
              <div class="bell" v-if="item.isNew"></div>
              <span class="title-text" @click="openFun(item)">
                {{ `${getSuffix(item)} ${item.title}-${item.publishDate}` }}
              </span>
              <div>
                <iButton size="mini" @click="share(item)">
                  {{ language('分享') }}
                </iButton>
                <iButton size="mini" @click="handLoad(item)">
                  {{ language('下载') }}
                </iButton>
              </div>
            </div>
            <iPagination
              v-update
              @current-change="(val) => queryPage(val, value.categoryId)"
              @size-change="(val) => handleSizePage(val, value.categoryId)"
              background
              :current-page="value.page"
              :page-size="value.size"
              :page-sizes="[10, 20, 50, 100, 200, 500]"
              :total="value.total"
              layout="sizes, prev, pager, next, jumper"
            />
          </div>
        </div>
      </div>
    </iCard>
    <Dialog :show.sync="show"></Dialog>
  </iPage>
</template>

<script>
import pageHeader from '@/components/pageHeader'
import { iPage, iInput, iCard, iButton, iPagination } from 'rise'
import Dialog from './../components/dialog.vue'
import {
  queryReportContentList,
  updateIsNew,
  downLoadFileName,
  reportTypeDetailById
} from '@/api/reportForm'

const fileType = {
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  xls: 'application/vnd.ms-excel',
  doc: 'application/msword',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  pdf: 'application/pdf',
  ppt: 'application/vnd.ms-powerpoint',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  png: 'image/png',
  gif: 'image/gif',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg'
}
export default {
  components: {
    pageHeader,
    iPage,
    iInput,
    iCard,
    iButton,
    iPagination,
    Dialog
  },
  data() {
    return {
      dataList: [],
      dataMap: {},
      params: {
        size: 10,
        current: 1
      },
      mailto: '',
      keyword: '',
      show: false,
      loading: false,
      title: '',
      categoryIds: []
    }
  },
  created() {
    let queryObj = this.$route.query
    this.title = queryObj.name || ''
    this.categoryIds = queryObj.categoryIds || []
    if (this.categoryIds) {
      this.query()
    }
    // this.queryDetail(queryObj.sectionId)
  },
  methods: {
    queryDetail(id) {
      if (!id) return
      let res = reportTypeDetailById(id)
      console.log(res)
    },
    query() {
      this.loading = true
      Promise.all(
        this.categoryIds?.map(async (cate) => this.queryPage(1, cate))
      ).finally(() => {
        this.loading = false
      })
    },
    handleSizePage(size, categoryId) {
      this.dataMap[categoryId].size = size
      this.queryPage(1, categoryId)
    },
    async queryPage(page, categoryId) {
      const pageSize = this.dataMap[categoryId]?.size || 10
      const params = {
        current: page,
        categoryId,
        size: pageSize
      }
      if (this.keyword) {
        params.title = this.keyword
      }

      await queryReportContentList(params).then((res) => {
        if (res?.code === '200') {
          const data = res?.data || []
          const dataMapItem = {
            categoryName: data[0]?.categoryName,
            total: res.total,
            page: page,
            list: data,
            categoryId: categoryId,
            size: pageSize
          }
          Vue.set(this.dataMap, categoryId, dataMapItem)
        }
      })
    },
    share(item) {
      let subject = `我与你分享了一条 ${this.title} 《${item.title}》`
      const coverUrl = item?.cover?.includes('http')
        ? item.cover
        : document.location.origin + item.cover
      let body = `我与你分享了一条 ${this.title} 《${item.title}》 %0a%0d ${coverUrl}`
      let href = `mailto:?subject=${subject}&body=${body}`
      this.createAnchorLink(href)
      this.updateIsNew(item)
    },
    createAnchorLink(href) {
      const a = document.createElement('a')
      a.href = href
      document.body.appendChild(a)
      a.click()
      a.remove()
    },
    async handLoad(row) {
      let id = row.cover.split('=')[1] + ''
      let type =
        row.source.substring(row.source.lastIndexOf('.') + 1).toLowerCase() ||
        'png'
      let params = {
        fileIds: [id],
        fileName: row.title
      }
      let formData = new FormData()
      Object.keys(params).forEach((item) => {
        formData.append(item, params[item])
      })
      await downLoadFileName(formData).then((res) => {
        if (res) {
          const a = document.createElement('a')
          a.download = row.title
          a.href = window.URL.createObjectURL(
            new Blob([res], { type: fileType[type] })
          )
          a.click()
          a.remove()
        }
      })
      this.updateIsNew(row)
    },
    handleIconClick() {
      this.params.current = 1
      this.query()
    },
    async openFun(item) {
      let id = item.cover.split('=')[1] + ''
      let type = this.getSuffix(item)
      const TYPEARR = ['png', 'pdf', 'jpg', 'jpeg']
      if (TYPEARR.includes(type)) {
        window.open(item.cover)
      } else {
        let params = {
          fileIds: [id],
          fileName: item.title
        }
        let formData = new FormData()
        Object.keys(params).forEach((item) => {
          formData.append(item, params[item])
        })
        await downLoadFileName(formData).then((res) => {
          if (res) {
            const a = document.createElement('a')
            a.download = item.title
            a.href = window.URL.createObjectURL(
              new Blob([res], { type: fileType[type] })
            )
            a.click()
            a.remove()
          }
        })
      }
      // window.open(item.cover)
      this.updateIsNew(item)
    },
    // 取消最新 new
    async updateIsNew(item) {
      await updateIsNew(item.id)
      item.isNew = false
      // this.$set(this.dataList[i1].list[i2], 'isNew', false)
    },
    getSuffix(item) {
      return (
        item.source
          .substring(item.source.lastIndexOf('.') + 1)
          .toLowerCase()
          .toString() || 'png'
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
}
.flex-1 {
  flex: 1;
}

.report {
  // height: 100%;
  // overflow: hidden;
  // ::v-deep > div{
  //     height: 100%;
  // }
  // ::v-deep .cardBody{
  //     height: 100%;
  // }
}
.report-box {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.search {
  flex: 1;
  margin: 0 10px;
}
.detail {
  flex: 1;
  padding-right: 10px;
  // overflow-y: auto;

  .detail-item {
    padding: 30px 0;
    border-bottom: 1px solid #eee;
    &:last-child {
      border: none;
    }
    .title {
      font-size: 18px;
    }
  }
  .file {
    position: relative;
    margin: 30px 0;
    padding-left: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: rgb(73, 119, 248);

    .bell {
      position: absolute;
      left: -20px;
      width: 30px;
      height: 30px;
      background: url('~@/assets/images/new.png') no-repeat;
      background-size: cover;
    }
  }
}
.title-text {
  cursor: pointer;
}
</style>
