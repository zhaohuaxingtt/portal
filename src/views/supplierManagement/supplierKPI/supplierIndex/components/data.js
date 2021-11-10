/*
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-08-05 15:41:21
 * @LastEditors: zbin
 * @Descripttion: your project
 */
export const supplierTableTitle = [
    //   {
    //     type: 'selection',
    //     width: 50
    //   },
      {
        props: 'name',
        name: '任务名称',
        key: 'APPROVAL.TASK_NAME',
        tooltip: true
      },
      {
        props: 'content',
        name: '任务描述',
        key: 'CONTENT',
        tooltip: true
      },
      {
        props: 'initiationDate',
        name: '发起时间',
        key: 'APPROVAL.THE_START_TIME',
        tooltip: true
      },
      {
        props: 'deadlineDate',
        name: '截止时间',
        key: 'APPROVAL.DEADLINE_TIME',
        tooltip: true
      },
      {
        props: 'processingStatusName',
        name: '任务状态',
        key: 'APPROVAL.TASK_STATUS',
        tooltip: true
       
      },
      {
        props: 'manipulate',
        name: '操作',
        key: 'CAOZUO',
        tooltip: true
       
      }
    ]