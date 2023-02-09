<template>
    <!--转派-->
    <iDialog
            :title="$t('LK_ZP')"
            :visible.sync="value"
            width="382px"
            @close="clearDiolog"
            :close-on-click-modal="false"
    >
        <div class="content">
            <el-form >
                <el-row class="margin-bottom20">
                    <el-form-item  :label="$t('SUPPLIER_KESHI')">
                        <iSelect :placeholder="language('请选择')"
                                 v-model="form.ksId"
                                 @change="changeValue"
                        >
                            <!--<el-option value="" :label="$t('all')"></el-option>-->
                            <el-option
                                    :disabled="disabled"
                                    :value="item.id"
                                    :label="item.deptNum"
                                    v-for="item in ksList"
                                    :key="item.id"></el-option>
                        </iSelect>
                    </el-form-item>
                    <el-form-item  label="Linie">
                        <iSelect :placeholder="language('请选择')" v-model="form.linieId">
                            <!--<el-option value="" :label="$t('all')"></el-option>-->
                            <el-option
                                    :value="item.id"
                                    :label="$i18n.locale === 'zh'  ? item.nameZh : item.nameEn"
                                    v-for="item in linieList"
                                    :key="item.id"></el-option>
                        </iSelect>
                    </el-form-item>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <iButton :disabled="isForward" @click="giveMyself">{{ $t('LK_ZGZJ') }}</iButton>
                <iButton :disabled="isForward" @click="handleSubmit">{{ $t('LK_QUEREN') }}</iButton>
            </div>
        </div>
    </iDialog>
</template>

<script>
    import {iDialog,iSelect, iButton, iInput, iMessage} from 'rise';
    import {
        getDeptListByParam, // 科室
        getLinieByDeptId,           // 采购员
        updateSpLinie,        // 转派
        updateSpLinieToMe,     // 转派给自己
    } from '@/api/achievement';
    export default {
        components: {
            iDialog,
            iButton,
            iInput,
            iSelect,
            iMessage
        },
        props: {
            value: {type: Boolean},
            code: {type: String},
            listId:{type: Array},
            isForward:{type: Boolean}
        },
        data() {
            return {
                form: {
                    "ksId": '',
                    "linieId": ''
                },
                allSelectObject:{},
                ksList: [], // 科室
                linieList:[],   // 采购员
                disabled:false
            };
        },
        created() {
            // 批量件搜索条件
            this.initData()
            this.form = {
                "ksId": '',
                "linieId": '',
            }
        },
        methods: {
            async initData() {
                this.ksList = await this.getDepList()
            },
            getDepList() {
                return new Promise((resolve, reject)=> {
                    getDeptListByParam().then(res => {
                        if(res.result) {
                            resolve(res.data)
                        }
                    }).catch((error) => {
                        reject(error)
                    })
                })
            },
            getLinieByDeptIdList(id) {
                return new Promise((resolve, reject)=> {
                    getLinieByDeptId({id}).then(res => {
                        if(res.result) {
                            resolve(res.data)
                        }
                    }).catch((error) => {
                        reject(error)
                    })
                })
            },
            clearDiolog() {
                this.$emit('input', false);
            },
            // 确定提交 // 确认转派
            handleSubmit() {
                if(!this.form.ksId) {
                   return iMessage.error(`${ this.$i18n.locale === 'zh' ? '请选择科室' : 'please select department' }`)
                } else if(!this.form.linieId) {
                    return iMessage.error(`${ this.$i18n.locale === 'zh' ? '请选择采购员' : 'please select buyer' }`)
                }
                let obj = {
                    id: this.listId,
                    linieId:this.form.linieId
                }
                updateSpLinie(obj).then(res => {
                    if(res.result) {
                        this.form = {
                            "ksId": '',
                            "linieId": ''
                        }
                        this.$emit('handleSubmit');
                        iMessage.success(`${ this.$i18n.locale === 'zh' ? res.desZh : res.desEn }`)
                    }
                })
            },
            // 转给自己
            giveMyself() {
                updateSpLinieToMe({id:this.listId,linieId:this.form.linieId}).then(res => {
                    if(res.result) {
                        this.$emit('handleSubmit');
                        iMessage.success(`${ this.$i18n.locale === 'zh' ? res.desZh : res.desEn }`)
                    }
                })
            },
            // 获取采购员
            async changeValue(id) {
                if(this.disabled) return
                this.disabled = true
                this.linieList = await this.getLinieByDeptIdList(id)
                this.disabled = false
            },
        }
    };
</script>

<style scoped lang="scss">
    .content {
        padding-bottom: 20px;
        font-weight: 400;
    }

    .dialog-footer {
        margin-top: 30px;
        display: flex;
        justify-content: flex-end;
    }

</style>
