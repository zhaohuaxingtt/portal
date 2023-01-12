<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-10-08 09:52:17
 * @LastEditors: YoHo && 917955345@qq.com
 * @Descripttion: your project
-->
<template>
  <iCard
         v-loading="appLoading"
         loading-text="加载中......"
         style="width: 100%;height: 100%;">
    <node-chain :supplierId="supplierId"
                ref="nodeChain"
                :style="{'height': outboxHeight + 'px'}"
                v-loading="onDataLoading"
                :node-datas="chainNodeDatas"
                flow-direction="reverse"
                :enable-level-change="false"
                lvl-tag="chainLevel"
                :lvl-start="-1"
                :disable-drag-connect-lvls="[0]"
                :enable-delete-connection="false"
                remove-node-express="node && node.markLabel && node.markLabel.indexOf('SQO') < 0"
                add-child-node-express="eval(node[this.lvlTag] > 1)"
                @add-node="addNode"
                @rel-added="relAdded"
                @rel-deleted="relDeleted"
                @level-changed="levelChanged"
                @pos-changed="posChanged"
                @node-dblclicked="nodeDblclicked"
                @delete-node="deleteNode"
                @node-data="nodeDatas"
                @copy-node="copyNode"
                @rel-changed="relChanged">
      <template v-slot:head="{node}">
        <div class="node-icon"
             style="width: 40px;">
          <icon style="font-size:40px;"
                v-if="node.level > 0"
                name="iconpilianggongyingshangzonglan"
                symbol></icon>
          <icon style="font-size:40px;"
                v-else
                name="iconshangqidazhong"
                symbol></icon>
        </div>
        <div class="flex-hor"
             style="flex:1;">
          <div style="font-size: 16px;">{{node.title}}</div>

          <div class="margin-left10"
               style="font-size: 18px;font-weight: 400;"
               v-if="node.level == 0">{{language('SHENGCHANGONGCHAN','生产工厂')}}</div>
        </div>
        <div v-if="['BKM','SQO'].includes(node.chainSource)"
             class="sys-label">{{node.chainSource}}</div>
        <div class="tier-level flex-hor"
             v-if="node.level > 0"
             style="margin-right: 5px;"><a>Tier-</a><span>{{node.chainLevel}}</span></div>
      </template>
      <template v-slot="{node}">
        <div class="flex-hor full-width"
             style="height: 40px;">
          <div class="hidden">{{node.supplierName}}</div>
          <div class="cursor"
               @click="handleEdit(node)"
               v-if="node.chainLevel>1">
            <icon style="font-size:20px;"
                  name="iconbianji"
                  symbol></icon>
          </div>
        </div>
        <div class="tier-chart-divider">
          <legend class="tier-chart-divider__content"></legend>
        </div>
        <div style="width: 100%;flex: 1 0 0;overflow-y: auto;height: 0;">
          <div v-if="node.partType&&node.partType.partType"
               class="flex-hor full-width"
               style="height: 24px;">
            <div>{{language('LINGJIANLEIXING','零件类型')}}: {{node.partType.partType}}</div>
          </div>
          <div v-if="node.partList && node.partList.length > 0"
               class="flex-hor full-width"
               :style="{'margin-bottom':'5px','align-items':'flex-start','height': (node.partList.length * 24) + 'px'}">
            <div>{{language('LINGJIANHAO','零件号')}}: </div>
            <div class="flex-ver"
                 style="flex:1;justify-content: flex-start;">
              <template v-for="(item, idx) in node.partList">
                <div :key="idx"
                     class="flex-ver"
                     style="min-height: 24px;justify-content: flex-start;">
                  <div>{{item.partNum}}</div>
                </div>
              </template>
            </div>
          </div>
          <div v-if="node.factoryName"
               class="flex-hor full-width"
               :style="{'margin-bottom':'5px','align-items':'flex-start',}">
            <div>{{language('GONGCHANGMINGCHENG','工厂名称')}}: </div>
            <div>
              {{node.factoryName}}
            </div>
          </div>
          <div class="flex-hor full-width"
               style="min-height: 24px;">
            <span>{{language('GONGCHANGDIZHI','工厂地址')}}: </span>
            <span v-if="node.country">{{node.country}}</span>
            <span v-if="node.province">-{{node.province}}</span>
            <span v-if="node.city">-{{node.city}}</span>
          </div>
          <div class="flex-hor full-width"
               style="min-height: 24px;">
            <div>{{language('XIANGXIDIZHI','详细地址')}}: {{node.address}}</div>
          </div>
        </div>
      </template>
    </node-chain>
    <!-- 新增上游供应商  -->
    <addSupplierDialog :areaList="formGroup.areaList"
                       @creatSupplier="creatSupplier"
                       v-model="addNodeDialog"
                       :niterFlag="niterFlag"
                       :node="node" />
    <!-- 双击-- 编辑供应商信息 -->
    <supplierInfoDialog @modifyNode="modifyNode"
                        :flag="flag"
                        v-model="modifyNodeDialog"
                        :node="node" />
    <!-- 删除 -->
    <iDialog :visible.sync="showDeleteDialog"
             :title="language('SHANCHUGONGYINGLIANLU','删除供应链路')"
             width="25%"
             @close="clearDiolog">
      <el-form ref="delete"
               :rules="rulesDelete"
               :model="deleteForm"
               class="flex-ver"
               style="justify-content: flex-start;">
        <el-form-item prop="deleteOption">
          <el-radio v-model="deleteForm.deleteOption"
                    label="all">{{language('SHANCHUDANGQIANJISHANGYOUJIEDIAN','删除所选供应商及其上游所有层级供应链关系')}}</el-radio>
          <br />
          <el-radio v-model="deleteForm.deleteOption"
                    label="only">{{language('SHANCHUDANGQIANJIEDIAN','仅删除所选供应商，保留其上游供应链关系')}}</el-radio>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <iButton @click="showDeleteDialog = false">{{language('QUXIAO','取消')}}</iButton>
        <iButton type="primary"
                 @click="doRemoveNode">{{language('QUEDINGSHANCHU','确定删除')}}</iButton>
      </span>
    </iDialog>
    <iDialog :visible.sync="showCopyDialog"
             :title="language('FUZHIGONGYINGLIANLU','复制供应链路')"
             show-close
             width="25%"
             @close="clearDiolog">
      <el-form ref="copy"
               :rules="rulesCopy"
               :model="copyForm"
               class="flex-ver"
               style="justify-content: flex-start;">
        <el-form-item prop="copyOption">
          <el-radio v-model="copyForm.copyOption"
                    label="all">{{language('FUZHISUOXUANGONGYINGSHANGJIQISHANGYOUSUOCENGJIGONGYINGLIANGUANXI','复制所选供应商及其上游所有层级供应链关系')}}</el-radio>
          <br />
          <el-radio v-model="copyForm.copyOption"
                    label="only">{{language('JINGFUZHISUOXUANGONGYINGSHANG','仅复制所选供应商')}}</el-radio>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <iButton @click="showCopyDialog = false">{{language('QUXIAO','取消')}}</iButton>
        <iButton type="primary"
                 @click="doCopyNode">{{language('QUEDINGFUZHI','确定复制')}}</iButton>
      </span>
    </iDialog>
    <!-- copy -->
    <copySupplierDialog :copyOption="copyForm.copyOption"
                        :partList="formGroup.partList"
                        :areaList="formGroup.areaList"
                        v-model="copySupplierDialog"
                        :node="node" />
  </iCard>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import nodeChain from "./nodeChain.vue";
