<template>
    <iPage>
        <headerNav/>
        <iSearch
            @sure="sure"
            @reset="reset"
            >
            <el-form>
                <el-form-item :label="$t('LK_GONGYINGSHANGMINGCHENG1')">
                    <iInput :placeholder="$t('LK_QINGSHURU')" v-model="form.supplierName"></iInput>
                </el-form-item>
                <el-form-item :label="$t('组织机构代码')">
                    <iInput :placeholder="$t('LK_QINGSHURU')" v-model="form.code"></iInput>
                </el-form-item>
                <el-form-item :label="$t('SUPPLIER_KESHI')">
                    <iSelect :placeholder="$t('LK_QINGXUANZE')" v-model="form.keshi">
                        <el-option :value="item.name"
                                    :label="$i18n.locale === 'zh'  ? item.name : item.nameEn"
                                    v-for="item of keshiList"
                                    :key="item.name">
                        </el-option>
                    </iSelect>
                </el-form-item>
                <el-form-item :label="$t('内容分类')">
                    <iSelect :placeholder="$t('LK_QINGXUANZE')" v-model="form.keshi">
                        <el-option :value="item.name"
                                    :label="$i18n.locale === 'zh'  ? item.name : item.nameEn"
                                    v-for="item of keshiList"
                                    :key="item.name">
                        </el-option>
                    </iSelect>
                </el-form-item>
                <el-form-item :label="$t('发布日期起止')">
                    <iDatePicker value-format="yyyy-MM-dd"
                     type="daterange"
                     v-model="form.createTime" />
                </el-form-item>

            </el-form>
        </iSearch>

        <iCard class="margin-top20">
            <div class="margin-bottom20 clearFloat">
                <div class="floatleft" style="margin-top:5px;">
                    <el-switch v-model="selfOnly" :active-text="$t('仅看我关注的供应商')" @change="changeSelfHandle"></el-switch>
                </div>

                <div class="floatright">
                    <iButton @click="handleNotRated">{{ $t('设置供应商') }}</iButton>
                    <iButton @click="handleNotRated">{{ $t('导入') }}</iButton>
                    <iButton @click="handleNotRated">{{ $t('导出全部') }}</iButton>
                    <iButton @click="handleNotRated">{{ $t('删除') }}</iButton>
                </div>
            </div>

            <iTableCustom
                ref="tableListRef"
                :data="tableListData"
                :columns="tableTitle"
                :loading="tableLoading"
                @handle-selection-change="handleSelectionChange"
                @go-title="handleOpenPage"
                >
            </iTableCustom>
        </iCard>
    </iPage>
</template>
  
<script>
import { iPage,iSearch,iInput,iSelect,iDatePicker,iCard,iButton } from "rise"
import iTableCustom from "@/components/iTableCustom"
import headerNav from "../components/headerNav"
import { tableTitle } from "./data"
export default {
    components:{
        headerNav,
        iPage,
        iSearch,
        iInput,
        iSelect,
        iDatePicker,
        iCard,
        iButton,
        iTableCustom,
    },
    data(){
        return{
            tableLoading:false,
            tableTitle,
            tableListData:[],
            form:{
                supplierName:"",
                code:'',
                keshi:"",
                createTime:"",
            },
            keshiList:[],
            selfOnly:true,
        }
    },
    methods:{
        sure(){

        },
        reset(){

        },
        handleSelectionChange(){

        },
        handleOpenPage(){
            
        },
    }
}
</script>

<style>

</style>