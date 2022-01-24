<template>
  <iCard style="height:14rem">
    <div class="title">
      <p>{{language('CAIWUYUJING', '财务预警')}}</p>
      <el-dropdown >
<!-- v-permission="Card_C-Rating_More" -->
        <span class="el-dropdown-link">
          <i class="el-icon-more"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="openDilog">{{language('CHAKAN', '查看')}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="center">
      <icon class="early"
            symbol
            name="iconcaiwuyujing-icon"></icon>
      <div class="float">
        <div>
          <icon v-if="info.isAlert"
                class="alert"
                symbol
                name="iconcaiwuyujing-hongdeng"></icon>
          <icon v-if="!info.isAlert"
                class="alert"
                symbol
                name="iconlvdeng"></icon>
          <p class="fontsize">{{info.tips}}</p>
        </div>
        <div class="bjText">
          <p> <span v-if="info.isAlert"> {{language('CRATINGLAIYUAN', 'C-Rating来源')}}:</span> <span>{{info.ratingSource}}</span></p>
          <p> {{language('GENXINSHIJIAN', '更新时间')}}:{{info.updateDate}}</p>
        </div>
      </div>
    </div>
    <cRatingTable v-model="visible"
                  v-if="visible"
                  @closeDiolog="closeDiolog"
                  :supplierId="$route.query.subSupplierId"
                  :sapCode="infodata.sapCode"></cRatingTable>
  </iCard>
</template>
<script>
import { iCard, icon } from 'rise'
import { supplierRatingCard } from '@/api/supplierManagement/supplierCard/index'
export default {
  props: {
    infodata: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  components: {
    iCard,
    icon,
  },
  data() {
    return {
      visible: false,
      info: {}
    }
  },
  computed: {
    style() {
      return {}
    }
  },
  watch: {},

  created() {
    this.$nextTick(() => {
      this.getData()
    })
  },
  methods: {
    getData() {
      supplierRatingCard(this.$route.query.subSupplierId).then((res) => {
        this.info = res.data
      })
    },
    openDilog() {
         let routeData = this.$router.resolve({
        path: '/supplier/frmrating/supplieroverview',
        query: {
            isSupplier:1
        }
      })
      window.open(routeData.href)
    },
    closeDiolog(){
        this.visible=false
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: space-between;
  padding-top: 15px;
  p {
    font-size: 20px;
    font-family: Arial;
    font-weight: bold;
    color: #131523;
  }
  i {
    font-size: 20px;
    cursor: pointer;
    color: #4d4d4d;
  }
}

.center {
  height: 160px;
  display: flex;
  align-items: center;
  .float {
    margin-left: 60px;
    display: flex;
    align-items: center;
  }
  .bjText {
    width: 240px;
    margin-left: 40px;
    text-align: left;
    span {
    }
    p {
      margin: 8px 0;
      display: flex;
    }
  }
  .fontsize {
    color: #798489;
    margin-top: 10px;
  }
  p {
    font-family: Arial;
    font-size: 16px;
    color: #798489;
  }
}
.early {
  font-size: 60px;
}
</style>