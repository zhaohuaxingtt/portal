<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-10-06 11:13:02
 * @LastEditors: Please set LastEditors
 * @Descripttion: your project
-->
<template>
  <div
    v-cloak
    class="full-width flex-ver full-height"
    v-loading="onDataLoading"
  >
    <div
      class="full-width flex-hor"
      style="height: 40px; overflow: hidden; padding: 0"
      v-show="
        (toolbar && toolbar.length > 0) ||
        $scopedSlots.toolbar ||
        $slots.toolbar
      "
    >
      <template v-if="toolbar.indexOf('zoom') >= 0">
        <div
          :class="['node-button', zoomInClass]"
          @click="zoomIn"
          title="放大"
        ></div>
        <div style="width: 40px; text-align: center">
          {{ parseInt(zoom * 100) }}%
        </div>
        <div
          :class="['node-button', zoomOutClass]"
          @click="zoomOut"
          title="缩小"
        ></div>
      </template>
      <div style="flex: 1">
        <slot name="toolbar" :initWidth="initWidth"></slot>
      </div>
      <!-- 工具栏插槽 -->
      <iButton @click="isDilog = true">{{
        language('NTIERZHUCEYAOQING', 'N-Tier注册邀请')
      }}</iButton>
      <div
        v-if="toolbar.indexOf('reassign-lvl') >= 0"
        :class="['node-button', optimizeLevelClass]"
        @click="optimizeLevel"
        title="重置层级"
      ></div>
      <div
        v-if="toolbar.indexOf('save') >= 0"
        :class="['node-button', emitDataClass]"
        @click="emitDatas"
        title="提交数据"
      ></div>
      <iButton v-if="toolbar.indexOf('opt-node') >= 0" @click="optimizeNodes">{{
        language('CHONGZHICENGJI', '重置层级')
      }}</iButton>
      <iButton v-if="toolbar.indexOf('copy') >= 0" @click="copyNode">{{
        language('FUZHIGONGYINGLIANLU', '复制供应链路')
      }}</iButton>
    </div>
    <div
      style="flex: 1; height: 0; overflow: auto; width: 100%"
      ref="nodeChainArea"
    >
      <div
        id="canvas"
        :style="{ height: compTop + 'px', width: compLeft + 'px' }"
        @click.prevent.stop="isSelected = ''"
      >
        <template v-for="node in chainNodeList">
          <div
            :key="node.id"
            :class="{
              'node-css': node.supplierId != supplierId,
              'highlight-node-css': node.supplierId == supplierId,
              'is-selected': isSelected == node.id
            }"
            :id="node.id"
            v-if="!node.hidden"
            :style="{
              top: node.top + 'px',
              left: node.left + 'px',
              width: nodeWidth + 'px',
              height: nodeHeight + 'px'
            }"
            @click.prevent.stop="handleSelectedChange(node)"
          >
            <div
              class="full-width full-height flex-ver"
              style="align-items: flex-start; justify-content: flex-start"
            >
              <div
                class="full-width flex-hor"
                style="
                  height: 40px;
                  align-items: center;
                  justify-content: flex-end;
                "
              >
                <slot name="head" :node="node"></slot>
                <!-- 节点抬头插槽 -->
                <template v-if="node.chainLevel > 1">
                  <div
                    :class="['node-button', removeNodeClass, 'show-mini']"
                    @click="removeNode(node)"
                  ></div>
                </template>
                <template v-if="node.chainLevel > -1">
                  <div
                    :class="['node-button', addChildNodeClass, 'show-mini']"
                    @click="addChildNode(node)"
                  ></div>
                </template>
              </div>
              <slot :node="node"></slot>
              <!-- 节点内容插槽 -->
              <div
                v-if="showExpand(node)"
                :class="[
                  'expand-node',
                  nodeExpanded(node) ? expandClass : reduceClass
                ]"
                @click.prevent.stop="expandClicked(node)"
              ></div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <iDialog
      @close="closeDiolog()"
      :title="language('NTIERZHUCEYAOQING', 'N-Tier注册邀请')"
      :visible.sync="isDilog"
      v-if="isDilog"
      width="80%"
    >
      <iFormGroup
        row="3"
        :rules="baseRules"
        :model="formModel"
        ref="formModelRules"
      >
        <iFormItem prop="supplierName">
          <iLabel
            :label="language('GONGYINGSHANGZHONGWENMING', '供应商中文名')"
            required
            slot="label"
          ></iLabel>
          <iInput
            :placeholder="language('请选择')"
            v-model="formModel.supplierName"
          >
          </iInput>
        </iFormItem>
        <iFormItem prop="contactName">
          <iLabel
            :label="language('LIANXIRENXINGMING', '联系人姓名')"
            required
            slot="label"
          ></iLabel>
          <iInput
            :placeholder="language('请选择')"
            v-model="formModel.contactName"
          >
          </iInput>
        </iFormItem>
        <iFormItem prop="contactEmail">
          <iLabel
            :label="language('contactEmail', '联系人邮箱')"
            required
            slot="label"
          ></iLabel>
          <iInput
            :placeholder="language('请选择')"
            v-model="formModel.contactEmail"
          >
          </iInput>
        </iFormItem>
      </iFormGroup>
      <div class="btnStyle">
        <iButton @click="isDilog = false">{{
          language('QUXIAO', '取消')
        }}</iButton>
        <iButton @click="handleSbumit">{{
          language('QUEREN', '确认')
        }}</iButton>
      </div>
    </iDialog>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { baseRules } from './data.js'
