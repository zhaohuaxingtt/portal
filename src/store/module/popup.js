const state = {
    popupItemList:[],
    popupItemStatus:[]
}

const mutations={
    POPUP_ITEM_LIST_DEL(state,index){
        state.popupItemList.splice(index,1)
    },
    POPUP_ITEM_LIST_PUSH(state,item){
        state.popupItemList[state.popupItemList.length] = item
    },
    SET_POPUP_ITEM_LIST(state,items){
        state.popupItemList = items
    },
    CHANGE_POPUP_STATUS(state){
        state.popupItemStatus[state.popupItemStatus.length].close()
    },
    ADD_POPUP_STATUS(state,item){
        state.popupItemStatus.push(item)
    }
}

const actions={
    popupDel({commit},index){
        commit('POPUP_ITEM_LIST_DEL',index)
    },
    popupPush({commit},item){
        commit('POPUP_ITEM_LIST_PUSH',item)
    },
    changePopupSta({commit}){
        commit('CHANGE_POPUP_STATUS')
    },
    setPopupItems({commit},items){
        commit('SET_POPUP_ITEM_LIST',items)
    },
    addPopupItemSta({commit},items){
        commit('ADD_POPUP_STATUS',items) 
    }
}

export default {
    state,
    mutations,
    actions
}