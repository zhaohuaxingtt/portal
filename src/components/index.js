/*
 * @Author: yuszhou
 * @Date: 2021-02-19 14:29:08
 * @LastEditTime: 2021-04-01 19:50:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\components\index.js
 */
import { MessageBox, Message } from 'element-ui'
import {
  iInput,
  iSelect,
  iTabs,
  iTabsList,
  iButton,
  iCard,
  icon,
  iPage,
  iPagination,
  iSearch,
  iNavMvp,
  iDialog,
  iText,
  iDrawer,
  iRadio,
  iDatePicker
} from 'rise'

const iMessageBox = (content = '', title, options = {}) => {
  return MessageBox.confirm(
    content,
    title,
    Object.assign({ zIndex: 20000 }, options)
  )
}

function message() {
  this.type = 'success'
  this.message = ''
  return this
}
message.prototype.success = message => {
  Message({
    message: message || this.message,
    type: 'success'
  })
}
message.prototype.warn = message => {
  Message({
    message: message || this.message,
    type: 'warning'
  })
}
message.prototype.error = message => {
  Message({
    message: message || this.message,
    type: 'error'
  })
}
const iMessage = new message()
export default {
  iInput,
  iSelect,
  iButton,
  iCard,
  iTabs,
  iTabsList,
  icon,
  iPage,
  iMessage,
  iMessageBox,
  iPagination,
  iNavMvp,
  iSearch,
  iDialog,
  iText,
  iDrawer,
  iRadio,
  iDatePicker
}
