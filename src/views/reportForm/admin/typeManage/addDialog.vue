<template>
    <iDialog
        :title="dialogTitle"
        style="margin-top:10vh"
        :visible.sync="show" 
		v-if="show"
		width="60%" 
		@close='closeDialogBtn' 
		append-to-body
    >
    <div>{{ dialogTitle }}</div>
    </iDialog>
</template>

<script>
import { iDialog } from 'rise'
export default {
    name: 'addTypeDialog',
    components: {
        iDialog
    },
    props: {
        operateType: {
            type: String,
            default: 'add'
        },
        show: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            visible: false,
        }
    },
    methods: {
        closeDialogBtn () {
            this.$emit('update:show', false)
        }
    },
    computed: {
        dialogTitle() {
            return this.operateType === 'add' ? '新增类型管理' : '修改类型管理'
        }
    }
}
</script>

<style lang="scss" scoped>
</style>