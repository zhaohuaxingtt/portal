import {permissionTitle} from '@/utils'

/*export const historyTableTitle = permissionTitle("SUPPLIER_ENTERPRISEHISTORY_ENTERPRISEHISTORYTABLE", [
    {props: 'updateDate', name: '变更时间', key: 'BANGENGSHIJIAN'},
    {props: 'historyChangedItem', name: '变更内容', key: 'BANGENLEIRONG'},
    {props: 'historyBefore', name: '变更前', key: 'BANGENGQIAN'},
    {props: 'historyAfter', name: '变更后', key: 'BIANGENGHOU'},
    {props: 'open', name: '变更查看', key: 'BIANGENGCHAKAN'}
])

export const subSupplierTableTitle = permissionTitle("SUPPLIER_ENTERPRISEHISTORY_CHANGEOFSHAREHOLDERTABLE", [
    {props: 'updateDate', name: '变更时间', key: 'BANGENGSHIJIAN'},
    {props: 'historyBefore', name: '股东变更前', key: 'GUDONGBANGENGQIAN'},
    {props: 'historyAfter', name: '股东变更后', key: 'GUDONGBIANGENGHOU'},
])*/

export const historyTableTitle = [
    {props: 'updateDate', name: '变更时间', key: 'BANGENGSHIJIAN'},
    {props: 'historyChangedItem', name: '变更内容', key: 'BANGENLEIRONG'},
    {props: 'historyBefore', name: '变更前', key: 'BANGENGQIAN'},
    {props: 'historyAfter', name: '变更后', key: 'BIANGENGHOU'},
    {props: 'open', name: '变更查看', key: 'BIANGENGCHAKAN'}
]

export const subSupplierTableTitle = [
    {props: 'updateDate', name: '变更时间', key: 'BANGENGSHIJIAN'},
    {props: 'historyBefore', name: '股东变更前', key: 'GUDONGBANGENGQIAN'},
    {props: 'historyAfter', name: '股东变更后', key: 'GUDONGBIANGENGHOU'}
]

