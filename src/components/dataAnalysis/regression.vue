<template>
<div style="padding:10px;">
    <!-- params 参数选择界面-->
    <div id="main-left-div">
        <!-- title -->
        <div style="padding-bottom: 20px;">
            <b v-if="method=='LinearRegression'">Linear Regression</b>
            <b v-else-if="method=='LogisticRegression'">Logistic Regression</b>
            <b v-else-if="method=='PoissonRegression'">Poisson Regression</b>
            <b v-else-if="method=='Correlation'">Correlation</b>
            <b v-else-if="method=='BayesCorrelation'">Bayesian Correlation</b>
            <b v-else-if="method=='BayesLinearRegression'">Bayesian Linear Regression</b>
        </div>

        <!-- 线性回归和逻辑回归的界面 -->
        <div v-if="method=='LinearRegression'||method=='LogisticRegression'||method=='PoissonRegression'||method=='Log-LinearRegression'||method=='BayesLinearRegression'">
            <!-- 左边选择变量的div -->
            <div id="select-div">
                <div v-for="item in data" :class="{'selected':selected_head==item.head}" @click="selectItem(item)" class="select-var" :key="item.head">
                    {{item.head}}
                </div>
            </div>
            <!-- 中间的按钮div -->
            <div id="mid-btn">
                <div @click="selectDenpendent" class="select-btn-div" title="select Denpendent">
                    <img class="btn-img" src="../../assets/select.png" alt="select">
                </div>
                <div @click="selectCovariate" class="select-btn-div" style="margin-top:60px;" title="select Covariate">
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
                <div style="margin-top:30px;">
                    <div>Covariates</div>
                    <div id="Covar-div">
                        <div v-if="covariates.length>0" @click="deleteCovar(item)" class="depent-var" v-for="item in covariates" :key="item.head" title="remove">
                            {{item.head}}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 相关性的界面 -->
        <div v-else-if="method=='Correlation'||method=='BayesCorrelation'">
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
                    <div>Variables</div>
                    <div id="Variable-div">
                        <div v-if="variables.length>0" @click="deleteVariable(item)" class="depent-var" v-for="item in variables" :key="item.head" title="remove">
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
        <!-- 线性回归的结果 -->
        <div v-if="method=='LinearRegression'">
            <div><h5><b>Linear Regression</b></h5></div>
            <div v-if="result!=null">
                <div>
                    <b>call:</b><br>formula={{getFormula()}}
                </div>
                <ShowResult v-if="result!=null&&result!=undefined&&covariates.length>0" :result="result" :method="method" :covariates="covariates"></ShowResult>
            </div>
        </div>
        <!-- 逻辑回归的结果 -->
        <div v-else-if="method=='LogisticRegression'">
            <div><h5><b>Logistic Regression</b></h5></div>
            <div v-if="result!=null">
                <div>
                    <b>call:</b><br>{{getFormula()}}
                </div>
                <ShowResult v-if="result!=null&&result!=undefined&&covariates.length>0" :result="result" :method="method" :covariates="covariates"></ShowResult>
            </div>
        </div>
        <!-- 泊松回归的结果 -->
        <div v-else-if="method=='PoissonRegression'">
            <div><h5><b>Poisson Regression</b></h5></div>
            <div v-if="result!=null">
                <div>
                    <b>call:</b><br>{{getFormula()}}
                </div>
                <ShowResult v-if="result!=null&&result!=undefined&&covariates.length>0" :result="result" :method="method" :covariates="covariates"></ShowResult>
            </div>
        </div>
        <!-- 相关性的结果 -->
        <div v-else-if="method=='Correlation'">
            <div><h5><b>Correlation</b></h5></div>
            <div v-if="result!=null">
                <ShowResult v-if="result!=null&&result!=undefined&&variables.length>0" :result="result" :method="method" :variables="variables"></ShowResult>
            </div>
        </div>
        <!-- 贝叶斯线性回归的结果 -->
        <div v-else-if="method=='BayesLinearRegression'">
            <div><h5><b>Bayesian Linear Regression</b></h5></div>
            <div v-if="result!=null">
                <ShowResult v-if="result!=null&&result!=undefined&&covariates.length>0" :result="result" :method="method" :covariates="covariates"></ShowResult>
            </div>
        </div>
        <!-- 贝叶斯相关性的结果 -->
        <div v-else-if="method=='BayesCorrelation'">
            <div><h5><b>Bayesian Correlation</b></h5></div>
            <div v-if="result!=null">
                <ShowResult v-if="result!=null&&result!=undefined&&variables.length>0" :result="result" :method="method" :variables="variables"></ShowResult>
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
    name: 'regression',
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
            formula: null,
            showModal:false,
        }
    },
    mounted() {
        console.log(this.data);
    },
    methods: {
        //确定按钮
        confirm() {
            if (this.method == "LinearRegression")
                this.linearRegression();
            else if (this.method == "LogisticRegression")
                this.logisticRegression();
            else if (this.method == "PoissonRegression")
                this.poissonRegression();
            else if (this.method == "Correlation")
                this.correlation();
            else if (this.method == "BayesLinearRegression")
                this.bayesLinearRegression();
            else if (this.method == "BayesCorrelation")
                this.bayesCorrelation();
        },
        //处理获得分析公式
        getFormula() {
            if (this.method == "LinearRegression") {
                var str = "lm(" + this.dependent_variable.head + " ~ ";
                for (var i = 0; i < this.covariates.length; i++) {
                    if (i != (this.covariates.length - 1))
                        str += this.covariates[i].head + "+";
                    else
                        str += this.covariates[i].head;
                }
                str += ")";
                return str;
            } 
            else if (this.method == "LogisticRegression") {
                var str = "glm(formula = " + this.dependent_variable.head + " ~ ";
                for (var i = 0; i < this.covariates.length; i++) {
                    if (i != (this.covariates.length - 1))
                        str += this.covariates[i].head + "+";
                    else
                        str += this.covariates[i].head;
                }
                str += " , family = binomial)";
                return str;
            }
            else if (this.method == "PoissonRegression") {
                var str = "glm(formula = " + this.dependent_variable.head + " ~ ";
                for (var i = 0; i < this.covariates.length; i++) {
                    if (i != (this.covariates.length - 1))
                        str += this.covariates[i].head + "+";
                    else
                        str += this.covariates[i].head;
                }
                str += " , family = poisson)";
                return str;
            }
            else if (this.method == "Log-LinearRegression") {
                var str = "formula = ln(" + this.dependent_variable.head + ") ~ ";
                for (var i = 0; i < this.covariates.length; i++) {
                    if (i != (this.covariates.length - 1))
                        str += this.covariates[i].head + "+";
                    else
                        str += this.covariates[i].head;
                }
                
                return str;
            }
        },
        //贝叶斯相关性分析
        bayesCorrelation(){
            console.log("confirm to BayesCorrelation");
            if (this.variables.length > 1) {
                console.log("BayesCorrelation");
                //检查变量的数据是否都是数字，并且检查数据个数是否一致
                var len=this.variables[0].data.length;
                for (var i = 0; i < this.variables.length; i++) {
                    if (this.variables[i].data.length!=len) {
                        alert("The number of data of the selected variable is inconsistent, please check!");
                        return;
                    } 
                    if (this.check_List_isAllNum(this.variables[i].data) == false) {
                        alert("The data in the variable:"+this.variables[i].head+" is non-numeric, please check");
                        return;
                    }
                }
                //
                this.showModal=true;
                //
                axios
                    .post("/api/Regression",{
                        "action":"bayesCorrelation",
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
        //贝叶斯线性回归分析
        bayesLinearRegression() {
            console.log("confirm to BayesLinearRegression");
            if (this.dependent_variable != null && this.covariates.length > 0) {
                console.log("BayesLinearRegression");
                //检查因变量和协变量的数据是否都是数字，并且检查数据个数是否一致
                if (this.check_List_isAllNum(this.dependent_variable.data) == false) {
                    alert("The data of the dependent variable is non-numeric, please check!");
                    return;
                }
                for (var i = 0; i < this.covariates.length; i++) {
                    if (this.dependent_variable.data.length != this.covariates[i].data.length) {
                        alert("The number of data of the selected items is inconsistent, please check!");
                        return;
                    } else {
                        if (this.check_List_isAllNum(this.covariates[i].data) == false) {
                            alert("The data in the variable:"+this.covariates[i].head+" is non-numeric, please check！");
                            return;
                        }
                    }
                }

                //处理数据，axiosData用于传到后台
                var axiosData = new Array();
                this.dependent_variable.type = "dependent"; //设置类型为因变量
                axiosData.push(this.dependent_variable); //添加到axiosData
                for (var i = 0; i < this.covariates.length; i++) {
                    this.covariates[i].type = "covariate"; //设置类型为协变量
                    axiosData.push(this.covariates[i]); //添加
                }

                //
                this.showModal=true;
                //
                axios
                    .post("/api/Regression",{
                        "action":"bayesLinearRegression",
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
        //相关性分析
        correlation(){
            console.log("confirm to correlation");
            if (this.variables.length > 1) {
                console.log("correlation");
                //检查变量的数据是否都是数字，并且检查数据个数是否一致
                var len=this.variables[0].data.length;
                for (var i = 0; i < this.variables.length; i++) {
                    if (this.variables[i].data.length!=len) {
                        alert("The number of data of the selected variable is inconsistent, please check!");
                        return;
                    } 
                    if (this.check_List_isAllNum(this.variables[i].data) == false) {
                        alert("The data in the variable:"+this.variables[i].head+" is non-numeric, please check！");
                        return;
                    }
                }
                //
                this.showModal=true;
                //
                axios
                    .post("/api/Regression",{
                        "action":"correlation",
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
        //线性回归分析
        linearRegression() {
            console.log("confirm to linearRegression");
            if (this.dependent_variable != null && this.covariates.length > 0) {
                console.log("linearRegression");
                //检查因变量和协变量的数据是否都是数字，并且检查数据个数是否一致
                if (this.check_List_isAllNum(this.dependent_variable.data) == false) {
                    alert("The data of the dependent variable is non-numeric, please check!！");
                    return;
                }
                for (var i = 0; i < this.covariates.length; i++) {
                    if (this.dependent_variable.data.length != this.covariates[i].data.length) {
                        alert("The number of data of the selected items is inconsistent, please check!！");
                        return;
                    } else {
                        if (this.check_List_isAllNum(this.covariates[i].data) == false) {
                            alert("The data in the variable:"+this.covariates[i].head+" is non-numeric, please check！");
                            return;
                        }
                    }
                }

                //处理数据，axiosData用于传到后台
                var axiosData = new Array();
                this.dependent_variable.type = "dependent"; //设置类型为因变量
                axiosData.push(this.dependent_variable); //添加到axiosData
                for (var i = 0; i < this.covariates.length; i++) {
                    this.covariates[i].type = "covariate"; //设置类型为协变量
                    axiosData.push(this.covariates[i]); //添加
                }
                //
                this.showModal=true;
                //
                axios
                    .post("/api/Regression",{
                        "action":"linearRegression",
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
        //逻辑回归分析
        logisticRegression() {
            console.log("confirm to logisticRegression");
            if (this.dependent_variable != null && this.covariates.length > 0) {
                console.log("logisticRegression");
                //检查因变量和协变量的数据是否都是数字，并且检查数据个数是否一致
                if (this.check_List_isAllNum(this.dependent_variable.data) == false) {
                    alert("The data of the dependent variable is non-numeric, please check！");
                    return;
                }
                for (var i = 0; i < this.covariates.length; i++) {
                    if (this.dependent_variable.data.length != this.covariates[i].data.length) {
                        alert("The number of data of the selected items is inconsistent, please check!");
                        return;
                    } else {
                        if (this.check_List_isAllNum(this.covariates[i].data) == false) {
                            alert("The data in the variable:"+this.covariates[i].head+" is non-numeric, please check!");
                            return;
                        }
                    }
                }
                //检查因变量的数据的值,0<=值<=1
                for(var i=0;i<this.dependent_variable.data.length;i++){
                    if(this.dependent_variable.data[i]<0||this.dependent_variable.data[i]>1){
                        alert("The value of the dependent variable data must be in the range [0,1], please check!");
                        return;
                    }
                }

                //处理数据，axiosData用于传到后台
                var axiosData = new Array();
                this.dependent_variable.type = "dependent"; //设置类型为因变量
                axiosData.push(this.dependent_variable); //添加到axiosData
                for (var i = 0; i < this.covariates.length; i++) {
                    this.covariates[i].type = "covariate"; //设置类型为协变量
                    axiosData.push(this.covariates[i]); //添加
                }
                //
                this.showModal=true;
                //
                axios
                    .post("/api/Regression",{
                        "action":"logisticRegression",
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
        //泊松回归分析
        poissonRegression() {
            console.log("confirm to poissonRegression");
            if (this.dependent_variable != null && this.covariates.length > 0) {
                console.log("poissonRegression");
                //检查因变量和协变量的数据是否都是数字，并且检查数据个数是否一致
                if (this.check_List_isAllNum(this.dependent_variable.data) == false) {
                    alert("The data of the dependent variable is non-numeric, please check!");
                    return;
                }
                for (var i = 0; i < this.covariates.length; i++) {
                    if (this.dependent_variable.data.length != this.covariates[i].data.length) {
                        alert("The number of data of the selected items is inconsistent, please check!");
                        return;
                    } else {
                        if (this.check_List_isAllNum(this.covariates[i].data) == false) {
                            alert("The data in the variable："+this.covariates[i].head+" is non-numeric, please check！");
                            return;
                        }
                    }
                }

                //处理数据，axiosData用于传到后台
                var axiosData = new Array();
                this.dependent_variable.type = "dependent"; //设置类型为因变量
                axiosData.push(this.dependent_variable); //添加到axiosData
                for (var i = 0; i < this.covariates.length; i++) {
                    this.covariates[i].type = "covariate"; //设置类型为协变量
                    axiosData.push(this.covariates[i]); //添加
                }

                //
                this.showModal=true;
                //
                axios
                    .post("/api/Regression",{
                        "action":"poissonRegression",
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
        //处理逻辑回归的公式
        getLogisticFormula() {
            var str = "glm(formula = " + this.dependent_variable.head + " ~ ";
            for (var i = 0; i < this.covariates.length; i++) {
                if (i != (this.covariates.length - 1))
                    str += this.covariates[i].head + "+";
                else
                    str += this.covariates[i].head;
            }
            str += " , family = binomial)";
            this.formula = str;
        },
        //处理线性回归的公式
        getLinearFormula() {
            var str = "lm(" + this.dependent_variable.head + " ~ ";
            for (var i = 0; i < this.covariates.length; i++) {
                if (i != (this.covariates.length - 1))
                    str += this.covariates[i].head + "+";
                else
                    str += this.covariates[i].head;
            }
            str += ")";
            this.formula = str;
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
