import online from './online'
import mainData from './mainData'
import messageManagement from './messageManagement'
import ProCS from './ProCS'
import ReportForm from './reportForm'
export default {
  ...online,
  ...mainData,
  ...messageManagement,
  ...ProCS,
  ...ReportForm
}
