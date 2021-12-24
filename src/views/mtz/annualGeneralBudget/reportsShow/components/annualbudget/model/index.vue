<template>
  <i-card>
    <div class='left'>
        <div class='let-top'>
          <i-select class='my-sel' placeholder='年份选择'></i-select>
          <show-me-components class='margin-right30' />
        </div>
        <div class='left-query'>
          <el-form>
            <i-select class='my-sel' placeholder='车型'></i-select>
            <i-select class='my-sel margin-left20' placeholder='车型6位号'></i-select>
          </el-form>
          <div class='left-btns'>
            <i-button>{{ language('LK_CHAXUN', '查询') }}</i-button>
            <i-button>{{ language('LK_CHONGZHI', '重置') }}</i-button>
          </div>
        </div>
      <p class='margin-top25'><span class='money-title'>车型总金额:</span><span class='money'>340,123,234人民币</span></p>
      <i-table-custom class='margin-top20 margin-right20'  :columns="leftTableTitle"
                      :data="leftTableList" ></i-table-custom>
    </div>
    <div class='right'>
      <div class='right-top'>
        <p>{{language('LK_CHEXINGYUSUANJINEMINGXI','车型预算金额明细')}}</p>
        <show-me-components/>
      </div>
      <div class='right-query'>
        <el-form>
          <i-select class='my-sel' placeholder='车型'></i-select>
          <i-select class='my-sel margin-left20' placeholder='车型6位号'></i-select>
        </el-form>
        <div >
          <i-button>{{ language('LK_CHAXUN', '查询') }}</i-button>
          <i-button>{{ language('LK_CHONGZHI', '重置') }}</i-button>
        </div>
      </div>
      <p class='margin-top25'><span class='money-title'>车型总金额:</span><span class='money'>340,123,234人民币</span></p>
      <i-table-custom class='margin-top20 margin-right20' min-height='500' :columns="rightTableTitle"
                      :data="rightTableList" ></i-table-custom>
    </div>
  </i-card>
</template>

<script>
import { iCard, iSelect, iButton } from 'rise'
import ShowMeComponents from '@/views/mtz/annualGeneralBudget/reportsShow/components/comm/ShowMeComponents'
import iTableCustom from '@/components/iTableCustom'

export default {
  name: 'index',
  components: {
    ShowMeComponents,
    iCard,
    iSelect,
    iButton,
    iTableCustom
  },
  data(){
    return {
      leftTableList:[],
      leftTableTitle:[
        {
          prop: "brandName",
          label: "车型",
          i18n: "LK_CHEXING",
          headerAlign: "center",
          align: "center",
          tooltip: true,
        },
        {
          prop: "brandName",
          label: "车型六位号",
          i18n: "LK_CHEXINGLIUWEIHAO",
          headerAlign: "center",
          align: "center",
          tooltip: true,
        },
        {
          prop: "brandName",
          label: "预算金额（元/车）",
          i18n: "LK_YUSUANJINEYUANCHE",
          headerAlign: "center",
          align: "center",
          tooltip: true,
        },
      ],
      rightTableList:[],
      rightTableTitle:[
        {
          prop: "brandName",
          label: "材料中类",
          i18n: "LK_CAILIAOZHONGLEI",
          headerAlign: "center",
          align: "center",
          tooltip: true,
        },
        {
          prop: "brandName",
          label: "材料组",
          i18n: "LK_CAILIAOZHU",
          headerAlign: "center",
          align: "center",
          tooltip: true,
        },
        {
          prop: "brandName",
          label: "预算金额（元/车）",
          i18n: "LK_YUSUANJINEYUANCHE",
          headerAlign: "center",
          align: "center",
          tooltip: true,
        },
      ],
    }
  }
}
</script>

<style scoped lang='scss'>
::v-deep .cardBody {
  display: flex;
  flex-flow: row;
  height: calc(100vh - 240px) !important; // 父级没有定义高度
  .left {
    flex: 50% 0 0;
    .let-top {
      display: flex;
      justify-content: space-between;
      .my-sel{
        width: unset;
      }
    }

    .left-query {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;

      .my-sel {
        width: unset;
      }

      .left-btns {
        margin-right: 20px;

      }
    }
    overflow: auto;
    p .money-title{
      font-size: 16px;
      font-weight: bold;
      color: black;
    }
    .money{
      font-size: 16px;
      color: black;
    }
  }

  .right {
    flex: 50% 0 0;
    position: relative;
    overflow: auto;
    padding-left: 25px;
    &::before {
      content: ' ';
      width: 1px;
      height: 100%;
      background: #E1E2ED;
      margin-right: 5px;
      display: inline-block;
      vertical-align: top;
      position: absolute;
      left: 1px;

    }
    .right-top {
      display: flex;
      justify-content: space-between;
      p{
        font-size: 18px;
        font-weight: bold;
        height: 35px;
        line-height: 35px;
        color: black;
      }
    }
    .right-query {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;

      .my-sel {
        width: unset;
      }
    }
    p .money-title{
      font-size: 16px;
      font-weight: bold;
      color: black;
    }
    .money{
      font-size: 16px;
      color: black;
    }
  }


}

</style>