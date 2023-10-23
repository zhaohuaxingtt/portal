<template>
  <div class='process-horizontal'>
    <template v-for='(item, index) of nodeAnchors'>
      <div
        v-if='index !== 0 && index < nodeAnchors.length'
        :key='index'
        class='divider'
        :class='{ active: true }'
      ></div>
      <div class='node' :key='index' @click='gotoAnchors(item.anchorsId)'>
        <div class='title'>
          {{ item.title }}
        </div>
        <div class='node-icon'>
          <icon symbol size='30' :name='getIcon(item)' />
        </div>
      </div>
    </template>
  </div>
</template>
<script>
  import iSteps from '@/components/iSteps'
  import iStep from '@/components/iStep'
  import { Icon } from 'rise'

  export default {
    name: 'processNodeAnchors',
    components: { iSteps, iStep, Icon },
    data() {
      return {
        nodeAnchors: [
          // this.genNodeAnchors({ title: 'APPROVAL_INSTRUCTIONS', anchorsId: 'APPROVAL_INSTRUCTIONS' }),
          // this.genNodeAnchors({ title: 'APPROVAL_ATTACHMENTS', anchorsId: 'APPROVAL_ATTACHMENTS' }),
          // this.genNodeAnchors({ title: 'APPROVAL_DETAILS', anchorsId: 'APPROVAL_DETAILS' }),
          // this.genNodeAnchors({ title: 'APPROVAL_FLOW', anchorsId: 'APPROVAL_FLOW' }),
          // this.genNodeAnchors({ title: 'APPROVAL_RECORDS', anchorsId: 'APPROVAL_RECORDS' })
          this.genNodeAnchors({ title: '审批说明', anchorsId: 'APPROVAL_INSTRUCTIONS' }),
          this.genNodeAnchors({ title: '审批附件', anchorsId: 'APPROVAL_ATTACHMENTS' }),
          this.genNodeAnchors({ title: '审批详情', anchorsId: 'APPROVAL_DETAILS' }),
          this.genNodeAnchors({ title: '审批流', anchorsId: 'APPROVAL_FLOW' }),
          this.genNodeAnchors({ title: '审批记录', anchorsId: 'APPROVAL_RECORDS' })
        ],
        active: -1,
        NEED_SCROLL_TOP_ANCHORS: ['APPROVAL_INSTRUCTIONS', 'APPROVAL_ATTACHMENTS', 'APPROVAL_DETAILS']
      }
    },
    methods: {
      getIcon(item) {
        // if (this.isEnd) {
        //   return 'iconshenpiliu-yishenpi'
        // }
        // if (['已提交', '已审批'].includes(item.status)) {
        //   return 'iconshenpiliu-yishenpi'
        // }
        // if (item.status === '审批中') {
        return 'iconshenpiliu-shenpizhong'
        // }
        // return 'iconshenpiliu-daishenpi'
      },
      gotoAnchors(anchorsId) {
        if(this.NEED_SCROLL_TOP_ANCHORS.indexOf(anchorsId) !== -1) {
          document.getElementById(anchorsId).scrollIntoView()
          this.$nextTick(()=> {
            document.getElementsByClassName("approval-detail")[0].scrollTo(0, 0)
          })
        } else {
          this.$nextTick(()=> {
            document.getElementById(anchorsId).scrollIntoView()
          })
        }
      },
      genNodeAnchors(data) {
        return {
          title: data.title,
          anchorsId: data.anchorsId
        }
      }
    }
  }
</script>
<style lang='scss' scoped>
  $primaryColor: #67C23A;
  $borderColor: #cbcbcb;
  .process-horizontal {
    display: flex;
    justify-content: flex-start;
    /* height: 200px; */
    .divider {
      width: 160px;
      height: 1px;
      border-bottom: dashed 2px $borderColor;
      margin-top: 50px;

      &.active {
        border-bottom: solid 1px $primaryColor;
      }
    }

    .node {
      position: relative;

      .title {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 20px;
        text-align: center;
        min-height: 16px;
        position: absolute;
        top: 0px;
        left: 50%;
        transform: translateX(-50%);
        white-space: nowrap;
      }

      .title-placeholder {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 20px;
        text-align: center;
        min-height: 16px;
        color: #fff;
        opacity: 0;
      }

      .node-icon {
        width: 100%;
        height: 20px;
        margin: 20px 0px;

        border-radius: 50%;
        font-size: 20px;
        text-align: center;
        display: flex;
        justify-content: center;
        margin-top: 40px;
      }

      .placeholder {
        li {
          width: 10px;
          height: 21px;
        }
      }

      .content {
        &.normal {
          text-align: center;
        }

        &.list.active-border {
          &::before {
            background-color: $color-blue;
          }
        }

        &.list {
          position: absolute;
          top: 80px;
          left: 26px;
          font-size: 14px;

          &::before {
            content: '';
            display: block;
            width: 1px;
            height: 20px;
            background-color: $borderColor;
            border-radius: 50%;
            position: absolute;
            left: 0;
            top: -19px;
            z-index: 3;
          }

          .name {
            display: block;
            width: 70px;
            text-align: left;
          }

          .link {
            color: $primaryColor;
          }

          li {
            display: flex;
            position: relative;
            margin: 0px 0px 5px 0px;
            padding-left: 22px;
            font-size: 14px;
            white-space: nowrap;
            clear: both;

            &::before {
              content: '';
              display: block;
              width: 11px;
              height: 11px;
              border: solid 1px $borderColor;
              border-radius: 50%;
              background: #fff;
              position: absolute;
              left: -6px;
              top: 50%;
              transform: translateY(-50%);
              z-index: 2;
            }

            &::after {
              content: '';
              display: block;
              width: 1px;
              height: 100%;
              background-color: $borderColor;
              border-radius: 50%;
              position: absolute;
              left: 0;
              top: 50%;
              transform: translateY(-50%);
              z-index: 1;
            }
          }

          li.active {
            &::before {
              border: solid 1px $primaryColor;
              background: $primaryColor;
            }

            &::after {
              background-color: $primaryColor;
            }
          }

          li:last-child {
            &::after {
              height: 50%;
              top: 0;
              transform: translateY(0);
            }
          }
        }

        &.list.active {
          &::before {
            background-color: $primaryColor;
          }
        }

        .single-user {
          position: relative;

          .single-user-placeholder {
            color: #fff;
          }

          .single-user-name {
            position: absolute;
            bottom: 0px;
            left: 50%;
            transform: translateX(-50%);
            white-space: nowrap;
          }
        }
      }
    }
    .node:hover {
      cursor: pointer;
    }
  }
</style>
