<template>
<div style="padding:10px;">
    <!-- params 参数选择界面-->
    <div id="main-left-div">
        <!-- title -->
        <div style="padding-bottom: 20px;">
            <b v-if="method=='BinomialTest'">二项检验(Binomial Test)</b>
            <b v-else-if="method=='ContingencyTables'">列联表(Contingency Tables)</b>
            <b v-else-if="method=='Log-LinearRegression'">对数线性回归(Log-Linear Regression)</b>
            <b v-else-if="method=='BayesContingencyTables'">贝叶斯列联表(Bayesian Contingency Tables)</b>
        </div>

        <!-- 对数线性回归的界面 -->
        <div v-if="method=='Log-LinearRegression'">
            <!-- 左边选择变量的div -->
            <div id="select-div">
                <div v-for="item in data" :class="{'selected':selected_head==item.head}" @click="selectItem(item)" class="select-var" :key="item.head">
                    {{item.head}}
                </div>
            </div>
            <!-- 中间的按钮div -->
            <div id="mid-btn">
                <div @click="selectDenpendent" class="select-btn-div" title="选择为因变量">
                    <img class="btn-img" src="../../assets/select.png" alt="select">
                </div>
                <div @click="selectCovariate" class="select-btn-div" style="margin-top:60px;" title="选择为协变量">
                    <img class="btn-img" src="../../assets/select.png" alt="select">
                </div>
            </div>
            <!-- 右边已经选择的变量div -->
            <div id="show-selected-div">
                <div>
                    <div>因变量(Dependent Variable)</div>
                    <div id="Depent-Var-div">
                        <div v-if="dependent_variable!=null" @click="deleteDepent" class="depent-var" title="点击移除">
                            {{dependent_variable.head}}
                        </div>
                    </div>
                </div>
                <div style="margin-top:30px;">
                    <div>协变量(Covariates)</div>
                    <div id="Covar-div">
                        <div v-if="covariates.length>0" @click="deleteCovar(item)" class="depent-var" v-for="item in covariates" :key="item.head" title="点击移除">
                            {{item.head}}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 二项检验的界面 -->
        <div v-else-if="method=='BinomialTest'">
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
                        <input id="test_value" type="number" style="width:100%;border:none;padding:4px;border-radius:4px;" value="0.5">
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

        <!-- 列联表的界面 -->
        <div v-else-if="method=='ContingencyTables'">
            <!-- 左边选择变量的div -->
            <div id="select-div">
                <div v-for="item in data" :class="{'selected':selected_head==item.head}" @click="selectItem(item)" class="select-var" :key="item.head">
                    {{item.head}}
                </div>
            </div>
            <!-- 中间的按钮div -->
            <div id="mid-btn">
                <div @click="selectRow" class="select-btn-div" title="选择为行变量">
                    <img class="btn-img" src="../../assets/select.png" alt="select">
                </div>
                <div @click="selectCol" class="select-btn-div" style="margin-top:85px;" title="选择为列变量">
                    <img class="btn-img" src="../../assets/select.png" alt="select">
                </div>
            </div>
            <!-- 右边已经选择的变量div -->
            <div id="show-selected-div">
                <div>
                    <div>行变量(Row)</div>
                    <div id="Depent-Var-div">
                        <div v-if="row_var!=null" @click="deleteRow" class="depent-var" title="点击移除">
                            {{row_var.head}}
                        </div>
                    </div>
                </div>
                <div style="margin-top:50px;">
                    <div>列变量(Column)</div>
                    <div id="Depent-Var-div">
                        <div v-if="col_var!=null" @click="deleteCol" class="depent-var" title="点击移除">
                            {{col_var.head}}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 贝叶斯列联表的界面 -->
        <div v-else-if="method=='BayesContingencyTables'">
            <!-- 左边选择变量的div -->
            <div id="select-div">
                <div v-for="item in data" :class="{'selected':selected_head==item.head}" @click="selectItem(item)" class="select-var" :key="item.head">
                    {{item.head}}
                </div>
            </div>
            <!-- 中间的按钮div -->
            <div id="mid-btn">
                <div @click="selectRow" class="select-btn-div" title="选择为行变量">
                    <img class="btn-img" src="../../assets/select.png" alt="select">
                </div>
                <div @click="selectCol" class="select-btn-div" style="margin-top:45px;" title="选择为列变量">
                    <img class="btn-img" src="../../assets/select.png" alt="select">
                </div>
            </div>
            <!-- 右边已经选择的变量div -->
            <div id="show-selected-div">
                <div>
                    <div>行变量(Row)</div>
                    <div id="Depent-Var-div">
                        <div v-if="row_var!=null" @click="deleteRow" class="depent-var" title="点击移除">
                            {{row_var.head}}
                        </div>
                    </div>
                </div>
                <div style="margin-top:10px;">
                    <div>列变量(Column)</div>
                    <div id="Depent-Var-div">
                        <div v-if="col_var!=null" @click="deleteCol" class="depent-var" title="点击移除">
                            {{col_var.head}}
                        </div>
                    </div>
                </div>
                <div style="margin-top:10px;">
                    <div>SampleType:</div>
                    <select v-model="sampleType" class="form-control">
                        <option value="poisson">Poisson</option>
                        <option value="jointMulti">Joint Multinomial</option>
                        <option value="indepMulti">Independent Multinomial</option>
                        <option value="hypergeom">Hypergeometric(2x2 only)</option>
                    </select>
                </div>
                <div v-if="sampleType=='indepMulti'" style="margin-top:10px;">
                    <div>Fixed Margin:</div>
                    <select v-model="fixedMargin" class="form-control">
                        <option value="cols">cols fixed</option>
                        <option value="rows">rows fixed</option>
                    </select>
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
        <!-- 二项检验的结果 -->
        <div v-if="method=='BinomialTest'">
            <div><h5><b>Binomial Test</b></h5></div>
            <div v-if="result!=null">
                <ShowResult v-if="result!=null&&result!=undefined" :result="result" :method="method" ></ShowResult>
            </div>
        </div>
        <!-- 对数线性回归的结果 -->
        <div v-else-if="method=='Log-LinearRegression'">
            <div><h5><b>Log-Linear Regression</b></h5></div>
            <div v-if="result!=null">
                <div>
                    <b>call:</b><br>{{getFormula()}}
                </div>
                <ShowResult v-if="result!=null&&result!=undefined&&covariates.length>0" :result="result" :method="method" :covariates="covariates"></ShowResult>
            </div>
        </div>
        <!-- 列联表的结果 -->
        <div v-else-if="method=='ContingencyTables'">
            <div><h5><b>Contingency Tables</b></h5></div>
            <div v-if="result!=null">
                <ShowResult v-if="result!=null&&result!=undefined" :row_var="row_var" :col_var="col_var" :result="result" :method="method" ></ShowResult>
            </div>
        </div>
        <!-- 贝叶斯列联表的结果 -->
        <div v-else-if="method=='BayesContingencyTables'">
            <div><h5><b>Bayesian Contingency Tables</b></h5></div>
            <div v-if="result!=null">
                <ShowResult v-if="result!=null&&result!=undefined" :row_var="row_var" :col_var="col_var" :result="result" :method="method" ></ShowResult>
            </div>
        </div>
    </div>
    <!-- 消息框 -->
    <MyModal v-if="showModal==true" :show="showModal" title="正在处理数据"></MyModal>
