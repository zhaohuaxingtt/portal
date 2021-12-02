/*
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-10-08 19:08:23
 * @LastEditors: zbin
 * @Descripttion: your project
 */
import {
    getDictByCode
} from "@/api/dictionary";

export const tableTitle = [{
        props: 'sapCode',
        name: '供应商编号',
        key: 'GONGYINGSHANGBIANHAO'
    },
    {
        props: 'supplierName',
        name: '供应商名称',
        key: 'GONGYINGSHANGMINGCHEN'
    },
    {
        props: 'partType',
        name: '零件类型',
        key: 'LINGJIANLEIXING'
    },
    {
        props: 'part',
        name: '零件号-名称',
        key: 'LINGJIANHAO-MINGCHEN'
    },
    {
        props: 'area',
        name: '区域',
        key: 'QUYU'
    },
    {
        props: 'address',
        name: '详细地址',
        key: 'XIANGXIDIZHI'
    },
]
export const partTableTitle = [{
        props: 'partName',
        name: '零件名称',
        key: 'LINGJIANMINGCHEN'
    },
    {
        props: 'partNum',
        name: '零件号',
        key: 'LNGJIANHAO'
    },
]
export const dictByCode = async function (key) {
    let dicResult = []
    let res = await getDictByCode(key)
    if (res.data) {
        res.data.filter(result => {
            if (result.code === key) {
                dicResult = result.subDictResultVo || []
            }
        })
        return dicResult
    }
}
export const baseRules = {
    supplierName: [{
            required: true,
            message: '请输入供应商中文名',
            trigger: 'blur'
        },

    ],
    contactName: [{
            required: true,
            message: '请输入联系人姓名',
            trigger: 'blur'
        },


    ],
    contactEmail: [{
            required: true,
            message: '请输入联系人邮箱',
            trigger: 'blur'
        },
        {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change']
        }

    ]
}