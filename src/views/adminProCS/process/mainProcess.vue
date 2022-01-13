<template>
    <iPage>
        <div class="content">
            <div class="leftContent" @mousedown.capture="test1" @mouseup.capture="test2">
                <div v-for="(item, idx) in projectInfoData" :key="idx">
                    <div :class="idx === currIndex ? 'shadow' : ''" class="drag-box" :id="`testDiv${idx}`" :style="{width:item.width+'px',height:item.height+'px',top:item.yoc+'px',left:item.xoc+'px', display: 'block', borderRadius: '50%'}"></div>
                </div>
                <img src="~@/assets/images/mainProcess.png" class="img-process" />
            </div>
            <div class="rightContent">
                <el-tabs v-model="activeName" class="tabs">
                    <el-tab-pane label="基本信息" name="baseInfo">
                        <BaseInfo 
                            :name="name"
                        />
                    </el-tab-pane>
                    <el-tab-pane label="项目信息" name="projectInfo" class="tab-project">
                        <ProjectInfo
                            ref="project"
                            :listData="projectInfoData"
                            @handelStyle="handelStyle"
                            @getProjectId="getProjectId"
                            @addData="addData"
                        />
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </iPage>
</template>

<script>
import { iPage } from 'rise'
import BaseInfo from './components/baseInfo'
import ProjectInfo from './components/projectInfo'
export default {
    name: 'mainProcess',
    components: {
        iPage,
        BaseInfo,
        ProjectInfo
    },
    data() {
        return {
            startX: null,
            startY: null,
            endX: null,
            endY: null,
            currWidth:null,
            currHeight: null,
            clickFlag: false,
            activeName: 'baseInfo',
            name: '主流程图',
            projectInfoData: [
                {
                    name: 'add',
                    height: '',
                    width: ''
                }
            ],
            currIndex: 0,
            modifyFlag: false
        }
    },
    computed: {
        indexVal() {
            return this.currIndex
        }
    },
    methods: {
        test1(e) {
			this.startX = e.layerX
			this.startY = e.layerY
			this.clickFlag = true
		},
        test2(e) {
			this.endX = e.layerX
			this.endY = e.layerY
			this.clickFlag = false
			if (this.startX && this.startY && this.endX && this.endY) {
				this.currWidth = this.endX - this.startX
				this.currHeight = this.endY - this.startY
                // this.$nextTick(()=> {
                    console.log(`testDiv${this.currIndex}`)
                    let divIndex = null
                    if (this.modifyFlag) {
                        console.log('modify')
                        divIndex = this.currIndex
                    } else{
                        console.log('add')
                        divIndex = this.projectInfoData.length - 1
                    }
                    console.log(divIndex, '22222')
                    let testDiv = document.getElementById(`testDiv${this.modifyFlag ? this.currIndex : this.projectInfoData.length - 1}`)
                    console.log('test div', testDiv);
                    testDiv.style.display = 'block'
                    testDiv.style.top = `${this.startY}px`
                    testDiv.style.left = `${this.startX}px`
                    testDiv.style.width = `${this.currWidth}px`
                    testDiv.style.height = `${this.currHeight}px`
                    testDiv.style.borderRadius = '50%'
                // })
                let obj = {
                    yoc: this.startY,
                    xoc: this.startX,
                    width: this.currWidth,
                    height: this.currHeight
                }
                if (this.modifyFlag) {
                    console.log(this.currIndex, '12222')
                    obj.name = this.projectInfoData[this.currIndex + 1].name
                    obj.contentId = this.projectInfoData[this.currIndex + 1].contentId
                    let testArrData = JSON.parse(JSON.stringify(this.projectInfoData))
                    // this.projectInfoData.splice(this.currIndex + 1, 1, obj)
                    testArrData[this.currIndex + 1] = obj
                    this.projectInfoData.splice(0, 0)
                    this.projectInfoData = testArrData
                    /* this.$nextTick(() => {
                        this.projectInfoData = testArrData
                        this.$forceUpdate()
                    }) */
                    // debugger
                }
                // this.modifyFlag = false
                this.$refs.project.initItem(obj)
			}
		},
        handelStyle(e, va) {
            let testDiv = document.getElementById(`testDiv${this.currIndex}`)
            if (va === 'x') {
                testDiv.style.left = `${e}px`
            } else if (va === 'y') {
                testDiv.style.top = `${e}px`
            } else if (va === 'width') {
                testDiv.style.width = `${e}px`
            } else {
                testDiv.style.height = `${e}px`
            }
        },
        getCircleId(idx) {
            this.currIndex = idx - 1
        },
        getProjectId(index) {
            if (index !== 0) {
                this.modifyFlag = true
            }
            this.currIndex = index - 1
        },
        addData(list, flag) {
            this.projectInfoData = list
            this.modifyFlag = flag
        }
    }
}
</script>

<style lang="scss" scoped>
    .content {
        display: flex;
        flex: 1;
        flex-direction: row;
        height: 100%;
        .leftContent {
            width: 80%;
            height: 100%;
            border-right: 1px solid rgb(190, 184, 184);
            overflow: auto;
            position: relative;
            .img-process {
                width: 100%;
                pointer-events: none;
            }
            .drag-box {
                position: absolute;
                display: none;
                background-color: red;
                pointer-events: none;
            }
        }
        .rightContent {
            width: 20%;
            height: 90%;
        }
    }

    ::v-deep .tabs {
        height: 100%;
        .el-tab-pane {
            height: 100%;
        }
        .el-tabs__content {
            height: 100%;
        }   
        .el-tab-pane {
            height: 100%;
        }
    }
    .shadow {
        box-shadow: 10px 10px 5px #888888;
    }
</style>