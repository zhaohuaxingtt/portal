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
        <img src="../../../../assets/images/greetings.png" />
      </div>
    </div>
  </el-card>
</template>
<script>
export default {
  computed: {
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
      userInfo: (state) => state.permission.userInfo
    }),
    userGreetInfoStr: function() {
      return this.getGreetingStr() + ',' + this.userInfo.nameZh + ',' + this.language('欢迎登录RiSE')
    },
    greetingsInfo() {
      return '过去一年辛苦了！❤️辞旧迎新之际，记得给自己充电哦'
    }
  },
  created() {

  },
  methods: {
    getGreetingStr() {
      const dateObj = new Date()
      const hours = dateObj.getHours()
      let greetingStr = ''
      if(hours >= 6 && hours <= 10) {
        greetingStr = this.language('早上好')
      } else if(hours > 11 && hours <= 13) {
        greetingStr = this.language('中午好')
      } else if(hours >= 14 && hours <= 18) {
        greetingStr = this.language('下午好')
      } else if(hours > 19 && hours <=23 ) {
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
  border-radius: 20px;
  .greet-card-div {
    display: flex;
    justify-content: space-between;
    //padding-top: 40px;
    padding-left: 50px;
    .greeting-copy {
      .user-greet-info {
        margin-top: 20px;
        color: #003595;
        font-size: 20px;
        font-weight: bold;
      }
      .greetings-info {
        margin-top: 20px;
        font-size: 16px;
        font-weight: normal;
      }
    }
    .greeting-pics {

    }
  }
}
</style>
