<template>
    <div class="info">
        <div class="left">
            <div v-for="(item, index) in listData" :key="index">
                <div class="item-box" @click="handleInfo(item, index)" :class="idx === index ? 'active' : '' ">{{ item.name }}</div>
            </div>
        </div>
        <div class="right">
            <el-form
                ref="projectForm"
                :model="form"
                :rules="rules"
                label-width="80px"
                class="validate-required-form"
            >
                <iFormItem :label="language('项目名称')" prop='name'>
                    <iInput v-model="form.name" placeholder="请输入" clearable></iInput>
                </iFormItem>
                <iFormItem :label="language('项目链接')" prop='contentId'>
                    <iSelect
                        placeholder="请选择"
                        clearable
                        >
                            <el-option
                                v-for="item in options"
                                :key="item.id"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                    </iSelect>
                </iFormItem>
            </el-form>
        </div>
    </div>
</template>

<script>
import { iFormItem, iInput, iSelect } from 'rise'
export default {
    name: 'projectInfo',
    components: {
        iFormItem,
        iInput,
        iSelect
    },
    props: {
        data: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            idx: 0,
            form: {
                name: '',
                contentId: ''
            },
            rules: {
                name: { required:true, message:"请输入项目名称",trigger:'blur' },
                contentId: { required:true, message:"请选择项目链接",trigger:'blur' }
            },
            options: [
                {label: '流程', value: '1', id: 1},
                {label: '测试', value: '2', id: 2}
            ]
        }
    },
    computed: {
        listData() {
            let arr = [...this.data]
            arr.unshift({
                name: 'add',
                height: '',
                width: ''
            })
            return arr
        }
    },
    methods: {
        handleInfo(row, index) {
            console.log(row, '1234')
            this.idx = index
        }
    }
}
</script>

<style lang="scss" scoped>
    .info {
        margin: 10px;
        padding: 10px;
        display: flex;
        flex-direction: row;
        height: 100%;
        .left {
            height: 100%;
            .item-box {
                height: 60px;
                line-height: 60px;
                text-align: right;
                font-size: 16px;
                cursor: pointer;
            }
        }
        .right {
            padding-left: 10px;
            border-left: 1px solid rgb(190, 184, 184);
            height: 100%;
        }
    }
    .active {
        color: blue;
        border-right: 1px solid blue;
        font-weight: 600;
    }
</style>