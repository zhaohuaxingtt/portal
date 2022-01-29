/*
 * @Author: yuszhou
 * @Date: 2021-02-19 14:29:09
 * @LastEditTime: 2022-01-24 16:35:17
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
    // console.log(el)
    // console.log(el.parentNode)
    // console.log(binding)
    // console.log(el,binding, Nodes)
    //-----------------------2022-1-20 修改权限配置内容start------------------------------
    //如果是个变量则使用变量，否则当做字符串处理
    var proValue = "";
    if(binding.value == 0){
      proValue = binding.expression.trim()
    }else if(binding.value == undefined){
      proValue = binding.expression
    }else{
      proValue = binding.value
    }
    const splitValue = proValue.split('|')
    //去除控件传参中存在换行空格等情况
    const pagePermission = splitValue[0] ? splitValue[0].trim() : splitValue[0]

    //-----------------------2022-1-20 修改权限配置内容end------------------------------

    //-----------------------2022-1-24 增加默认不限制的key-----------------------------------------------
    if (proValue === 'TRUE') {
      return true
    }
    //-----------------------2022-1-24 增加默认不限制的key end-----------------------------------------------
    if (isNeedJudgePermission()) {
      return true
    } else {
      let menuBtn = binding.value && binding.value.indexOf('ACHIEVEMENT') > -1
      if (
        !store.state.permission.whiteBtnList[binding.expression] &&
        !menuBtn
      ) {
        // 处理控件中，不可见的组件 列入：Ibutton.
        //-----------------------2022-1-24 修改权限配置内容start------------------------------
        if (pagePermission !== 'undefined') {
          // if (['vmsit', 'SIT', 'dev', 'UAT'].includes(process.env.NODE_ENV)) {
            if (['vmsit', 'SIT','UAT'].includes(process.env.NODE_ENV)) {
            if (!store.state.permission.whiteBtnList[pagePermission]) {
              el.parentNode.removeChild(el)
            }
          }
        }
        //-----------------------2022-1-24 修改权限配置内容end------------------------------
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
