<template>
<div style="padding:10px;">
    <!-- params 参数选择界面-->
    <div id="main-left-div">
        <!-- title -->
        <div style="padding-bottom: 20px;">
            <b v-if="method=='PrincipalComponentAnalysis'">主成分分析(Principal Component Analysis)</b>
            <b v-else-if="method=='ExploratoryFactorAnalysis'">探索性因子分析(Exploratory Factor Analysis)</b>
            <b v-else-if="method=='ConfirmatoryFactorAnalysis'">验证性因子分析(Confirmatory Factor Analysis)</b>
        </div>

        <!-- 主成分分析的界面 -->
        <div v-if="method=='PrincipalComponentAnalysis'">
            <!-- 左边选择变量的div -->
            <div id="select-div">
                <div :class="{'selected':selected_head==item.head}" @click="selectItem(item)" class="select-var" v-for="item in data" :key="item.head">
                    {{item.head}}
                </div>
            </div>
            <!-- 中间的按钮div -->
            <div id="mid-btn">
                <div @click="selectVariable" class="select-btn-div" title="选择为变量">
                    <img class="btn-img" src="../../assets/select.png" alt="select">
                </div>
            </div>
            <!-- 右边已经选择的变量div -->
            <div id="show-selected-div">
                <div>
                    <div>变量(Variables)</div>
                    <div id="Variable-div">
                        <div v-if="variables.length>0" @click="deleteVariable(item)" class="depent-var" v-for="item in variables" :key="item.head" title="点击移除">
                            {{item.head}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 探索性因子分析的界面 -->
        <div v-else-if="method=='ExploratoryFactorAnalysis'">
            <!-- 左边选择变量的div -->
            <div id="select-div">
                <div :class="{'selected':selected_head==item.head}" @click="selectItem(item)" class="select-var" v-for="item in data" :key="item.head">
                    {{item.head}}
                </div>
            </div>
            <!-- 中间的按钮div -->
            <div id="mid-btn">
                <div @click="selectVariable" class="select-btn-div" style="margin-top:90px;" title="选择为变量">
                    <img class="btn-img" src="../../assets/select.png" alt="select">
                </div>
            </div>
            <!-- 右边已经选择的变量div -->
            <div id="show-selected-div">
                <div>
                    <div>提取的因子数(nfactors)</div>
                    <div>
                        <input id="nfactors" type="number" style="width:100%;border:none;padding:4px;border-radius:4px;" value="1">
                    </div>
                </div>
                <div style="margin-top:20px;">
                    <div>变量(Variables)</div>
                    <div id="Variable-div" style="height:210px;">
                        <div v-if="variables.length>0" @click="deleteVariable(item)" class="depent-var" v-for="item in variables" :key="item.head" title="点击移除">
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
        <!-- 主成分分析的结果 -->
        <div v-if="method=='PrincipalComponentAnalysis'">
            <div><h5><b>Principal Component Analysis</b></h5></div>
            <div v-if="result!=null">
                <ShowResult v-if="result!=null&&result!=undefined" :result="result" :method="method" ></ShowResult>
            </div>
        </div>
        <!-- 探索性因子分析的结果 -->
        <div v-if="method=='ExploratoryFactorAnalysis'">
            <div><h5><b>Exploratory Factor Analysis</b></h5></div>
            <div v-if="result!=null">
                <ShowResult v-if="result!=null&&result!=undefined" :result="result" :method="method" ></ShowResult>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import GlobalData from "@/components/GlobalData";
import axios from "axios";
import qs from "qs";
import ShowResult from '@/components/showResult';
export default {
    name: 'factor',
    components: {
        ShowResult
    },
    data() {
        return {
            method: this.$route.query.method,
            data: GlobalData.data,
            selected_head: "",
            selected_item: null,
            dependent_variable: null,
            row_var:null,
            col_var:null,
            dependents:[],
            covariates: [],
            variables:[],
            factors:[],
            result: null,
            formula: null,
        }
    },
    mounted() {
        console.log(this.data);
    },
    methods: {
        //确定按钮
        confirm() {
            if(this.method == "PrincipalComponentAnalysis")
                this.principalComponentAnalysis();
            else if(this.method == "ExploratoryFactorAnalysis")
                this.exploratoryFactorAnalysis();
        },
         //探索性因子分析
        exploratoryFactorAnalysis(){
            console.log("confirm to ExploratoryFactorAnalysis");
            //提取的因子数
            var nfactors=$("#nfactors").val();
            //
            if (this.variables.length > 0&&nfactors!=null&&nfactors!=undefined&&nfactors!="") {
                console.log("ExploratoryFactorAnalysis");
                //检查提取的因子数是否合法
                if (parseFloat(nfactors).toString() == "NaN"){
                    alert("提取的因字数存在非数字，请检查！");
                    return;
                }
                else if(nfactors>=this.variables.length-1){
                    alert("提取的因字数应该小于"+(this.variables.length-1)+"，请检查！");
                    return;
                }
                //检查变量的数据是否都是数字，并且检查数据个数是否一致
                var len=this.variables[0].data.length;
                for (var i = 0; i < this.variables.length; i++) {
                    if (this.variables[i].data.length!=len) {
                        alert("已选择的变量的数据个数不一致，请检查！");
                        return;
                    } 
                    if (this.check_List_isAllNum(this.variables[i].data) == false) {
                        alert("变量"+this.variables[i].head+"中数据存在非数字，请检查！");
                        return;
                    }
                }

                //
                axios
                    .post("/api/Factor", {
                        "action":"ExploratoryFactorAnalysis",
                        "dataList":this.variables,
                        "singleData":nfactors
                    })
                    .then(response => {
                        console.log(response.data);
                        if(response.data.statu=="success")
                            this.result = response.data;
                        else
                            alert(response.data.msg);
                    })
                    .catch(error => {
                        alert("服务器出现了点小问题...");
                        console.log(error);
                    })

            } else alert("参数选择错误,请检查!");
        },
        //主成分分析
        principalComponentAnalysis(){
            console.log("confirm to PrincipalComponentAnalysis");
            if (this.variables.length > 0) {
                console.log("PrincipalComponentAnalysis");
                //检查变量的数据是否都是数字，并且检查数据个数是否一致
                var len=this.variables[0].data.length;
                for (var i = 0; i < this.variables.length; i++) {
                    if (this.variables[i].data.length!=len) {
                        alert("已选择的变量的数据个数不一致，请检查！");
                        return;
                    } 
                    if (this.check_List_isAllNum(this.variables[i].data) == false) {
                        alert("变量"+this.variables[i].head+"中数据存在非数字，请检查！");
                        return;
                    }
                }

                //
                axios
                    .post("/api/Factor", {
                        "action":"PrincipalComponentAnalysis",
                        "dataList":this.variables
                    })
                    .then(response => {
                        console.log(response.data);
                        if(response.data.statu=="success")
                            this.result = response.data;
                        else
                            alert(response.data.msg);
                    })
                    .catch(error => {
                        alert("服务器出现了点小问题...");
                        console.log(error);
                    })

            } else alert("参数选择错误,请检查!");
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
        //选择该项为变量 variales
        selectVariable() {
            if (this.selected_item != null) {
                if(this.method=="PairedSamplesT-Test"){
                    this.variables.push(this.selected_item);
                    this.selected_item = null;
                    this.selected_head= null;
                    this.result = null;
                }
                else{
                    this.variables.push(this.selected_item);
                    //从data中移除该项
                    var index = this.data.indexOf(this.selected_item);
                    this.data.splice(index, 1);
                    this.selected_item = null;
                    this.selected_head= null;
                    this.result = null;
                }
                
            }
        },
        //移除已选择的变量 variale
        deleteVariable(item) {
            if(this.method=="PairedSamplesT-Test"){
                //获取这个item的位置
                var index = this.variables.indexOf(item);
                //从covariates移除这个item
                this.variables.splice(index, 1);
                this.result = null;
            }
            else{
                //将该项返回到原来的data
                this.data.push(item);
                //获取这个item的位置
                var index = this.variables.indexOf(item);
                //从covariates移除这个item
                this.variables.splice(index, 1);
                this.result = null;
            }
            
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
        //选择该项为行变量Row(单个)
        selectRow() {
            if (this.selected_item != null) {
                if(this.row_var!=null){
                    this.data.push(this.row_var);
                }
                this.row_var = this.selected_item;
                //从data中移除该项
                var index = this.data.indexOf(this.selected_item);
                this.data.splice(index, 1);
                this.selected_item = null;
                this.selected_head= null;
                this.result = null;
            }
        },
        //移除已选择的行变量Row(单个)
        deleteRow() {
            //将该项返回到原来的data
            this.data.push(this.row_var);
            //
            this.row_var = null;
            this.result = null;
        },
        //选择该项为列变量Col(单个)
        selectCol() {
            if (this.selected_item != null) {
                if(this.col_var!=null){
                    this.data.push(this.col_var);
                }
                this.col_var = this.selected_item;
                //从data中移除该项
                var index = this.data.indexOf(this.selected_item);
                this.data.splice(index, 1);
                this.selected_item = null;
                this.selected_head= null;
                this.result = null;
            }
        },
        //移除已选择的列变量Col(单个)
        deleteCol() {
            //将该项返回到原来的data
            this.data.push(this.col_var);
            //
            this.col_var = null;
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
