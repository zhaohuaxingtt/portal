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
                  style="color: #1660f1; background-color: rgb(243, 245, 246)"
                  v-if="item.type == '2'"
                  >{{ item.name }}
                  <span @click.stop="deleteTag(item)">
                    <!-- <icon symbol name="iconbaojiazhuangtailiebiao_yijujue" style="font-size:12px" color='#1660F1'></icon> -->
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
                  style="background-color: white; color: #1660f1"
                  @click="addTag"
                >
                  <i class=""></i>+{{
                    $t('ORGANIZATION_MANAGERMENT.ORG_TAG.CUSTOM_TAG')
                  }}
                </el-button>
              </span>
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
          </div>
        </iCard>
      </div>
    </div>
  </iPage>
</template>

<script>
import { iPage, iCard, iButton } from 'rise'
import { organizationTagList } from '@/api/authorityMgmt/index'

export default {
  components: { iPage, iCard, iButton },
  data() {
    return {
      tagList: [],
      selectedTagList: [],
      selected: [],
      addData: {
        tagList: []
      }
    }
  },
  beforeMount() {
    this.getTagList()
  },
  mounted() {},
  methods: {
    //点击创建标签按钮
    addTag() {
      this.$prompt('+自定义标签', {
        cancelButtonClass: 'btn-custom-cancel',
        inputPlaceholder: '请输入自定义标签',
        inputPattern: /\S/,
        inputErrorMessage: '自定义标签不能为空',
        cancelButtonText: '退出',
        confirmButtonText: '确定'
      })
        .then(({ value }) => {
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
          category: '1'
        }
        this.tagList.push(tag)
        this.selectedTagList.push(tag)
      }
    },
    //获取标签列表
    getTagList() {
      organizationTagList({ category: 1, type: 1 }).then(value => {
        if (value.code == 200) {
          this.tagList = value.data

          this.addData = { ...this.$route.query.addData }
          if (this.$route.query.addData.tagList.length > 0) {
            //this.$route.query.addData.tagList.length>0?this.tagList=this.$route.query.addData.tagList:''
            this.$route.query.addData.tagList.forEach(x => {
              if (x.type == '2') {
                this.tagList.push(x)
              }
            })
            this.tagList.splice(0, 0)
            this.selectedTagList = JSON.parse(
              JSON.stringify(this.$route.query.addData.tagList)
            )
          }
          console.log(this.selectedTagList, this.tagList)
        }
      })
    },
    //删除标签
    deleteTag(value) {
      let index = this.tagList.indexOf(value)
      this.tagList.splice(index, 1)
      let selectedIndex = this.selectedTagList.indexOf(value)
      this.selectedTagList.splice(selectedIndex, 1)
    },
    //选中标签
    selectedTag(value) {
      //是否选中
      let index = this.selectedTagList.indexOf(value)
      if (index > -1) {
        console.log('aaa')
        this.selectedTagList.splice(index, 1) //删除数组中的指定位置元素
      } else {
        this.selectedTagList.push(value)
      }
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
      console.log(this.selectedTagList)
      this.addData.tagList = this.selectedTagList
      if (this.$route.query.isEdit == 'true') {
        this.addData.role = this.$route.query.role
        this.addData.level = this.$route.query.level
        this.$router.push({ path: '/authorityMgmt', query: this.addData })
      } else {
        this.$router.push({ path: '/authorityMgmt/add', query: this.addData })
      }
    },
    resetBtnClick() {
      this.selectedTagList = []
      organizationTagList({ category: 1, type: 1 }).then(value => {
        if (value.code == 200) {
          this.tagList = value.data
        }
      })
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
      display: flex;
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
  display: flex;
  justify-content: flex-end;
  box-sizing: border-box;
  align-self: flex-end;
}

//系统按钮样式
.sysNormalTag {
  color: #41434a;
}

.sysSelectedTag {
  color: #1660f1;
  background-color: rgba(22, 96, 241, 0.06);
}

//自定义按钮样式
.customNormalTag {
  color: #1660f1;
  background-color: rgba(22, 96, 241, 0.06);
}
</style>
