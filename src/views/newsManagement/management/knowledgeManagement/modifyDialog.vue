<template>
    <iDialog
        :title="dialogTitle"
		style="margin-top:10vh"
        :visible.sync="show" 
		v-if="show"
        width="60%" 
		@close="close"
		append-to-body
    >
        <el-form
			label-position="right"
			label-width="100px"
			class="typeForm"
		>
          <iFormItem :label="language('知识分享类型：')">
				<iInput v-model="name" disabled/>
          </iFormItem>
          <iFormItem :label="language('管理者:')">
              <iSelect v-model="adminUsers" multiple :placeholder="language(请选择)">
				<el-option
					v-for="item in options"
					:key="item.value"
					:label="item.label"
					:value="item.value">
				</el-option>
			</iSelect>
          </iFormItem>
        </el-form>
    </iDialog>
</template>

<script>
import { iDialog, iFormItem, iSelect, iInput } from 'rise'
export default {
    name: 'modifyDialog',
    components: {
        iDialog,
        iFormItem,
        iSelect,
		iInput
    },
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            dialogTitle: '修改知识分享类型',
            name: '',
            adminUsers: [],
			options: [{
				value: '选项1',
				label: '黄金糕'
				}, {
				value: '选项2',
				label: '双皮奶'
				}, {
				value: '选项3',
				label: '蚵仔煎'
				}, {
				value: '选项4',
				label: '龙须面'
				}, {
				value: '选项5',
				label: '北京烤鸭'
			}],         
		}
    },
    methods: {
        close () {
            this.$emit('update:show', false)
        },
		initDialog(row) {
			console.log(row, '1234')
			this.name = row.name
			this.adminUsers = row.adminUsers
		}
    }
}
</script>

<style lang="scss" scoped>
    .typeForm {
		padding-bottom: 40px;
	}
</style>