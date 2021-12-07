/*
 * @Date: 2021-11-29 14:22:03
 * @LastEditors: caopeng
 * @LastEditTime: 2021-12-07 14:25:30
 * @FilePath: \front-portal-new\src\views\opcsSupervise\opcsPermission\application\components\data.js
 */
export const baseRules = {
    nameZh: [{
            required: true,
            message: '请输入应用中文名',
            trigger: 'change'
        },
        {
            min: 1,
            max: 70,
            message: '长度在 1 到 70个字符',
            trigger: 'change'
        },
    ],
    shortName: [{
            required: true,
            message: '请输入应用简称',
            trigger: 'change'
        },
        {
            min: 1,
            max: 10,
            message: '长度在 1 到 10个字符',
            trigger: 'change'
        },
    ],
    contactUserId: [{
            required: true,
            message: '请选择应用负责人',
            trigger: 'change'
        },
    ],
    nameEn: [{
            required: true,
            message: '请输入应用英文名',
            trigger: 'change'
        },
        {
            min: 1,
            max: 70,
            message: '长度在 1 到 70个字符',
            trigger: 'change'
        },
    ],

}