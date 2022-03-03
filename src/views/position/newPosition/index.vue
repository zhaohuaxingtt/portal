<template>
  <iPage>
    <div class="main">
      <div class="title">
        <div class="titleName">{{language('新建岗位')}}</div>
        <div class="titleButton">
          <iButton>{{language('确定')}}</iButton>
          <iButton>{{language('重置')}}</iButton>
        </div>
      </div>
      <div class="contents">
        <iCard class="basicMe" :title="language('基本信息')" collapse="true">
          <div class="basicMeList">
            <div class="MessageAlo" v-for="item in basicMe" :key="item.id">
              <span class="basicNa" style="line-height: 25px;">{{
                language(item.name)
              }}</span>
              <span class="basicCon" style="height:35px;">{{ language(item.text) }}</span>
            </div>
          </div>
          <div class="desAndTag">
            <div
              class="MessageLast"
              v-for="(item, index) in MessageLast"
              :key="item.id"
            >
              <span class="basicNa" style="line-height: 35px;">{{
                language(item.name)
              }}</span>
              <span
                :class="'text' + (index + 1)"
                style="line-height: 35px; height:35px;"
                v-if="item.tags"
              >
                <el-tag
                  type="info"
                  closable
                  class="tags"
                  v-for="value in item.text"
                  :key="value.id"
                  >{{ value.tag }}</el-tag
                >
                <div class="el-icon-circle-plus-outline icon"></div>
              </span>
              <span
                :class="'text' + (index + 1)"
                style="line-height: 35px; height:35px;"
                v-else
                >{{ language(item.text) }}</span
              >
            </div>
          </div>
          <div class="button">
            <iButton style="margin-top : 4vh">{{language('增加维度')}}</iButton>
          </div>
          <!-- table内容 -->
          <div class="tableMessage" style="margin-top : 2vh">
            <iTableCustom :data="tableData" :columns="tableMe"> </iTableCustom>
          </div>
        </iCard>
        <iCard class="roleMe" :title="language('角色信息')" collapse="true">
          <div class="titleButton">
            <iButton>{{language('确定')}}</iButton>
            <iButton>{{language('重置')}}</iButton>
          </div>
          <div class="roleTable">
            <iTableCustom :data="roleData" :columns="tableSetting">
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
    </div>
  </iPage>
</template>

<script>
import { iButton, iCard, iPagination, iPage } from 'rise'
import iTableCustom from '@/components/iTableCustom'
import { tableSetting } from './data.js'
// import { pageMixins } from "@/utils/pageMixins";

export default {
  components: {
    iButton,
    iCard,
    iTableCustom,
    iPagination,
    iPage
  },
  // mixins:[pageMixins],
  data() {
    return {
      //基本信息第一行信息
      basicMe: [
        {
          name: '岗位编码',
          text: 'P-CSF-101'
        },
        {
          name: '岗位名称（中）',
          text: 'PZ2'
        },
        {
          name: '岗位名称（英）',
          text: '车灯采购经理'
        },
        {
          name: '是否组织领导',
          text: '是'
        }
      ],
      //基本信息第二行信息
      MessageLast: [
        {
          name: '岗位描述',
          describePosition: true,
          text: '岗位描述岗位描述岗位描述岗位描述'
        },
        {
          name: '岗位标签',
          tags: true,
          text: [{ tag: ' 采购 ' }, { tag: ' 财务' }]
        }
      ],
      //table内容
      // tableMe,
      tableData: [],
      //角色信息
      tableSetting,
      roleData: []
    }
  },
  methods: {},
  created() {
    this.page.currPage = 0
  }
}
</script>
<style lang="scss" scoped>
.main {
  width: 95%;
  height: 100%;
  margin: 0 auto;
  .title {
    display: flex;
    justify-content: space-between;
    .titleName {
      font-weight: bold;
      font-size: 20px;
    }
  }
  .contents {
    margin-top: 2vh;
    overflow: auto;
    height: 100%;
    .basicMe {
      margin-bottom: 2vh;
      .basicMeList {
        display: flex;
        justify-content: space-between;
        .MessageAlo {
          width: 22%;
          display: flex;
          justify-content: space-between;
          .basicNa {
            display: block;
            color: #4b4b4c;
          }
          .basicCon {
            display: block;
            border-radius: 4px;
            width: 65%;
            line-height: 3rem;
            text-align: center;
            border: 1px solid #d9dee5;
          }
        }
      }
      .desAndTag {
        margin-top: 3vh;
        display: flex;
        justify-content: space-between;
        .MessageLast {
          width: 48%;
          display: flex;
          justify-content: space-between;
          .basicNa {
            color: #4b4b4c;
          }
          .text {
            &1 {
              display: block;
              text-align: center;
              border: 1px solid #d9dee5;
              width: 84%;
            }
            &2 {
              // display: flex;
              // justify-content: space-around;
              border: 1px solid #d9dee5;
              width: 84%;
              padding-left: 15px;
              text-align: left;
              .icon {
                float: right;
                line-height: 40px;
                color: #cbcbcb;
                width: 20px;
                height: 20px;
              }
              .tags {
                color: #41434a;
                line-height: 2rem;
                margin-right: 8px;
                height: 32px;
                background: #f7f7f7;
                opacity: 1;
                border-radius: 15px;
                ::v-deep .el-tag__close {
                  color: #41434a;
                }
              }
            }
          }
        }
      }
      .button {
        display: flex;
        justify-content: flex-end;
      }
      .tableMessage {
      }
    }
    .roleMe {
      margin-top: 4vh;
      margin-bottom: 2vh;

      .titleButton {
        display: flex;
        justify-content: flex-end;
      }
      .roleTable {
        margin-top: 2vh;
      }
    }
  }
}
</style>
