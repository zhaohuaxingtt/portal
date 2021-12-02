<template>
  <iDialog title="转派" style="margin-top:20vh" :visible.sync="show" v-if="show" width="30%" @close='closeDiologBtn' append-to-body>
    <div class="flex flex-row justify-between">
      <div style="width:80px;">管理员</div>
      <iSelect v-model="userId" filterable placeholder="请输入">
        <el-option v-for="item in userList" :key="item.id" :label="language(item.nameZh)" :value="item.id"></el-option>
      </iSelect>
    </div>
    <div class="reset_style">
      <iButton @click="save">{{language('确认')}}</iButton>
      <iButton @click="close">{{language('取消')}}</iButton>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iButton,iSelect } from 'rise';
import {queryProCsUserList,questionTransferApi} from '@/api/assistant'
export default {
  name: 'dispatchDialog',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    questionId: {
      type: Number,
    }
  },
  data () {
    return {
      visible: false,
      userId:'',
      options: [],
      userList: [],
    }
  },
  methods: {
    // 查询列表
    async queryUserList() {
      const response = await queryProCsUserList();
      console.log(response, '查询用户列表');
      if (response?.code === '200') {
        this.userList = response.data;
      } else {
        console.error('获取用户列表失败');
      }
    },
    closeDiologBtn () {
      this.$emit('update:show', false)
    },
    close () {
      this.closeDiologBtn();
    },
    async save () {
      if (!this.userId) {
        this.$message.error('请选择需要指派的用户');
        return;
      }
      const response = await questionTransferApi({
        questionId: this.questionId,
        userId: this.userId,
      });
      if (response?.code === '200') {
        console.log(response);
        this.$message.success('指派成功');
        this.closeDiologBtn();
        this.$emit('loadData');
      } else {
        this.$message('指派失败');
      }
    }
  },
  mounted() {
    console.log(this.questionId, '问题id');
    this.queryUserList();
  },
  components: {
    iDialog, 
    iButton,
    iSelect,
  }
}
</script>

<style lang="scss" scoped>
@import '../../../comon.scss';
.reset_style {
  margin-top: 50px;
  padding-bottom: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
