<template>
  <div>
    <LayHeader title="知识类型信息"></LayHeader>
    <div class="flex mt20">
      <div class="cards mr20" v-loading="loading">
        <el-row :gutter="20">
          <el-col
            :xs="24"
            :sm="12"
            :md="8"
            :lg="8"
            :xl="8"
            class="card-item"
            v-for="(l, i) in list"
            :key="l.id"
          >
            <div class="top">
              <img class="img" :src="l.cover" alt="" />
              <span class="new" v-if="isNew(l.updatedAt)">NEW</span>
              <div class="detail">
                <div>{{ l.summary }}</div>
                <div>
                  {{ l.category.map((e) => e.name).join(' ') }}
                  <span class="cursor"
                    ><i class="el-icon-download"></i>{{ l.downloadCount }}</span
                  >
                </div>
                <div>{{ l.openingDate }}</div>
                <button class="down" @click="downLoad(l, i)">DOWNLOAD</button>
              </div>
            </div>
            <div class="flex justify-between items-center title">
              <div>{{ l.title }}</div>
              <div>
                {{ l.organizations.map((e) => e.code).join(',') }}
                {{ l.speaker }}
              </div>
            </div>
          </el-col>
        </el-row>
        <iPagination
          v-update
          @size-change="handleSizeChange($event, queryDetail)"
          @current-change="handleCurrentChange($event, queryDetail)"
          background
          :current-page="page.currPage"
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :total="page.totalCount"
        />
      </div>

      <div class="info-r">
        <UiCard
          title="知识分类"
          :list="knowList"
          :color="false"
          @row-click="cateChange"
        ></UiCard>
        <UiCard title="科室" :color="false">
          <template slot="content">
            <div class="department" v-if="departList.length > 0">
              <div
                class="department-item"
                :class="{ active: organizations.includes(l.id) }"
                v-for="l in departList"
                :key="l.id"
                @click="departChange(l.id)"
              >
                {{ l.deptNum || l.fullCode }}
              </div>
            </div>
            <p class="no-data" v-if="departList.length == 0">暂无数据</p>
          </template>
        </UiCard>
      </div>
    </div>
  </div>
</template>

<script>
import LayHeader from './../components/LayHeader.vue'
import UiCard from './../components/UiCard.vue'
import {
  queryKnowledgeTwoLevelCard,
  listCategoryBySection,
  downloadKnowledge,
  operationlogs
} from '@/api/procs'
import { getDeptByCondition } from '@/api/usercenter'
import mixin from './../mixins'
import { pageMixins } from '@/utils/pageMixins'
import { iPagination } from 'rise'
export default {
  components: {
    LayHeader,
    UiCard,
    iPagination
  },
  mixins: [mixin, pageMixins],
  data() {
    return {
      list: {},
      knowList: [{ name: '全部', id: '' }],
      departList: [],

      knowledgeCategory: '',
      organizations: [],
      loading: false
    }
  },
  created() {
    this.page.pageSize = 9
    this.init()

    this.queryDetail()
  },
  methods: {
    async init() {
      // 科室
      // this.departList = await getDeptDropDownList({})
      // console.log(this.departList, '3333333')
      await getDeptByCondition({ deptNum: 'CS', gradeAbove: 3 }).then((res) => {
        let data = res.data || []
        this.departList = data
      })

      //  知识分类
      let cate = await listCategoryBySection(this.$route.query.id)
      this.knowList.push(...cate)
    },
    async queryDetail() {
      let data = {
        page: this.page.currPage - 1, // 0,
        size: this.page.pageSize,
        knowledgeCategory: this.knowledgeCategory,
        organizations: this.organizations
        // sort:"openingDate,DESC"
      }
      let formdata = new FormData()
      for (const key in data) {
        formdata.append(key, data[key])
      }
      this.loading = true
      let res = await queryKnowledgeTwoLevelCard(
        this.$route.query.id,
        formdata
      ).finally(() => {
        this.loading = false
      })
      res?.content.map((item) => {
        item.cover = item.cover.split('/uploader/')[1]
      })
      this.page.totalCount = res.totalElements
      this.list = res.content || []
    },
    departChange(id) {
      if (this.organizations.includes(id)) {
        let index = this.organizations.indexOf(id)
        this.organizations.splice(index, 1)
      } else {
        this.organizations.push(id)
      }
      this.queryDetail()
    },
    cateChange(v) {
      this.knowledgeCategory = v.id
      this.queryDetail()
    },
    isNew(date) {
      let difference = new Date() - new Date(date).getTime()
      return difference / 1000 / 60 / 60 / 24 / 30 < 1
    },
    async downLoad(row, index) {
      let res = await downloadKnowledge(row.id)
      let data = new FormData()
      data.append('operation', '操作日志')
      data.append(
        'detail',
        `${this.getSuffix(
          res[0].originalFileName
        )} attachment download ${this.fileFmt(res[0].url)}`
      )
      operationlogs(data)
      this.list[index].downloadCount += 1
      const a = document.createElement('a')
      a.href = this.fileFmt(res[0].url) + '&isDown=true'
      a.download = res[0].originalFileName
      a.click()
      a.remove()
    },
    getSuffix(filename) {
      const index1 = filename.lastIndexOf('.')
      const index2 = filename.length
      const postf = filename.substring(index1 + 1, index2)
      return postf.toUpperCase()
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../comon';
.cards {
  flex: 1;
  padding-right: 10px;
  /* overflow-y: auto; */

  .card-item {
    margin-bottom: 20px;

    .top {
      position: relative;
      width: 100%;
      height: 280px;
      border-radius: 6px;
      overflow: hidden;
      cursor: pointer;
      &:hover .detail {
        display: flex;
      }
    }

    .img {
      width: 100%;
      height: 100%;
    }

    .detail {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: none;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #fff;
      line-height: 30px;
      background-color: rgba($color: #5d5d5d, $alpha: 0.6);
      cursor: auto;
      animation: fade 0.3s ease;
      transition: all 0.3s ease;

      .down {
        padding: 5px 10px;
        background-color: transparent;
        border: 1px solid #fff;
        color: #fff;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
          background-color: #fff;
          color: #67C23A;
        }
      }
    }

    @keyframes fade {
      from {
        opacity: 0;
        transform: translateY(-100%);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .new {
      position: absolute;
      top: 10px;
      right: 10px;
      padding: 8px 10px;
      font-weight: bold;
      background-color: #4382fa;
      opacity: 0.7;
      border-radius: 4px;
      color: #fff;
    }
    .title {
      margin-top: 10px;
      text-align: center;
      font-weight: normal;
      color: #333;
    }
  }
}
.info-r {
  margin-left: 20px;
  width: 450px;

  .department {
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    max-height: 280px;
    overflow-y: auto;
    .department-item {
      padding: 8px 12px;
      border-radius: 50px;
      margin-right: 20px;
      margin-bottom: 20px;
      color: #666;
      border: 1px solid #707070;
      word-break: keep-all;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background-color: #4382fa;
        border-color: #4382fa;
        color: #fff;
      }
      &.active {
        background-color: #4382fa;
        border-color: #4382fa;
        color: #fff;
      }
    }
  }
}
</style>
