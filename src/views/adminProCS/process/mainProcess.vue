<template>
    <iPage>
        <div class="content">
            <div class="leftContent" @mousedown="test1" @mouseup="test2">
                <div v-for="(item, idx) in projectInfoData" :key="idx">
                    <div class="drag-box" :id="`testDiv${idx}`" @click="getID(idx)"></div>
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
                            @getId="getId"
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
            currId: 0
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
				let testDiv = document.getElementById(`testDiv${this.currId}`)
				testDiv.style.display = 'block'
				testDiv.style.top = `${this.startY}px`
				testDiv.style.left = `${this.startX}px`
				testDiv.style.width = `${this.currWidth}px`
				testDiv.style.height = `${this.currHeight}px`
				testDiv.style.borderRadius = '50%'
                let obj = {
                    yoc: this.startY,
                    xoc: this.startX,
                    width: this.currWidth,
                    height: this.currHeight
                }
                this.$refs.project.initItem(obj)
			}
		},
        handelStyle(e, va) {
            let testDiv = document.getElementById(`testDiv${this.currId}`)
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
        getID(idx) {
            this.currId = idx - 1
        },
        getId(index) {
            this.index = index - 1 
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
</style>