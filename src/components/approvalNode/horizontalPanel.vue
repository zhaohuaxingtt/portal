<template>
  <div class="horizontal-panel">
    <horizontal :data="nodeData" />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      class="children-link-line"
    >
      <polyline
        v-for="(item, index) in lines"
        :key="index"
        :points="item.points"
        :stroke-dasharray="item.style === 'solid' ? '0' : '3 2'"
        :style="
          item.style === 'solid'
            ? 'fill: none; stroke: #1660f1; stroke-width: 1'
            : 'fill: none; stroke: #cbcbcb; stroke-width: 1'
        "
      ></polyline>
    </svg>
  </div>
</template>

<script>
import horizontal from './horizontal.vue'
export default {
  name: 'horizontalPanel',
  components: { horizontal },
  props: {
    nodeData: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data() {
    return {
      lines: [] /* 
      nodeData: [
        {
          title: '已提交',
          icon: 'iconshenpiliu-yishenpi',
          approvers: [
            {
              dept: 'dept1',
              name: '超级管理员'
            }
          ]
        },
        {
          title: '待审批',
          icon: 'iconshenpiliu-shenpizhong',
          approvers: [
            {
              dept: 'dept1',
              name: '王亮亮三个字CSP-2',
              status: 'yishenpi'
            }
          ]
        },
        {
          title: '待审批',
          icon: 'iconshenpiliu-daishenpi',
          approvers: [
            {
              dept: 'CSP',
              name: '六琴三个字'
            },
            {
              dept: 'CSP',
              name: '六琴三个字'
            },
            {
              dept: 'CSP',
              name: '六琴三个字'
            }
          ],
          children: [
            [
              {
                title: '已提交',
                icon: 'iconshenpiliu-yishenpi',
                approvers: [
                  {
                    dept: 'dept1',
                    name: '超级管理员'
                  }
                ]
              },
              {
                title: '待审批',
                icon: 'iconshenpiliu-shenpizhong',
                approvers: [
                  {
                    dept: 'dept1',
                    name: '王亮亮三个字CSP-2',
                    status: 'yishenpi'
                  },
                  {
                    dept: 'dept1',
                    name: '王亮亮三个字CSP-2',
                    status: 'yishenpi'
                  },
                  {
                    dept: 'dept1',
                    name: '王亮亮三个字CSP-2',
                    status: 'yishenpi'
                  },
                  {
                    dept: 'dept1',
                    name: '王亮亮三个字CSP-2',
                    status: 'yishenpi'
                  }
                ]
              }
            ],
            [
              {
                title: '已提交',
                icon: 'iconshenpiliu-yishenpi',
                approvers: [
                  {
                    dept: 'dept1',
                    name: '超级管理员'
                  }
                ]
              },
              {
                title: '待审批',
                icon: 'iconshenpiliu-shenpizhong',
                approvers: [
                  {
                    dept: 'dept1',
                    name: '王亮亮三个字CSP-2',
                    status: 'yishenpi'
                  }
                ]
              }
            ]
          ]
        }
      ] */
    }
  },
  watch: {
    nodeData() {
      this.$nextTick(() => {
        this.drawLine()
      })
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.drawLine()
    })
  },
  methods: {
    getLineStyle(status) {
      return ['已提交', '已审批', '审批结束'].includes(status)
        ? 'solid'
        : 'dashed'
    },
    drawLine() {
      const elementIcons = document.querySelectorAll('.node-icon')
      const data = []
      let itemWidth = 0
      const topIndent = 8
      for (let i = 0; i < elementIcons.length; i++) {
        const element = elementIcons[i]
        const dataLevel = element.getAttribute('data-level')
        const dataIndex = element.getAttribute('data-index')
        const dataGroup = element.getAttribute('data-group')
        const dataIsEnd = element.getAttribute('data-end')
        const dataStatus = element.getAttribute('data-status')
        data.push({
          left: element.offsetLeft,
          top: element.offsetTop,
          level: dataLevel,
          index: dataIndex,
          group: dataGroup,
          status: dataStatus,
          isEnd: dataIsEnd === '1'
        })
        itemWidth = element.clientWidth
      }
      const spacingLeft = itemWidth / 2 + 20
      const spacingRight = itemWidth / 2 - 20

      const len = data.length
      const lines = []
      for (let i = 0; i < len; i++) {
        const item = data[i]
        const nextItem = i < len - 1 ? data[i + 1] : null
        if (nextItem) {
          if (!item.group && !item.isEnd) {
            lines.push({
              style: this.getLineStyle(nextItem.status),
              points: `${item.left + spacingLeft},${item.top + topIndent} ${
                nextItem.left + spacingRight
              },${item.top + topIndent}`
            })
          }
        }
        if (item.group) {
          const group = item.group.split('-')
          // const childLevel =  group[group.length - 1]
          const level = group[1]
          const childLevel = (parseInt(level) + 1).toString()
          console.log('childLevel', childLevel)
          const childNodes = data.filter(
            (e) => e.index === '0' && e.level === childLevel
          )
          console.log('childNodesLength', childNodes)
          if (childNodes.length === 2) {
            const groupPositions = []
            // 左 -- 中
            groupPositions.push(
              `${item.left + spacingLeft},${item.top + topIndent}`
            )
            groupPositions.push(
              `${item.left + spacingLeft + 100},${item.top + topIndent}`
            )

            // 中 -- 中上
            groupPositions.push(
              `${item.left + spacingLeft + 100},${item.top + topIndent}`
            )
            groupPositions.push(
              `${item.left + spacingLeft + 100},${
                childNodes[0].top + topIndent
              }`
            )

            // 中上 -- 右上
            groupPositions.push(
              `${item.left + spacingLeft + 100},${
                childNodes[0].top + topIndent
              }`
            )
            groupPositions.push(
              `${childNodes[0].left + spacingLeft - 40},${
                childNodes[0].top + topIndent
              }`
            )

            lines.push({
              style: this.getLineStyle('已提交'),
              points: groupPositions.join(' ')
            })

            const groupPositionDown = []
            // 中 -- 中下
            groupPositionDown.push(
              `${item.left + spacingLeft + 100},${item.top + topIndent}`
            )
            groupPositionDown.push(
              `${item.left + spacingLeft + 100},${
                childNodes[1].top + topIndent
              }`
            )

            // 中下 -- 右下
            groupPositionDown.push(
              `${item.left + spacingLeft + 100},${
                childNodes[1].top + topIndent
              }`
            )
            groupPositionDown.push(
              `${childNodes[1].left + spacingLeft - 40},${
                childNodes[1].top + topIndent
              }`
            )
            lines.push({
              style: this.getLineStyle('已提交'),
              points: groupPositionDown.join(' ')
            })
          }
        }
      }
      this.lines = lines
      console.log('data', data)
      console.log('lines', lines)
    }
  }
}
</script>

<style lang="scss" scoped>
.horizontal-panel {
  position: relative;
  background: #fff;
  .children-link-line {
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
  }
}
</style>
