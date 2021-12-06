/*
 * @Author: moxuan
 * @Date: 2021-03-18 17:07:22
 */

import axios from '@/utils/axios'
import $qsAjax from '@/utils/ajax'

let requst,qsAjax;

if(process.env.NODE_ENV=='dev') {
  requst = axios(process.env.VUE_APP_EKL)
  qsAjax = $qsAjax(process.env.VUE_APP_EKL)
} else {
  requst = axios()
  qsAjax = $qsAjax()
}
// 采购员列表查询接口
export function getLinie(data) {
    return requst({
        url: `/riseekl/baseController/getLinie`,
        method: 'POST',
        data
    })
}

// 科室列表查询接口
export function getDeptListByParam(data) {
    return requst({
        url: `/riseekl/baseController/getDeptListByParam`,
        method: 'POST',
        data
    })
}
/*
* EKL车型产量主表-WEB
* */

// EKL车型产量主表-删除接口
export function cartypeDelete(data) {
    return requst({
        url: `/riseekl/eklCartypeOutputEntity/delete`,
        method: 'POST',
        data
    })
}

// downloadExampleExcel
export function downloadExampleExcel(data) {
    return requst({
        url: `/riseekl/eklCartypeOutputEntity/downloadExampleExcel`,
        method: 'GET',
        data,
        responseType: "blob"
    }).then(res => {
        let url = window.URL.createObjectURL(res)
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', `批量件预算产量管理.xlsx`)
        document.body.appendChild(link)
        link.click()
    })
}
// /riseekl/eklCartypeOutputEntity/download?id=1
export function download(id,name) {
    return requst({
        url: `/riseekl/eklCartypeOutputEntity/download?id=`+id,
        method: 'GET',
        responseType: "blob"
    }).then(res => {
        let url = window.URL.createObjectURL(res)
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', `${name}.xlsx`)
        document.body.appendChild(link)
        link.click()
    })
}
// EKL车型产量主表-导入产量接口
export function importEklCartypeOutput(data) {
    return requst({
        url: `/riseekl/eklCartypeOutputEntity/importEklCartypeOutput`,
        method: 'POST',
        data
    })
}

// EKL车型产量主表-列表查询接口
export function cartypeOutputList(data) {
    return requst({
        url: `/riseekl/eklCartypeOutputEntity/page`,
        method: 'POST',
        data
    })
}

/*
* 业绩基础主表接口-WEB
* */

// 获取状态列表
export function getStatus(data) {
    return requst({
        url: `/riseekl/seriesbaseEntity/getStatus`,
        method: 'POST',
        data
    })
}

// 业绩基础list
export function getAchievementList(data) {
    return requst({
        url: `/riseekl/seriesbaseEntity/page`,
        method: 'POST',
        data
    })
}

// 创建业绩基础
export function create(data) {
    return requst({
        url: `/riseekl/seriesbaseEntity/create`,
        method: 'POST',
        data
    })
}

// 业绩基础主表-发起确认接口
export function baseAchievementConfirm(data) {
    return requst({
        url: `/riseekl/seriesbaseEntity/confirm`,
        method: 'POST',
        data
    })
}

// 业绩基础主表-创建含文件业绩基础接口
export function baseAchievementCreate2(data) {
    return requst({
        url: `/riseekl/seriesbaseEntity/create2`,
        method: 'POST',
        data
    })
}

// 业绩基础主表-查询是否有明细数据接口
export function hasConfirmDetail(data) {
    return requst({
        url: `/riseekl/seriesbaseEntity/hasConfirmDetail`,
        method: 'POST',
        data
    })
}

// 批量件-导入接口
export function batchImport(data) {
    return requst({
        url: `/riseekl/seriesbaseEntity/import`,
        method: 'POST',
        data
    })
}

// 业绩基础主表-失效接口
export function invalid(data) {
    return requst({
        url: `/riseekl/seriesbaseEntity/invalid`,
        method: 'POST',
        data
    })
}

