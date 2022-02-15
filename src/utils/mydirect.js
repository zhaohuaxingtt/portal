/*
 * @Author: yuszhou
 * @Date: 2021-02-19 14:29:09
 * @LastEditTime: 2022-02-10 14:44:34
 * @LastEditors: Please set LastEditors
 * @Description: 自定义指令文件。
 * @FilePath: \front-portal-new\src\utils\mydirect.js
 */

import store from '../store'
import router from '@/router'
import { isNeedJudgePermission } from './index'
import { numberProcessor } from '@/utils'
// 按钮权限
// eslint-disable-next-line no-undef

Vue.directive('permission', {
  bind: function (el, binding, vnode) {
    // 处理可见不可编辑的输入框，select textarea ....
    if (isNeedJudgePermission()) {
      return true
    } else {
      if (binding.modifiers.disabled) {
        vnode.key = Hash()
        vnode.componentInstance.disabled = true
      }
    }
  },
  inserted: function (el, binding, Nodes) {
    if (store.state.location.menuList1.length == 0) {
      //处理二级菜单三级菜单权限问题
      store.commit('menuList1Fun', document.querySelectorAll('.lev1>div'))
      // console.log(store.state.location.menuList1)
    }
    if (store.state.location.menuList2.length == 0) {
      //处理二级菜单三级菜单权限问题
      store.commit('menuList2Fun', document.querySelectorAll('.lev2>div'))
      // console.log(store.state.location.menuList2)
    }
    //如果是个变量则使用变量，否则当做字符串处理
    var proValue = ''
    if (binding.value == 0) {
      proValue = binding.expression.trim()
    } else if (binding.value == undefined) {
      proValue = binding.expression
    } else {
      proValue = binding.value
    }
    const splitValue = proValue.split('|')
    //去除控件传参中存在换行空格等情况
    const pagePermission = splitValue[0] ? splitValue[0].trim() : splitValue[0]
    if (proValue === 'TRUE') {
      return true
    }
    if (isNeedJudgePermission()) {
      return true
    } else {
      let menuBtn = binding.value && binding.value.indexOf('ACHIEVEMENT') > -1

      if (['vmsit', 'SIT', 'dev', 'UAT'].includes(process.env.NODE_ENV)) {
        // if (['vmsit', 'SIT', 'UAT'].includes(process.env.NODE_ENV)) {
        if (
          !store.state.permission.whiteBtnList[binding.expression] &&
          !menuBtn
        ) {
          // 处理控件中，不可见的组件 列入：Ibutton.
          if (pagePermission !== 'undefined') {
            if (!store.state.permission.whiteBtnList[pagePermission]) {
              //**************  重要：如果是输入框，选择框，富文本等可编辑控件需要添加权限，给该组件加上v-permission.edit=""  **************

              if (
                binding.rawName.split('.')[1] &&
                binding.rawName.split('.')[1] == 'edit'
              ) {
                el.classList.add('is-disabled')
              } else {
                el.parentNode.removeChild(el)
              }
            }
          }
        } else {
        }
      }
    }
  },
  componentUpdated: function () {
    // return false;

    if (
      store.state.location.menuList1.length == 0 &&
      store.state.location.menuList2.length == 0
    ) {
    } else {
      var directConstant = store.state.location.directConstant
      if (directConstant !== 0) return false
    }

    // console.log(store.state.location.menuList1)
    // console.log(store.state.location.menuList2)

    // store.commit('setNumberAdd', '')
    var insertedOldNodesListNew = [] //二级菜单new
    if (insertedOldNodesListNew.length == 0) {
      insertedOldNodesListNew = document.querySelectorAll('.lev1>div')
      var path = store.state.location.nowSetToPath
      var number = 0
      store.state.location.menuList1.forEach((e) => {
        if (e?.innerText?.trim() === path?.meta?.title?.trim()) {
          number++
        }
      })
      if (number !== 0) {
        //存在于二级菜单上
        if (insertedOldNodesListNew.length > 0) {
          var num = 0
          insertedOldNodesListNew.forEach((e) => {
            if (e?.innerText?.trim() === path?.meta?.title?.trim()) {
              // console.log(e.innerText.trim())
              num++
            }
          })
          if (num == 0) {
            insertedOldNodesListNew[0].click()
          }
        }
      }
      var menu3 = document.querySelectorAll('.lev2>div') //继续判断三级菜单
      // console.log(menu3)
      var str = 0
      store.state.location.menuList2.forEach((e) => {
        if (e.innerText.trim() === path.meta.title.trim()) {
          // console.log(e.innerText.trim())
          str++
        }
      })
      if (str !== 0) {
        if (menu3.length > 0) {
          var j = 0
          menu3.forEach((e) => {
            if (e.innerText.trim() === path.meta.title.trim()) {
              // console.log(e.innerText.trim())
              j++
            }
          })
          if (j == 0) {
            menu3[0].click()
          }
        }
      }
    }
  }
})
//切换I8n动态更新element值
// eslint-disable-next-line no-undef
Vue.directive('update', {
  bind: function (el, binding, vnode) {
    vnode.key = Hash()
  }
})

