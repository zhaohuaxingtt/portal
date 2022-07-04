<template>
    <iPage>
        <pageHeader class="title">
            {{language('报表类型维护')}}
        </pageHeader>
        <div style="width: 100%;">
            <div class="nav main">
                <!-- <el-tabs class="pro-tabs" v-model="currentName">
                    <el-tab-pane :label="language('类型管理')" name="typeManager">
                        <TypeManage
                            v-if="currentName==='typeManager'"
                        />
                    </el-tab-pane>
                    <el-tab-pane :label="language('内容管理')" name="contentManager">
                        <ContentManger v-if="currentName==='contentManager'"></ContentManger>
                    </el-tab-pane>
                </el-tabs> -->
              <div class="mtz_ndys_nav">
                <div class="mtz_ndys_nav_all">
                  <div :class="currentName==='typeManager'?'active':''"
                      @click="tableChange('typeManager')" 
                      v-permission="ADMIN_REPORT_TYPEGL">{{language('类型管理')}}</div>
                  <div :class="currentName==='contentManager'?'active':''"
                      @click="tableChange('contentManager')"
                      v-permission="ADMIN_REPORT_CONTENTGL">{{language('内容管理')}}</div>
                </div>
              </div>
            </div>
        </div>

        <TypeManage v-if="currentName==='typeManager'"/>
        <ContentManger v-if="currentName==='contentManager'"></ContentManger>
    </iPage>
</template>

<script>
import pageHeader from '@/components/pageHeader'
import TypeManage from './typeManage/index'
import ContentManger from './content/index.vue';
import { iPage } from 'rise'
export default {
    name: 'typeMaintain',
    components: {
        pageHeader,
        iPage,
        TypeManage,
        ContentManger
    },
    data() {
        return {
            currentName: 'typeManager'
        }
    },
    methods:{
      tableChange(val){
        if(this.currentName != val){
          this.currentName = val;
        }
      },
    },
    mounted () {
      this.$nextTick(_ => {
        var navList = document.querySelectorAll(".mtz_ndys_nav_all>div");
        if (navList.length !== 0) {
          navList[0].click();
        }
      })
    },
}
</script>

<style lang="scss" scoped>
.main{
  height: 100%;
}
.pro-tabs{
  height: 100%;
  display: flex;
  flex-direction: column;
  ::v-deep .el-tabs__content{
    flex: 1;
    .el-tab-pane{
      height: 100%;
    }
  }
}
.nav {
  ::v-deep .el-tabs__active-bar {
    background-color: transparent !important;
  }

  ::v-deep .el-tabs__nav-wrap::after {
    background-color: transparent !important;
  }

  ::v-deep .el-tabs__item {
    padding-left: 20px !important;
    padding-right: 20px !important;
  }

  ::v-deep .el-tabs__item.is-active {
    background-color: #fff !important;
    font-weight: bold;
    height: 35px;
    line-height: 35px;
    font-size: 16px;
    padding-left: 20px;
    padding-right: 20px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.08);
    border-radius: 3px;
  }
}


.mtz_ndys_nav {
  margin-top: 20px;
  display: flex;
  margin-bottom: 20px;
  font-size: 1rem;
  font-weight: bold;
  color: #727272;
  // box-shadow: 0 0 1.25rem rgb(0 0 0 / 8%);
  border: none;
  text-align: center;
  min-width: 9.375rem;
  .mtz_ndys_nav_all {
  }
  .mtz_ndys_nav_all > div {
    cursor: pointer;
    min-width: 140px;
    float: left;
    height: 2.5rem;
    box-sizing: border-box;
    line-height: 2.5rem;
    box-shadow: 0 0 1.25rem rgb(0 0 0 / 8%);
    padding-left: 20px;
    padding-right: 20px;
  }
  .mtz_ndys_nav_all > div:nth-child(1) {
    border-top-left-radius: 0.625rem;
    border-bottom-left-radius: 0.625rem;
    border-right: solid 1px #ececec;
  }
  .mtz_ndys_nav_all > div:nth-child(2) {
    border-left: solid 1px #ececec;
    border-top-right-radius: 0.625rem;
    border-bottom-right-radius: 0.625rem;
  }

  .active {
    background-color: #ffffff;
    background: #ffffff;
    color: #1660f1;
  }
}
</style>