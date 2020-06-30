<template>
<div style="padding:10px;">
    <!-- params 参数选择界面-->
    <div id="main-left-div">
        <!-- title -->
        <div style="padding-bottom: 20px;">
            <b v-if="method=='ANOVA'">ANOVA</b>
            <b v-else-if="method=='ANCOVA'">ANCOVA</b>
            <b v-else-if="method=='MANOVA'">MANOVA</b>
        </div>

        <!-- 方差分析ANOVA的界面 -->
        <div v-if="method=='ANOVA'">
            <!-- 左边选择变量的div -->
            <div id="select-div">
                <div v-for="item in data" :class="{'selected':selected_head==item.head}" @click="selectItem(item)" class="select-var" :key="item.head">
                    {{item.head}}
                </div>
            </div>
            <!-- 中间的按钮div -->
            <div id="mid-btn">
                <div @click="selectDenpendent" class="select-btn-div" title="select dependent">
                    <img class="btn-img" src="../../assets/select.png" alt="select">
                </div>
                <div @click="selectCovariate" class="select-btn-div" style="margin-top:60px;" title="select factor">
                    <img class="btn-img" src="../../assets/select.png" alt="select">
                </div>
            </div>
            <!-- 右边已经选择的变量div -->
            <div id="show-selected-div">
                <div>
                    <div>Dependent Variable</div>
                    <div id="Depent-Var-div">
                        <div v-if="dependent_variable!=null" @click="deleteDepent" class="depent-var" title="Click to remove">
                            {{dependent_variable.head}}
                        </div>
                    </div>
                </div>
                <div style="margin-top:30px;">
                    <div>Fixed Factors</div>
                    <div id="Covar-div">
                        <div v-if="covariates.length>0" @click="deleteCovar(item)" class="depent-var" v-for="item in covariates" :key="item.head" title="点击移除">
                            {{item.head}}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 协方差分析ANCOVA的界面 -->
        <div v-else-if="method=='ANCOVA'">
            <!-- 左边选择变量的div -->
            <div id="select-div">
                <div v-for="item in data" :class="{'selected':selected_head==item.head}" @click="selectItem(item)" class="select-var" :key="item.head">
                    {{item.head}}
                </div>
            </div>
            <!-- 中间的按钮div -->
            <div id="mid-btn">
                <div @click="selectDenpendent" class="select-btn-div" >
                    <img class="btn-img" src="../../assets/select.png" alt="select">
                </div>
                <div @click="selectFactor" class="select-btn-div" style="margin-top:50px;" >
                    <img class="btn-img" src="../../assets/select.png" alt="select">
                </div>
                <div @click="selectCovariate" class="select-btn-div" style="margin-top:95px;" title="select covariate">
                    <img class="btn-img" src="../../assets/select.png" alt="select">
                </div>
            </div>
            <!-- 右边已经选择的变量div -->
            <div id="show-selected-div">
                <div>
                    <div>Dependent Variable</div>
                    <div id="Depent-Var-div">
                        <div v-if="dependent_variable!=null" @click="deleteDepent" class="depent-var" title="remove">
                            {{dependent_variable.head}}
                        </div>
                    </div>
                </div>
                <div style="margin-top:4px;">
                    <div>Fixed Factors</div>
                    <div id="Factor-div">
                        <div v-if="factors.length>0" @click="deleteFactor(item)" class="depent-var" v-for="item in factors" :key="item.head" title="remove">
                            {{item.head}}
                        </div>
                    </div>
                </div>
                <div style="margin-top:4px;">
                    <div>Covariates</div>
                    <div id="Covar-div" style="height:100px;">
                        <div v-if="covariates.length>0" @click="deleteCovar(item)" class="depent-var" v-for="item in covariates" :key="item.head" title="remove">
                            {{item.head}}
                        </div>
                    </div>
                </div>
                
            </div>
        </div>

        <!-- 多变量方差分析ANCOVA的界面 -->
        <div v-else-if="method=='MANOVA'">
            <!-- 左边选择变量的div -->
            <div id="select-div">
                <div v-for="item in data" :class="{'selected':selected_head==item.head}" @click="selectItem(item)" class="select-var" :key="item.head">
                    {{item.head}}
                </div>
            </div>
            <!-- 中间的按钮div -->
            <div id="mid-btn">
                <div @click="selectDependents" class="select-btn-div" title="select dependents">
                    <img class="btn-img" src="../../assets/select.png" alt="select">
                </div>
                <div @click="selectFactor" class="select-btn-div" style="margin-top:130px;" title="select Factor">
                    <img class="btn-img" src="../../assets/select.png" alt="select">
                </div>
            </div>
            <!-- 右边已经选择的变量div -->
            <div id="show-selected-div">
                <div>
                    <div>Dependent Variables</div>
                    <div id="dependents-div" style="height:120px;">
                        <div v-if="dependents.length>0" @click="deleteDependents(item)" class="depent-var" v-for="item in dependents" :key="item.head" title="remove">
                            {{item.head}}
                        </div>
                    </div>
                </div>
                <div style="margin-top:10px;">
                    <div>Fixed Factors</div>
                    <div id="Factor-div" style="height:130px;">
                        <div v-if="factors.length>0" @click="deleteFactor(item)" class="depent-var" v-for="item in factors" :key="item.head" title="remove">
                            {{item.head}}
                        </div>
                    </div>
                </div>    
            </div>
        </div>

        <hr style="margin-top:310px;">
        <!-- 确定按钮 -->
        <div style="width:100%;">
            <button type="button" style="float:right;margin-top:0px;margin-right:25px;" @click="confirm" class="btn btn-warning btn-sm">OK</button>
        </div>
    </div>
    <!-- result 结果展示界面 -->
    <div id="main-right-div">
        <div>
            <h3><b>Results</b></h3>
        </div>
        <!-- 方差分析的结果 -->
        <div v-if="method=='ANOVA'">
            <div><h5><b>ANOVA</b></h5></div>
            <div v-if="result!=null">
                <ShowResult v-if="result!=null&&result!=undefined" :result="result" :method="method" ></ShowResult>
            </div>
        </div>
        <!-- 协方差分析的结果 -->
        <div v-else-if="method=='ANCOVA'">
            <div><h5><b>ANCOVA</b></h5></div>
            <div v-if="result!=null">
                <ShowResult v-if="result!=null&&result!=undefined" :result="result" :method="method" ></ShowResult>
            </div>
        </div>
        <!-- 多变量方差分析的结果 -->
        <div v-else-if="method=='MANOVA'">
            <div><h5><b>MANOVA</b></h5></div>
            <div v-if="result!=null">
                <ShowResult v-if="result!=null&&result!=undefined" :result="result" :method="method" ></ShowResult>
            </div>
        </div>
    </div>
    <!-- 消息框 -->
    <MyModal v-if="showModal==true" :show="showModal" title="Processing data"></MyModal>
