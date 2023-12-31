/*
 * @Author: 舒杰
 * @Date: 2021-07-12 16:07:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\router\RouterSupplierApprove.js
 */
//updated by dolphin on 5/19/2020, 7:54:14 PM.

// 'use strict'
import CorrectionApprovalDetails from '../views/generalPage/correctionApprovalDetails/index'
import CorrectionApprovalDetailsGP from '../views/generalPage/correctionApprovalDetailsGP/index'
import CorrectioDetailsGP from '../views/generalPage/correctioDetailsGP/index'
import DepthReportApproval from '../views/bpm/frmRatingApproval/depthReportApproval'
import FrmRatingApproval from '../views/bpm/frmRatingApproval/depthRatingApproval'
import NewsupplierratingTask from '../views/frmRating/newSupplierRating/task'
import generalSupplierApprove from '../views/generalPage/generalSupplierApprove/index'
import ApproveDetails from '../views/generalPage/approveDetails/index'
import ChangeApprovalDetails from '../views/generalPage/changeApprovalDetails/index'
import ConversionDetails from '../views/generalPage/conversionDetails/index'
import inactiveYears from "../views/generalPage/approveDetails/approveInactiveYears"
export default [
  {
    path: '/supplier/correction-approval-details',
    name: 'correctionApprovalDetails',
    component: CorrectionApprovalDetails
  },
  {
    path: '/supplier/correction-approval-details-gp-admin',
    name: 'correctionApprovalDetailsGp',
    component: CorrectionApprovalDetailsGP
  },
  {
    path:"/supplier/correction-approval-details-attachment-changelist",
    name: 'correctionApprovalchangelist',
    component: CorrectioDetailsGP
  },
  {
    path: '/approval/frmRatingApproval/depthReportApproval',
    name: 'depthReportApproval',
    component: DepthReportApproval
  },
  {
    path: '/approval/frmRatingApproval/depthRatingApproval',
    name: 'frmRatingApproval',
    component: FrmRatingApproval
  },
  {
    path: '/supplier/frmrating/newsupplierrating/task',
    name: 'newsupplierratingTask',
    component: NewsupplierratingTask
  },
  {
    path: '/supplier/approve-details',
    name: 'approveDetails',
    component: ApproveDetails
  },
  {
    path: '/supplier/approval/gpAdmittance',
    name: 'indexGp',
    component: () => import('@/views/generalPage/approveDetails/indexGp')
  },
  {
    path: '/supplier/change-approval-details',
    name: 'changeApprovalDetails',
    component: ChangeApprovalDetails
  },
  {
    path: '/supplier/inactiveYears',
    name: 'supplierInactiveYears',
    component: inactiveYears
  },
  {
    path: '/supplier/conversion-details',
    name: 'conversionDetails',
    component: ConversionDetails
  },
  {
    path: '/supplier/generalSupplierApprove',
    name: 'generalSupplierApprove',
    component: generalSupplierApprove
  },


]