import {
  icon,
  iButton,
  iCard,
  iSelect,
  iSearch,
  iInput,
  iDialog,
  iFormItem,
  iMessage,
  iFormGroup,
  iLabel
} from 'rise'
import { invitation } from '@/api/supplierManagement/supplyMaintain/index.js'
export default {
  components: {
    icon,
    iButton,
    iCard,
    iSelect,
    iSearch,
    iInput,
    iDialog,
    iFormItem,
    iFormGroup,
    iLabel
  },
  props: {
    nodeDatas: {
      type: Object,
      requried: true,
      default: function () {
        return { nodeList: {}, edges: [] }
      }
    },
    flowDirection: {
      type: String,
      default: 'straight'
    },
    addDuplOffsetDirection: {
      type: String,
      default: 'HOR'
    },
    enableDeleteStartLevel: {
      type: Boolean,
      default: false
    },
    nodeWidth: {
      type: Number,
      default: 300
    },
    nodeHeight: {
      type: Number,
      default: 250
    },
    enableLevelChange: {
      type: Boolean,
      default: true
    },
    enableDeleteConnection: {
      type: Boolean,
      default: true
    },
    lvlTag: {
      type: String,
      default: 'level'
    },
    lvlStart: {
      type: Number,
      default: 0
    },
    visoConfig: {
      type: Object,
      default: function () {
        return {}
      }
    },
    toolbar: {
      type: Array,
      default: function () {
        return ['zoom', 'opt-node', 'copy']
      }
    },
    initZoom: {
      type: Number,
      default: 1
    },
    zoomInClass: {
      type: String,
      default: 'vue-icon-plus'
    },
    zoomOutClass: {
      type: String,
      default: 'vue-icon-minus'
    },
    removeNodeClass: {
      type: String,
      default: 'vue-icon-minus'
    },
    addChildNodeClass: {
      type: String,
      default: 'vue-icon-plus'
    },
    optimizeLevelClass: {
      type: String,
      default: 'vue-icon-sort'
    },
    optimizeNodesClass: {
      type: String,
      default: 'vue-icon-th-list'
    },
    emitDataClass: {
      type: String,
      default: 'vue-icon-upload2'
    },
    copyNodeClass: {
      type: String,
      default: 'vue-icon-copy'
    },
    expandClass: {
      type: String,
      default: 'vue-icon-d-arrow-left'
    },
    reduceClass: {
      type: String,
      default: 'vue-icon-d-arrow-right'
    },
    removeNodeExpress: {
      type: String,
      default: 'true'
    },
    addChildNodeExpress: {
      type: String,
      default: 'true'
    },
    disableDragConnectLvls: {
      type: Array,
      default: function () {
        return [0, 1]
      }
    },
    supplierId: {
      type: String,
      default: ''
    }
  },
  data: function () {
    return {
      formModel: {
        supplierName: '',
        contactName: '',
        contactEmail: ''
      },
      baseRules: baseRules,
      isDilog: false,
      onDataLoading: false,
      initWidth: 0,
      initHeight: 0,
      zoom: 1,
      chainNodeList: {},
      edgeList: [],
      maxLeft: 0,
      maxTop: 0,
      screenWidth: 0,
      screenHeight: 0,
      nextElOffset: 50,
      triggerScrollSpace: 250,
      isSelected: null,
      node: {},
      parentNodes: [],
      defaultVisoConfig: {
        baseStyle: {
          endpoint: [
            'Dot',
            {
              radius: 8,
              fill: 'transparent'
            }
          ], // 端点的形状
          connectorStyle: {
            strokeWidth: 2,
            stroke: '#717271',
            joinstyle: 'round',
            outlineStroke: 'white',
            outlineWidth: 2
          }, // 连接线的颜色，大小样式
          connectorHoverStyle: {
            strokeWidth: 5,
            stroke: '#717271',
            outlineWidth: 7,
            outlineStroke: 'white'
          },
          paintStyle: {
            stroke: '#7AB02C',
            fill: 'transparent',
            radius: 7,
            strokeWidth: 1
          },
          hoverPaintStyle: { stroke: 'blue' },
          isSource: true, // 是否可以拖动（作为连线起点）
          connector: [
            'Flowchart',
            { stub: [0, 0], gap: 6, cornerRadius: 5, alwaysRespectStubs: true }
          ], // 连接线的样式种类有[Bezier],[Flowchart],[StateMachine ],[Straight ]
          isTarget: true, // 是否可以放置（连线终点）
          maxConnections: -1, // 设置连接点最多可以连接几条线
          connectorOverlays: [['Label', {}]]
        },
        baseArchors: ['RightMiddle', 'LeftMiddle']
      }
    }
  },
  methods: {
    handleScroll(id) {
      var div = this.$refs.nodeChainArea
      for (const key in this.chainNodeList) {
        if (this.chainNodeList[key].id === id) {
          div.scrollTop = this.chainNodeList[key].top
          div.scrollLeft = this.chainNodeList[key].left
        }
      }
    },
    expainExpress(str, node) {
      return eval(str)
    },
    handleSelectedChange(node) {
      this.isSelected = node.id
      this.node = node
    },
    initNodeChains: function () {
      var self = this

      //jsPlumb 初始化
      jsPlumb.reset()

      self.$nextTick(function () {
        jsPlumb.ready(self.mainInit)
      })
    },
    mainInit: function () {
      var self = this
      //jsPlumb 初始化  bind设定
      self.jsPlumbBindSet()

      //根据node 的json 数据画出流程图
      self.drawPoint(self.chainNodeList)
      self.drawConnect(self.edgeList)
      self.onDataLoading = false
    },

    messageConfirm: function (option, successFun, errorFun) {
      option = _.cloneDeep(Object.assign({ type: 'warning' }, option))
      successFun = successFun || function () {}
      errorFun = errorFun || function () {}
      Vue.confirm(option)
        .then(successFun)
        .catch(function (action) {
          if (typeof action == 'object') {
            throw action
          } else {
            errorFun(action)
          }
        })
    },
    handleSbumit() {
      this.$refs.formModelRules.validate((valid) => {
        if (valid) {
          // if (
          //   this.formModel.supplierName == '' ||
          //   this.formModel.contactName == '' ||
          //   this.formModel.contactEmail == ''
          // ) {
          //   iMessage.warn(this.language('QINGSHURUBITIANXIANG', '请输入必填项'))
          //   return false
          // }
          invitation(this.formModel).then((res) => {
            if (res && res.code == 200) {
              iMessage.success(res.desZh)
              this.isDilog = false
            } else iMessage.error(res.desZh)
          })
        } else {
          return false
        }
      })
    },
    closeDiolog() {
      this.isDilog = false
      this.formModel = {}
    },
    fintRootId: function (nodeId) {
      var self = this
      var currentEdge = self.edgeList.filter(function (edge) {
        return edge.source == nodeId
      })
      if (currentEdge.length == 0) {
        return nodeId
      } else {
        return self.fintRootId(currentEdge[0].target)
      }
    },

    // 根据json画出每个节点的端点
    jsPlumbBindSet: function () {
      var self = this

      jsPlumb.setContainer('canvas')

      //绑定 “连接node前” 事件, 避免连线源锚点和目标锚点在同一节点
      jsPlumb.bind('beforeDrop', function (conn) {
        if (conn.sourceId === conn.targetId) {
          return false
        } else {
          if (
            self.fintRootId(conn.targetId) !=
            self.fintRootId(conn.connection.suspendedElementId)
          ) {
            // 
            // jsPlumb.deleteConnection(conn);
            // var edgeList = [];
            // edgeList[0] = {
            //   "source": fromId,
            //   "target": oldToId
            // };
            // self.drawConnect(edgeList);
            return false
          } else {
            return true
          }
        }
      })

      //绑定 “连接node变化” 事件，修改前后node id
      jsPlumb.bind('connectionMoved', function (p) {
        var fromId = p.newSourceId
        var newToId = p.newTargetId
        var oldToId = p.originalTargetId
        if (newToId == oldToId) {
          return
        }

        self.deleteRelFromParent(fromId, oldToId)
        self.addToNewParent(fromId, newToId, true)
        self.$emit('rel-changed', fromId, newToId, oldToId)
      })

      // 绑定 双击连接线删除 事件
      if (self.enableDeleteConnection) {
        jsPlumb.bind('dblclick', function (conn, originalEvent) {
          self.messageConfirm(
            { message: '是否确认删除此连接' },
            function (action) {
              //DAG图形数据中连线删除
              jsPlumb.deleteConnection(conn)
              self.deleteRelFromParent(conn.sourceId, conn.targetId)
              self.$emit('rel-deleted', conn.sourceId, conn.targetId)
            }
          )
        })
      }

      // 绑定 当连线从一个终端点断开时的事件
      jsPlumb.bind('connectionDetached', function (info, originalEvent) {})

      // 绑定 当连线从一个终端点断开时的事件
      jsPlumb.bind('connectionDragStop', function (info, originalEvent) {
        if (!info.connector) {
          var edgeList = []
          edgeList[0] = {
            source: info.sourceId,
            target: info.targetId
          }
          self.drawConnect(edgeList)
        }
      })

      //绑定 连接node 事件
      jsPlumb.bind('connection', function (p) {
        var exists = self.edgeList.filter(function (conn) {
          return conn.source == p.sourceId && conn.target == p.targetId
        })
        if (exists.length > 0) {
          return
        }
        if (self.fintRootId(newToId) != self.fintRootId(oldToId)) {
          return
        }
        self.addToNewParent(p.sourceId, p.targetId)
        self.$emit('rel-added', sourceId, targetId)
      })

      //禁止某层级连接被更改
      if (
        self.disableDragConnectLvls &&
        self.disableDragConnectLvls.length > 0
      ) {
        jsPlumb.bind('beforeStartDetach', function (p) {
          if (
            self.disableDragConnectLvls.indexOf(
              self.chainNodeList[p.connection.targetId].level
            ) >= 0
          ) {
            return false
          }
          return true
        })
      }
    },

    addToNewParent: function (sourceId, targetId, isChange) {
      var self = this
      self.edgeList.push({
        source: sourceId,
        target: targetId
      })

      if (self.enableLevelChange) {
        if (
          self.chainNodeList[targetId][self.lvlTag] + 1 ==
          self.chainNodeList[sourceId][self.lvlTag]
        ) {
          return
        }
        //层级变更
        self.chainNodeList[sourceId][self.lvlTag] =
          self.chainNodeList[targetId][self.lvlTag] + 1
        self.fireLevelChange(
          sourceId,
          self.chainNodeList[sourceId][self.lvlTag],
          true
        )
        self.$emit(
          'level-changed',
          sourceId,
          self.chainNodeList[sourceId][self.lvlTag]
        )
      }
    },

    deleteRelFromParent: function (sourceId, oldTargetId) {
      var self = this
      var delIndex
      self.edgeList.forEach(function (nodeConn, index) {
        if (nodeConn.source == sourceId && nodeConn.target == oldTargetId) {
          delIndex = index
          return false
        }
      })
      self.edgeList.splice(delIndex, 1)
    },

    fireLevelChange: function (sourceId, level, needDispatch) {
      var self = this
      var iterators = self.edgeList.filter(function (nodeConn) {
        return nodeConn.target == sourceId
      })
      if (iterators.length > 0) {
        for (var i = 0; i < iterators.length; i++) {
          self.chainNodeList[iterators[i].source][self.lvlTag] = level + 1
          self.fireLevelChange(
            iterators[i].source,
            self.chainNodeList[iterators[i].source][self.lvlTag],
            needDispatch
          )
          if (needDispatch)
            self.$emit(
              'level-changed',
              iterators[i].source,
              self.chainNodeList[iterators[i].source][self.lvlTag]
            )
        }
      }
    },

    // 根据json画出每个节点的端点
    drawPoint: function (nodeList) {
      var self = this
      for (var nodeId in nodeList) {
        if (!nodeList[nodeId].hidden)
          self.initSetNode(nodeList[nodeId].type, nodeId)
      }
    },

    // 根据json画出连线
    drawConnect: function (edgeList) {
      var self = this
      edgeList.forEach(function (edge) {
        if (!self.chainNodeList[edge.source].hidden)
          self.connectEndpointOfAnnounce(edge)
      })
    },

    connectEndpointOfAnnounce: function (edge) {
      if (edge.source) {
        this.connectEndpoint(edge.source + '-out', edge.target + '-in')
      }
    },

    connectEndpoint: function (from, to) {
      jsPlumb.connect({ uuids: [from, to] })
    },

    // 初始化节点设置
    initSetNode: function (template, id) {
      this.addDraggable(id)
      this.setMaxSize(id)

      if (template === 'tpl-center') {
        this.setEnterPoint(id)
        this.setExitPoint(id)
      } else if (template === 'tpl-begin') {
        this.setEnterPoint(id)
      } else if (template === 'tpl-end') {
        this.setExitPoint(id)
      }
    },

    setMaxSize: function (id) {
      if (this.chainNodeList[id].left > this.maxLeft) {
        this.maxLeft = this.chainNodeList[id].left
      }
      if (this.chainNodeList[id].top > this.maxTop) {
        this.maxTop = this.chainNodeList[id].top
      }
    },

    // 设置入口点
    setEnterPoint: function (id) {
      var config = this.getBaseNodeConfig()

      if (this.flowDirection == 'straight') {
        config.isTarget = false
      }

      if (this.flowDirection == 'reverse') {
        config.isSource = false
      }

      jsPlumb.addEndpoint(
        id,
        {
          anchors: 'Right',
          uuid: id + '-in'
        },
        config
      )
    },

    // 设置出口点
    setExitPoint: function (id, position) {
      var config = this.getBaseNodeConfig()

      if (this.flowDirection == 'straight') {
        config.isSource = false
      }

      if (this.flowDirection == 'reverse') {
        config.isTarget = false
      }

      jsPlumb.addEndpoint(
        id,
        {
          anchors: position || 'Left',
          uuid: id + '-out'
        },
        config
      )
    },

    // 让元素可拖动
    addDraggable: function (id) {
      var self = this
      jsPlumb.draggable(id, {
        // containment: 'document',
        grid: [10, 10],
        stop: function (ev) {
          if (!ev.drag) {
            return
          }
          var id = ev.el.id
          if (self.chainNodeList[id]) {
            self.chainNodeList[id].left =
              ev.pos[0] || self.chainNodeList[id].left
            self.chainNodeList[id].top = ev.pos[1] || self.chainNodeList[id].top
            self.$emit(
              'pos-changed',
              id,
              self.chainNodeList[id].left,
              self.chainNodeList[id].top
            )
          }
        },
        drag: function (ev) {
          if (
            ev.pos[0] + self.nodeWidth + self.nextElOffset >=
            self.screenWidth
          ) {
            self.screenWidth = self.screenWidth + self.nodeWidth * 2
            self.$nextTick(function () {
              self.triggerScrollX()
            })
          } else {
            if (
              self.initWidth + self.$refs.nodeChainArea.scrollLeft - ev.pos[0] <
              self.triggerScrollSpace
            ) {
              self.triggerScrollX()
            }
            if (ev.pos[0] - self.$refs.nodeChainArea.scrollLeft < 10) {
              self.triggerScrollX(true)
            }
          }
          if (
            ev.pos[1] + self.nodeHeight + self.nextElOffset >=
            self.screenHeight
          ) {
            self.screenHeight = self.screenHeight + self.nodeHeight * 2
            self.$nextTick(function () {
              self.triggerScrollY()
            })
          } else {
            if (
              self.initHeight + self.$refs.nodeChainArea.scrollTop - ev.pos[1] <
              self.triggerScrollSpace
            ) {
              self.triggerScrollY()
            }
            if (ev.pos[1] - self.$refs.nodeChainArea.scrollTop < 10) {
              self.triggerScrollY(true)
            }
          }
        }
      })
    },

    triggerScrollX: function (reverse) {
      if (reverse) {
        this.$refs.nodeChainArea.scrollTo(
          this.$refs.nodeChainArea.scrollLeft - 5,
          this.$refs.nodeChainArea.scrollTop
        )
      } else {
        this.$refs.nodeChainArea.scrollTo(
          this.$refs.nodeChainArea.scrollLeft + 5,
          this.$refs.nodeChainArea.scrollTop
        )
      }
    },

    triggerScrollY: function (reverse) {
      if (reverse) {
        this.$refs.nodeChainArea.scrollTo(
          this.$refs.nodeChainArea.scrollLeft,
          this.$refs.nodeChainArea.scrollTop - 5
        )
      } else {
        this.$refs.nodeChainArea.scrollTo(
          this.$refs.nodeChainArea.scrollLeft,
          this.$refs.nodeChainArea.scrollTop + 5
        )
      }
    },

    // 获取基本配置
    getBaseNodeConfig: function () {
      return Object.assign({}, this.defaultVisoConfig.baseStyle)
    },

    addChildNode: function (node) {
      this.$emit('add-node', node)
    },
    removeNode: function (node) {
      this.$emit('delete-node', node)
    },
    checkPositionDuplicate: function (left, top) {
      var self = this
      var newPosition

      if (self.addDuplOffsetDirection == 'HOR') {
        newPosition = left
      }
      if (self.addDuplOffsetDirection == 'VER') {
        newPosition = top
      }

      for (var nodeData in self.chainNodeList) {
        if (
          self.chainNodeList[nodeData].left == left &&
          self.chainNodeList[nodeData].top == top
        ) {
          if (self.addDuplOffsetDirection == 'HOR') {
            newPosition = newPosition + self.nodeWidth + self.nextElOffset
            newPosition = self.checkPositionDuplicate(newPosition, top)
          }
          if (self.addDuplOffsetDirection == 'VER') {
            newPosition = newPosition + self.nodeHeight + self.nextElOffset
            newPosition = self.checkPositionDuplicate(left, newPosition)
          }
          break
        }
      }
      return newPosition
    },
    copyNode: function () {
      this.$emit('copy-node', this.node)
    },

    //设置缩放比例
    setZoomFun: function (scale) {
      document.getElementById('canvas').style['-webkit-transform'] =
        'scale(' + scale + ')'
      document.getElementById('canvas').style['-moz-transform'] =
        'scale(' + scale + ')'
      document.getElementById('canvas').style['-ms-transform'] =
        'scale(' + scale + ')'
      document.getElementById('canvas').style['-o-transform'] =
        'scale(' + scale + ')'
      document.getElementById('canvas').style['transform'] =
        'scale(' + scale + ')'
      jsPlumb.setZoom(scale)
    },

    zoomIn: function () {
      if (this.zoom < 1 && this.zoom >= 0) {
        this.zoom += 0.1
        if (this.zoom > 1) {
          this.zoom = 1
        }
        this.setZoomFun(this.zoom)
      }
    },

    zoomOut: function () {
      if (this.zoom <= 1 && this.zoom > 0) {
        this.zoom -= 0.1
        if (this.zoom < 0.1) {
          this.zoom = 0.1
        }
        this.setZoomFun(this.zoom)
      }
    },

    initialContainerSize: function () {
      var self = this
      for (var nodeId in self.chainNodeList) {
        self.setMaxSize(nodeId)
      }
      self.initWidth = self.screenWidth = parseInt(
        document.getElementById('canvas').parentNode.getBoundingClientRect()
          .width - 16
      )
      self.initHeight = self.screenHeight = parseInt(
        document.getElementById('canvas').parentNode.getBoundingClientRect()
          .height
      )
    },

    optimizeNodes: function () {
      var self = this
      self.onDataLoading = true
      self.$nextTick(function () {
        var startNodeIds = self.findAllStartNodes()
        self.optimizeChildNodes(
          startNodeIds,
          -self.nodeWidth,
          self.nextElOffset
        )
        self.$nextTick(function () {
          self.initNodeChains()
        })
      })
    },

    findChildIds: function (parentId) {
      var childIds = []
      this.edgeList.forEach(function (edge) {
        if (edge.target == parentId) {
          childIds.push(edge.source)
        }
      })
      return childIds
    },

    optimizeChildNodes: function (parentIds, left, top) {
      var self = this
      var currentTop = top
      var currentLeft = left + self.nextElOffset + self.nodeWidth
      var childIds
      parentIds.forEach(function (parentId, index) {
        currentTop =
          currentTop +
          (self.nextElOffset + self.nodeHeight) * (index > 0 ? 1 : 0)
        self.chainNodeList[parentId].top = currentTop
        self.chainNodeList[parentId].left = currentLeft
        childIds = self.findChildIds(parentId)
        if (childIds.length > 0) {
          currentTop = self.optimizeChildNodes(
            childIds,
            currentLeft,
            currentTop
          )
        }
      })
      return currentTop
    },

    optimizeLevel: function () {
      var self = this
      self.onDataLoading = true
      self.$nextTick(function () {
        var startNodes = self.findAllStartNodes()

        startNodes.forEach(function (node) {
          self.fireLevelChange(node.id, self.lvlStart, false)
          self.onDataLoading = false
        })
      })
    },

    findAllStartNodes: function () {
      var self = this
      var startNodeIds = []
      for (var nodeId in self.chainNodeList) {
        if (self.chainNodeList[nodeId][self.lvlTag] == self.lvlStart) {
          startNodeIds.push(nodeId)
        }
      }
      return startNodeIds
    },

    emitDatas: function () {
      this.$emit('node-data', this.chainNodeList, this.edgeList)
    },

    initialZoom: function () {
      if (this.zoom != this.initZoom) {
        this.zoom = this.initZoom
        this.setZoomFun(this.zoom)
      }
    },

    showExpand: function (node) {
      return this.parentNodes.some(function (parent) {
        return parent.id == node.id && node.chainLevel > -1
      })
    },

    nodeExpanded: function (node) {
      return this.parentNodes.some(function (parent) {
        return parent.id == node.id && parent.expanded
      })
    },

    expandClicked: function (node) {
      var self = this
      self.onDataLoading = true
      self.$nextTick(function () {
        self.parentNodes.forEach(function (parent) {
          if (parent.id == node.id) {
            self.expandAllChilds(parent.id, parent.expanded)

            parent.expanded = !parent.expanded
          }
        })
        self.initNodeChains()
      })
    },

    expandAllChilds: function (parentId, expand) {
      var self = this
      self.edgeList.forEach(function (edge) {
        if (edge.target == parentId) {
          self.chainNodeList[edge.source]['hidden'] = expand
          self.expandAllChilds(edge.source, expand)
        }
      })
    }
  },
  computed: {
    compLeft: function () {
      var left = parseInt(this.maxLeft) + this.nodeWidth + this.nextElOffset * 2
      return left > this.screenWidth ? left : this.screenWidth
    },
    compTop: function () {
      var top = parseInt(this.maxTop) + this.nodeHeight + this.nextElOffset * 2
      return top > this.screenHeight ? top : this.screenHeight
    }
  },
  watch: {
    nodeDatas: {
      handler: function (val) {
        console.log(val, 'val')
        if (JSON.stringify(val) !== '{}') {
          var self = this
          this.onDataLoading = true
          if (val && val.nodeList && val.edges) {
            Object.assign(self.defaultVisoConfig, self.visoConfig)
            self.chainNodeList = _.cloneDeep(val.nodeList)
            self.edgeList = _.cloneDeep(val.edges)

            self.parentNodes = []
            self.edgeList.forEach(function (edge) {
              self.parentNodes.push({
                id: edge.target,
                expanded: true
              })
            })
            self.optimizeNodes()
            self.$nextTick(function () {
              self.initialContainerSize()
              self.initialZoom()
            })
          }
        }
      },
      immediate: true,
      deep: true
    }
  },
  beforeDestory: function () {
    //取消绑定 “连接node前” 事件, 避免连线源锚点和目标锚点在同一节点
    jsPlumb.unbind('beforeDrop')

    //取消绑定 “连接node变化” 事件，修改前后node id
    jsPlumb.unbind('connectionMoved')

    // 取消绑定 双击连接线删除 事件
    jsPlumb.unbind('dblclick')

    // 取消绑定 当连线从一个终端点断开时的事件
    jsPlumb.unbind('connectionDetached')

    // 取消绑定 当连线从一个终端点断开时的事件
    jsPlumb.unbind('connectionDragStop')

    //取消绑定 连接node 事件
    jsPlumb.unbind('connection')
    jsPlumb.reset()
  }
}
</script>
<style lang="scss" scoped>
// @import url(); 引入公共css类
.iconditufangda {
  font-size: 35px;
}
* {
  font-size: 12px;
}

