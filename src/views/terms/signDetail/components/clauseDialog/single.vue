<!--
 * @Author: YoHo
 * @Date: 2023-01-09 14:11:54
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\terms\signDetail\components\clauseDialog\single.vue
-->
<template>
  <iDialog
    :title="$t('请完成以下条款签署')"
    :visible.sync="openDialog"
    append-to-body="true"
    width="70%"
    top="5vh"
    @close="clearDiolog"
  >
    <div class="dialog-content">
      <div class="left">
        <el-steps direction="vertical" :active="1">
          <template v-for="item in clauseList">
            <el-step :title="item.label" :key="item.id" icon="el-icon-edit">
              <template slot="icon">
                <icon symbol :name="item.status==1?'iconshenpiliu-yishenpi':item.status==2?'iconshenpiliu-shenpizhong':'iconshenpiliu-daishenpi'" />
              </template>
              <template slot="description">
                <div class="description">
                  <p>说明：</p>
                  <span>{{'这是一段说明这是一段说明这是一段说明'}}</span>
                  <p>{{'条款附件'}}</p>
                  <template v-for="child in item.attachment">
                    <p class="link" :key="child.id">{{child.label}}</p>
                  </template>
                </div>
              </template>
            </el-step>
          </template>
        </el-steps>
      </div>
      <div class="right commitment" v-loading="loading">
        <div v-if="content.length" class="content" v-html="content"></div>
        <div v-else class="blank">{{ language("ZANWUNEIRONG", "暂无内容") }}</div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-checkbox class="check-box" v-model="check" slot="label"
        ><span class="label-text margin-right10">{{
          language('我已仔细阅读并同意以上条款内容')
        }}</span></el-checkbox
      >
      <el-button type="primary" @click="handleSubmit">{{
        $t('签署')
      }}</el-button>
      <el-button @click="clearDiolog">{{ $t('暂不签署') }}</el-button>
    </span>
  </iDialog>
</template>

<script>
import { iDialog, iCard, iSelect, iFormItem, iLabel, iMessage, icon } from 'rise'
import { nodeSetList } from '@/api/terms/terms'
export default {
  components: {
    iDialog,
    iCard,
    iSelect,
    iFormItem,
    iLabel,
    icon
  },
  props: {
    openDialog: { type: Boolean, default: false },
    id: { type: Number, default: -1 },
    supplierId: { type: Number, default: -1 }
  },
  data() {
    return {
      check: false,
      openUploadFileDialog: false,
      lastDate: '',
      signNode: [
        {
          id: '1',
          name: '询价承诺书',
          confirm: '',
          refuse: ''
        },
        {
          id: '2',
          name: '合规协议告知书',
          confirm: '',
          refuse: ''
        },
        {
          id: '3',
          name: '可再生能源使用承诺书',
          confirm: '',
          refuse: ''
        }
      ],
      value1: '',
      value2: '',
      list2: [
        {
          id: '1',
          label: '下一个条款',
          value: 1
        },
        {
          id: '2',
          label: '流程终止（True）',
          value: 2
        },
        {
          id: '3',
          label: '流程终止（False）',
          value: 3
        }
      ],
      clauseList:[
        {
          id:'1',
          label:'<<询价承诺书>>',
          status:1,
          description:'这是一段说明这是一段说明这是一段说明',
          attachment:[
            {
              id:"1",
              label:'条款附件1'
            },{
              id:"2",
              label:'条款附件2'
            },{
              id:"3",
              label:'条款附件3'
            },
          ],
          content:'',
        },
        {
          id:'2',
          label:'<<可再生能源使用承诺书>>',
          status:2,
          description:'这是一段说明这是一段说明这是一段说明',
          attachment:[
            {
              id:"1",
              label:'条款附件1'
            },
          ],
          content:'',
        },
        {
          id:'3',
          label:'<<XXX条款>>',
          status:2,
          description:'这是一段说明这是一段说明这是一段说明',
          attachment:[
            {
              id:"1",
              label:'条款附件1'
            },{
              id:"2",
              label:'条款附件2'
            },{
              id:"3",
              label:'条款附件3'
            },
          ],
          content:'',
        },
        {
          id:'4',
          label:'<<XXX条款>>',
          status:2,
          description:'这是一段说明这是一段说明这是一段说明',
          attachment:[
            {
              id:"1",
              label:'条款附件1'
            },{
              id:"2",
              label:'条款附件2'
            },{
              id:"3",
              label:'条款附件3'
            },
          ],
          content:'',
        },
        {
          id:'5',
          label:'<<XXX条款>>',
          status:3,
          description:'这是一段说明这是一段说明这是一段说明',
          attachment:[
            {
              id:"1",
              label:'条款附件1'
            },{
              id:"2",
              label:'条款附件2'
            },{
              id:"3",
              label:'条款附件3'
            },
          ],
          content:'',
        },
      ],
      content:''
    }
  },
  methods: {
    clearDiolog() {
      this.$emit('closeDialog', false)
    },
    handleSubmit() {
      console.log('handleSubmit:执行保存')
      this.$emit('flushTable')
      this.clearDiolog()
    }
  }
}
</script>

<style scoped lang="scss">
.card-title {
  display: flex;
  justify-content: space-between;
  margin-right: 20px;
}
.active {
  ::v-deep .cardBody {
    background-color: rgb(237, 242, 252);
  }
}
.dialog-content {
  display: flex;
  flex-flow: row;
  .left{
    width: 200px;
    margin-right: 20px;
    height: 600px;
    overflow: auto;
    .description{
      color: #000;
    }
  }
  .right{
    width: calc(100% - 200px);
  }
  .commitment{
    height: 600px;
    overflow: auto;
  }
  .item-title {
    font-size: 16px;
  }
  .item-text {
    font-size: 14px;
  }
}
</style>
