<template>
<div style="padding:10px;">
    <!-- params 参数选择界面-->
    <div id="main-left-div">
        <!-- title -->
        <div style="padding-bottom: 20px;">
            <b v-if="method=='IndependentSamplesT-Test'">Independent Samples T-Test</b>
            <b v-else-if="method=='PairedSamplesT-Test'">Paired Samples T-Test</b>
            <b v-else-if="method=='OneSampleT-Test'">One Sample T-Test</b>
            <b v-else-if="method=='BayesIndependentSamplesT-Test'">Bayesian Independent Samples T-Test</b>
            <b v-else-if="method=='BayesPairedSamplesT-Test'">Bayesian Paired Samples T-Test</b>
            <b v-else-if="method=='BayesOneSampleT-Test'">Bayesian One Sample T-Test</b>
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
                <div @click="selectDenpendent" class="select-btn-div" title="select group">
                    <img class="btn-img" src="../../assets/select.png" alt="select">
                </div>
                <div @click="selectCovariate" class="select-btn-div" style="margin-top:60px;" title="select variable">
                    <img class="btn-img" src="../../assets/select.png" alt="select">
                </div>
            </div>
            <!-- 右边已经选择的变量div -->
            <div id="show-selected-div">
                <div>
                    <div>Grouping Variable</div>
                    <div id="Depent-Var-div">
                        <div v-if="dependent_variable!=null" @click="deleteDepent" class="depent-var" title="remove">
                            {{dependent_variable.head}}
                        </div>
                    </div>
                </div>
                <div style="margin-top:30px;">
                    <div>Variables</div>
                    <div id="Covar-div">
                        <div v-if="covariates.length>0" @click="deleteCovar(item)" class="depent-var" v-for="item in covariates" :key="item.head" title="remove">
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
                <div @click="selectVariable" class="select-btn-div" title="select Variable">
                    <img class="btn-img" src="../../assets/select.png" alt="select">
                </div>
            </div>
            <!-- 右边已经选择的变量div -->
            <div id="show-selected-div">
                <div>
                    <div>Variables(Pair in order)</div>
                    <div id="Variable-div">
                        <div v-if="variables.length>0" @click="deleteVariable(item)" class="depent-var" v-for="item in variables" :key="item.head" title="remove">
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
                <div @click="selectVariable" class="select-btn-div" style="margin-top:90px;" title="select Variable">
                    <img class="btn-img" src="../../assets/select.png" alt="select">
                </div>
            </div>
            <!-- 右边已经选择的变量div -->
            <div id="show-selected-div">
                <div>
                    <div>Test value</div>
                    <div>
                        <input id="test_value" type="number" style="width:100%;border:none;padding:4px;border-radius:4px;" value="0">
                    </div>
                </div>
                <div style="margin-top:20px;">
                    <div>Variables</div>
                    <div id="Variable-div" style="height:210px;">
                        <div v-if="variables.length>0" @click="deleteVariable(item)" class="depent-var" v-for="item in variables" :key="item.head" title="remove">
                            {{item.head}}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 贝叶斯独立样本T检验的界面 -->
        <div v-else-if="method=='BayesIndependentSamplesT-Test'">
            <!-- 左边选择变量的div -->
            <div id="select-div">
                <div v-for="item in data" :class="{'selected':selected_head==item.head}" @click="selectItem(item)" class="select-var" :key="item.head">
                    {{item.head}}
                </div>
            </div>
            <!-- 中间的按钮div -->
            <div id="mid-btn">
                <div @click="selectDenpendent" class="select-btn-div" title="select grouping">
                    <img class="btn-img" src="../../assets/select.png" alt="select">
                </div>
                <div @click="selectCovariate" class="select-btn-div" style="margin-top:60px;" title="select variable">
                    <img class="btn-img" src="../../assets/select.png" alt="select">
                </div>
            </div>
            <!-- 右边已经选择的变量div -->
            <div id="show-selected-div">
                <div>
                    <div>Grouping Variable</div>
                    <div id="Depent-Var-div">
                        <div v-if="dependent_variable!=null" @click="deleteDepent" class="depent-var" title="remove">
                            {{dependent_variable.head}}
                        </div>
                    </div>
                </div>
                <div style="margin-top:15px;">
                    <div>Variables</div>
                    <div id="Covar-div" style="height:150px;">
                        <div v-if="covariates.length>0" @click="deleteCovar(item)" class="depent-var" v-for="item in covariates" :key="item.head" title="remove">
                            {{item.head}}
                        </div>
                    </div>
                </div>
                <div style="margin-top:5px;">
                    <div>rscale</div>
                    <div>
                        <select v-model="rscale" class="form-control">
                            <option value="medium">medium(√2/2)</option>
                            <option value="wide">wide(1)</option>
                            <option value="ultrawide">ultrawide(√2)</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

        <!-- 贝叶斯配对样本T检验的界面 -->
        <div v-else-if="method=='BayesPairedSamplesT-Test'">
            <!-- 左边选择变量的div -->
            <div id="select-div">
                <div :class="{'selected':selected_head==item.head}" @click="selectItem(item)" class="select-var" v-for="item in data" :key="item.head">
                    {{item.head}}
                </div>
            </div>
            <!-- 中间的按钮div -->
            <div id="mid-btn">
                <div @click="selectVariable" class="select-btn-div" title="select Variable">
                    <img class="btn-img" src="../../assets/select.png" alt="select">
                </div>
            </div>
            <!-- 右边已经选择的变量div -->
            <div id="show-selected-div">
                <div>
                    <div>Variables(Pair in order)</div>
                    <div id="Variable-div" style="height:200px;">
                        <div v-if="variables.length>0" @click="deleteVariable(item)" class="depent-var" v-for="item in variables" :key="item.head" title="remove">
                            {{item.head}}
                        </div>
                    </div>
                </div>
                <div style="margin-top:5px;">
                    <div>rscale</div>
                    <div>
                        <select v-model="rscale" class="form-control">
                            <option value="medium">medium(√2/2)</option>
                            <option value="wide">wide(1)</option>
                            <option value="ultrawide">ultrawide(√2)</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

        <!-- 贝叶斯单样本T检验的界面 -->
        <div v-else-if="method=='BayesOneSampleT-Test'">
            <!-- 左边选择变量的div -->
            <div id="select-div">
                <div :class="{'selected':selected_head==item.head}" @click="selectItem(item)" class="select-var" v-for="item in data" :key="item.head">
                    {{item.head}}
                </div>
            </div>
            <!-- 中间的按钮div -->
            <div id="mid-btn">
                <div @click="selectVariable" class="select-btn-div" style="margin-top:90px;" title="select Variable">
                    <img class="btn-img" src="../../assets/select.png" alt="select">
                </div>
            </div>
            <!-- 右边已经选择的变量div -->
            <div id="show-selected-div">
                <div>
                    <div>Test value</div>
                    <div>
                        <input id="test_value" type="number" style="width:100%;border:none;padding:4px;border-radius:4px;" value="0">
                    </div>
                </div>
                <div style="margin-top:10px;">
                    <div>Variables</div>
                    <div id="Variable-div" style="height:160px;">
                        <div v-if="variables.length>0" @click="deleteVariable(item)" class="depent-var" v-for="item in variables" :key="item.head" title="remove">
                            {{item.head}}
                        </div>
                    </div>
                </div>
                <div style="margin-top:5px;">
                    <div>rscale</div>
                    <div>
                        <select v-model="rscale" class="form-control">
                            <option value="medium">medium(√2/2)</option>
                            <option value="wide">wide(1)</option>
                            <option value="ultrawide">ultrawide(√2)</option>
                        </select>
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
        <!-- 贝叶斯独立样本T检验的结果 -->
        <div v-if="method=='BayesIndependentSamplesT-Test'">
            <div><h5><b>Bayesian Independent Samples T-Test</b></h5></div>
            <div v-if="result!=null">
                <ShowResult v-if="result!=null&&result!=undefined" :result="result" :method="method" ></ShowResult>
            </div>
        </div>
        <!-- 贝叶斯配对样本T检验的结果 -->
        <div v-else-if="method=='BayesPairedSamplesT-Test'">
            <div><h5><b>Bayesian Paired Samples T-Test</b></h5></div>
            <div v-if="result!=null">
                <ShowResult v-if="result!=null&&result!=undefined" :result="result" :method="method" ></ShowResult>
            </div>
        </div>
        <!-- 贝叶斯单个样本T检验的结果 -->
        <div v-else-if="method=='BayesOneSampleT-Test'">
            <div><h5><b>Bayesian One Sample T-Test</b></h5></div>
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
    name: 't_test',
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
            covariates: [],
            variables:[],
            result: null,
            showModal:false,
            rscale:"medium",
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
            else if (this.method == "BayesIndependentSamplesT-Test")
                this.bayesIndependentSamplesT();
            else if (this.method == "BayesPairedSamplesT-Test")
                this.bayesPairedSamplesT();
            else if (this.method == "BayesOneSampleT-Test")
                this.bayesOneSamplesT();
        },
        //贝叶斯单样本T检验
        bayesOneSamplesT() {
            //console.log("confirm to One Sample T-Test");
            if (this.variables.length > 0) {
                //console.log("One Sample T-Test");
                //检查变量的数据是否都是数字
                for (var i = 0; i < this.variables.length; i++) {
                    if (this.check_List_isAllNum(this.variables[i].data) == false) {
                        alert("The data in the variable:"+this.variables[i].head+" is non-numeric, please check！");
                        return;
                    }
                }
                var test_value=$("#test_value").val();
                if (test_value==""||parseFloat(test_value).toString() == "NaN"){
                    alert("Test value is not number,please check！");
                    return;
                }
                //
                this.showModal=true;
                //
                axios
                    .post("/api/T-test", {
                        "action":"bayesOneSample",
                        "dataList":this.variables,
                        "singleData":test_value,
                        "singleStr":this.rscale
                    })
                    .then(response => {
                        console.log(response.data);
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
        //贝叶斯独立样本T检验
        bayesIndependentSamplesT() {
            if (this.dependent_variable != null && this.covariates.length > 0) {
                //检查因变量和协变量的数据是否都是数字，并且检查数据个数是否一致
                if (this.check_List_isAllNum(this.dependent_variable.data) == false) {
                    alert("The data of the grouping variable is non-numeric, please check！");
                    return;
                }
                for (var i = 0; i < this.covariates.length; i++) {
                        if (this.check_List_isAllNum(this.covariates[i].data) == false) {
                            alert("The data in the variable:"+this.covariates[i].head+" is non-numeric, please check！");
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
                this.showModal=true;
                //
                axios
                    .post("/api/T-test", {
                        "action":"bayesIndependentSample",
                        "dataList":axiosData,
                        "singleStr":this.rscale
                    })
                    .then(response => {
                        console.log(response.data);
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
        //贝叶斯配对样本T检验
        bayesPairedSamplesT() {
            if (this.variables.length > 0) {
                if(this.variables.length%2!=0){
                    alert("An odd number of variables has been selected and pairing cannot be completed in sequence, please check!");
                    return;
                }
                //检查两两配对的变量的数据是否都是数字，并且检查数据个数是否一致
                for (var i = 0; i < this.variables.length; i+=2) {
                    if (this.variables[i].data.length!=this.variables[i+1].data.length) {
                        var index=(i/2.0)+1;
                        alert("The number of data of the "+index+" pair of variables is inconsistent, please check!");
                        return;
                    } 
                    if (this.check_List_isAllNum(this.variables[i].data) == false) {
                        alert("The data in the variable:"+this.variables[i].head+" is non-numeric, please check！");
                        return;
                    }
                    if (this.check_List_isAllNum(this.variables[i+1].data) == false) {
                        alert("The data in the variable:"+this.variables[i+1].head+" is non-numeric, please check！");
                        return;
                    }
                    if(this.variables[i].head==this.variables[i+1].head){
                        alert("Variable:"+this.variables[i].head+" cannot be paired with itself, please check!");
                        return;
                    }
                }

                //
                this.showModal=true;
                //
                axios
                    .post("/api/T-test", {
                        "action":"bayesPairedSample",
                        "dataList":this.variables,
                        "singleStr":this.rscale
                    })
                    .then(response => {
                        console.log(response.data);
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
        //单样本T检验
        oneSamplesT() {
            console.log("confirm to One Sample T-Test");
            if (this.variables.length > 0) {
                console.log("One Sample T-Test");
                //检查变量的数据是否都是数字
                for (var i = 0; i < this.variables.length; i++) {
                    if (this.check_List_isAllNum(this.variables[i].data) == false) {
                        alert("The data in the variable:"+this.variables[i].head+" is non-numeric, please check！");
                        return;
                    }
                }
                var test_value=$("#test_value").val();
                if (parseFloat(test_value).toString() == "NaN"){
                    alert("test value is not number,please check!");
                    return;
                }
                //
                this.showModal=true;
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
        //配对样本T检验
        pairedSamplesT() {
            console.log("confirm to Paired Samples T-Test");
            if (this.variables.length > 0) {
                console.log("Paired Samples T-Test");
                if(this.variables.length%2!=0){
                    alert("An odd number of variables has been selected and pairing cannot be completed in sequence, please check!");
                    return;
                }
                //检查两两配对的变量的数据是否都是数字，并且检查数据个数是否一致
                for (var i = 0; i < this.variables.length; i+=2) {
                    if (this.variables[i].data.length!=this.variables[i+1].data.length) {
                        var index=(i/2.0)+1;
                        alert("The number of data of the "+index+" pair of variables is inconsistent, please check!");
                        return;
                    } 
                    if (this.check_List_isAllNum(this.variables[i].data) == false) {
                        alert("The data in the variable:"+this.variables[i].head+" is non-numeric, please check！");
                        return;
                    }
                    if (this.check_List_isAllNum(this.variables[i+1].data) == false) {
                        alert("The data in the variable:"+this.variables[i+1].head+" is non-numeric, please check！");
                        return;
                    }
                    if(this.variables[i].head==this.variables[i+1].head){
                        alert("Variable:"+this.variables[i].head+" cannot be paired with itself, please check!");
                        return;
                    }
                }

                //
                this.showModal=true;
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
        //独立样本T检验
        independentSamplesT() {
            console.log("confirm to IndependentSamplesT-Test");
            if (this.dependent_variable != null && this.covariates.length > 0) {
                console.log("IndependentSamplesT-Test");
                //检查因变量和协变量的数据是否都是数字，并且检查数据个数是否一致
                if (this.check_List_isAllNum(this.dependent_variable.data) == false) {
                    alert("The data of the grouping variable is non-numeric, please check!");
                    return;
                }
                for (var i = 0; i < this.covariates.length; i++) {
                        if (this.check_List_isAllNum(this.covariates[i].data) == false) {
                            alert("The data in the variable:"+this.covariates[i].head+" is non-numeric, please check！");
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
                this.showModal=true;
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
        
        //选择该项为变量 variales
        selectVariable() {
            if (this.selected_item != null) {
                if(this.method=="PairedSamplesT-Test"||this.method=="BayesPairedSamplesT-Test"){
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
            if(this.method=="PairedSamplesT-Test"||this.method=="BayesPairedSamplesT-Test"){
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
