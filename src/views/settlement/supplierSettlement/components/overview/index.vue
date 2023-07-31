<template>
  <div>
    <!-- 页面头部 -->
    <div class="panel-category">
      <div class="list">
        <div class="item" :class="{ active: -1 === activeIndex }" @click="toggleActive(-1)">全部</div>
        <div class="item" v-for="(item, index) in heads" :key="index" :class="{ active: index === activeIndex }"
          @click="toggleActive(index)">
          {{ item.type }}
          <span data-v-a57bf1e4="" class="badge" v-if="item.size != '0'"> {{ item.size }} </span>
        </div>
      </div>
    </div>

    <div v-for="(item, index) in activeData" :key="index">
      <div class="category-name">
        {{ item.type }}
      </div>
      <div class="category-content">
        <overview-card v-for="(e, i) in item.items" :key="i" :data="e" type="APPROVAL" @open="openListPage" />
      </div>
    </div>
  </div>
</template>

<script>
import OverviewCard from './overview-card.vue';
import { getDictByCode, overview } from '@/api/settlement/pay-invoice';
export default {
  name: 'panelCategory',
  components: { OverviewCard },
  data() {
    return {
      data: [{ typeValue: '上汽大众汽车有限公司' }, { typeValue: '上海上汽大众销售有限公司' }],
      heads: [],
      activeIndex: -1,
      loading: false,
      dizCode: [] //字典項
    };
  },
  computed: {
    activeData() {
      if (this.activeIndex === -1) {
        return this.heads;
      }
      return [this.heads[this.activeIndex]];
    }
  },
  created() {
    this.getCodeEnght();
  },
  methods: {
    toggleActive(index) {
      this.activeIndex = index;
    },
    openListPage(item) {
      const { type, status } = item || {}
      this.$router.push({
        path: `/supplierSettlement/${type == 'contract' ? 'unpaidContractList' : 'payApplyList'}`,
        query: { status: type == 'contract' ? undefined : status }
      });
    },
    getPaystatistics() {
      overview(this.dizCode).then(res => {
        this.heads = res;
      });
    },


    getCodeNine() {
      getDictByCode('9000').then(res => {
        if (res.data != null) {
          res.data.forEach(item => {
            if (item.code == '9000' && item.name == '上海上汽大众汽车销售有限公司') {
              this.dizCode.push(item);
              this.getPaystatistics();
            }
          });
        }
      });
    },
    getCodeEnght() {
      getDictByCode('8000').then(res => {
        console.log(res);
        if (res.data != null) {
          res.data.forEach(item => {
            if (item.code == '8000' && item.name == '上汽大众汽车有限公司') {
              this.dizCode.push(item);
              this.getCodeNine();
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.panel-category {
  display: flex;
  flex-wrap: wrap;
  font-size: 16px;
  margin: 10px 0px;
  padding-top: 15px;
  padding-bottom: 15px;
  .all {
    margin-right: 30px;
  }

  .list {
    display: flex;
    flex-wrap: wrap;

    .item {
      margin: 10px 30px 10px 0px;
      padding-left: 20px;
      color: #909091;
      position: relative;
      font-size: 16px;
      font-weight: bold;

      &::before {
        position: absolute;
        left: 0;
        top: 0;
        content: '';
        display: block;
        width: 19px;
        height: 100%;
        background: transparent;
        background-size: contain;
      }

      &.active {
        color: #1763f7;
        font-weight: bold;

        &::before {
          background: url(~@/assets/images/tab-active-left.png) left center no-repeat;
          background-size: contain;
        }
      }

      cursor: pointer;
    }

    .divider {
      width: 5px;
      height: 17px;
      /* background: #1763f7; */
      opacity: 1;
      border-radius: 10px;
      margin: 11px 10px 0px -10px;
    }
  }
}

$color-blue-1: #001847;
$color-blue-2: #3a5280;
$color-blue-3: #2d539b;

.approval-overview-panel {
  width: 320px;
  height: 180px;
  position: relative;
  background: #fff;
  box-shadow: 0px 0px 20px rgba(27, 29, 33, 0.08);
  border-radius: 8px;
  margin-right: 35px;
  margin-bottom: 35px;
  cursor: pointer;

  .header {
    display: flex;
    justify-content: space-between;
    position: relative;
    min-height: 3.875rem;

    .name {
      font-size: 16px;
      color: $color-blue-1;
      font-weight: bold;
      margin: 20px 0 0 20px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      max-width: calc(100% - 70px);
    }

    .cat-name {
      .text {
        color: $color-blue-3;
        line-height: 28px;
      }

      background: #cedeff;
      height: 28px;
      position: absolute;
      top: 20px;
      right: -5px;
      padding-right: 8px;
      padding-left: 24px;

      &::before {
        position: absolute;
        left: 0;
        top: -14px;
        content: '';
        display: block;
        width: 0;
        height: 0;
        border-right: transparent 0 solid;
        border-left: solid 14px #fff;
        border-top: solid 28px transparent;
        border-bottom: solid 28px transparent;
      }

      &::after {
        position: absolute;
        right: 0;
        bottom: -4px;
        content: '';
        display: block;
        width: 0;
        height: 0;
        border-right: transparent 2px solid;
        border-left: solid 2px #6d86b9;
        border-top: solid 2px #6d86b9;
        border-bottom: solid 2px transparent;
      }
    }
  }

  .content {
    margin-top: 13px;

    .total {
      color: $color-blue-2;
      font-size: 46px;
      text-align: center;
      font-weight: bold;
    }

    .sub-title {
      display: flex;
      align-items: center;
      justify-content: center;
      color: $color-blue-1;
      font-size: 14px;
      text-align: center;
      margin-top: 6px;

      .text {
        margin-left: 4px;
      }
    }
  }
}

.category {
  margin-bottom: 29px;
}

.category-content {
  display: flex;
  flex-wrap: wrap;
  min-height: 180px;
}

.category-name {
  color: #0d2451;
  font-size: 20px;
  margin-bottom: 22px;
  font-weight: bold;
}

.approval {
  min-height: 600px;
}

.panel-category .list .item .badge {
  min-width: 1.25rem;
  height: 1.25rem;
  line-height: 1.25rem;
  background: #e30d0d;
  border-radius: 50%;
  color: #fff;
  text-align: center;
  font-size: 0.75rem;
  display: block;
  position: absolute;
  top: -0.625rem;
  right: -1.25rem;
  display: block;
}
</style>