import supplierInfoDialog from "./supplierInfoDialog.vue";
import addSupplierDialog from "./addSupplierDialog.vue";
import copySupplierDialog from "./copySupplierDialog.vue";
import "./component.css";
import { chain, deleteNode, change } from "@/api/supplierManagement/supplyMaintain/index.js";
import { iCard, iDialog, iButton, iInput, iLabel, iFormGroup, iFormItem, icon, iSelect } from 'rise'
import resultMessageMixin from "@/mixins/resultMessageMixin.js";
import { dictByCode } from "./data";
export default {
  components: { nodeChain, iCard, iDialog, iButton, iInput, iLabel, iFormGroup, iFormItem, icon, iSelect, supplierInfoDialog, addSupplierDialog, copySupplierDialog },
  mixins: [resultMessageMixin],
  props:{
    areaList:Array
  },
  watch:{
    areaList: {
      handler(val){
        this.formGroup.areaList = _.cloneDeep(val)
      },
      deep:true,
      immediate:true
    }
  },
  data () {
    return {
      onDataLoading: false,
      node: {},
      supplierId: '',
      flag: 'create',
      appLoading: false,
      copySupplierDialog: false,
      chainNodeDatas: {},
      nodeDatas: [],
      ntierChains: [],
      addNodeDialog: false,
      addNodeOption: {},
      modifyNodeDialog: false,
      modifyNodeOption: {},
      showDeleteDialog: false,
      deleteForConfirm: null,
      showCopyDialog: false,
      copyForConfirm: {},
      copyForm: {
        copyOption: "",
      },
      deleteForm: {
        deleteOption: "",
      },
      formGroup: {
        areaList: [],
        partList: []
      },
      rulesCopy: {
        copyOption: [
          { required: true, message: '请选择', trigger: 'blur' },
        ],
      },
      rulesDelete: {
        deleteOption: [
          { required: true, message: '请选择', trigger: 'blur' },
        ],
      },
      outboxHeight: 0,
      niterFlag: false
    }
  },
  mounted () {
    this.getCardChain()
    this.formGroup.areaList = _.cloneDeep(this.areaList)
    this.dictByCode()
    this.$nextTick(() => {
      this.outboxHeight = document.documentElement.getBoundingClientRect().height - this.$refs.nodeChain.$el.getBoundingClientRect().y - 60;
    });
  },
  created () {
  },
  methods: {
    // 过去零件信息
    async dictByCode () {
      const res = await dictByCode('NTIER_CHAIN_PART_TYPE')
      res.map(item => {
        item.label = item.name
        item.value = item.code
        item.subDictResultVo && item.subDictResultVo.map(val => {
          val.label = val.name
          return val.value = val.code
        })
        return item.children = item.subDictResultVo
      })
      this.formGroup.partList = res
    },
    // // 获取区域
    // async getCity () {
    //   const res = await getCity()
    //   this.formGroup.areaList = res
    // },
    handleEdit (node) {
      this.node = node
      this.flag = 'edit'
      this.modifyNodeDialog = true
    },
    creatSupplier () {
      this.flag = 'create'
      this.modifyNodeDialog = true
    },
    // 查询 卡片信息
    async getCardChain () {
      // this.$route.params.supplierId
      // this.$route.params.param
      this.onDataLoading = true
      const pms = {
        supplierId: this.$route.query.supId,
        args: this.$route.query.tlk
      }
      // this.supplierId = pms.supplierId
      this.onDataLoading = true;
      this.ntierChains = []
      const res = await chain(pms)
      this.flat(res.data)
      var nodeList = {};
      var edges = [];
      this.ntierChains.forEach((ntierChain, index) => {
        if (ntierChain.parentId) {
          edges.push({
            source: ntierChain.id,
            target: ntierChain.parentId
          });
          ntierChain.type = "tpl-center";
          ntierChain.level = 1;
        } else {
          ntierChain.type = "tpl-begin";
          ntierChain.level = 0;
        }
        ntierChain.left = 50;
        ntierChain.top = 50;
        nodeList[ntierChain.id] = ntierChain;
      });
      this.$set(this.chainNodeDatas, "nodeList", nodeList);

      this.$set(this.chainNodeDatas, "edges", edges);
      this.$nextTick(() => {
        this.onDataLoading = false;
      })
    },
    // 链路扁平化
    flat (data = [], id = '') {
      data.forEach((item, index) => {
        if (item.id) {
          this.ntierChains.push({ ...item, parentId: id, ...item.address })
        } else {
          this.ntierChains.push({ ...item, parentId: id, ...item.address, id: item.supplyId })
        }
        if (item.child) {
          if (item.id) {
            this.flat(item.child, item.id)
          } else {
            this.flat(item.child, item.supplyId)
          }
        }
      })
    },
    clearDiolog () {
      this.$emit("input", false);
    },

    addNode (node) {
      this.niterFlag = true
      this.node = node
      this.addNodeDialog = true;
    },
    relAdded (sourceId, targetId) {
    },
    async relChanged (sourceId, newToId, oldTargetId) {
      const pms = {
        isCross: true,
        leftChainId: newToId,
        rightChainId: sourceId,
      }
      const res = await change(pms)
      this.resultMessage(res)
    },
    relDeleted (sourceId, oldTargetId) {
    },
    levelChanged (sourceId, level) {
    },
    deleteNode (node) {
      this.niterFlag = true
      this.node = node
      this.showDeleteDialog = true;
    },
    doRemoveNode () {

      this.$refs.delete.validate(async (valid) => {
        if (valid) {
          const pms = {
            chainId: this.node.id,
            deleteType: this.deleteForm.deleteOption
          }
          const res = await deleteNode(pms)
          this.resultMessage(res, () => {
            this.showDeleteDialog = false;
            if (this.niterFlag) {
              this.getCardChain()
            } else {
              this.$parent.$children[0].getTableList()
            }

          })
        }
      })
    },
    // 双击编辑供应商信息
    nodeDblclicked (sourceId, callback) {
      this.modifyNodeDialog = true;
      this.modifyNodeOption = {
        sourceId: sourceId,
        callback: callback
      }
    },
    modifyNode () {
      this.chainNodeDatas.nodeList[this.modifyNodeOption.sourceId].title = this.chainNodeDatas.nodeList[this.modifyNodeOption.sourceId].title + "a";
      this.modifyNodeOption.callback(this.modifyNodeOption.sourceId, this.chainNodeDatas.nodeList[this.modifyNodeOption.sourceId]);
      this.modifyNodeDialog = false;
    },
    copyNode (node) {
      this.node = node
      this.showCopyDialog = true;
    },
    async doCopyNode () {
      this.$refs.copy.validate(async (valid) => {
        if (valid) {
          this.showCopyDialog = false;
          this.copySupplierDialog = true
        }
      })

    },
    posChanged (id, left, top) {
    },
    nodeDatas (chainNodeList, edgeList) {
    }
  }
}
</script>
<style lang="scss" scoped >
* {
  font-size: 12px;
}

.flex-ver {
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: center;
}

.flex-hor {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
}

.full-width {
  width: 100%;
}

.full-height {
  height: 100%;
}
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  overflow: hidden;
}
.hidden {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.tier-chart-divider {
  height: 1px;
  margin: 0;
  padding: 0;
  display: block;
  border: 0;
  width: 100%;
  background-color: gray;
  margin-bottom: 10px;
}
.tier-chart-divider__content {
  position: relative;
  top: -10px;
  left: 50%;
  background: #fff;
  padding: 0 10px;
  transform: translate3d(-50%, 0, 0);
}
.sys-label {
  height: 27px;
  background-color: #5c6371;
  color: #fff;
  padding: 5px;
  border-radius: 4px;
  margin-right: 5px;
}
.tier-level {
  height: 27px;
  background-color: #0075d8;
  color: #fff;
  padding: 3px 5px;
  border-radius: 4px;
}
.tier-level span {
  font-size: 16px;
}
.title {
  font-weight: bold;
}
</style>