// 业绩基础主表-我的业绩查询接口
export function mySeries(data) {
    return requst({
        url: `/riseekl/seriesbaseEntity/mySeries`,
        method: 'POST',
        data
    })
}

/*
*年度目标相关接口Year Target Controller
* */

// 获取年份
export function getYear(data) {
    return requst({
        url: `/riseekl/yearTargetEntity/getMonth`,
        method: 'POST',
        data
    })
}

// 获取目标头数据
export function queryYearTarget(data) {
    return qsAjax({
        url: `/riseekl/yearTargetEntity/queryYearTarget`,
        method: 'POST',
        data
    })
}

//  新增修改年度头数据
export function saveOrUpYearTarget(data) {
    return requst({
        url: `/riseekl/yearTargetEntity/saveOrUpYearTarget`,
        method: 'POST',
        data
    })
}

/*
*品牌年度目标相关接口
* */

// 获取品牌内容
export function querybrandTarget(data) {
    return qsAjax({
        url: `/riseekl/brandTargetEntity/querybrandTarget`,
        method: 'POST',
        data
    })
}

//  修改品牌数据
export function upBrandTarget(data) {
    return requst({
        url: `/riseekl/brandTargetEntity/upBrandTarget`,
        method: 'POST',
        data
    })
}

/*
* 批量件业绩基础明细表-WEB
* */

// 批量件业绩基础明细表确认按钮
export function affirmSeriesbaseDetail(data) {
    return requst({
        url: `/riseekl/seriesbaseDetailEntity/affirmSeriesbaseDetail`,
        method: 'POST',
        data
    })
}

// 批量编辑修改批量件业绩基础明细表
export function batchUpdateSeriesbaseDetail(data) {
    return qsAjax({
        url: `/riseekl/seriesbaseDetailEntity/batchUpdateSeriesbaseDetail`,
        method: 'POST',
        data
    })
}

// 批量件业绩基础明细表-发起确认接口
export function confirm(data) {
    return requst({
        url: `/riseekl/seriesbaseDetailEntity/confirm`,
        method: 'POST',
        data
    })
}

// 批量件业绩基础明细表导出功能
export function exportSeriesbaseDetail(data) {
    return requst({
        url: `/riseekl/seriesbaseDetailEntity/exportSeriesbaseDetail`,
        method: 'POST',
        data,
        responseType: "blob"
    }).then(res => {
        let url = window.URL.createObjectURL(res)
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', `批量件.zip`)
        document.body.appendChild(link)
        link.click()
    })
}

// 获取批量件业绩头部数据
export function getHeadBaseDetail(data) {
    return qsAjax({
        url: `/riseekl/seriesbaseDetailEntity/getHeadBaseDetail`,
        method: 'POST',
        data
    })
}

//获取供应商数据
export function getSupplier(data) {
    return qsAjax({
        url: `/riseekl/seriesbaseDetailEntity/getSupplier`,
        method: 'POST',
        data
    })
}

// 初始化下拉数据 批量件搜索条件
export function queryAllDropdown(data) {
    return requst({
        url: `/riseekl/seriesbaseDetailEntity/queryAllDropdown`,
        method: 'POST',
        data
    })
}

// 查询批量件业绩基础明细表
export function querySeriesbaseDetail(data) {
    return requst({
        url: `/riseekl/seriesbaseDetailEntity/querySeriesbaseDetail`,
        method: 'POST',
        data
    })
}

// 修改批量件业绩基础明细表
export function updateSeriesbaseDetail(data) {
    return requst({
        url: `/riseekl/seriesbaseDetailEntity/updateSeriesbaseDetail`,
        method: 'POST',
        data
    })
}

// 版本号下拉数据
export function versionList(data) {
    return requst({
        url: `/riseekl/seriesbaseEntity/versionList`,
        method: 'POST',
        data
    })
}

/*
*年度业绩明细接口
* */

