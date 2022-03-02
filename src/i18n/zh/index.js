import online from './online'
import mainData from './mainData'
import messageManagement from './messageManagement'
import ProCS from './ProCS'
import assistant from './assistant'
export default {
  ...online,
  ...mainData,
  ...messageManagement,
  ...ProCS,
  ...assistant
}
