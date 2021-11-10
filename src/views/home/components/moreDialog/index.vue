<template>
  <div class="more-opt-modal">
    <i-dialog
      :title="title"
      :visible.sync="isShow"
      width="30%"
      @open="handleOpen"
    >
      <div class="list-container" v-loading="loading">
        <div class="list" v-for="item in list" :key="item.typeName">
          <div class="title">{{ item.typeValue }}</div>
          <div class="content-container">
            <div
              class="content"
              v-for="(content, index) in item.wfCategoryList"
              :key="index"
              @click="handleCheck(content)"
            >
              <div>
                {{ content.value || content.taskTypeName || content.taskName }}
              </div>
              <!-- <div v-if="content.checked"> -->
              <!-- <i class="el-icon-check"></i> -->
              <el-checkbox
                v-model="content.checked"
                :disabled="true"
              ></el-checkbox>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </i-dialog>
  </div>
</template>

<script>
import { iDialog, iMessage } from 'rise'
import { updateModules, getApprovalList } from '@/api/home'
import { getDutyStatistics } from '@/api/duty'
import _ from 'lodash'
export default {
  components: { iDialog },
  props: {
    show: {
      type: Boolean
    },
    title: {
      type: String
    },
    type: {
      type: String
    },
    data: {
      type: Object
    }
  },
  data() {
    return {
      list: [],
      loading: false
    }
  },
  computed: {
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
      userInfo: state => state.permission.userInfo
    }),
    isShow: {
      get() {
        return this.show
      },
      set(val) {
        this.$emit('update:show', val)
      }
    }
  },
  methods: {
    handleCheck(item) {
      let arrC = []
      const arr = this.list.map(li => {
        return li.wfCategoryList
      })
      for (let i in arr) {
        arrC = arrC.concat(arr[i])
      }
      const filterList = arrC.filter(c => {
        return c.checked
      })
      if ((filterList.length < 5 && !item.checked) || item.checked) {
        this.$set(item, 'checked', !item.checked)
      } else {
        iMessage.warn('至多选择五条')
      }
    },
    async handleOpen() {
      this.loading = true
      if (this.type === 'Approve') {
        const result = await getApprovalList({
          userID: this.userInfo.id
        }).finally(() => (this.loading = false))
        const moduleData = JSON.parse(this.data.moduleData) || []
        const moduleDataCategory = []
        moduleData.forEach(module => {
          moduleDataCategory.push(...module.categoryList)
        })
        const list = result.data || []
        for (let i in list) {
          for (let j = 0; j < list[i].wfCategoryList.length; j++) {
            list[i].wfCategoryList[j].typeName = list[i].typeName
            if (
              moduleDataCategory.includes(
                list[i].wfCategoryList[j].categoryList[0]
              )
            ) {
              list[i].wfCategoryList[j].checked = true
            } else {
              list[i].wfCategoryList[j].checked = false
            }
          }
        }
        this.list = result.data || []
      } else if (this.type === 'Task') {
        const moduleData = JSON.parse(this.data.moduleData) || []
        const moduleDataTypes = moduleData.map(m => {
          return m.taskType
        })
        const params = `userId=${this.userInfo.id}&userTye=2`
        const result = await getDutyStatistics(params).finally(
          () => (this.loading = false)
        )
        if (result) {
          this.list = result.map(task => {
            return {
              wfCategoryList: task.taskCenterDtoList.map(e => {
                if (moduleDataTypes.includes(e.taskType)) {
                  e.checked = true
                }
                return e
              })
            }
          })
        }
      }
    },
    async handleConfirm() {
      let arrC = []
      const arr = this.list.map(li => {
        return li.wfCategoryList
      })
      for (let i in arr) {
        arrC = arrC.concat(arr[i])
      }
      const filterList = arrC.filter(c => {
        return c.checked
      })
      if (!filterList.length) {
        iMessage.warn('请至少选择一条')
        return
      }
      this.data.moduleData = JSON.stringify(filterList)
      const result = await updateModules(this.data)
      if (result.code === '200' && result.data) {
        this.isShow = false
        this.$store.dispatch('getModules')
      }
    }
  }
}
</script>

<style lang="scss">
.more-opt-modal {
  .list-container {
    height: 400px;
    overflow-x: hidden;
    overflow-y: auto;
    > .list {
      > .title {
        font-size: 16px;
        font-weight: bold;
      }
      > .content-container {
        margin: 10px 0;
        > .content {
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px;
          // background: #eee;
          border-radius: 5px;
          margin-bottom: 5px;
          border-bottom: 1px solid #eee;
          // &:nth-child(even) {
          //   background: #e8effe;
          // }
        }
      }
    }
  }
  .empty-container {
    text-align: center;
    margin-top: 50px;
    i {
      font-size: 24px;
    }
  }
  .el-checkbox__input.is-disabled .el-checkbox__inner {
    border: 0.0625rem solid #1763f7;
    background: transparent;
    cursor: pointer;
  }
  .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
    background-color: #1763f7;
    border-color: #1763f7;
  }
  .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after {
    transform: rotate(45deg) scaleY(1);
    border-color: #fff;
  }
  .el-checkbox__input.is-disabled .el-checkbox__inner::after {
    cursor: pointer;
  }
}
</style>
