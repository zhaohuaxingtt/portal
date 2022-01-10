export default {
  drag: {
    bind(el, binding, vnode, oldVnode) {
      // 自定义属性，判断是否可拖拽
      if (!binding.value) return
      const dialogHeaderEl = el.querySelector('.el-dialog__header') //.drag-dialog-box
      const dragDom = el.querySelector('.el-dialog')
      dialogHeaderEl.style.cssText += ';cursor:move;'
      dragDom.style.cssText += ';top:150px;'

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

        document.onmouseup = function (e) {
          document.onmousemove = null
          document.onmouseup = null
        }
        return false
      }
    }
  },
  zoom: {
    bind(el, binding, vnode, oldVnode) {
      // 自定义属性，判断是否可拉伸

      const bindVal = binding.value
      console.log(bindVal, 'binding')

      if (!bindVal.value) return
      const dragDom = el.querySelector('.el-dialog')
      // console.log(dragDom,"拖拽属性")
      let dragMouse
      // 在弹出框的右下角添加可拉伸标志 class='mouse'
      for (let i = 0; i < dragDom.childNodes[2].childNodes.length; i++) {
        if (dragDom.childNodes[2].childNodes[i].className === 'mouse') {
          dragMouse = dragDom.childNodes[2].childNodes[i]
        }
      }

      // 鼠标拖拽
      dragMouse.onmousedown = (e) => {
        // content区域
      console.log(dragDom.offsetWidth)

        // const content = dragDom.parentNode.parentNode.parentNode.parentNode.parentNode
        const content = dragDom
        console.log(content, 'llllllllllllllllllllllllllllllll')
        const disX = e.clientX - dragDom.offsetWidth
        const disY = e.clientY - dragDom.offsetHeight
        console.log(e, disX, disY, '0000')

        document.onmousemove = function (e) {
          e.preventDefault() // 移动时禁用默认事件
          // 通过事件委托，计算移动的距离

          let width = e.clientX - disX
          let height = e.clientY - disY
          console.log(
            e.clientX,
            e.clientY,
            content.offsetWidth,
            content.offsetHeight,
            width,
            height,
            'sssss'
          )

          // 距离底部20px停止拖动
        //   if (e.clientY > content.offsetHeight - 20) {
        //     console.log('不能再拖了')
        //     return
        //   } else {
            if (bindVal.ratio) {
              // 设置比例 宽高等比缩放

              if (
                width < content.offsetWidth &&
                height < content.offsetHeight
              ) {
                if (
                  !!bindVal.minw &&
                  bindVal.minw < width &&
                  !!bindVal.maxw &&
                  width < bindVal.maxw
                ) {
                  dragDom.style.width = `${width}px`
                  dragDom.style.height = `${width * bindVal.ratio}px`
                  vnode.child.$emit('dragDialogHeight', width * bindVal.ratio)
                }
                dragDom.style.height = `${width*0.6}px`
                dragDom.style.height = `${height}px`
              }
            } else {
              // 不设置比例 宽高随意拖动
              if (
                width > content.offsetWidth &&
                height < content.offsetHeight
              ) {
                if (
                  !!bindVal.minh &&
                  bindVal.minh < height &&
                  !!bindVal.maxh &&
                  height < bindVal.maxh
                ) {
                  dragDom.style.height = `${height}px`
                }
              } else if (
                width < content.offsetWidth &&
                height > content.offsetHeight
              ) {
                if (
                  !!bindVal.minw &&
                  bindVal.minw < width &&
                  !!bindVal.maxw &&
                  width < bindVal.maxw
                ) {
                  dragDom.style.width = `${width}px`
                }
              } else if (
                width < content.offsetWidth &&
                height < content.offsetHeight
              ) {
                if (
                  !!bindVal.minh &&
                  bindVal.minh < height &&
                  !!bindVal.maxh &&
                  height < bindVal.maxh
                ) {
                  dragDom.style.height = `${height}px`
                }
                if (
                  !!bindVal.minw &&
                  bindVal.minw < width &&
                  !!bindVal.maxw &&
                  width < bindVal.maxw
                ) {
                  dragDom.style.width = `${width}px`
                }
                dragDom.style.height = `${width*0.6}px`
                dragDom.style.height = `${height}px`
              }
            // }
          }
        }
        document.onmouseup = function (e) {
          document.onmousemove = null
          document.onmouseup = null
        }
        return false
      }
    }
  }
}
