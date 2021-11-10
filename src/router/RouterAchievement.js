//updated by dolphin on 5/19/2020, 7:54:14 PM.

"use strict";

import Achievement from '../views/purchase/achievement/index'; //基础业绩
import Mymerit from '../views/purchase/achievement/mymerit/index'; //我的业绩
import OutputManagement from '../views/purchase/outputManagement/index'; // 产量管理
import BatchDetail from '../views/purchase/batchDetail/index'; // 批量件详情



export default [
    {
        path: '/achievement/baseData/mymerit',
        name: 'Mymerit',
        component: Mymerit
    },
    {
        path: '/achievement/baseData/list',
        name: 'Achievement',
        component: Achievement
    },
    {
        path: '/achievement/baseData/outputManagement',
        name: 'OutputManagement',
        component: OutputManagement
    },
    {
        path: '/achievement/baseData/targetManage',
        name: 'BatchDetail',
        component: BatchDetail
    },
]