Vue.directive('lazyLoading', {
  bind(el, binding) {
    console.log(el, binding, '2222222')
    const { value } = binding
    let elementClass = null
    let lazyFun = null
    if (typeof value == 'object') {
      const { elementClass: _elementClass, lazyFun: _lazyFun } = value //   elementClass 元素的class,   lazyFun 调用的函数
      elementClass = _elementClass
      lazyFun = _lazyFun
      console.log(elementClass, lazyFun)
    } else if (typeof value == 'function') {
      lazyFun = value
    } else {
      console.log('传参错误')
      return
    }
    // 获取element-ui定义好的scroll盒子
    const SELECTWRAP_DOM = el.querySelector(
      elementClass || '.el-select-dropdown .el-select-dropdown__wrap'
    )
    SELECTWRAP_DOM.addEventListener('scroll', function () {
      let { clientHeight, scrollTop, scrollHeight } = this
      const CONDITION = Math.round(clientHeight + scrollTop) >= scrollHeight
      if (CONDITION) {
        debounce(lazyFun(), 300)
      }
    })
  }
})

function debounce(fn, delay) {
  //  防抖
  var timeout = null // 创建一个标记用来存放定时器的返回值
  return (e) => {
    clearTimeout(timeout) // 每当用户输入的时候把前一个 setTimeout clear 掉
    // 然后又创建一个新的 setTimeout, 这样就能保证interval 间隔内如果时间持续触发，就不会执行 fn 函数
    timeout = setTimeout(() => {
      fn.apply(this, arguments)
    }, delay)
  }
}

// 实现拖拽功能
// eslint-disable-next-line no-undef
Vue.directive('dragabled', {
  bind: function (el, binding, vnode, oldVnode) {
    if (!binding) return
    el.onmousedown = (e) => {
      // 鼠标按下，计算当前元素距离可视区的距离
      let disX = e.clientX
      let disY = e.clientY
      el.style.cursor = 'move'

      document.onmousemove = function (e) {
        e.preventDefault() // 移动时禁用默认事件

        // 通过事件委托，计算移动的距离
        const left = e.clientX - disX
        disX = e.clientX
        el.scrollLeft += -left

        const top = e.clientY - disY
        disY = e.clientY
        el.scrollTop += -top
      }

      document.onmouseup = function (e) {
        el.style.cursor = 'auto'
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
})

export function Hash() {
  return parseInt(Math.random() * 1000000000)
}

// Input 整数输入
// eslint-disable-next-line no-undef
Vue.directive('Int', {
  bind: function (el) {
    const input = el.getElementsByTagName('input')[0]
    input.onkeyup = function (e) {
      if (input.value.length === 1) {
        input.value = input.value.replace(/[^1-9]/g, '')
      } else {
        input.value = input.value.replace(/[^\d]/g, '')
      }
    }
    input.onblur = function (e) {
      if (input.value.length === 1) {
        input.value = input.value.replace(/[^1-9]/g, '')
      } else {
        input.value = input.value.replace(/[^\d]/g, '')
      }
    }
  }
})

// Input 浮点数
// eslint-disable-next-line no-undef
Vue.directive('float', {
  bind: function (el, binding) {
    const input = el.getElementsByTagName('input')[0]
    input.onkeyup = function (e) {
      input.value = numberProcessor(input.value, binding.expression || 4)
    }
  }
})
