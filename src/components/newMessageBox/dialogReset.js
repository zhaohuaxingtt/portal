import Vue from 'vue'
import dialogReset from './dialogReset.vue'

const ConfirmBoxConstructor = Vue.extend(dialogReset)

let instance
const initInstance = (title, Tips, cancelButtonText, confirmButtonText) => {
    instance = new ConfirmBoxConstructor({
        el: document.createElement('div'),
        data() {
            return {
                title,
                Tips,
                cancelButtonText,
                confirmButtonText,
            }
        },
    })
}

const NewMessageBox = obj => {
    let { title, Tips, cancelButtonText, confirmButtonText } = obj
    return new Promise((reslove, reject) => {
        initInstance(title, Tips, cancelButtonText, confirmButtonText)
        instance.callback = action => {
            if (action === 'confirm') {
                reslove()
            } else if (action === 'cancel') {
                reject()
            }
        }
        Vue.nextTick(() => {
            instance.closeValue = true
        })
    })
}

// function NewMessageBox() {
//     Vue.prototype.$NewMessageBox = showConfirm
// }
export default NewMessageBox