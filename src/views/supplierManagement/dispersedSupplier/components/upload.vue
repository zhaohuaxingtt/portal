<template>
  <iCard :title="$t('SUPPLIER_ZIYOUSHANGCHUAN')">
        <template slot="header-control" >
            <iButton @click="exportsRemove" v-permission="SUPPLIER_BASEINFO_COMPANY_BASEINFO_DELFUJIAN_GP">
            {{ $t('APPROVAL.REMOVE_ATTACH') }}
            </iButton>
            <upload-button v-permission="SUPPLIER_BASEINFO_COMPANY_BASEINFO_UPLOAD_GP" class="margin-left20" @uploadedCallback="exportsAdd" />
        </template>
        <table-list :tableData="supplierData.attachmentList" :tableTitle="tableTitle"
                    :tableLoading="tableLoading" @handleSelectionChange="handleSelectionChange"
                    :index="true"
                    :openPageGetRowData="true"
                    openPageProps="fileName"
                    @openPage="handleDownload"
                    ref="commonTable"
                    border
        >
            <template #validityOfCertificate="scope">
                <iDatePicker value-format="yyyy-MM-dd"
                            v-model="scope.row.validityOfCertificate"
                            type="date"
                            :placeholder="$t('SUPPLIER_XUANZERQI')"
                            :picker-options="{
                                disabledDate(time) {
                                    return time.getTime() < Date.now() - 24 * 60 * 60 * 1000
                                }
                            }" 
                />
            </template>
        </table-list>
  </iCard>
</template>

<script>
import { iButton,iCard,iMessage,iMessageBox,iDatePicker } from "rise";
import { tableTitleUpload } from "./data"
import tableList from '@/components/commonTable'
import uploadButton from '@/components/uploadButton'
import {
  getFreeAttachmentList,
  deleteAttachment,
  saveAttachment
} from '@/api/register/relevantAttachments'
import { downloadUdFile } from '@/api/file'

export default {
    props:{
        supplierData:{
            type:Object,
            default:()=>{}
        }
    },
    components:{
        iCard,
        iButton,
        tableList,
        uploadButton,
        iDatePicker
    },
    data(){
        return{
            selectTableData:[],
            tableTitle:tableTitleUpload,
            tableLoading:false,
        }
    },
    created(){

    },
    methods:{
        async handleDownload (row) {
            const req = row.fileId
            await downloadUdFile(req)
        },
        exportsRemove(){
            if (this.selectTableData.length === 0) {
                return iMessage.warn(this.$t('LK_NINDANGQIANHAIWEIXUANZE'))
            }
            iMessageBox(
                this.$t('LK_SHIFOUQUERENSHANCHU'),
                this.$t('LK_WENXINTISHI'),
                {
                confirmButtonText: this.$t('LK_QUEDING'),
                cancelButtonText: this.$t('LK_QUXIAO')
                }
            ).then(async () => {
                const ids = this.selectTableData.map((item) => {
                    return item.id
                })
                const req = {
                    ids
                }
                const res = await deleteAttachment(req, this.supplierType)
                if (res?.code === '200') {
                    iMessage.success(res.desZh)
                    // this.supplierData.attachmentList.forEach(e => {
                        
                    // });
                    // this.getTableList()
                }
                // res.moduleName = this.$t('SUPPLIER_ZIYOUSHANGCHUAN')
                // this.resultMessage(res, () => {
                //   this.getTableList()
                // })
            })
        },
        exportsAdd(event){
            console.log(event);
            this.tableLoading = true
            this.supplierData.attachmentList.push(
                {
                    fileName: event.name,
                    filePath: event.filePath,
                    fileSize: event.fileSize.toString(),
                    fileId: event.id,
                    createDate:event.createDate,
                    validityOfCertificate:'',
                    createrName:JSON.parse(sessionStorage.getItem("userInfo")).nameZh
                }
            )
            this.tableLoading = false
            // {
            //         file:{
                        
            //         },
            //         validityOfCertificate:'',
            //     },

            // const res = await saveAttachment(req)
            // console.log(res);
            // res.moduleName = this.$t('SUPPLIER_ZIYOUSHANGCHUAN')
            // this.resultMessage(
            //     res,
            //     () => {
            //     this.getTableList()
            //     this.tableLoading = false
            //     },
            //     () => {
            //     this.tableLoading = false
            //     }
            // )
        },
        //修改表格改动列
        handleSelectionChange(val) {
            this.selectTableData = val
        },
        inputProps(){

        }
    }
}
</script>

<style>

</style>