<template>
    <iSearch @reset="handleSearchReset" @sure="getTableList" :icon="false">
        <el-form>
            <!--第一行-->
            <el-row class="margin-bottom10">
                <!--零件号-->
                <el-form-item :label="$t('EKL_YJGL_LJHAO')">
                    <iInput :placeholder="$t('LK_QINGSHURU')" v-model="form.partNumber"></iInput>
                </el-form-item>
                <!--材料组-->
                <el-form-item :label="language('EKL_CAILIAOZU','材料组')">
                    <iSelect multiple filterable :placeholder="$t('LK_QINGXUANZE')" v-model="form.csGroup">
                        <!--<el-option value="" :label="$t('all')"></el-option>-->
                        <el-option
                                :value="item.code"
                                :label="item.code+'-'+item.name"
                                v-for="item,index in allSelectObject.categoryLinieVoList"
                                :key="index"></el-option>
                    </iSelect>
                </el-form-item>
                <!--供应商-->
                <el-form-item :label="$t('EKL_YJGL_GYS')">
                    <iInput :placeholder="$t('LK_QINGSHURU')" v-model="form.supplierName"></iInput>
                </el-form-item>
                <!--采购工厂-->
                <el-form-item :label="$t('EKL_YJGL_CGGC')">
                    <iSelect multiple filterable :placeholder="$t('LK_QINGXUANZE')" v-model="form.factoryCode">
                        <!--<el-option value="" :label="$t('all')"></el-option>-->
                        <el-option
                                :value="item.procureFactory"
                                :label="$t($i18n.locale === 'zh' ? item.procureFactory + '-' + item.factoryName : item.procureFactory + '_' + item.factoryNameEn)"
                                v-for="item in allSelectObject.purchaseFactoryVo"
                                :key="item.id"></el-option>
                    </iSelect>
                </el-form-item>
                <!--确认状态-->
                <el-form-item :label="$t('EKL_YJGL_QRZT')">
                    <iSelect :placeholder="$t('LK_QINGXUANZE')" v-model="form.isConfirm">
                        <!--<el-option value="" :label="$t('all')"></el-option>-->
                        <el-option
                                :value="item.key"
                                :label="$t($i18n.locale === 'zh' ? item.value : item.valueEN)"
                                v-for="item,index in allSelectObject.allStatus"
                                :key="index"></el-option>
                    </iSelect>
                </el-form-item>
            </el-row>

            <!--第二行-->
            <el-row class="margin-bottom10">
                <!--发动机电池包-->
                <el-form-item :label="$t('EKL_YJGL_FDJDCB')">
                    <iSelect multiple filterable :placeholder="$t('LK_QINGXUANZE')" v-model="form.engine">
                        <!--<el-option value="" :label="$t('all')"></el-option>-->
                        <el-option
                                v-for="item,index in allSelectObject.engine"
                                :value="item"
                                :label="item"
                                :key="index"></el-option>
                    </iSelect>
                </el-form-item>

                <!--变速箱-->
                <el-form-item :label="$t('EKL_YJGL_BSX')">
                    <iSelect multiple filterable :placeholder="$t('LK_QINGXUANZE')" v-model="form.transmission">
                        <!--<el-option value="" :label="$t('all')"></el-option>-->
                        <el-option
                                :value="item"
                                :label="item"
                                v-for="item,index in allSelectObject.transmission"
                                :key="index"></el-option>
                    </iSelect>
                </el-form-item>
                <!--车型等级-->
                <el-form-item :label="$t('EKL_CHEXINGDENGJI')">
                    <iSelect multiple filterable :placeholder="$t('LK_QINGXUANZE')" v-model="form.position">
                        <!--<el-option value="" :label="$t('all')"></el-option>-->
                        <el-option
                                :value="item"
                                :label="$i18n.locale === 'zh'  ? item : item"
                                v-for="item,index in allSelectObject.position"
                                :key="index"></el-option>
                    </iSelect>
                </el-form-item>
                <!--配置-->
                <el-form-item :label="$t('EKL_YJGL_PEIZ')">
                    <iInput :placeholder="$t('LK_QINGSHURU')" v-model="form.carconfigSixcodeName"></iInput>
                </el-form-item>
                <!--车型代码-->
                <el-form-item :label="$t('EKL_YJGL_CXDM')">
                    <iInput :placeholder="$t('LK_QINGSHURU')" v-model="form.carconfigSixcode"></iInput>
                </el-form-item>
            </el-row>
            <!--三行-->
            <el-row>
                <!--科室-->
                <el-form-item :label="$t('EKL_KESHI')">
                    <iSelect multiple filterable :placeholder="$t('LK_QINGXUANZE')" v-model="form.deptCode">
                        <!--<el-option value="" :label="$t('all')"></el-option>-->
                        <el-option
                                :value="item.fullCode"
                                :label="item.fullCode"
                                v-for="item,index in allSelectObject.deptDTO"
                                :key="item.id"></el-option>
                    </iSelect>
                </el-form-item>

                <!--采购员-->
                <el-form-item :label="$t('EKL_YJGL_CGY')">
                    <iSelect multiple filterable :placeholder="$t('LK_QINGXUANZE')" v-model="form.linieId">
                        <!--<el-option value="" :label="$t('all')"></el-option>-->
                        <el-option
                                :value="item.id"
                                :label="$i18n.locale === 'zh'  ? item.nameZh : item.nameEn"
                                v-for="item,index in allSelectObject.keyLinieval"
                                :key="item.id"></el-option>
                    </iSelect>
                </el-form-item>

                <!--产品家族-->
                <el-form-item :label="$t('EKL_YJGL_CPJZ')">
                    <iSelect multiple filterable :placeholder="$t('LK_QINGXUANZE')" v-model="form.carFamily">
                        <!--<el-option value="" :label="$t('all')"></el-option>-->
                        <el-option
                                :value="item.code"
                                :label="$t($i18n.locale === 'zh' ? item.code+'-'+ item.name : item.nameEn ? item.code+'-'+ item.nameEn : item.code) "
                                v-for="item,index in allSelectObject.selectDictVo"
                                :key="item.id"></el-option>
                    </iSelect>
                </el-form-item>
                <!--KLS来源价格-->
                <el-form-item :label="$t('EKL_YJGL_KSLJLY')">
                    <iSelect multiple filterable :placeholder="$t('LK_QINGXUANZE')" v-model="form.kslPriceSource">
                        <!--<el-option value="" :label="$t('all')"></el-option>-->
                        <el-option
                                :value="item.key"
                                :label="item.value=='空'?item.value:item.key + '-' + item.value"
                                v-for="item,index in allSelectObject.kslPriceSource"
                                :key="item.value"></el-option>
                    </iSelect>
                </el-form-item>
            </el-row>
        </el-form>
    </iSearch>
