/*
 * @Author: YoHo
 * @Date: 2022-03-31 21:27:43
 * @LastEditTime: 2022-04-01 10:36:33
 * @LastEditors: YoHo
 * @Description: 
 */
import online from './online'
import mainData from './mainData'
import messageManagement from './messageManagement'
import ProCS from './ProCS'
import assistant from './assistant'
import ReportForm from './reportForm'
import partLifeCycle from './partLifeCycle'
import others from './others'
import meetingType from './meetingType'
import questionnaire from './questionnaire'
import terms from './terms'
import supplier from "./supplier";
export default {
  ...online,
  ...mainData,
  ...messageManagement,
  ...ProCS,
  ...assistant,
  ...ReportForm,
  ...online,
  ...partLifeCycle,
  ...others,
  ...meetingType,
  ...questionnaire,
  ...terms,
  ...supplier
}
