<template>
  <iCard>
    <div class="flex justify-between margin-bottom20">
      <div class="flex">
        <iInput
          style="width: 220px"
          :placeholder="language('请输入')"
          v-model="keyword"
        />
        <iButton style="margin-left: 10px" @click="queryList('rest')">{{
          language('搜索')
        }}</iButton>
      </div>
      <div>
        <iButton
          @click="
            editDialog.id = ''
            editDialog.show = true
          "
          >{{ language('添加页面') }}</iButton
        >
        <iButton @click="toProcess">{{ language('子流程图') }}</iButton>
        <iButton @click="processDialog.show = true">{{
          language('流程目录')
        }}</iButton>
      </div>
    </div>
    <ITable
      ref="table"
      :tableSetting="tableSetting"
      :extraData="extraData"
      :query-method="query"
    ></ITable>
    <!-- 新增和编辑 -->
    <Edit
      :show.sync="editDialog.show"
      :id="editDialog.id"
      @refresh="queryList"
    ></Edit>
    <!-- 操作手册 -->
    <Manual
      v-if="manualDialog.show"
      :show.sync="manualDialog.show"
      :info="manualDialog.info"
      @refresh="queryList"
    ></Manual>
    <!-- 操作视频 -->
    <Video
      :show.sync="videoDialog.show"
      :info="videoDialog.info"
      @refresh="queryList"
    ></Video>
    <!-- 常见问题 -->
    <Question
      :show.sync="qsDialog.show"
      :info="qsDialog.info"
      @refresh="queryList"
    ></Question>
    <!-- 附件 -->
    <Attachment
      :show.sync="attchDialog.show"
      :info="attchDialog.info"
      @refresh="queryList"
    ></Attachment>

    <!-- 流程目录 -->
    <ProcessDirectory :show.sync="processDialog.show"></ProcessDirectory>
  </iCard>
</template>

<script>
import ITable from '../../components/ITable'
import { iInput, iCard, iButton } from 'rise'
import { PROCESS_PAGE } from '../tables'
import Edit from './edit.vue'
import Manual from './manual.vue'
import Video from './video.vue'
import Question from './question.vue'
import Attachment from './attachment.vue'
import ProcessDirectory from './processDirectory.vue'
import { loadProcessPageList, deleteProcessPage } from '@/api/adminProCS'

export default {
  components: {
    ITable,
    iInput,
    iCard,
    iButton,
    Edit,
    Manual,
    Video,
    Question,
    Attachment,
    ProcessDirectory
  },
  props: {
    flowChartId: {
      default: ''
    }
  },
  data() {
    return {
      tableSetting: PROCESS_PAGE,
      keyword: '',
      extraData: {
        operate: this.operate
      },
      editDialog: {
        show: false,
        id: ''
      },
      manualDialog: {
        show: false,
        info: {}
      },
      videoDialog: {
        show: false,
        info: {}
      },
      qsDialog: {
        show: false,
        info: {}
      },
      attchDialog: {
        show: false,
        info: {}
      },
      processDialog: {
        show: false
      },
      query: this.queryTable,
      id: this.$route.query.id
    }
  },
  methods: {
    queryList(t) {
      this.$refs.table.query(t)
    },
    queryTable(page) {
      return new Promise(async (reslove, reject) => {
        let data = {
          page: page.currPage - 1,
          size: page.pageSize,
          keyword: this.keyword
        }
        try {
          let formData = new FormData()
          for (const key in data) {
            formData.append(key, data[key])
          }
          let res = await loadProcessPageList(this.id, formData)
          reslove(res)
        } catch (err) {
          reject(err)
        }
      })
    },
    /**
     * @param type 操作类型
     */
    operate(type, row) {
      switch (type) {
        case 'edit': //修改
          this.editDialog.id = row.id
          this.editDialog.show = true
          break
        case 'manual': //操作手册
          this.manualDialog.info = row
          this.manualDialog.show = true
          break
        case 'video': //操作视频
          this.videoDialog.info = row
          this.videoDialog.show = true
          break
        case 'qs': //常见问题
          this.qsDialog.info = row
          this.qsDialog.show = true
          break
        case 'attch': //附件
          this.attchDialog.info = row
          this.attchDialog.show = true
          break
        case 'del': //删除
          this.$confirm('确定删除此页面吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(async () => {
            await deleteProcessPage(row.id)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.queryList()
          })
          break
      }
    },
    toProcess() {
      this.$router.push({
        path: '/adminProCS/process/mainProcessFlow',
        query: { flowChartId: this.flowChartId, processId: this.id }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../../comon';
</style>
