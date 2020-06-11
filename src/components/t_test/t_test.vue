<template>
<div style="padding:10px;">
    <!-- params 参数选择界面-->
    <div id="main-left-div">
        <!-- title -->
        <div style="padding-bottom: 20px;">
            <b v-if="method=='IndependentSamplesT-Test'">独立样本T检验(Independent Samples T-Test)</b>
            <b v-else-if="method=='PairedSamplesT-Test'">配对样本T检验(Paired Samples T-Test)</b>
            <b v-else-if="method=='OneSampleT-Test'">单样本T检验(One Sample T-Test)</b>
        </div>

        <!-- 独立样本T检验的界面 -->
        <div v-if="method=='IndependentSamplesT-Test'">
            <!-- 左边选择变量的div -->
            <div id="select-div">
                <div v-for="item in data" :class="{'selected':selected_head==item.head}" @click="selectItem(item)" class="select-var" :key="item.head">
                    {{item.head}}
                </div>
            </div>
            <!-- 中间的按钮div -->
            <div id="mid-btn">
                <div @click="selectDenpendent" class="select-btn-div" title="选择为分组变量">
                    <img class="btn-img" src="../../assets/select.png" alt="select">
                </div>
                <div @click="selectCovariate" class="select-btn-div" style="margin-top:60px;" title="选择为变量">
                    <img class="btn-img" src="../../assets/select.png" alt="select">
                </div>
            </div>
            <!-- 右边已经选择的变量div -->
            <div id="show-selected-div">
                <div>
                    <div>分组变量(Grouping Variable)</div>
                    <div id="Depent-Var-div">
                        <div v-if="dependent_variable!=null" @click="deleteDepent" class="depent-var" title="点击移除">
                            {{dependent_variable.head}}
                        </div>
                    </div>
                </div>
                <div style="margin-top:30px;">
                    <div>变量(Variables)</div>
                    <div id="Covar-div">
                        <div v-if="covariates.length>0" @click="deleteCovar(item)" class="depent-var" v-for="item in covariates" :key="item.head" title="点击移除">
                            {{item.head}}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 配对样本T检验的界面 -->
        <div v-else-if="method=='PairedSamplesT-Test'">
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
                    <div>变量(Variables)(按序两两配对)</div>
                    <div id="Variable-div">
                        <div v-if="variables.length>0" @click="deleteVariable(item)" class="depent-var" v-for="item in variables" :key="item.head" title="点击移除">
                            {{item.head}}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 单样本T检验的界面 -->
        <div v-else-if="method=='OneSampleT-Test'">
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
                    <div>测试值(test value)</div>
                    <div>
                        <input id="test_value" type="number" style="width:100%;border:none;padding:4px;border-radius:4px;" value="0">
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
        <!-- 独立样本T检验的结果 -->
        <div v-if="method=='IndependentSamplesT-Test'">
            <div><h5><b>Independent Samples T-Test</b></h5></div>
            <div v-if="result!=null">
                <ShowResult v-if="result!=null&&result!=undefined" :result="result" :method="method" ></ShowResult>
            </div>
        </div>
        <!-- 配对样本T检验的结果 -->
        <div v-else-if="method=='PairedSamplesT-Test'">
            <div><h5><b>Paired Samples T-Test</b></h5></div>
            <div v-if="result!=null">
                <ShowResult v-if="result!=null&&result!=undefined" :result="result" :method="method" ></ShowResult>
            </div>
        </div>
        <!-- 单个样本T检验的结果 -->
        <div v-else-if="method=='OneSampleT-Test'">
            <div><h5><b>One Sample T-Test</b></h5></div>
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
    name: 't_test',
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
            covariates: [],
            variables:[],
            result: null,
        }
    },
    mounted() {
        console.log(this.data);
    },
    methods: {
        //确定按钮
        confirm() {
            if (this.method == "IndependentSamplesT-Test")
                this.independentSamplesT();
            else if (this.method == "PairedSamplesT-Test")
                this.pairedSamplesT();
            else if (this.method == "OneSampleT-Test")
                this.oneSamplesT();
        },
        
        //单样本T检验
        oneSamplesT() {
            console.log("confirm to One Sample T-Test");
            if (this.variables.length > 0) {
                console.log("One Sample T-Test");
                //检查变量的数据是否都是数字
                for (var i = 0; i < this.variables.length; i++) {
                    if (this.check_List_isAllNum(this.variables[i].data) == false) {
                        alert("变量"+this.variables[i].head+"中数据存在非数字，请检查！");
                        return;
                    }
                }
                var test_value=$("#test_value").val();
                if (parseFloat(test_value).toString() == "NaN"){
                    alert("test value 不是数字，请检查！");
                    return;
                }
                //
                axios
                    .post("/api/T-test", {
                        "action":"oneSample",
                        "dataList":this.variables,
                        "singleData":test_value
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
        //配对样本T检验
        pairedSamplesT() {
            console.log("confirm to Paired Samples T-Test");
            if (this.variables.length > 0) {
                console.log("Paired Samples T-Test");
                if(this.variables.length%2!=0){
                    alert("选择了奇数个变量，无法按序完成两两配对，请检查！");
                    return;
                }
                //检查两两配对的变量的数据是否都是数字，并且检查数据个数是否一致
                for (var i = 0; i < this.variables.length; i+=2) {
                    if (this.variables[i].data.length!=this.variables[i+1].data.length) {
                        var index=(i/2.0)+1;
                        alert("第"+index+"对变量的数据个数不一致，请检查！");
                        return;
                    } 
                    if (this.check_List_isAllNum(this.variables[i].data) == false) {
                        alert("变量"+this.variables[i].head+"中数据存在非数字，请检查！");
                        return;
                    }
                    if (this.check_List_isAllNum(this.variables[i+1].data) == false) {
                        alert("变量"+this.variables[i+1].head+"中数据存在非数字，请检查！");
                        return;
                    }
                }

                //
                axios
                    .post("/api/T-test", {
                        "action":"pairedSample",
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
        //独立样本T检验
        independentSamplesT() {
            console.log("confirm to IndependentSamplesT-Test");
            if (this.dependent_variable != null && this.covariates.length > 0) {
                console.log("IndependentSamplesT-Test");
                //检查因变量和协变量的数据是否都是数字，并且检查数据个数是否一致
                if (this.check_List_isAllNum(this.dependent_variable.data) == false) {
                    alert("分组变量的数据存在非数字，请检查！");
                    return;
                }
                for (var i = 0; i < this.covariates.length; i++) {
                        if (this.check_List_isAllNum(this.covariates[i].data) == false) {
                            alert("变量"+this.covariates[i].head+"中数据存在非数字，请检查！");
                            return;
                        }
                }

                //处理数据，axiosData用于传到后台
                var axiosData = new Array();
                this.dependent_variable.type = "groupVar"; //设置类型为分组变量
                axiosData.push(this.dependent_variable); //添加到axiosData
                for (var i = 0; i < this.covariates.length; i++) {
                    this.covariates[i].type = "variable"; //设置类型为变量
                    axiosData.push(this.covariates[i]); //添加
                }
                //
                axios
                    .post("/api/T-test", {
                        "action":"independentSample",
                        "dataList":axiosData
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
