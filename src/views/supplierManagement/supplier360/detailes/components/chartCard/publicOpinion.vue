<template>
  <iCard style="height:14rem">
    <div class="title">
      <p>{{language('YUQINGJIANCE', '舆情监测')}}</p>
      <span v-permission="Card_Public_opinion_monitoring_More" class="el-dropdown-link">
        <i class="el-icon-more"></i>
      </span>
    </div>
    <div class="center">
      <span style="font-size:16px;color:rgba(107, 121, 149, 0.56);">{{language('JINGQINGQIDAI', '敬请期待')}}</span>
<!--       <img :src="img"-->
<!--           class="imgIcon" />-->
<!--      <div class="float">-->
<!--        <div v-for="v in data"-->
<!--             :key="v.address">-->
<!--          <div class="leftBox">-->

<!--            <div class="tag colorBule">-->
<!--              {{language('MINGAN', '敏感')}}-->
<!--            </div >-->
<!--            &lt;!&ndash; <div class="tag colorBule">-->
<!--             {{language('FEIMINGAN', '非敏感')}}-->
<!--          </div> &ndash;&gt;-->
<!--            <el-popover  width="200"-->
<!--                        trigger="hover"-->
<!--                        :content="v.address"-->
<!--                        placement="top-end">-->
<!--              <div slot="reference"-->
<!--                   class="address">{{v.address}}</div>-->
<!--            </el-popover>-->
<!--          </div>-->

<!--          <span class="time">-->
<!--            2021-1-1-->
<!--          </span>-->
<!--        </div>-->

<!--      </div>-->
      <!-- <div class="nomore">
        {{language('GAIGONGYINGSHANGZANWUYUQINGXINWEN', '该供应商暂无舆情新闻')}}
      </div> -->
    </div>
  </iCard>
</template>
<script>
import { iCard,} from 'rise'
import img from '@/assets/images/publicOpinion.svg'
export default {
  props: {},
  components: {
    iCard,

  },
  data() {
    return {
      chart: 'oneChart',
      data: [{ address: '测试' }, { address: '测试' }, { address: '测试' }],
      img:img
    }
  },
  computed: {
    style() {
      return {}
    }
  },
  watch: {},
  methods: {},
  mounted() {}
}
</script>

<style lang="scss" scoped>
.imgIcon{
    width: 60px;
    height: 60px;
}
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
.nomore {
  margin-left: 60px;
  font-size: 16px;
  font-family: Arial;
  font-weight: 400;
  color: #798489;
  width: 80%;
  letter-spacing: 4px;
}
.center {
  height: 160px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .float {
    align-items: center;
    width: 80%;
    margin-left: 26px;
    > div {
      display: flex;
      justify-content: space-between;
      background: #f8f8fa;
      align-items: center;
      border-radius: 6px;
      margin: 10px 0;
      padding: 0px 16px;
      height: 30px;
      cursor: pointer;
      .leftBox{
          display: flex;
          width: 80%;
      }
      .address {
        font-size: 14px;
        font-family: Arial;
        font-weight: 400;
        color: #41434a;
      }
       time {
        font-size: 12px;
        font-family: Arial;
        font-weight: 400;
        color: #000000;
        opacity: 0.42;
      }
    }
  }
  .fontsize {
    color: #798489;
  }
}
.colorBule {
  background: rgba(206, 212, 214, 0.1);
  color: #1763f7;
}
.colorblack {
  background: rgba(140, 152, 172, 0.32);
  color: #001847;
}
.tag {
    margin-right: 10px;
  height: 20px;
  background: #dbeafc;
  opacity: 1;
  border-radius: 5px;
  font-size: 10px;
  font-family: Arial;
  font-weight: 400;
  padding: 0 12px;
}
.early {
  font-size: 60px;
}
</style>