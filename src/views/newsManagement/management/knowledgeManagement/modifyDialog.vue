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
			class="typeForm validate-required-form"
			:rules="newContentRules" 
		>
          <iFormItem :label="language('知识分享类型：')">
				<iInput v-model="name" disabled/>
          </iFormItem>
          <iFormItem :label="language('管理者:')" prop='adminUsers'>
              <iSelect v-model="adminUsers" multiple :placeholder="language(请选择)">
				<el-option
					v-for="item in adminUsersList"
					:key="item.id"
					:label="item.name"
					:value="item.id">
				</el-option>
			</iSelect>
          </iFormItem>
        </el-form>
		<div class="btn">
			<iButton @click="close">取消</iButton>
			<iButton @click="save">确定</iButton>
		</div>
    </iDialog>
</template>

<script>
import { iDialog, iFormItem, iSelect, iInput, iButton } from 'rise'
import { getKnowledgeUser, saveKnowledgeUser } from '@/api/adminProCS';
export default {
    name: 'modifyDialog',
    components: {
        iDialog,
        iFormItem,
        iSelect,
		iInput,
		iButton
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
			currId: null,
			newContentRules: {
				adminUsers: { required:'true',message:"请选择知识分享类型",trigger:'select' },
			}
		}
    },
    methods: {
        close () {
			this.currId = null
			this.adminUsers = [],
            this.$emit('update:show', false)
			this.$emit('refresh')
        },
		async initDialog(row) {
			// 获取管理者列表
			let params = {
				privilege: 'ZSNRGLY'
			}
			await getKnowledgeUser(params).then(res => {
				if (res) {
					this.adminUsersList = res
				}
			})
			this.name = row.name
			this.currId = row.id
			row.adminUsers?.map(item => {
				this.adminUsers.push(item.id)
			})
		},
		async save() {
			if (!this.currId) return 
			if (this.adminUsers.length === 0) return this.$message({type: 'warning', message: '请先选择管理人员'})
			let formData = new FormData()
			this.adminUsers.map(item => {
				formData.append('adminUsers', item)
			})
			await saveKnowledgeUser(this.currId, formData).then(res => {
				console.log(res, '1234')
				if (res) {
					this.$message({type: 'success', message: "修改成功"})
					this.close()
				}
			})
		}
    }
}
</script>

<style lang="scss" scoped>
    .typeForm {
		padding-bottom: 40px;
	}
	.btn {
		padding-bottom: 20px;
		display: flex;
		justify-content: flex-end;
	}
</style>