#canvas {
  /* display: inline-block;
  box-sizing: border-box; */
  position: relative;
  margin: 0;
  transform-origin: 0 0;
}

.node-css {
  position: absolute;
  border-radius: 5px;
  background-color: #f8f8fa;
  border: 1px solid #949494;
  padding: 10px;
}

.node-css:hover {
  cursor: move;
  border: 2px solid #1660f1;
  padding: 9px;
}

.node-css.is-selected {
  cursor: pointer;
  border: 2px solid #1660f1;
  padding: 9px;
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
.formbox {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.btnStyle {
  text-align: right;
  padding-bottom: 20px;
}
.box {
  width: 100%;
}
.node-button {
  height: 34px;
  width: 34px;
  border-radius: 25px;
  padding: 0.59rem;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: transparent;
  border: 1px solid #bfcbd9;
  color: #1f2d3d;
  text-align: center;
  outline: 0;
  margin: 0;
  font-size: 12px;
}

.node-button.show-mini {
  height: 24px;
  width: 24px;
  border-radius: 3px;
  padding: 0.2875rem;
}

.node-button:focus,
.node-button:hover {
  color: #409eff;
  border-color: #409eff;
}

.node-button:active {
  color: #1876ff;
  border-color: #1876ff;
  outline: 0;
}

.node-button + .node-button {
  margin-left: 5px;
}
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  overflow: hidden;
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
.duns {
  > span {
    display: inline-block;
    width: 18px;
    height: 1px;
    margin: 0 10px;
    background-color: $color-black;
  }
}
.el-col-5,
.el-col-12 {
  display: flex;
  justify-content: flex-end;
}

.expand-node {
  position: absolute;
  right: 5px;
  bottom: 5px;
  font-size: 14px;
}

.expand-node:hover {
  color: #1876ff;
  cursor: pointer;
}

.highlight-node-css {
  position: absolute;
  border-radius: 5px;
  background-color: #cadaf9;
  border: 1px solid #949494;
  padding: 10px;
}

.highlight-node-css:hover {
  cursor: move;
  border: 2px solid #1660f1;
  padding: 9px;
}

.highlight-node-css.is-selected {
  cursor: pointer;
  border: 2px solid #1660f1;
  padding: 9px;
}
</style>
