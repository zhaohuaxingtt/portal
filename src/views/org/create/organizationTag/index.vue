<template>
  <iPage class="template">
    <div class="main">
      <div class="title">
        <span>{{ $t('ORGANIZATION_MANAGERMENT.ORG_TAG.TITLE') }}</span>
      </div>
      <div class="icardcontent">
        <iCard class="tagsCard">
          <div class="tagsAndButtons">
            <div class="tags">
              <span v-for="item in tagList" :key="item.id" class="tag">
                <el-button
                  size="small"
                  round
                  class="customNormalTag"
                  style="color: #67C23A; background-color: rgb(243, 245, 246)"
                  v-if="item.type == '2'"
                  >{{ item.name }}
                  <span @click.stop="deleteTag(item)">
                    <!-- <icon symbol name="iconbaojiazhuangtailiebiao_yijujue" style="font-size:12px" color='#67C23A'></icon> -->
                    <i class="el-icon-close"></i>
                  </span>
                </el-button>
                <el-button
                  size="small"
                  round
                  @click="selectedTag(item)"
                  :class="checkSysSelectedTagStatus(item)"
                  v-else
                  >{{ item.name }}</el-button
                >
              </span>
              <span>
                <el-button
                  size="small"
                  round
                  class="sysSelectedTag"
                  style="background-color: white; color: #67C23A"
                  @click="addTag"
                >
                  <i class=""></i>+{{
                    $t('ORGANIZATION_MANAGERMENT.ORG_TAG.CUSTOM_TAG')
                  }}
                </el-button>
              </span>
            </div>
          </div>
          <div class="buttons">
            <iButton @click="trueBtnClick">
              {{ $t('ORGANIZATION_MANAGERMENT.ORG_TAG.TRUEBTN') }}
            </iButton>
            <iButton @click="resetBtnClick">
              {{ $t('ORGANIZATION_MANAGERMENT.ORG_TAG.RESETBTN') }}
            </iButton>
            <iButton @click="$router.go(-1)">
              {{ $t('返回') }}
            </iButton>
          </div>
        </iCard>
      </div>
    </div>
  </iPage>
</template>

