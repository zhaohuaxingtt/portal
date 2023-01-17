<template>
  <iDialog
    :title="$t('签署节点设置') + ':' + nodeName"
    :visible.sync="openDialog"
    append-to-body="true"
    width="70%"
    top="5vh"
    @close="clearDiolog"
  >
    <template slot="title">
      <div class="card-title">
        <span class="title">{{ $t('签署节点设置') + ':' + nodeName }}</span>
        <span>最近设置时间：{{ lastUpdateDate }}</span>
      </div>
    </template>
    <el-form label-width="160px" label-position="left" inline>
      <el-row :gutter="20" class="index-container" id="signNode">
        <el-col
          class="margin-bottom20"
          :span="24"
          :key="node.id"
          v-for="(node, index) in signNodeList"
        >
        <!-- 需要说明根据什么条件来判断是不是当前条款 -->
          <i-card :class="(node.id==id)?'active':''">
            <div class="card-content">
              <div class="margin-right20">
                <a class="el-icon-rank font-size50"></a>
              </div>
              <div>
                <p class="item-title">{{ node.name }}</p>
                <el-form-item
                  :label="$t('签署结果=')+$t(signBtnList.find(item=>item.value==node.singButton||1).agreeKey)"
                >
                  <iSelect v-model="node['agree']">
                    <template v-for="item in list2">
                      <!-- value:1 // 对应下一个条款 -->
                      <el-option
                        :disabled="
                          index == signNodeList.length - 1 && item.value == 1
                        "
                        :key="item.value"
                        :label="$t(item.label)"
                        :value="item.value"
                      >
                      </el-option>
                    </template>
                  </iSelect>
                </el-form-item>
                <el-form-item :label="$t('签署结果=')+$t(signBtnList.find(item=>item.value==node.singButton||1).refuseKey)">
                  <iSelect v-model="node['refuse']">
                    <template v-for="item in list2">
                      <!-- value:1 // 对应下一个条款 -->
                      <el-option
                        :disabled="
                          index == signNodeList.length - 1 && item.value == 1
                        "
                        :key="item.value"
                        :label="$t(item.label)"
                        :value="item.value"
                      >
                      </el-option>
                    </template>
                  </iSelect>
                </el-form-item>
              </div>
            </div>
          </i-card>
        </el-col>
      </el-row>
      <p>Tip:流程终止的两个结果True、False解释：</p>
      <p>True：代表条款签署已完成，可进行后续业务流程操作</p>
      <p>False：代表条款签署结果不会启动后续流程操作</p>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="clearDiolog">{{ $t('取消') }}</el-button>
      <el-button type="primary" @click="handleSubmit">{{
        $t('保存')
      }}</el-button>
    </span>
  </iDialog>
</template>

<script>
import { iDialog, iCard, iSelect, iFormItem, iLabel, iMessage } from 'rise'
import iTableML from '@/components/iTableML'
import { nodeSet, nodeSetList } from '@/api/terms/terms'
import { signBtnList } from "./data";
import Sortable from 'sortablejs'
export default {
  components: {
    iDialog,
    iCard,
    iSelect,
    iFormItem,
    iLabel,
    iTableML
  },
  props: {
    openDialog: { type: Boolean, default: false },
    id: { type: Number, default: -1 },
    signNode: [String,Number]
  },
  data() {
    return {
      signBtnList,
      openUploadFileDialog: false,
      lastUpdateDate: '',
      signNodeList: [],
      nodeName:'',
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
      ]
    }
  },
  created(){
    nodeSetList({
      signNode:this.signNode
    }).then(res=>{
      this.$set(this,'signNodeList',res.termsVoList || [])
      this.$set(this,'nodeName',res.nodeName || '-')
      this.$set(this,'lastUpdateDate',res.lastUpdateDate || '-')
    })
  },
  mounted() {
    this.$nextTick(() => {
      new Sortable(document.getElementById('signNode'), {
        ghostClass: 'sign-node-drop-ghost',
        animation: 150,
        onUpdate: (event) => {
          const signNode = _.cloneDeep(this.signNodeList)
          const item = _.cloneDeep(signNode[event.oldIndex])
          item.confirm = ''
          item.refuse = ''
          const endItem = _.cloneDeep(signNode[event.newIndex])
          const index = signNode.findIndex((e) => e.id === endItem.id)
          const newNodes = signNode.filter((e) => e.id !== item.id)
          newNodes.splice(index, 0, item)
          this.$set(this, 'signNodeList', newNodes)
          console.log(this.signNodeList)
        }
      })
    })
  },
  methods: {
    clearDiolog() {
      this.$emit('closeDialog', false)
      this.$emit('flushTable')
    },
    handleSubmit() {
      let params = {
        termsVoList: this.signNodeList.map((item,index)=>{
          item.sort = index
          item.singButton = item.singButton || 1
          return item
        })
      }
      nodeSet(params).then(res=>{
        console.log(res);
        if(res?.code=='200'){
          iMessage.success(res.message)
        }
      })
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
  .title{
    font-size: 16px;
    font-weight: 600;
  }
}
.active{
    ::v-deep .cardBody{
        background-color: rgb(237, 242, 252);
    }
}
.card-content {
  display: flex;
  align-items: center;
  .font-size50{
    font-size: 50px;
  }
  .item-title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  .item-text {
    font-size: 14px;
  }
}
</style>
