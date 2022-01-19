/*
 * @Author: HS
 * @FilePath: \front-portal\src\views\meeting\managementHall\mbdlMeeting\component\dataDay.js
 */
import dayjs from '@/utils/dayjs.js';
// 会议列表查询字段
export const MEETING_SEARCH_DATA = {
    meetingName: null,
    meetingTypeId: 149,
    startDateBegin: null,
    startDateEnd: null,
    states: [],
    weekOfYears: []
  }
  let weekNum = dayjs(dayjs().year()).isoWeeksInYear();
  let weekListInit = [];
  for (let index = 0; index < weekNum; index++) {
    if (index < 9) {
      weekListInit.push({
        label: 'CW0' + (index + 1) + '/' + weekNum,
        value: index
      });
    } else {
      weekListInit.push({
        label: 'CW' + (index + 1) + '/' + weekNum,
        value: index
      });
    }
  }
  export { weekListInit }
  // 会议列表表头
  export const MEETING_TABLE_COLUMNS = [
    {
      props: 'name',
      name: '会议名称',
      key: 'HUIYIMINGCHENG'
    },
    {
      props: 'meetingTypeName',
      name: '会议类型',
      key: 'HUIYILEIXING'
    },
    {
      props: 'state',
      name: '会议状态',
      key: '会议状态'
    },
    {
      props: 'meetingPlace',
      name: '会议地点',
      key: 'HUIYIDIDIAN'
    },
    {
      props: 'startDate',
      name: '会议时间',
      key: '会议时间'
    },
    {
      props: 'weekOfYear',
      name: '周次',
      key: '周次'
    }
  ]