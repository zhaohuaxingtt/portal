<template>
    <!--上传产量-->
    <iDialog
            :title="$t('EKL_SCCL')"
            :visible.sync="value"
            width="381px"
            @close="clearDiolog"
            :close-on-click-modal="false"
    >
        <div class="content">

            <div class="row1">{{ $t('SUPPLIER_NIANFEN') }}</div>

            <iSelect
                    v-model="form.year"
                    style="width: 320px"
                    class="margin-top10"
                    :placeholder="$t('LK_QINGXUANZE')"
            >
                <el-option :value="item" :label="item" v-for="item in yearList" :key="item"></el-option>
            </iSelect>

            <div class="margin-top10 tip" v-if="form.fileName">
                <icon symbol name="iconfujian"></icon>
                <span style="padding-left: 8px;">{{form.fileName}}</span>
                <span @click="hidden">
                   <icon class="icon" symbol name="iconlingjianshanchu"></icon>
                </span>
            </div>
            <div class="margin-top10 tip" v-else>
                <icon class="icon" symbol name="iconzengjiacailiaochengben_lan"></icon>
                <span style="padding-left: 8px;">{{ $t('EKL_XZYJFJTIP')}}</span>
            </div>

            <div slot="footer" class="dialog-footer">
                <!--<iButton @click="handleSubmit">{{ $t('EKL_XZWJ') }}</iButton>-->
                <el-upload
                        class="uploadBtn"
                        multiple
                        ref="upload"
                        name="multipartFile"
                        :data="{year:form.year}"
                        :http-request="upload"
                        :show-file-list="false"
                        :auto-upload="false"
                        :before-upload="beforeUpload"
                        :on-change="fileChange"
                        accept=".pdf,.xlsx,.xls,.docx,.cvs">
                    <iButton :loading="uploadLoading">{{ $t('EKL_XZWJ') }}</iButton>
                </el-upload>
                <iButton @click="handleSubmit">{{ $t('EKL_QUEREN') }}</iButton>
            </div>
        </div>
    </iDialog>
</template>

<script>
    import {iDialog, iSelect, iButton, icon, iMessage} from 'rise';
    import {
        importEklCartypeOutput,
    } from '@/api/achievement';

    export default {
        components: {
            iDialog,
            iSelect,
            iButton,
            icon,
            iMessage
        },
        props: {
            value: {type: Boolean},
            yearList: {type: Array},
        },
        data() {
            return {
                form: {
                    year: '',
                    fileName: '',
                },
                uploadLoading: false,
                selectList: [],
            };
        },

        methods: {
            clearDiolog() {
                this.$emit('input', false);
            },
            handleSubmit() {
                if(!this.form.year) {
                    return  iMessage.error(`${ this.$i18n.locale === 'zh' ? '请选择时间' : 'please select a time' }`)
                }else if (!this.form.fileName) {
                    return  iMessage.error(`${ this.$i18n.locale === 'zh' ? '请选择文件' : 'please select file' }`)
                }
                this.$refs.upload.submit();
            },
            upload(content) {
                let self = this
                const formData = new FormData()
                formData.append('file', content.file)
                formData.append('year', self.form.year)
                this.showLoading('content','upload')
                importEklCartypeOutput(formData)
                    .then(res => {
                        this.hideLoading()
                        this.uploadSuccess(res, content.file)
                    })
//                    .catch(rej => {
//                        this.hideLoading()
//                        this.uploadError(rej, content.file)
//                    })
            },
            beforeUpload(file) {
                this.uploadLoading = true
            },
            fileChange(file) {
                this.form.fileName = file.name
            },
            hidden() {
                this.form.fileName = ''
                this.$refs.upload.clearFiles();
            },
            uploadSuccess(res, file) {
                this.uploadLoading = false
                if (res.code == 200) {
                    this.$emit('handleSubmit', this.form);
                    iMessage.success(`${ file.name } ${ this.$t('LK_SHANGCHUANCHENGGONG') }`)
                } else {
                    iMessage.error(`${ this.$i18n.locale === 'zh' ? res.desZh : res.desEn }`)
                }
            },
            uploadError(err, file) {
                this.uploadLoading = false
            },
        },
        watch: {
            value() {
                this.form = {};
            },
        },
    };
</script>

<style scoped lang="scss">
    .content {
        padding-bottom: 20px;
    }

    .row1 {
        font-size: 14px;
        font-weight: 400;
        line-height: 16px;
        color: #000000;
        margin-top: 20px;
    }

    .dialog-footer {
        margin-top: 30px;
        display: flex;
        justify-content: flex-end;
    }

    .uploadBtn {
        background-color: #eef2fb;
        margin-right: 20px;
    }

</style>
