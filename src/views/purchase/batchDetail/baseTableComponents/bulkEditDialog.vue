<template>
    <!--确认-->
    <iDialog
            :title="$t('LK_PLBJ')+': ' + ' ' + bulkEditData.partNumber"
            :visible.sync="value"
            width="742px"
            @close="clearDiolog"
            :close-on-click-modal="false"
    >
        <div class="content">
            <el-form>
                <el-row class="margin-bottom20">
                    <div style="display: grid">
                        <div style="grid-row: 1/2">
                            <el-form-item :label="$t('LK_GONGYINGSHANG')">
                                <iInput style="width: 320px" disabled :placeholder="language('请输入')"
                                        v-model="gysName"></iInput>
                            </el-form-item>
                        </div>
                        <div style="grid-row: 1/2;">
                            <el-form-item style="padding-left: 40px;" :label="$t('LK_CAIGOUGONGCHANG')">
                                <iInput style="width: 320px;" disabled :placeholder="language('请输入')"
                                        v-model="cggcName"></iInput>
                            </el-form-item>
                        </div>
                    </div>


                </el-row>
                <el-row class="margin-bottom20">
                    <div style="display: grid">
                        <div style="grid-row: 1/2">
                            <el-form-item :label="$t('LK_QRSL')">
                                <iInput style="width: 320px" disabled :placeholder="language('请输入')"
                                        v-model="form.confirmQuantity"></iInput>
                            </el-form-item>
                        </div>
                        <div style="grid-row: 1/2;">
                            <el-form-item style="padding-left: 40px;" :label="$t('LK_QRJG')">
                                <iInput
                                        oninput="value = value.replace(/[^\d.]/g,'').replace(/\.{2,}/g,'.')"
                                        @focus="onFocus"
                                        @blur="onBlur"
                                        style="width: 320px;" :placeholder="language('请输入')"
                                        v-model="form.confirmPrice"></iInput>
                            </el-form-item>
                        </div>
                    </div>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <iButton @click="handleSubmit">{{ $t('LK_QUEREN') }}</iButton>
            </div>
        </div>
    </iDialog>
</template>

<script>
    import {iDialog, iButton, iInput, iMessage} from 'rise';
    import {batchUpdateSeriesbaseDetail} from '@/api/achievement';
    import {toThousands,delcommafy} from '@/utils'

    export default {
        components: {
            iDialog,
            iButton,
            iInput,
            iMessage,
        },
        props: {
            value: {type: Boolean},
            code: {type: String},
            bulkEditData: {type: Object},
        },
        data() {
            return {
                form: {
                    confirmQuantity: '',
                    confirmPrice: '',
                },
                gysName: '',
                cggcName: ''
            };
        },
        created() {
            this.form = {
                supplierId: this.bulkEditData.supplierId,
                factoryCode: this.bulkEditData.factoryCode,
                confirmQuantity: this.bulkEditData.confirmQuantity,
                confirmPrice: this.bulkEditData.confirmPrice,
            }
            this.gysName = this.bulkEditData.gysName
            this.cggcName = this.bulkEditData.cggcName
        },
        methods: {
            clearDiolog() {
                this.$emit('input', false);
            },
            handleSubmit() {
                if(this.form.confirmPrice) {
                    let str = this.form.confirmPrice.substring(this.form.confirmPrice.indexOf('.')+1)
                    if(str.length>2) {
                        return iMessage.error(`${ this.$i18n.locale === 'zh' ? '价格最多两位小数，请重新编辑' : 'The price can be up to two decimal places. Please edit again'}`)
                    }
                } else {
                    return iMessage.error(`${ this.$i18n.locale === 'zh' ? '请编辑价格' : 'Please edit price'}`)
                }
                let obj = {
                    supplierId: this.bulkEditData.supplierId,
                    factoryCode: this.bulkEditData.factoryCode,
                    confirmPrice: this.form.confirmPrice ? delcommafy(this.form.confirmPrice) : 0,
                    partNumber: this.bulkEditData.partNumber,
                }
                this.$alert('请注意！此操作将确认全部数据，且确认后将无法修改，是否继续？', '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                        if (action == 'confirm') {
                            batchUpdateSeriesbaseDetail(obj).then(res => {
                                if (res.result) {
                                    iMessage.success(`${ this.$i18n.locale === 'zh' ? res.desZh : res.desEn }`)
                                    this.$emit('handleSubmit', this.form);
                                }
                            }).catch((err) => {
                                iMessage.error(`${ this.$i18n.locale === 'zh' ? err.desZh : err.desEn }`)
                            })
                        }
                    }
                })
            },
            onFocus(val) {
                this.form.confirmPrice = delcommafy(val.target.value) // 转字符串数字
            },
            onBlur(val) {
                this.form.confirmPrice = val.target.value.replace(/\B(?=(\d{3})+\b)/g, ',') // 转千分
            }

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
