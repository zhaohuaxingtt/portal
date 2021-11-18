import { _ } from 'core-js'

export default {
  data() {
    return {
      virtualListData: {
        page: 1,
        pageSize: 20,
        total: 0,
        pages: 1,
        start: 0
      },
      virtualPosMap: {}
    }
  },
  mounted() {
    if (this.virtualList) {
      this.$nextTick(() => {
        console.log('virtualData', this.virtualData)
        this.appendVirtualBar()
        this.listenerScroll() // 监听滚动条
      })
      this.initVirtualList()
    }
  },
  methods: {
    // 初始化虚拟列表
    initVirtualList() {
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
      for (let i = 0; i < this.virtualData.length; i++) {
        const dataItem = this.virtualData[i]
        const { uniqueId } = dataItem
        const rowClass = `row-${uniqueId}`
        const element = document.querySelector(
          `.i-table-custom .el-table__body .el-table__row.${rowClass}`
        )
        this.virtualPosMap[uniqueId] = element.clientHeight
      }

      let vHeight = 0
      Object.keys(this.virtualPosMap).forEach((key) => {
        vHeight += this.virtualPosMap[key]
      })
      const bar = document.getElementById('vheight')
      if (bar) {
        bar.style.height = vHeight + 'px'
      }

      const tableBody = document.querySelector(
        `.i-table-custom .el-table__body`
      )
      if (tableBody) {
        let translateY = 0
        if (this.virtualListData.page > 1) {
          for (let i = 0; i < this.virtualListData.page - 1 * 20; i++) {
            const item = this.realTableData[i]
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
        scrollElement.addEventListener('scroll', () => {
          const { scrollHeight, scrollTop, clientHeight } = scrollElement
          // 上拉
          if (scrollHeight - scrollTop - clientHeight < 10) {
            this.getNextData()
          } else {
            this.getVirtualDataPage(scrollElement)
          }
          // 下拉
          if (scrollTop < 10) {
            this.getPrevData()
          }
        })
      }
    },
    getNextData: _.debounce(function () {
      if (this.virtualListData.page < this.virtualListData.pages) {
        this.virtualListData.page++
        this.$nextTick(() => this.setVirtualPosMap())
      }
    }, 200),
    getPrevData: _.debounce(function () {
      if (this.virtualListData.page > 1) {
        this.virtualListData.page--
        this.$nextTick(() => this.setVirtualPosMap())
      }
    }, 200),
    getVirtualDataPage(scrollElement) {
      const { scrollHeight, scrollTop, clientHeight } = scrollElement
      // 计算当前应该正确的page
      if (this.virtualData && this.virtualData.length) {
        let upHeight = 0 // 上部分隐藏的高
        for (let i = 0; i < this.realTableData; i++) {
          const item = this.realTableData[i]
          if (item.uniqueId === this.virtualData.uniqueId) {
            break
          }
          // upHeight += this.virtualPosMap[item.uniqueId]
        }
      }
    }
  }
}
