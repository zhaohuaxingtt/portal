<template>
    <iPage>
        <pageHeader class="title">
            {{language('报表类型维护')}}
        </pageHeader>
        <div style="width: 100%;">
            <div class="nav main">
                <el-tabs class="pro-tabs" v-model="currentName">
                    <el-tab-pane :label="language('类型管理')" name="typeManager">
                        <TypeManage
                            v-if="currentName==='typeManager'"
                        />
                    </el-tab-pane>
                    <el-tab-pane :label="language('内容管理')" name="contentManager">
                        <ContentManger v-if="currentName==='contentManager'"></ContentManger>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
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
</style>