import { _ } from 'core-js'

export default {
  computed: {
    virtualTableData() {
      const { start, end } = this.virtualListConfig
      return this.realTableData.slice(start, end)
    },
    totalCount() {
      return this.realTableData.length
    }
  },
  data() {
    return {
      virtualListConfig: {
        pageSize: 20,
        start: 0,
        end: 0
      },
      virtualPosMap: {}
    }
  },
  mounted() {
    if (this.virtualList) {
      this.$nextTick(() => {
        this.appendVirtualBar()
        this.listenerScroll() // 监听滚动条
      })
      this.initVirtualList()
    }
  },
  methods: {
    // 初始化虚拟列表
    initVirtualList() {
      this.virtualListConfig.start = 0
      this.virtualListConfig.end = 20
      this.$nextTick(() => {
        this.setVirtualPosMap()
      })
    },
    appendVirtualBar() {
      let i = document.createElement('i')
      i.id = 'vheight'
      i.style.width = '0'
      i.style.float = 'right'
      document
        .querySelector('.i-table-custom .el-table__body-wrapper')
        .append(i)
      document.querySelector('.i-table-custom .el-table__body').style.float =
        'left'
    },
    setVirtualPosMap() {
      for (let i = 0; i < this.virtualTableData.length; i++) {
        const dataItem = this.virtualTableData[i]
        const { uniqueId } = dataItem
        if (!Object.hasOwnProperty.call(this.virtualPosMap, uniqueId)) {
          const rowClass = `row-${uniqueId}`
          const element = document.querySelector(
            `.i-table-custom .el-table__body .el-table__row.${rowClass}`
          )
          if (element) {
            this.virtualPosMap[uniqueId] = element.clientHeight
          }
        }
      }

      // 总的高度
      let vHeight = 0
      Object.keys(this.virtualPosMap).forEach((key) => {
        vHeight += this.virtualPosMap[key]
      })
      const bar = document.getElementById('vheight')
      if (bar) {
        bar.style.height = vHeight + 'px'
      }

      // 设置顶部距离
      const tableBody = document.querySelector(
        `.i-table-custom .el-table__body`
      )
      if (tableBody) {
        let translateY = 0
        if (this.virtualTableData && this.virtualTableData.length) {
          for (let i = 0; i < this.totalCount; i++) {
            const item = this.realTableData[i]
            if (item.uniqueId === this.virtualTableData[0].uniqueId) {
              break
            }
            translateY += this.virtualPosMap[item.uniqueId]
          }
        }
        tableBody.style.transform = `translateY(${translateY}px)`
      }
    },
    listenerScroll() {
      const scrollElement = document.querySelector(
        '.i-table-custom .el-table__body-wrapper'
      )
      if (scrollElement) {
        scrollElement.addEventListener('scroll', this.getVirtualTableData)
      }
    },
    getVirtualTableData: function () {
      const scrollElement = document.querySelector(
        '.i-table-custom .el-table__body-wrapper'
      )
      const { scrollTop } = scrollElement
      let upHideHeight = 0
      for (let i = 0; i < this.totalCount; i++) {
        const item = this.realTableData[i]
        if (this.virtualPosMap[item.uniqueId]) {
          upHideHeight += this.virtualPosMap[item.uniqueId]
        }
        if (upHideHeight >= scrollTop - 10 || scrollTop <= upHideHeight + 10) {
          this.virtualListConfig.start = i
          this.virtualListConfig.end = i + 20
          this.$nextTick(() => {
            this.setVirtualPosMap()
          })
          break
        }
      }
    }
  },
  destroyed() {
    document
      .querySelector('.i-table-custom .el-table__body-wrapper')
      .removeEventListener('scroll', this.getVirtualTableData)
  }
}
