/*
 * @Date: 2021-11-29 14:22:03
 * @LastEditors: caopeng
 * @LastEditTime: 2021-12-06 11:03:40
 * @FilePath: \front-portal-new\src\views\opcsSupervise\opcsPermission\application\manage\components\data.js
 */
export const tableTitle=[
    {
        props: 'nameZh',
        name: '应⽤中⽂名',
        key: 'YINGYONGZHONGWENMING',
        required: true,
        rule: [{
            required: true,
            message: '请输入',
            trigger: 'blur'
        }]
    },
    {
        props: 'nameEn',
        name: '应⽤英文名',
        key: 'YINGYONGYINGWENMING',
        required: true,
        rule: [{
            required: true,
            message: '请输入',
            trigger: 'blur'
        }]
    },
    {
        props: 'ldapSchema',
        name: 'LDAP属性',
        key: 'Idapschema',
        required: true,
        rule: [{
            required: true,
            message: '请输入',
            trigger: 'blur'
        }]
    },
]