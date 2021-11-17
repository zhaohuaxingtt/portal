export default {
  data() {
    return {
      virtualListData: {
        page: 1,
        pageSize: 20,
        total: 0,
        pages: 1
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
    },
    listenerScroll() {
      const scrollElement = document.querySelector(
        '.i-table-custom .el-table__body-wrapper'
      )
      if (scrollElement) {
        scrollElement.addEventListener('scroll', () => {
          const { scrollHeight, scrollTop, clientHeight } = scrollElement
          if (scrollHeight - scrollTop - clientHeight < 10) {
            this.getNextData()
          }
        })
      }
    },
    getNextData: _.debounce(function () {
      console.log('触发到底了')
      if (this.virtualListData.page < this.virtualListData.pages) {
        this.virtualListData.page++
        this.$nextTick(() => this.setVirtualPosMap())
      }
    }, 1000)
  }
}