</div>
</template>

<script>
import GlobalData from "@/components/GlobalData";
import axios from "axios";
import qs from "qs";
import ShowResult from '@/components/showResult';
import MyModal from "@/components/function/myModal";
export default {
    name: 'frequencies',
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
            row_var:null,
            col_var:null,
            covariates: [],
            variables:[],
            sampleType:"poisson",
            fixedMargin:"cols",
            result: null,
            formula: null,
            showModal:false,
        }
    },
    mounted() {
        //console.log(this.data);
    },
    methods: {
        //确定按钮
        confirm() {
            if(this.method == "BinomialTest")
                this.binomial();
            else if(this.method == "Log-LinearRegression")
                this.logLinearRegression(); 
            else if(this.method == "ContingencyTables")
                this.contingencyTables();
            else if(this.method == "BayesContingencyTables")
                this.bayesContingencyTables();
        },
        //处理获得分析公式
        getFormula() {
            if (this.method == "Log-LinearRegression") {
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
        //贝叶斯列联表
        bayesContingencyTables() {
            //console.log("confirm to ContingencyTables");
            if (this.row_var != null && this.col_var != null) {
                //检查类型为 hypergeom时的数据是否合法
                if(this.sampleType=="hypergeom"){
                    var a=null;
                    var b=null;
                    var illegal=false;
                    for(var i in this.row_var.data){
                        var temp=this.row_var.data[i];
                        if(temp!=a&&temp!=b){
                            if(a==null)
                                a=temp;
                            else if(b==null)
                                b=temp;
                            else
                                illegal=true;
                        }
                    }
                    console.log(a+","+b+","+illegal);
                    
                    if(a==null||b==null||illegal==true){
                        alert("变量"+this.row_var.head+"中不同的数据的种类不等于2，请检查！");
                        return;
                    }
                    a=null;
                    b=null;
                    illegal=false;
                    for(var i in this.col_var.data){
                        var temp=this.col_var.data[i];
                        if(temp!=a&&temp!=b){
                            if(a==null)
                                a=temp;
                            else if(b==null)
                                b=temp;
                            else
                                illegal=true;
                        }
                    }
                    if(a==null||b==null||illegal==true){
                        alert("变量"+this.col_var.head+"中不同的数据的种类不等于2，请检查！");
                        return;
                    }
                }
                //console.log("ContingencyTables");
                //检查行变量和列变量数据个数是否一致
                if(this.row_var.data.length!=this.col_var.data.length){
                    alert("行变量和列变量的数据个数不一致，请检查！");
                    return;
                }
                //处理数据，axiosData用于传到后台
                var axiosData = new Array();
                var row={"head":this.row_var.head,"strData":this.row_var.data};
                var col={"head":this.col_var.head,"strData":this.col_var.data};
                axiosData.push(row);
                axiosData.push(col);
                //参数
                var mapData={"sampleType":this.sampleType,"fixedMargin":this.fixedMargin};
                //
                this.showModal=true;
                //
                axios
                    .post("/api/Frequencies", {
                        "action":"bayesContingencyTables",
                        "dataList":axiosData,
                        "mapData":mapData
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
                        alert("服务器出现了点小问题...");
                        console.log(error);
                        //
                        this.showModal=false;
                    })

            } else alert("参数选择错误,请检查!");
        },
        //列联表
        contingencyTables() {
            console.log("confirm to ContingencyTables");
            if (this.row_var != null && this.col_var != null) {
                console.log("ContingencyTables");
                //检查行变量和列变量数据个数是否一致
                if(this.row_var.data.length!=this.col_var.data.length){
                    alert("行变量和列变量的数据个数不一致，请检查！");
                    return;
                }
                //处理数据，axiosData用于传到后台
                var axiosData = new Array();
                var row={"head":this.row_var.head,"strData":this.row_var.data};
                var col={"head":this.col_var.head,"strData":this.col_var.data};
                axiosData.push(row);
                axiosData.push(col);
                //
                this.showModal=true;
                //
                axios
                    .post("/api/Frequencies", {
                        "action":"ContingencyTables",
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
                        alert("服务器出现了点小问题...");
                        console.log(error);
                        //
                        this.showModal=false;
                    })

            } else alert("参数选择错误,请检查!");
        },
        //对数线性回归分析
        logLinearRegression() {
            console.log("confirm to logLinearRegression");
            if (this.dependent_variable != null && this.covariates.length > 0) {
                console.log("logLinearRegression");
                if(this.covariates.length<2){
                    alert("协变量个数至少要2个，请检查！");
                    return;
                }
                //检查因变量和协变量的数据是否都是数字，并且检查数据个数是否一致
                if (this.check_List_isAllNum(this.dependent_variable.data) == false) {
                    alert("因变量的数据存在非数字，请检查！");
                    return;
                }
                for (var i = 0; i < this.covariates.length; i++) {
                    if (this.dependent_variable.data.length != this.covariates[i].data.length) {
                        alert("已选择的项的数据个数不一致，请检查！");
                        return;
                    } else {
                        if (this.check_List_isAllNum(this.covariates[i].data) == false) {
                            alert("变量"+this.covariates[i].head+"中数据存在非数字，请检查！");
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
                    .post("/api/Frequencies", {
                        "action":"Log-LinearRegression",
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
                        alert("服务器出现了点小问题...");
                        console.log(error);
                        //
                        this.showModal=false;
                    })

            } else alert("参数选择错误,请检查!");
        },
        //二项检验 binomial
        binomial() {
            console.log("confirm to Binomial Test");
            if (this.variables.length>0) {
                console.log("Binomial Test");
                //检查测试值
                var test_value=$("#test_value").val();
                if(test_value==""||test_value==undefined||test_value==null){
                    alert("测试值为空，请检查！");
                    return;
                }
                //处理数据，axiosData用于传到后台
                var axiosData = new Array();
                for(var i=0;i<this.variables.length;i++){
                    var item=this.variables[i];
                    //
                    var names=new Array();//存放变量的各项数据名称
                    var data=new Array();//存放变量的各项数据
                    names.push("p_value");//测试值
                    data.push(test_value);
                    names.push("sum");//测试总数
                    data.push(item.data.length);
                    //统计每个不同的数据出现的次数
                    for(var j=0;j<item.data.length;j++){
                        var value=item.data[j];
                        //该数据已经统计过了，跳过
                        if(names.includes(value)){
                            continue;
                        }
                        var count=1;//该值出现次数
                        //查找后面的元素，统计出现次数
                        for(var k=j+1;k<item.data.length;k++){
                            if(item.data[k]==value){
                                count++;
                            }
                        }
                        //添加进数组
                        names.push(value);
                        data.push(count);
                    }
                    var item_json={"head":item.head,"data":data,"heads":names};
                    axiosData.push(item_json);
                }
                //
                this.showModal=true;
                //
                axios
                    .post("/api/Frequencies", {
                        "action":"BinomialTest",
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
                        alert("服务器出现了点小问题...");
                        console.log(error);
                        //
                        this.showModal=false;
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
