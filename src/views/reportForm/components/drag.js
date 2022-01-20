
const icon = require("@/assets/images/zoom.png")

export default {
  /**
   * 拖拽
   * v-drag="true"
   *  @param true 开启缩放
  */
  drag: {
    bind(el, binding, vnode) {
      // 自定义属性，判断是否可拖拽
      if (!binding.value) return
      const dialogHeaderEl = el.querySelector('.el-dialog__header') //.drag-dialog-box
      const dragDom = el.querySelector('.el-dialog')
      dialogHeaderEl.style.cssText += ';cursor:move;'
      dragDom.style.cssText += ';top:70px;'

      // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
      const sty = (function () {
        if (document.body.currentStyle) {
          // 在ie下兼容写法
          return (dom, attr) => dom.currentStyle[attr]
        } else {
          return (dom, attr) => getComputedStyle(dom, false)[attr]
        }
      })()

      dialogHeaderEl.onmousedown = (e) => {
        // 鼠标按下，计算当前元素距离可视区的距离
        const disX = e.clientX - dialogHeaderEl.offsetLeft
        const disY = e.clientY - dialogHeaderEl.offsetTop

        const screenWidth = document.body.clientWidth // body当前宽度
        const screenHeight = document.documentElement.clientHeight // 可见区域高度(应为body高度，可某些环境下无法获取)

        const dragDomWidth = dragDom.offsetWidth // 对话框宽度
        const dragDomheight = dragDom.offsetHeight // 对话框高度

        const minDragDomLeft = dragDom.offsetLeft
        const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth

        const minDragDomTop = dragDom.offsetTop
        const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomheight

        // 获取到的值带px 正则匹配替换
        let styL = sty(dragDom, 'left')
        // 为兼容ie
        if (styL === 'auto') styL = '0px'
        let styT = sty(dragDom, 'top')

        // console.log(styL)
        // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
        if (styL.includes('%')) {
          styL = +document.body.clientWidth * (+styL.replace(/%/g, '') / 100)
          styT = +document.body.clientHeight * (+styT.replace(/%/g, '') / 100)
        } else {
          styL = +styL.replace(/px/g, '')
          styT = +styT.replace(/px/g, '')
        }

        document.onmousemove = function (e) {
          console.log(e)

          // 通过事件委托，计算移动的距离
          let left = e.clientX - disX
          let top = e.clientY - disY
          // 边界处理
          if (-left > minDragDomLeft) {
            left = -minDragDomLeft
          } else if (left > maxDragDomLeft) {
            left = maxDragDomLeft
          }

          if (-top > minDragDomTop) {
            top = -minDragDomTop
          } else if (top > maxDragDomTop) {
            top = maxDragDomTop
          }

          // 移动当前元素
          dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`

          // emit onDrag event
          vnode.child.$emit('dragDialog')
        }

        document.onmouseup = function () {
          document.onmousemove = null
          document.onmouseup = null
        }
        return false
      }
    }
  },
  /**
   * 缩放
   * v-zoom="{value:true,maxW:1000,minW:500,maxH:600,minH:200}"
   *  @param value 开启缩放
  */
  zoom: {   //缩放： v-zoom="{value:true,}"
    bind(el, binding) {
      const bindVal = binding.value
      if (!bindVal.value) return
      const dragDom = el.querySelector('.el-dialog')
      let div = document.createElement("div")
      div.id = "zoom-btn"
      div.style = `
        position: absolute;
        right: 0;
        bottom: 0;
        cursor: se-resize;
        width: 20px;
        height: 20px;
        background-image: url(${icon});
        background-size: cover;
      `
      dragDom.appendChild(div)
      // console.log(dragDom.childNodes[1].appendChild(div));
      let zoomBtn = el.querySelector('#zoom-btn')
      if(!zoomBtn){
        zoomBtn = div
      }
      const maxW = bindVal.maxW || 1000
      const minW = bindVal.minW || 400
      const maxH = bindVal.maxH || 600
      const minH = bindVal.minH || 100
      zoomBtn.addEventListener('mousedown', (e) => {
        window.isPoint = true
        const startX = e.clientX - dragDom.offsetWidth
        const startY = e.clientY - dragDom.offsetHeight
        document.addEventListener('mousemove', (e) => {
          if (window.isPoint) {
            let width = e.clientX - startX
            let height = e.clientY - startY
            if (width >= maxW) {
              width = maxW
            }
            if (width <= minW) {
              width = minW
            }
            if (height >= maxH) {
              height = maxH
            }
            if (height <= minH) {
              height = minH
            }
            dragDom.style.width = width + 'px'
            dragDom.style.height = height + 'px'
          }
        })
        document.addEventListener('mouseup', () => {
          if (window.isPoint) {
            window.isPoint = false
          }
          document.onmousemove = null
          document.onmouseup = null
        })
      })
    }
  }
}
