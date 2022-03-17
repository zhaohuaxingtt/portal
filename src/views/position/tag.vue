<template>
  <iPage>
    <div class="position-tag-page">
      <div class="title margin-bottom25">{{language('岗位标签')}}</div>
      <iCard tabCard>
        <div class="flex-between-center">
          <div>
            <el-tag
              @close="handleClose(item)"
              @click="handleSelect(item, index)"
              class="margin-right8"
              v-for="(item, index) in posTags"
              :key="index"
              :type="item.type === '1' && !item.checked ? 'info' : ''"
              :closable="item.type === '1' ? false : true"
              >{{ item.name }}</el-tag
            >
            <el-tag type="info" @click="handleAddTag"
              ><i class="el-icon-plus"></i>{{language('自定义标签')}}</el-tag
            >
          </div>
          <div class="btn-wrapper">
            <iButton @click="handleConfirm">{{language('确定')}}</iButton>
            <iButton @click="handleBack">{{language('返回')}}</iButton>
          </div>
        </div>
      </iCard>
    </div>
  </iPage>
</template>

<script>
import { iPage, iButton, iCard } from 'rise'
export default {
  components: { iPage, iButton, iCard },
  computed: {
    posTags() {
      const tags_system = JSON.parse(
        window.sessionStorage.getItem(window.btoa('position_tags_sys'))
      )
      const pos_detail = JSON.parse(
        window.sessionStorage.getItem(window.btoa('position_detail'))
      )
      const roleList = JSON.parse(
        window.sessionStorage.getItem(window.btoa('roleList'))
      )
      console.log(roleList)
      const dim_opts = JSON.parse(
        window.sessionStorage.getItem(window.btoa('dimension_options'))
      )
      console.log(tags_system, pos_detail)
      if (!this.$store.state.position.pos.tags?.length) {
        this.$store.commit('SET_ROLELIST', roleList)
        this.$store.commit('SET_TAG_SYSTEM', tags_system)
        this.$store.commit('SET_DIMENSION_OPTIONS', dim_opts)
        this.$store.commit('SET_POSITION_DETAIL', pos_detail)
        this.$store.commit(
          'INIT_DIMENSION_LIST',
          pos_detail?.permissionList || []
        )
        this.$store.commit('INIT_ROLE_SELECTED', pos_detail?.roleDTOList || [])
        this.$store.commit(
          'INIT_ROLEIDS_SELECTED',
          pos_detail?.roleDTOList || []
        )
        this.$store.commit('GET_TAGS')
        this.$store.commit('GET_TAGS_SELECTED')
      }
      return this.$store.state.position.pos.tags
    }
  },
  mounted() {},
  methods: {
    handleConfirm() {
      this.$store.commit('SET_POSITION_TAGS')
      this.$router.go(-1)
    },
    handleBack() {
      this.$router.go(-1)
    },
    handleClose(val) {
      val.status = 'del'
      this.$store.commit('CHANGE_TAGS', val)
      this.$store.commit('CHANGE_TAGS_SELECTED', val)
    },
    handleAdd(val) {
      const data = {
        name: val,
        id: null,
        type: '2',
        checked: true,
        index: null,
        status: 'add',
        category: 2
      }
      this.$store.commit('CHANGE_TAGS', data)
      this.$store.commit('CHANGE_TAGS_SELECTED', data)
    },
    //点击创建标签按钮
    handleAddTag() {
      this.$prompt(`+${this.language('自定义标签')}`, {
        cancelButtonClass: 'btn-custom-cancel',
        inputPlaceholder: '请输入自定义标签',
        inputValidator: value => {
          if (!value) {
            return '自定义标签不能为空'
          }
          const tags_2 = _.filter(this.posTags, item => {
            return item.type === '2'
          })
          const val = _.find(tags_2, item => {
            return item.name === value
          })
          if (val) {
            return '自定义标签不能重复'
          }
        },
        cancelButtonText: '退出',
        confirmButtonText: '确定'
      })
        .then(({ value }) => {
          this.handleAdd(value)
        })
        .catch(() => {})
    },
    handleSelect(item, index) {
      const checked = !item.checked
      this.$set(item, 'checked', checked)
      this.$set(item, 'index', index)
      this.$forceUpdate()
      this.$store.commit('CHANGE_TAGS_SELECTED', item)
    }
  }
}
</script>
