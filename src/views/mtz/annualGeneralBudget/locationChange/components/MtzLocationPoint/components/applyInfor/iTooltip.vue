<template>
    <el-tooltip class="item" effect="light" placement="top">
        <template #content>
            <div v-html="txtInfo"></div>
        </template>
        <icon v-if="type=='icon'" symbol name="iconxinxitishi" class="margin-left4"></icon>
        <el-button v-if="type=='num'" size="mini" circle type="primary">{{ num }}</el-button>
    </el-tooltip>
</template>
 
<script>
import { icon,  } from 'rise';

export default {
    components: {
        icon,

  },
    name: 'iTooltip',
    props: {
        type: {
            type: String,
            default: 'num'
        },
        txtInfo: {
            type: String,
            default: ''
        },
        num: {
            type: String,
            default: 1,
        }
    },
    data() {
        return {
        }
    },
    methods: {
    }
}
</script>
 
<style lang="less"></style>
