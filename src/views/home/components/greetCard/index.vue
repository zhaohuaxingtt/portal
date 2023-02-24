<template>
  <el-card class="module-card greet-card">
    <!--【2】文案展示，作为参数配置，修改配置即可修改展示内容 -->
    <div class="greet-card-div">
      <div class="greeting-copy">
        <!-- 【1】登录欢迎语：[Greeting]+[用户名称]+欢迎登录RiSE -->
        <!-- Greeting-根据用户登录时的服务器时间，显示不同欢迎词 -->
        <!--  0点~5点：无-->
        <!--  6点~10点：早上好，-->
        <!--  11点~13点：中午好，-->
        <!--  14点~18点：下午好，-->
        <!--  19点~23点：晚上好，-->
        <div class="user-greet-info">{{ userGreetInfoStr }}</div>
        <div class="user-greet-info greetings-info">{{ greetingsInfo }}</div>
      </div>
      <div class="greeting-pics">
<!--        <img src="../../../../assets/images/greetings.png" />-->
        <img :src="require('@/assets/images/home-digital-purchasing.svg')"/>
        <img class="home-rise-icon" :src="require('@/assets/images/home-rise-icon.svg')"/>
      </div>
    </div>
  </el-card>
</template>
<script>
import { selectDictByKeys } from '@/api/dictionary'
export default {
  computed: {
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
      userInfo: (state) => state.permission.userInfo
    }),
    userGreetInfoStr: function() {
      const name = this.$i18n.locale === "zh" ? this.userInfo.nameZh : this.userInfo.nameEn
      const greetingStr = this.getGreetingStr()
      if(greetingStr) {
        return greetingStr + ',' + name + ',' + this.language('欢迎登录RiSE')
      } else {
        return name + ',' + this.language('欢迎登录RiSE')
      }
    },
    greetingsInfo() {
      return this.$i18n.locale === "zh" ? this.greetingValues.zh : this.greetingValues.en
    }
  },
  data() {
    return {
      greetingValues: {
        zh: '',
        en: ''
      }
    }
  },
  created() {
    this.queryGreetingDict()
  },
  methods: {
    queryGreetingDict() {
      selectDictByKeys("keys=HOME_GREETING").then((res) => {
        if(res && res.data && res.data['HOME_GREETING'] && res.data['HOME_GREETING'].length > 0) {
          if(res.data['HOME_GREETING'][0]) {
            this.greetingValues.zh = res.data['HOME_GREETING'][0].describe
          }
          if(res.data['HOME_GREETING'][1]) {
            this.greetingValues.en = res.data['HOME_GREETING'][1].describe
          }
        }
      })
    },
    getGreetingStr() {
      const dateObj = new Date()
      const hours = dateObj.getHours()
      let greetingStr = ''
      if(hours >= 6 && hours <= 10) {
        greetingStr = this.language('早上好')
      } else if(hours >= 11 && hours <= 13) {
        greetingStr = this.language('中午好')
      } else if(hours >= 14 && hours <= 18) {
        greetingStr = this.language('下午好')
      } else if(hours >= 19 && hours <= 23) {
        greetingStr = this.language('晚上好')
      }
      return greetingStr
    }
  }
}
</script>
<style scope lang="scss">
  .module-card {
    border-radius: 20px;
  }
.greet-card {
  border-radius: 20px !important;
  .greet-card-div {
    display: flex;
    justify-content: space-between;
    //padding-top: 40px;
    padding-left: 50px;
    .greeting-copy {
      .user-greet-info {
        margin-top: 50px;
        color: #003595;
        font-size: 20px;
        font-weight: bold;
        line-height: 30px;
        height: 30px;
      }
      .greetings-info {
        margin-top: 5px;
        font-size: 16px;
        font-weight: normal;
      }
    }
    .greeting-pics {
      display: flex;
      align-items: center;
      margin-right: 100px;
    }
    .home-rise-icon {

    }
  }
}
</style>