<script>
import { iPage, iCard, iButton } from 'rise'
import { organizationTagList } from '@/api/organization/index'
export default {
  components: { iPage, iCard, iButton },
  data() {
    return {
      tagList: [],
      selectedTagList: [],
      selected: []
    }
  },
  computed: {
    orgInfo() {
      return this.$store.state.org.orgInfo
    }
  },
  created() {
    this.tagList = this.$route.query.tags
    this.selectedTagList = this.$route.query.tags
    this.selected = this.$route.query.tags
    this.getTagList()
  },
  methods: {
    //点击创建标签按钮
    addTag() {
      this.$prompt(`+${this.language('自定义标签')}`, {
        cancelButtonClass: 'btn-custom-cancel',
        inputPlaceholder: this.language('请输入自定义标签'),
        inputPattern: /\S/,
        inputErrorMessage: this.language('自定义标签不能为空'),
        cancelButtonText: this.language('退出'),
        confirmButtonText: this.language('确定')
      })
        .then(({ value }) => {
          console.log(value)
          this.confirmHandle(value)
        })
        .catch(() => {})
    },
    //创建标签
    confirmHandle(value) {
      if (value !== null) {
        let tag = {
          name: value,
          type: '2',
          category: '3'
        }
        this.tagList.push(tag)
        this.selectedTagList.push(tag)
        //发送网络请求
        // createOrganizationTag(null,tagList2)
        //   .then(({ value }) => {
        //     if(value.code == 200){
        //       this.getTagList();
        //     }
        //   })
        //   .catch(() => {
        //     //出现异常
        //   });
      }
    },
    //获取标签列表
    getTagList() {
      let orgID = this.$route.query.id
      console.log('orgID====', orgID)
      let param = {}
      let isCreate = false
      if (orgID && orgID != 0) {
        //编辑
        param = { category: 3, objectId: orgID }
      } else {
        //新建
        param = { category: 3, type: 1 }
        isCreate = true
      }
      organizationTagList(null, param)
        .then(value => {
          if (value.code == 200) {
            if (isCreate) {
              //创建
              let netData = value.data
              if (this.selectedTagList.length > 0) {
                //创建的时候只添加 自定义标签
                let newSelectedTags = this.selectedTagList.filter(v => {
                  return v.id == null
                })
                netData.push(...newSelectedTags)
              }
              Vue.set(this, 'tagList', netData)
            } else {
              //编辑
              Vue.set(this, 'tagList', value.data)
            }
            //过滤自定义标签,默认为选中状态
            this.selectedTagList = this.tagList.filter(value => {
              // console.log("value ==",value.name,value.id,value.type);
              if (value.type == 2) {
                return true
              } else if (this.checkEditStatusSelected(value)) {
                return true
              }
              return false
            })

            let aa = this.selectedTagList.filter(value => {
              return true
            })
          }
        })
        .catch(() => {})
    },
    checkEditStatusSelected(value) {
      if (this.selected) {
        let newTags = this.selected.filter(val => {
          return val.id == value.id
        })
        return newTags.length > 0
      }
      return false
    },
    //删除标签
    deleteTag(value) {
      // const data = [value.id];
      // console.log(data);
      // console.log("dddd😝😝😝😝😝");
      let index = this.tagList.indexOf(value)
      this.tagList.splice(index, 1)
      let selectedIndex = this.selectedTagList.indexOf(value)
      this.selectedTagList.splice(selectedIndex, 1)
      // deleteOrganizationTag(null,data).then((value) =>{
      //   if(value.code == 200){
      //     //删除成功，重新获取标签数据
      //     this.getTagList();
      //   }
      // }).catch(() =>{

      // });
    },
    //选中标签
    selectedTag(value) {
      //是否选中
      let index = this.selectedTagList.indexOf(value)
      if (index > -1) {
        this.selectedTagList.splice(index, 1) //删除数组中的指定位置元素
      } else {
        this.selectedTagList.push(value)
      }
      console.log('===选中系统标签', this.selectedTagList)
    },
    //检查按钮选中状态
    checkSysSelectedTagStatus(value) {
      let status = 'sysNormalTag'
      for (let item of this.selectedTagList) {
        if (item.id === value.id) {
          status = 'sysSelectedTag'
          break
        }
      }
      return status
    },
    //确认按钮点击
    trueBtnClick() {
      // this.$emit('save')
      // this.$store.dispatch('setOrgTag', this.selectedTagList)
      let data = { ...this.orgInfo }
      data.tagList = this.selectedTagList
      this.$store.commit('SET_ORG_INFO', data)

      this.$router.go(-1)
    },
    resetBtnClick() {
      Vue.set(this.tagList, [])
      this.getTagList()
    }
  },
  /* beforeRouteLeave(to, from, next) {
    console.log('To === ', to)
    console.log('From === ', from)
    if (to.name !== 'organizationTagCreate') {
      // this.formCommitData = _.cloneDeep(defaultValue);
    }
    next()
  }, */
  watch: {
    tagList: {
      handler() {},
      deep: false
    }
  }
}
//单个标签数据结构：id,name,type
</script>

<style lang="scss" scoped>
.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.main {
  height: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  .icardcontent {
    flex-grow: 1;
    .tagsCard {
      height: 100%;
      width: 100%;
    }
    .tagsCard > div {
      width: 100%;
    }
  }
}

.tagsAndButtons {
  display: flex;
  flex-direction: column;
  .tags {
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    // .el-button{
    //   pointer-events: none;
    // }
    // .el-button:hover{

    // background-color: rgba(0, 0, 0, 0);
    // border-color: clear;
    // color: clear;
    // }
  }
  .tag {
    margin-right: 10px;
    margin-bottom: 10px;
  }
}

.buttons {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  // box-sizing: border-box;
  // align-self: flex-end;
}

//系统按钮样式
.sysNormalTag {
  color: #41434a;
}

.sysSelectedTag {
  color: #67C23A;
  background-color: rgba(22, 96, 241, 0.06);
}

//自定义按钮样式
.customNormalTag {
  color: #67C23A;
  background-color: rgba(22, 96, 241, 0.06);
}
</style>
