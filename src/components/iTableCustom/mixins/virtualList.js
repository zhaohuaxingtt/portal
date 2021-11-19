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
        if (Object.hasOwnProperty.call(this.virtualPosMap, uniqueId)) {
          const rowClass = `row-${uniqueId}`
          const element = document.querySelector(
            `.i-table-custom .el-table__body .el-table__row.${rowClass}`
          )
          this.virtualPosMap[uniqueId] = element.clientHeight
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

      // 表格内容主体
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
        scrollElement.addEventListener('scroll', this.getVirtualDataPage)
      }
    },
    getVirtualDataPage() {
      console.log('getVirtualDataPage', 'getVirtualDataPage')
      const scrollElement = document.querySelector(
        '.i-table-custom .el-table__body-wrapper'
      )
      const { scrollTop } = scrollElement
      if (this.virtualData && this.virtualData.length) {
        let upHideHeight = 0 // 未显示列表上半部分高度
        for (let i = 0; i < this.realTableData; i++) {
          const item = this.realTableData[i]
          upHideHeight += this.virtualPosMap[item.uniqueId]
          const page = Math.ceil(i / this.virtualListData.pageSize)
          console.log('page', page)
          if (
            scrollTop !== upHideHeight &&
            page !== this.virtualListData.page
          ) {
            this.virtualListData.page = page
            this.setVirtualPosMap()
            break
          }
          /* if (scrollTop > upHideHeight - 10 && scrollTop < upHideHeight + 10) {
            break
          } */
        }
      }
    }
  },
  destroyed() {
    document
      .querySelector('.i-table-custom .el-table__body-wrapper')
      .removeEventListener('scroll', this.getVirtualDataPage)
  }
}
