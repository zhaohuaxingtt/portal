<template>
  <iPage class="template">
    <div class="Main">
      <div class="Header">
        <div class="Tabs">
          <i-tabs v-model="activeName">
            <el-tab-pane label="组织管理" name="first"></el-tab-pane>
            <el-tab-pane label="角色管理" name="second"></el-tab-pane>
            <el-tab-pane label="审批管理" name="third"></el-tab-pane>
            <el-tab-pane label="岗位管理" name="fourth"></el-tab-pane>
          </i-tabs>
        </div>
        <div class="Buttons">
          <i class="iconfont LogButtonIcon">&#xe61d;</i>
          <i class="iconfont">&#xe60b;</i>
        </div>
      </div>
      <div class="Content" v-if="activeName == 'fourth'">
        <div class="Left">
          <iCard class="OrgCard">
            <div class="OrgFilterOptions">
              <div class="OrgFilterOptionsForm">
                <div class="OrgFilterOptionsFormLeft">
                  <el-form inline>
                    <el-form-item label="组织结构编码" class="SearchOption">
                      <i-input placeholder="请输入" class=""></i-input>
                    </el-form-item>
                    <el-form-item label="组织机构名称" class="SearchOption">
                      <i-input placeholder="请输入" class=""></i-input>
                    </el-form-item>
                  </el-form>
                </div>
                <div class="OrgFilterOptionsFormRight">
                  <iButton> 查询 </iButton>
                  <iButton> 重置 </iButton>
                </div>
              </div>
            </div>
            <div class="OrgList">
              <iTableCustom
                :loading="orgTableLoading"
                :data="orgTableListData"
                :columns="orgTableSetting"
                :tree-expand="{
                  expandKey: 'orgName',
                  childrenKey: 'children'
                }"
              >
              </iTableCustom>
              <iPagination
                v-update
                background
                @size-change="handleSizeChange($event, getTableList)"
                @current-change="handleCurrentChange($event, getTableList)"
                :current-page="page.currPage"
                :page-sizes="page.pageSizes"
                :page-size="page.pageSize"
                :layout="page.layout"
                :total="2"
              >
              </iPagination>
            </div>
          </iCard>
        </div>
        <div class="Right">
          <iCard class="PositionCard">
            <div class="PositionFilterOptions">
              <div class="PositionFilterOptionsForm">
                <div class="PositionFilterOptionsFormLeft">
                  <el-form>
                    <el-form-item label="组织结构编码" class="SearchOption">
                      <i-input placeholder="请输入" class=""></i-input>
                    </el-form-item>
                    <el-form-item label="负责人" class="SearchOption">
                      <i-input placeholder="请输入" class=""></i-input>
                    </el-form-item>
                    <el-form-item label="组织机构名称" class="SearchOption">
                      <i-input placeholder="请输入" class=""></i-input>
                    </el-form-item>
                  </el-form>
                </div>
                <div class="PositionFilterOptionsFormRight">
                  <iButton> 查询 </iButton>
                  <iButton> 重置 </iButton>
                </div>
              </div>
            </div>
            <div class="PositionList">
              <iTableCustom
                :loading="positionTableLoading"
                :data="positionTableListData"
                :columns="positionTableSetting"
              >
              </iTableCustom>
              <iPagination
                class="PageSelector"
                v-update
                background
                @size-change="handleSizeChange($event, getTableList)"
                @current-change="handleCurrentChange($event, getTableList)"
                :current-page="page.currPage"
                :page-sizes="page.pageSizes"
                :page-size="page.pageSize"
                :layout="page.layout"
                :total="2"
              >
              </iPagination>
            </div>
          </iCard>
        </div>
      </div>
    </div>
  </iPage>
</template>

<script>
import { iPage, iButton, iTabs, iInput, iCard, iPagination } from 'rise'
import iTableCustom from '@/components/iTableCustom'
import { pageMixins } from '@/utils/pageMixins'
import { orgTableSetting, positionTableSetting } from './data.js'
export default {
  mixins: [pageMixins],
  components: {
    iPage,
    // iSearch,
    iButton,
    iTabs,
    iInput,
    iTableCustom,
    iCard,
    iPagination
  },
  data() {
    return {
      orgTableLoading: false,
      positionTableLoading: false,
      orgTableSetting,
      positionTableSetting,
      orgTableListData: [
        {
          orgId: 'CS',
          orgName: '供应部',
          children: [
            {
              orgId: 'CS',
              orgName: '供应部'
            },
            {
              orgId: 'CS',
              orgName: '供应部'
            }
          ]
        },
        {
          orgId: 'CS',
          orgName: '供应部'
        },
        {
          orgId: 'CS',
          orgName: '供应部'
        },
        {
          orgId: 'CS',
          orgName: '供应部'
        }
      ],
      positionTableListData: [
        {
          positionId: '22222',
          positionName: 'ssss',
          positionOrgLeader: '是'
        },
        {
          positionId: '3333333',
          positionName: 'ssss',
          positionOrgLeader: '否'
        },
        {
          positionId: '4444444',
          positionName: 'sssss',
          positionOrgLeader: '是'
        }
      ],
      activeName: 'fourth'
    }
  },
  methods: {
    created() {
      this.page.currPage = 0
    }
  }
}
</script>

<style lang="scss" scoped>
.Main {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.Header {
  position: relative;
  .Buttons {
    position: absolute;
    right: 20px;
    top: 10px;
    color: #cbd9f8;
  }
}

.Content {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-grow: 1;
  .Left {
    .card {
      height: 100%;
    }
    width: 50%;
    margin-right: 5px;
    height: calc(100vh - 185px);
  }
  .Right {
    width: 50%;
    height: 100%;
    margin-left: 5px;
    .card {
      height: 100%;
    }
  }
}

.OrgFilterOptionsForm,
.PositionFilterOptionsForm {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .OrgFilterOptionsFormRight {
    padding-top: 22px;
  }
  .PositionFilterOptionsFormLeft > .el-form {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .PositionFilterOptionsFormRight {
    width: 45%;
    text-align: right;
    padding-top: 22px;
  }

  ::v-deep .el-form-item {
    .el-form-item__label {
      font-size: 14px;
      color: $color-black;
      font-weight: 400;
      line-height: 14px;
      padding-bottom: 8px;
      float: none;
      display: block;
      text-align: left;
    }

    .el-form-item__content {
      line-height: inherit;
    }
  }
}
</style>
