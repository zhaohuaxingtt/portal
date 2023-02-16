/*
 * @Author: your name
 * @Date: 2021-08-04 20:49:10
 * @LastEditTime: 2022-02-18 20:00:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\kpiChart\components\data.js
 */
/*
    设置开始点 start:true
    设置开始点 start:true
*/
import { getDictByCode } from '@/api/dictionary'

export const tabSetting = [
  {
    prop: 'nameZh',
    label: '供应商名称'
  },
  {
    prop: 'all',
    label: 'KPI(ALL)'
  },
  {
    prop: 'cs',
    label: 'KPI(CS)',
    icon: 'el-icon-minus',
    start: true
  },
  {
    prop: 'mq',
    label: 'KPI(MQ)'
  },
  {
    prop: 'tp',
    label: 'KPI(EP)'
  },
  {
    prop: 'tl',
    label: 'KPI(PL)'
  },
  {
    prop: 'sa',
    label: 'KPI(SA)'
  }
]

export const tabsetting = [
  {
    type: 'selection',
    width: 50
  },
  {
    prop: '#',
    label: '#',
    i18n: '#',
    width: 50,
    align: 'center'
  },
  {
    prop: 'nameZh',
    label: '供应商名称',
    i18n: 'LK_GONGYINGSHANGMINGCHENG1',
    align: 'center',
    tooltip: true
  }
]
export const KeyNoteTableTitle = [
  {
    props: 'createDate',
    name: '加⼊重点追踪时间',
    key: 'CREATEDATA',
    tooltip: true
  },
  {
    props: 'removeDate',
    name: '移除重点追踪时间',
    key: 'REMOVEDATA',
    tooltip: true,
    icon: 'iconxinxitishi',
    iconTextKey: '',
    iconText: '若移除时间为空⽩，表示到⽬前为⽌该供应商仍为重点追踪对象。'
  },
  {
    props: 'isTakeSteps',
    name: '是否采取措施',
    key: 'ISTAKESTEPS',
    tooltip: true
  },
  {
    props: 'takeStepsContent',
    name: '措施详情',
    key: 'TAKESTEPSCONTENT',
    tooltip: true
  },

  {
    props: 'categoryName',
    name: '加⼊原因',
    key: 'JIARUYUANYIN',
    tooltip: true,
    icon: 'iconxinxitishi',
    iconTextKey: '',
    iconText: '因某个（些）指标连续三个半年报下降被加⼊重点追踪对象。'
  },
  {
    props: 'followUserName',
    name: '跟进⼈',
    key: 'FOLLOWUSERNAME',
    tooltip: true
  },
  {
    props: 'updateDate',
    name: '更新时间',
    key: 'UPDATEDATE',
    tooltip: true
  }
]
export const TakeNoteTableTitle = [
  {
    props: 'categoryNumberName',
    name: '指标',
    width: 160,
    key: 'CATEGORYNAME',
    tooltip: true
  },
  {
    props: 'completion',
    name: '完成情况',
    width: 100,
    key: 'COMPLETION',
    tooltip: true
  },
  {
    props: 'explanation',
    name: '解释',
    key: 'EXPLANATCION'
    // tooltip: true
  },
  {
    props: 'target',
    name: '目标',
    key: 'TARGET'
    // tooltip: true
  },
  {
    props: 'actionPlan',
    name: '行动计划',
    key: 'ACTIONPLAN'
    // tooltip: true
  }
]
export const TakeNoteTableTitleNull = [
  {
    props: 'categoryNumberName',
    name: '指标',
    key: 'CATEGORYNAME',
    tooltip: true
  },
  {
    props: 'completion',
    name: '完成情况',
    key: 'COMPLETION',
    tooltip: true
  }
]
export const TakeNoteTableTitleDialog = [
  {
    type: 'index',
    width: 60,
    label: '序号'
  },
  {
    prop: 'categoryName',
    label: '指标',
    width: 160,
    li8n: 'CATEGORYNAME',
    tooltip: true
  },
  {
    prop: 'performance',
    label: '完成情况',
    width: 100,
    li8n: 'PERFORMANCE',
    tooltip: true
  },
  {
    prop: 'explanation',
    label: '解释',
    li8n: 'EXPLANATCION',
    tooltip: true
  },
  {
    prop: 'target',
    label: '目标',
    li8n: 'TARGET',
    tooltip: true
  },
  {
    prop: 'actionPlan',
    label: '行动计划',
    li8n: 'ACTIONPLAN',
    tooltip: true
  }
]

export const listCloum = [
  {
    type: 'index',
    width: 60,
    label: '序号'
  },
  {
    prop: 'nameZh',
    label: '供应商名称',
    li8n: 'GONGYINGSHANGMINGCHENG'
  },
  {
    prop: 'sapCode',
    label: 'SAP号',
    li8n: 'SAPCODE'
  },
  {
    prop: 'halfYear',
    label: '半年报记录',
    li8n: 'BANNIANBAOJILU',
    emit: 'go-halfYear',
    customRender: (h, scope) => {
      return (
        <span class="cursor" style="color:#1763F7">
          查看
        </span>
      )
    }
  },
  {
    prop: 'takeRecord',
    label: '重点追踪记录',
    li8n: 'ZHONGDIANZHUIZONGJILU',
    icon: 'iconxinxitishi',
    iconTextKey: '',
    iconText: '当下⽅列表中“查看”为空，表示该供应商从未加⼊过重点追踪对象。',
    emit: 'go-takeRecord',
    customRender: (h, scope) => {
      if (scope.row.isKeyTrack) {
        return (
          <span class="cursor" style="color:#1763F7">
            查看
          </span>
        )
      } else {
        return <span>该供应商从未加⼊过重点追踪对象。</span>
      }
    }
  }
]

export const PointCloum = [
  {
    type: 'index',
    width: 60,
    label: '序号'
  },
  {
    prop: 'nameZh',
    label: '供应商名称',
    li8n: 'GONGYINGSHANGMINGCHENG',
    align: 'center',
    tooltip: true
  },
  {
    prop: 'sapCode',
    label: 'SAP号',
    li8n: 'SAPCODE',
    align: 'center',
    tooltip: true
  },
  {
    prop: 'halfYear',
    label: '半年报记录',
    li8n: 'BANNIANBAOJILU',
    align: 'center',
    tooltip: true,
    emit: 'go-detail',
    customRender: (h, scope) => {
      return (
        <span class="cursor" style="color:#1763F7">
          查看
        </span>
      )
    }
  },
  {
    prop: 'isTakeSteps',
    label: '是否采取措施',
    li8n: 'SHIFOUCAIQUCUOSHI',
    align: 'center',
    tooltip: true
  },
  {
    prop: 'takeStepsContent',
    label: '采取措施详情',
    li8n: 'CAIQUCUOSHIXIANGQING',
    align: 'center',
    tooltip: true
  },
  {
    prop: 'followUserName',
    label: '跟进⼈',
    li8n: 'GENJINREN',
    align: 'center',
    tooltip: true
  },
  {
    prop: 'updateDate',
    label: '更新时间',
    li8n: '更新时间',
    align: 'center',
    tooltip: true
  }
]
// 数据字典查询
export const dictByCode = async function (key) {
  let dicResult = []
  let res = await getDictByCode(key)
  if (res.data) {
    res.data.filter((result) => {
      if (result.code === key) {
        dicResult = result.subDictResultVo || []
      }
    })
    return dicResult
  }
}