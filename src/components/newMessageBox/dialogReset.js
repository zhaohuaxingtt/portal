import Vue from 'vue'
import dialogReset from './dialogReset.vue'

const ConfirmBoxConstructor = Vue.extend(dialogReset)

let instance
const initInstance = (title, Tips, cancelButtonText, confirmButtonText,width) => {
    instance = new ConfirmBoxConstructor({
        el: document.createElement('div'),
        data() {
            return {
                title,
                Tips,
                cancelButtonText,
                confirmButtonText,
                width
            }
        },
    })
}

export function NewMessageBox(obj){
    let { title, Tips, cancelButtonText, confirmButtonText,width } = obj
    return new Promise((reslove, reject) => {
        initInstance(title, Tips, cancelButtonText, confirmButtonText,width)
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

export function NewMessageBoxClose(){
    Vue.nextTick(() => {
        if(instance){
            instance.closeValue = false
        }
    })
}

// function NewMessageBox() {
//     Vue.prototype.$NewMessageBox = showConfirm
// }
export default { NewMessageBox,NewMessageBoxClose }