// 初始化数据保存
export function querySavaTarget(data) {
    return qsAjax({
        url: `/riseekl/yearTargetDetailEntity/querySavaTarget`,
        method: 'POST',
        data
    })
}

// 获取科室数据
export function queryYearTargetDetail(data) {
    return qsAjax({
        url: `/riseekl/yearTargetDetailEntity/queryYearTargetDetail`,
        method: 'POST',
        data
    })
}

//  发送站内信
export function sendLetter(data) {
    return qsAjax({
        url: `/riseekl/yearTargetDetailEntity/sendLetter`,
        method: 'POST',
        data
    })
}

// 修改科室数据
export function upYearTargetDetail(data) {
    return requst({
        url: `/riseekl/yearTargetDetailEntity/upYearTargetDetail`,
        method: 'POST',
        data
    })
}


// 转派
export function updateLinie(data) {
    return requst({
        url: `/riseekl/seriesbaseDetailEntity/updateLinie`,
        method: 'POST',
        data
    })
}

// 业绩基础明细-转派给自己
export function updateLinieToMe(data) {
    return requst({
        url: `/riseekl/seriesbaseDetailEntity/updateLinieToMe`,
        method: 'POST',
        data
    })
}

// 根据部门查询采购员列表接口
export function getLinieByDeptId(data) {
    return requst({
        url: `/riseekl/baseController/getLinieByDeptId`,
        method: 'POST',
        data
    })
}

// 年度添头-科室查询接口
export function getDepartment(data) {
    return requst({
        url: `/riseekl/eklAdjustKeEntity/listEklAdjustKe`,
        method: 'POST',
        data
    })
}

// 年度添头-产品家族查询
export function getProductFamily(data) {
    return requst({
        url: `/riseekl/eklAdjustCartypeEntity/listEklAdjustKe`,
        method: 'POST',
        data
    })
}

// 年度添头-保存接口
export function aveEklAdjust(data) {
    return requst({
        url: `/riseekl/eklAdjustKeEntity/saveEklAdjust`,
        method: 'POST',
        data
    })
}

// 月度批量件明细

// 月度批量件业绩基础明细导出功能
export function exportMonthPartlistDetail(data) {
    return requst({
        url: `/riseekl/monthPartlistDetailEntity/exportMonthPartlistDetail`,
        method: 'POST',
        data,
        responseType: "blob"
    }).then(res => {
        let url = window.URL.createObjectURL(res)
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', `${data.downName}`)
        document.body.appendChild(link)
        link.click()
    })
}

// 获取零件跟踪类型
export function getTrackingType(data) {
    return requst({
        url: `/riseekl/monthPartlistDetailEntity/getTrackingType`,
        method: 'POST',
        data
    })
}

// 查询月度批量件业绩基础明细
export function queryMonthPartlistDetail(data) {
    return requst({
        url: `/riseekl/monthPartlistDetailEntity/queryMonthPartlistDetail`,
        method: 'POST',
        data
    })
}

// 修改月度批量件业绩基础明细表
export function updateMonthPartlistDetail(data) {
    return requst({
        url: `/riseekl/monthPartlistDetailEntity/updateMonthPartlistDetail`,
        method: 'POST',
        data
    })
}
// 追踪记录
export function getMonthPartlistById(data) {
    return requst({
        url: `/riseekl/monthPartlistEntity/getMonthPartlistById`,
        method: 'POST',
        data
    })
}
// 刷新
export function saveTask(data) {
    return requst({
        url: `/riseekl/monthPartlistTaskEntity/saveTask`,
        method: 'POST',
        data
    })
}
// 零件类型改变
export function updatepartType(data) {
    return qsAjax({
        url: `/riseekl/seriesbaseDetailEntity/updatepartType`,
        method: 'POST',
        data
    })
}

// 报表接口
export function getPowerBiVal(data) {
    return requst({
        url: `/riseekl/piEklreportEntity/getPowerBiVal`,
        method: 'POST',
        data
    })
}
/*
* 配附件
* */