</div>
</template>

<script>
import GlobalData from "@/components/GlobalData";
import axios from "axios";
import qs from "qs";
import ShowResult from '@/components/showResult';
import MyModal from "@/components/function/myModal";
export default {
    name: 'anova',
    components: {
        ShowResult,
        MyModal
    },
    data() {
        return {
            method: this.$route.query.method,
            data: GlobalData.data,
            selected_head: "",
            selected_item: null,
            dependent_variable: null,
            dependents:[],
            covariates: [],
            factors:[],
            result: null,
            showModal:false,
        }
    },
    mounted() {
        console.log(this.data);
    },
    methods: {
        //确定按钮
        confirm() {
            if (this.method == "ANOVA")
                this.anova();
            else if (this.method == "ANCOVA")
                this.ancova();
            else if (this.method == "MANOVA")
                this.manova();
        },
        
        //多变量方差分析manova
        manova() {
            console.log("confirm to MANOVA");
            if (this.dependents.length>0&&this.factors.length>0) {
                console.log("MANOVA");
                if(this.dependents.length<2){
                    alert("The number of dependent variables cannot be less than 2, please check！");
                    return;
                }
                //检查因变量、固定因子、协变量的数据是否都是数字，并且检查数据个数是否一致
                var len=this.dependents[0].data.length;
                //检查因变量
                for (var i = 0; i < this.dependents.length; i++) {
                        if(this.dependents[i].data.length!=len){
                            alert("The data length of the dependent variable is inconsistent, please check！");
                            return;
                        }
                        if (this.check_List_isAllNum(this.dependents[i].data) == false) {
                            alert("The data in the variable:"+this.dependents[i].head+" is non-numeric, please check！");
                            return;
                        }
                }
                //检查固定因子
                for (var i = 0; i < this.factors.length; i++) {
                        if(this.factors[i].data.length!=len){
                            alert("The data length of the fixed factor is not consistent with the data length of the dependent variable, please check！");
                            return;
                        }
                        if (this.check_List_isAllNum(this.factors[i].data) == false) {
                            alert("The data in the variable:"+this.factors[i].head+"is non-numeric, please check！");
                            return;
                        }
                }

                //处理数据，axiosData用于传到后台
                var axiosData = new Array();
                //添加因变量到axiosData
                for (var i = 0; i < this.dependents.length; i++) {
                    this.dependents[i].type = "dependent"; //设置类型为因变量
                    axiosData.push(this.dependents[i]); //添加进axiosData
                }
                //添加固定因子到axiosData
                for (var i = 0; i < this.factors.length; i++) {
                    this.factors[i].type = "factor"; //设置类型为固定因子
                    axiosData.push(this.factors[i]); //添加进axiosData
                }
                //
                this.showModal=true;
                //
                axios
                    .post("/api/ANOVA", {
                        "action":"MANOVA",
                        "dataList":axiosData
                    })
                    .then(response => {
                        //console.log(response.data);
                        if(response.data.statu=="success")
                            this.result = response.data;
                        else
                            alert(response.data.msg);
                        //
                        this.showModal=false;
                    })
                    .catch(error => {
                        alert("server error...");
                        console.log(error);
                        //
                        this.showModal=false;
                    })

            } else alert("Parameter selection error, please check!");
        },
        //协方差分析ancova
        ancova() {
            console.log("confirm to ANCOVA");
            if (this.dependent_variable != null) {
                console.log("ANCOVA");
                if(this.factors.length<1&&this.covariates.length<1){
                    alert("Fixed factor and covariate cannot be empty at the same time, please check！");
                    return;
                }
                //检查因变量、固定因子、协变量的数据是否都是数字，并且检查数据个数是否一致
                if (this.check_List_isAllNum(this.dependent_variable.data) == false) {
                    alert("The data of the dependent variable is non-numeric, please check！");
                    return;
                }
                //检查固定因子
                for (var i = 0; i < this.factors.length; i++) {
                        if(this.factors[i].data.length!=this.dependent_variable.data.length){
                            alert("The data length of the fixed factor is not consistent with the data length of the dependent variable, please check！");
                            return;
                        }
                        if (this.check_List_isAllNum(this.factors[i].data) == false) {
                            alert("The data in the variable:"+this.factors[i].head+"is non-numeric, please check！");
                            return;
                        }
                }
                //检查协变量
                for (var i = 0; i < this.covariates.length; i++) {
                        if(this.covariates[i].data.length!=this.dependent_variable.data.length){
                            alert("The data length of the covariate is not consistent with the data length of the dependent variable, please check！");
                            return;
                        }
                        if (this.check_List_isAllNum(this.covariates[i].data) == false) {
                            alert("The data in the variable:"+this.covariates[i].head+"is non-numeric, please check！");
                            return;
                        }
                }

                //处理数据，axiosData用于传到后台
                var axiosData = new Array();
                this.dependent_variable.type = "dependent"; //设置类型为因变量
                axiosData.push(this.dependent_variable); //添加到axiosData
                //添加固定因子到axiosData
                for (var i = 0; i < this.factors.length; i++) {
                    this.factors[i].type = "factor"; //设置类型为固定因子
                    axiosData.push(this.factors[i]); //添加进axiosData
                }
                //添加协变量到axiosData
                for (var i = 0; i < this.covariates.length; i++) {
                    this.covariates[i].type = "covar"; //设置类型为协变量
                    axiosData.push(this.covariates[i]); //添加进axiosData
                }
                //
                    this.showModal=true;
                //
                axios
                    .post("/api/ANOVA", {
                        "action":"ANCOVA",
                        "dataList":axiosData
                    })
                    .then(response => {
                        //console.log(response.data);
                        if(response.data.statu=="success")
                            this.result = response.data;
                        else
                            alert(response.data.msg);
                        //
                        this.showModal=false;
                    })
                    .catch(error => {
                        alert("server error...");
                        console.log(error);
                        //
                        this.showModal=false;
                    })

            } else alert("Parameter selection error, please check!");
        },
        //方差分析anova
        anova() {
            console.log("confirm to ANOVA");
            if (this.dependent_variable != null && this.covariates.length > 0) {
                console.log("ANOVA");
                //检查因变量和固定因子的数据是否都是数字，并且检查数据个数是否一致
                if (this.check_List_isAllNum(this.dependent_variable.data) == false) {
                    alert("The data of the dependent variable is non-numeric, please check!");
                    return;
                }
                for (var i = 0; i < this.covariates.length; i++) {
                        if(this.covariates[i].data.length!=this.dependent_variable.data.length){
                            alert("The data length of the fixed factor is not consistent with the data length of the dependent variable, please check！");
                            return;
                        }
                        if (this.check_List_isAllNum(this.covariates[i].data) == false) {
                            alert("The data in the variable:"+this.covariates[i].head+"is non-numeric, please check！");
                            return;
                        }
                }

                //处理数据，axiosData用于传到后台
                var axiosData = new Array();
                this.dependent_variable.type = "dependent"; //设置类型为因变量
                axiosData.push(this.dependent_variable); //添加到axiosData
                for (var i = 0; i < this.covariates.length; i++) {
                    this.covariates[i].type = "fixedFactor"; //设置类型为固定因子
                    axiosData.push(this.covariates[i]); //添加进axiosData
                }
                //
                //
                this.showModal=true;
                //
                axios
                    .post("/api/ANOVA", {
                        "action":"ANOVA",
                        "dataList":axiosData,
                    })
                    .then(response => {
                        //console.log(response.data);
                        if(response.data.statu=="success")
                            this.result = response.data;
                        else
                            alert(response.data.msg);
                        //
                        this.showModal=false;
                    })
                    .catch(error => {
                        alert("server error...");
                        console.log(error);
                        //
                        this.showModal=false;
                    })

            } else alert("Parameter selection error, please check!");
        },
        //选择该项为因变量（多个）
        selectDependents() {
            if (this.selected_item != null) {
                this.dependents.push(this.selected_item);
                //从data中移除该项
                var index = this.data.indexOf(this.selected_item);
                this.data.splice(index, 1);
                this.selected_item = null;
                this.selected_head= null;
                this.result = null;      
            }
        },
        //移除已选择的因变量
        deleteDependents(item) {
            //将该项返回到原来的data
            this.data.push(item);
            //获取这个item的位置
            var index = this.dependents.indexOf(item);
            //从dependents移除这个item
            this.dependents.splice(index, 1);
            this.result = null;  
        },
        //选择该项为factor
        selectFactor() {
            if (this.selected_item != null) {
                this.factors.push(this.selected_item);
                //从data中移除该项
                var index = this.data.indexOf(this.selected_item);
                this.data.splice(index, 1);
                this.selected_item = null;
                this.selected_head= null;
                this.result = null;      
            }
        },
        //移除已选择的factor
        deleteFactor(item) {
            //将该项返回到原来的data
            this.data.push(item);
            //获取这个item的位置
            var index = this.factors.indexOf(item);
            //从factors移除这个item
            this.factors.splice(index, 1);
            this.result = null;  
        },
        //选择该项为协变量 Covariate
        selectCovariate() {
            if (this.selected_item != null) {
                this.covariates.push(this.selected_item);
                //从data中移除该项
                var index = this.data.indexOf(this.selected_item);
                this.data.splice(index, 1);
                this.selected_item = null;
                this.selected_head= null;
                this.result = null;
            }
        },
        //移除已选择的协变量 Covariate
        deleteCovar(item) {
            //将该项返回到原来的data
            this.data.push(item);
            //获取这个item的位置
            var index = this.covariates.indexOf(item);
            //从covariates移除这个item
            this.covariates.splice(index, 1);
            this.result = null;
        },
        //选择该项为因变量(单个)
        selectDenpendent() {
            if (this.selected_item != null) {
                if(this.dependent_variable!=null){
                    this.data.push(this.dependent_variable);
                }
                this.dependent_variable = this.selected_item;
                //从data中移除该项
                var index = this.data.indexOf(this.selected_item);
                this.data.splice(index, 1);
                this.selected_item = null;
                this.selected_head= null;
                this.result = null;
            }
        },
        //移除已选择的因变量(单个)
        deleteDepent() {
            //将该项返回到原来的data
            this.data.push(this.dependent_variable);
            //
            this.dependent_variable = null;
            this.result = null;
        },
        //选择数据项
        selectItem(item) {
            this.selected_head=item.head;
            this.selected_item = item;
        },
        //判断一个数组里面的值是否都是数字
        check_List_isAllNum(list) {
            if (list.length < 1)
                return false;
            for (var i = 0; i < list.length; i++) {
                if (parseFloat(list[i]).toString() == "NaN")
                    return false;
            }
            return true;
        }
    }
}
</script>

<style>
@import url("../../assets/css/main.css");
</style>