</template>

<script>
    import {iSearch, iInput, iSelect, icon, iDatePicker} from 'rise';
    import {queryAllDropdown} from '@/api/achievement';

    export default {
        components: {
            iSearch,
            iInput,
            iSelect,
            icon,
            iDatePicker,
        },
        data() {
            return {
                form: {
                    partNumber: '', // 零件号
                    csGroup: '',   // 材料组
                    supplierName: '',// 供应商
                    factoryCode: '', // 采购工厂
                    isConfirm: '', // 确认状态
                    engine: '',    // 发动机
                    transmission: '', // 变速箱
                    position: '',     // 车型等级
                    carconfigSixcodeName: '',   // 配置
                    carconfigSixcode: '', // 车型代码
                    deptCode: '',  // 科室
                    linieId: '', // 采购员
                    carFamily: '', // 家族
                    kslPriceSource: '', // 家族

                },
                allSelectObject: {
                    allStatus: [],
                    categoryLinieVoList: [], // 材料组 categoryCode
                    deptDTO: [],  // 科室      fullcode
                    engine: [], //发动机下拉数据 value
                    keyLinieval: [], // 采购员下拉数据  传 id
                    position: [], // 车型等级下拉数据 value
                    purchaseFactoryVo: [], // 采购工厂下拉数据  procureFactory
                    selectDictVo: [], // 产品家族下拉数据   code
                    transmission: [], // 变速箱下拉数据 value
                    kslPriceSource: [], //ksl来源价格 vulue
                },
            };
        },
        created() {
            this.getSelectData()
        },
        watch: {
            form: {
                handler: function (newval, oldVal) {
                    this.$emit('getForm', this.form)
                },
                deep: true   // 深度监听，监听到更深层级值的变化
            },
        },
        methods: {
            // 批量件搜索条件
            getSelectData() {
                queryAllDropdown().then(res => {
                    if (res.result) {
                        let data = res.data
                        data = this.removeEmptyField(data)
                        this.allSelectObject = data
                        let {engine, transmission, position, purchaseFactoryVo, kslPriceSource, categoryLinieVoList,selectDictVo} = data
                        let $selectDictVo = [] // 家族
                        let $engine = []
                        let $transmission = []
                        let $position = []
                        let $kslPriceSource = []
                        $selectDictVo = selectDictVo.sort((a,b) => {
                          return  a[0] - b[0]
                        })
                        for (let i in kslPriceSource) {
                            let o = {'key': i, 'value': kslPriceSource[i]};
                            $kslPriceSource.push(o);
                        }
                        if(engine) {
                            engine.map(item => {
                                $engine.push(item.value)
                            })
                        }
                        if(transmission) {
                            transmission.map(item => {
                                $transmission.push(item.value)
                            })
                        }
                        if(position) {
                            position.map(item => {
                                $position.push(item.value)
                            })
                        }

                        let $purchaseFactoryVo = purchaseFactoryVo.sort((a, b) => {
                            return a.procureFactory - b.procureFactory
                        })
                        $transmission = this.sortArr($transmission)
                        $position = this.sortArr($position)
                        $engine = $engine.sort((a,b) => {
                            return a.substring(0,3) - b.substring(0,3)
                        })
                        let $categoryLinieVoList = JSON.parse(JSON.stringify(categoryLinieVoList))
                        $categoryLinieVoList.map(item => {
                            item.name = item.name.substring(0,item.name.lastIndexOf('-'))
                        })
                        $categoryLinieVoList.sort((a,b)=> {
                            return Number(a.code) -Number(b.code)
                        })
                        this.allSelectObject.engine = $engine
                        this.allSelectObject.position = $position
                        this.allSelectObject.transmission = $transmission
                        this.allSelectObject.purchaseFactoryVo = $purchaseFactoryVo
                        this.allSelectObject.kslPriceSource = $kslPriceSource
                        this.allSelectObject.categoryLinieVoList = $categoryLinieVoList
                        this.allSelectObject.selectDictVo = $selectDictVo
                        this.allSelectObject.allStatus = [
                            {key: '0', value: '待确认', valueEN: 'to be confirmed'},
                            {key: '1', value: '已确认', valueEN: 'confirmed'}
                        ]
                        localStorage.setItem('allSelectObject', JSON.stringify(this.allSelectObject))
                    }
                })
            },
            // 字母排序
            sortArr(nameArr) {
                nameArr.sort((a1, b1) => {
                    let a = a1.substring(0, 1).toLowerCase();
                    let b = b1.substring(0, 1).toLowerCase();
                    if (a < b) return -1;
                    if (a > b) return 1;
                    return 0;
                })
                return nameArr
            },
            // 去除空对象
            removeEmptyField(obj) {
                var newObj = {}
                if (typeof obj === 'string') {
                    obj = JSON.parse(obj)
                }
                if (obj instanceof Array) {
                    newObj = []
                }
                if (obj instanceof Object) {
                    for (var attr in obj) {
                        // 属性值不为'',null,undefined才加入新对象里面(去掉'',null,undefined)
                        if (obj.hasOwnProperty(attr) && obj[attr] !== '' && obj[attr] !== null && obj[attr] !== undefined) {
                            if (obj[attr] instanceof Object) {
                                // 空数组或空对象不加入新对象(去掉[],{})
                                if (JSON.stringify(obj[attr]) === '{}' || JSON.stringify(obj[attr]) === '[]') {
                                    continue
                                }
                                // 属性值为对象,则递归执行去除方法
                                newObj[attr] = this.removeEmptyField(obj[attr])
                            } else if (
                                typeof obj[attr] === 'string' &&
                                ((obj[attr].indexOf('{') > -1 && obj[attr].indexOf('}') > -1) ||
                                    (obj[attr].indexOf('[') > -1 && obj[attr].indexOf(']') > -1))
                            ) {
                                // 属性值为JSON时
                                try {
                                    var attrObj = JSON.parse(obj[attr])
                                    if (attrObj instanceof Object) {
                                        newObj[attr] = this.removeEmptyField(attrObj)
                                    }
                                } catch (e) {
                                    newObj[attr] = obj[attr]
                                }
                            } else {
                                newObj[attr] = obj[attr]
                            }
                        }
                    }
                }
                return newObj
            },
            handleSearchReset() {
                this.form = {}
                this.getTableList();
            },
            getTableList() {
                const form = this.form;
                this.$emit('getTableList', form);
            },
        },
    };
</script>

<style scoped lang="scss">
    ::v-deep .cardBody {
        /*padding: 20px 40px !important;*/
    }
</style>