// 批量件业绩基础明细表确认按钮 配附件
export function affirmSpbaseDetail(data) {
    return requst({
        url: `/riseekl/spBasedetailEntity/affirmSpbaseDetail`,
        method: 'POST',
        data
    })
}

// 批量件导出功能
export function exportSpbaseDetail(data) {
    return requst({
        url: `/riseekl/spBasedetailEntity/exportSpbaseDetail`,
        method: 'POST',
        data,
        responseType: "blob"
    }).then(res => {
        let url = window.URL.createObjectURL(res)
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', `批量件附件.xlsx`)
        document.body.appendChild(link)
        link.click()
    })
}

// 获取配附件业绩头部数据
export function getHeadspBaseDetail(data) {
    return qsAjax({
        url: `/riseekl/spBasedetailEntity/getHeadBaseDetail`,
        method: 'POST',
        data
    })
}

// 初始化下拉数据
export function querySpareAllDropdown(data) {
    return qsAjax({
        url: `/riseekl/spBasedetailEntity/queryAllDropdown`,
        method: 'POST',
        data
    })
}

// 查询配附件业绩基础明细表
export function querySpbaseDetail(data) {
    return requst({
        url: `/riseekl/spBasedetailEntity/querySpbaseDetail`,
        method: 'POST',
        data
    })
}

// 获取配附件年度业绩
export function querySpYearTarget(data) {
    return qsAjax({
        url: `/riseekl/spYearTargetEntity/querySpYearTarget`,
        method: 'POST',
        data
    })
}

// 修改年度头数据
export function saveSpYearTarget(data) {
    return requst({
        url: `/riseekl/spYearTargetEntity/saveOrUpYearTarget`,
        method: 'POST',
        data
    })
}

// 获取配附件年度业绩明细数据接口
export function querySpYearTargetDetail(data) {
    return qsAjax({
        url: `/riseekl/spYearTargetDetailEntity/querySpYearTargetDetail`,
        method: 'POST',
        data
    })
}

// 修改配附件年度业绩科室数据
export function updateSpYearTargetDetail(data) {
    return requst({
        url: `/riseekl/spYearTargetDetailEntity/updateSpYearTargetDetail`,
        method: 'POST',
        data
    })
}


// 配附件业绩进度跟踪导出功能接口
export function exportSpTrackDetail(data) {
    return requst({
        url: `/riseekl/spTrackDetailEntity/exportSpbaseDetail`,
        method: 'POST',
        data,
        responseType: "blob"
    }).then(res => {
        let url = window.URL.createObjectURL(res)
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', `配附件业绩进度跟踪.xlsx`)
        document.body.appendChild(link)
        link.click()
    })
}

// 查询配附件业绩基础明细表
export function querySpTrackDetail(data) {
    return requst({
        url: `/riseekl/spTrackDetailEntity/querySpTrackDetail`,
        method: 'POST',
        data
    })
}


// 配附件业绩进度跟踪头部数据
export function querySum(data) {
    return requst({
        url: `/riseekl/spTrackDetailEntity/querySum`,
        method: 'POST',
        data
    })
}

// 下载上传模板
export function downloadSptemplate(data) {
    return requst({
        url: `/riseekl/seriesbaseEntity/downloadExampleExcel`,
        method: 'GET',
        data,
        responseType: "blob"
    }).then(res => {
        let url = window.URL.createObjectURL(res)
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', `配附件基础表模板.xlsx`)
        document.body.appendChild(link)
        link.click()
    })
}
// 业绩基础明细转派
export function updateSpLinie(data) {
    return requst({
        url: `/riseekl/spBasedetailEntity/updateLinie`,
        method: 'POST',
        data
    })
}

// 业绩基础明细-转派给自己
export function updateSpLinieToMe(data) {
    return requst({
        url: `/riseekl/spBasedetailEntity/updateLinieToMe`,
        method: 'POST',
        data
    })
}