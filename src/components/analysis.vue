<template>
<div style="padding:10px;">
    <!-- params -->
    <div id="main-left-div">
        <div style="padding-bottom: 20px;">
            <b v-if="method=='LinearRegression'">线性回归(linear Regression)</b>
            <b v-else-if="method=='LogisticRegression'">逻辑回归(logisticRegression)</b>
            <b v-else-if="method=='Correlation'">相关性分析(correlation)</b>
            <b v-else-if="method=='DescriptiveStatistics'">描述性统计(Descriptive Statistics)</b>
            <b v-else-if="method=='ReliabilityAnalysis'">可靠性分析(Reliability Analysis)<br>Cronbach's alpha</b>
            <b v-else-if="method=='IndependentSamplesT-Test'">独立样本T检验(Independent Samples T-Test)</b>
            <b v-else-if="method=='PairedSamplesT-Test'">配对样本T检验(Paired Samples T-Test)</b>
            <b v-else-if="method=='OneSampleT-Test'">单样本T检验(One Sample T-Test)</b>
            <b v-else-if="method=='ANOVA'">方差分析(ANOVA)</b>
            <b v-else-if="method=='ANCOVA'">协方差分析(ANCOVA)</b>
            <b v-else-if="method=='MANOVA'">多变量方差分析(MANOVA)</b>
        </div>

        <!-- 线性回归和逻辑回归的界面 -->
        <div v-if="method=='LinearRegression'||method=='LogisticRegression'">
            <!-- 左边选择变量的div -->
            <div id="select-div">
                <div v-for="item in data" :class="{'selected':selected_head==item.head}" @click="selectItem(item)" class="select-var" :key="item.head">
                    {{item.head}}
                </div>
            </div>
            <!-- 中间的按钮div -->
            <div id="mid-btn">
                <div @click="selectDenpendent" class="select-btn-div" title="选择为因变量">
                    <img class="btn-img" src="../assets/select.png" alt="select">
                </div>
                <div @click="selectCovariate" class="select-btn-div" style="margin-top:60px;" title="选择为协变量">
                    <img class="btn-img" src="../assets/select.png" alt="select">
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

        <!-- 相关性的界面 -->
        <div v-else-if="method=='Correlation'">
            <!-- 左边选择变量的div -->
            <div id="select-div">
                <div :class="{'selected':selected_head==item.head}" @click="selectItem(item)" class="select-var" v-for="item in data" :key="item.head">
                    {{item.head}}
                </div>
            </div>
            <!-- 中间的按钮div -->
            <div id="mid-btn">
                <div @click="selectVariable" class="select-btn-div" title="选择为变量">
                    <img class="btn-img" src="../assets/select.png" alt="select">
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

        <!-- 描述性统计的界面 -->
        <div v-else-if="method=='DescriptiveStatistics'">
            <!-- 左边选择变量的div -->
            <div id="select-div">
                <div :class="{'selected':selected_head==item.head}" @click="selectItem(item)" class="select-var" v-for="item in data" :key="item.head">
                    {{item.head}}
                </div>
            </div>
            <!-- 中间的按钮div -->
            <div id="mid-btn">
                <div @click="selectVariable" class="select-btn-div" title="选择为变量">
                    <img class="btn-img" src="../assets/select.png" alt="select">
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

        <!-- 可靠性分析的界面 -->
        <div v-else-if="method=='ReliabilityAnalysis'">
            <!-- 左边选择变量的div -->
            <div id="select-div">
                <div :class="{'selected':selected_head==item.head}" @click="selectItem(item)" class="select-var" v-for="item in data" :key="item.head">
                    {{item.head}}
                </div>
            </div>
            <!-- 中间的按钮div -->
            <div id="mid-btn">
                <div @click="selectVariable" class="select-btn-div" title="选择为变量">
                    <img class="btn-img" src="../assets/select.png" alt="select">
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

        <!-- 独立样本T检验的界面 -->
        <div v-else-if="method=='IndependentSamplesT-Test'">
            <!-- 左边选择变量的div -->
            <div id="select-div">
                <div v-for="item in data" :class="{'selected':selected_head==item.head}" @click="selectItem(item)" class="select-var" :key="item.head">
                    {{item.head}}
                </div>
            </div>
            <!-- 中间的按钮div -->
            <div id="mid-btn">
                <div @click="selectDenpendent" class="select-btn-div" title="选择为因变量">
                    <img class="btn-img" src="../assets/select.png" alt="select">
                </div>
                <div @click="selectCovariate" class="select-btn-div" style="margin-top:60px;" title="选择为协变量">
                    <img class="btn-img" src="../assets/select.png" alt="select">
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
                    <img class="btn-img" src="../assets/select.png" alt="select">
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
                    <img class="btn-img" src="../assets/select.png" alt="select">
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

        <!-- 方差分析ANOVA的界面 -->
        <div v-else-if="method=='ANOVA'">
            <!-- 左边选择变量的div -->
            <div id="select-div">
                <div v-for="item in data" :class="{'selected':selected_head==item.head}" @click="selectItem(item)" class="select-var" :key="item.head">
                    {{item.head}}
                </div>
            </div>
            <!-- 中间的按钮div -->
            <div id="mid-btn">
                <div @click="selectDenpendent" class="select-btn-div" title="选择为因变量">
                    <img class="btn-img" src="../assets/select.png" alt="select">
                </div>
                <div @click="selectCovariate" class="select-btn-div" style="margin-top:60px;" title="选择为固定因子">
                    <img class="btn-img" src="../assets/select.png" alt="select">
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
                    <div>固定因子(Fixed Factors)</div>
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
                <div @click="selectDenpendent" class="select-btn-div" title="选择为因变量">
                    <img class="btn-img" src="../assets/select.png" alt="select">
                </div>
                <div @click="selectFactor" class="select-btn-div" style="margin-top:50px;" title="选择为固定因子">
                    <img class="btn-img" src="../assets/select.png" alt="select">
                </div>
                <div @click="selectCovariate" class="select-btn-div" style="margin-top:95px;" title="选择为协变量">
                    <img class="btn-img" src="../assets/select.png" alt="select">
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
                <div style="margin-top:4px;">
                    <div>固定因子(Fixed Factors)</div>
                    <div id="Factor-div">
                        <div v-if="factors.length>0" @click="deleteFactor(item)" class="depent-var" v-for="item in factors" :key="item.head" title="点击移除">
                            {{item.head}}
                        </div>
                    </div>
                </div>
                <div style="margin-top:4px;">
                    <div>协变量(Covariates)</div>
                    <div id="Covar-div" style="height:100px;">
                        <div v-if="covariates.length>0" @click="deleteCovar(item)" class="depent-var" v-for="item in covariates" :key="item.head" title="点击移除">
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
                <div @click="selectDependents" class="select-btn-div" title="选择为因变量">
                    <img class="btn-img" src="../assets/select.png" alt="select">
                </div>
                <div @click="selectFactor" class="select-btn-div" style="margin-top:130px;" title="选择为固定因子">
                    <img class="btn-img" src="../assets/select.png" alt="select">
                </div>
            </div>
            <!-- 右边已经选择的变量div -->
            <div id="show-selected-div">
                <div>
                    <div>因变量(Dependent Variables)</div>
                    <div id="dependents-div" style="height:120px;">
                        <div v-if="dependents.length>0" @click="deleteDependents(item)" class="depent-var" v-for="item in dependents" :key="item.head" title="点击移除">
                            {{item.head}}
                        </div>
                    </div>
                </div>
                <div style="margin-top:10px;">
                    <div>固定因子(Fixed Factors)</div>
                    <div id="Factor-div" style="height:130px;">
                        <div v-if="factors.length>0" @click="deleteFactor(item)" class="depent-var" v-for="item in factors" :key="item.head" title="点击移除">
                            {{item.head}}
                        </div>
                    </div>
                </div>    
            </div>
        </div>

        <!-- 确定按钮 -->
        <div style="width:100%;">
            <button type="button" style="float:right;margin-top:10px;margin-right:25px;" @click="confirm" class="btn btn-warning btn-sm">OK</button>
        </div>
    </div>
    <!-- result -->
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
        <!-- 相关性的结果 -->
        <div v-else-if="method=='Correlation'">
            <div><h5><b>Correlation</b></h5></div>
            <div v-if="result!=null">
                <ShowResult v-if="result!=null&&result!=undefined&&variables.length>0" :result="result" :method="method" :variables="variables"></ShowResult>
            </div>
        </div>
        <!-- 描述性统计的结果 -->
        <div v-else-if="method=='DescriptiveStatistics'">
            <div><h5><b>Descriptive Statistics</b></h5></div>
            <div v-if="result!=null">
                <ShowResult v-if="result!=null&&result!=undefined&&variables.length>0" :result="result" :method="method" :variables="variables"></ShowResult>
            </div>
        </div> 
        <!-- 可靠性分析的结果 -->
        <div v-else-if="method=='ReliabilityAnalysis'">
            <div><h5><b>Reliability Analysis</b></h5></div>
            <div><b>Cronbach's alpha</b></div>
            <div v-if="result!=null">
                <ShowResult v-if="result!=null&&result!=undefined&&variables.length>0" :result="result" :method="method" :variables="variables"></ShowResult>
            </div>
        </div>
        <!-- 独立样本T检验的结果 -->
        <div v-else-if="method=='IndependentSamplesT-Test'">
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
        <!-- 方差分析的结果 -->
        <div v-else-if="method=='ANOVA'">
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
</div>
</template>

<script>
import GlobalData from "@/components/GlobalData";
import axios from "axios";
import qs from "qs";
import ShowResult from '@/components/showResult';
export default {
    name: 'linearRegression',
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
            if (this.method == "LinearRegression")
                this.linearRegression();
            else if (this.method == "LogisticRegression")
                this.logisticRegression();
            else if (this.method == "Correlation")
                this.correlation();
            else if (this.method == "DescriptiveStatistics")
                this.descriptiveStatistics();
            else if (this.method == "ReliabilityAnalysis")
                this.reliabilityAnalysis();
            else if (this.method == "IndependentSamplesT-Test")
                this.independentSamplesT();
            else if (this.method == "PairedSamplesT-Test")
                this.pairedSamplesT();
            else if (this.method == "OneSampleT-Test")
                this.oneSamplesT();
            else if (this.method == "ANOVA")
                this.anova();
            else if (this.method == "ANCOVA")
                this.ancova();
            else if (this.method == "MANOVA")
                this.manova();
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
        },
        //多变量方差分析manova
        manova() {
            console.log("confirm to MANOVA");
            if (this.dependents.length>0&&this.factors.length>0) {
                console.log("MANOVA");
                if(this.dependents.length<2){
                    alert("因变量个数不能小于2个，请检查！");
                    return;
                }
                //检查因变量、固定因子、协变量的数据是否都是数字，并且检查数据个数是否一致
                var len=this.dependents[0].data.length;
                //检查因变量
                for (var i = 0; i < this.dependents.length; i++) {
                        if(this.dependents[i].data.length!=len){
                            alert("存在因变量的数据长度不一致，请检查！");
                            return;
                        }
                        if (this.check_List_isAllNum(this.dependents[i].data) == false) {
                            alert("变量"+this.dependents[i].head+"中数据存在非数字，请检查！");
                            return;
                        }
                }
                //检查固定因子
                for (var i = 0; i < this.factors.length; i++) {
                        if(this.factors[i].data.length!=len){
                            alert("存在固定因子的数据长度与因变量的数据长度不一致，请检查！");
                            return;
                        }
                        if (this.check_List_isAllNum(this.factors[i].data) == false) {
                            alert("变量"+this.factors[i].head+"中数据存在非数字，请检查！");
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
                axios
                    .post("/api/ANOVA", {
                        "action":"MANOVA",
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
        //协方差分析ancova
        ancova() {
            console.log("confirm to ANCOVA");
            if (this.dependent_variable != null) {
                console.log("ANCOVA");
                if(this.factors.length<1&&this.covariates.length<1){
                    alert("固定因子和协变量不能同时为空，请检查！");
                    return;
                }
                //检查因变量、固定因子、协变量的数据是否都是数字，并且检查数据个数是否一致
                if (this.check_List_isAllNum(this.dependent_variable.data) == false) {
                    alert("因变量的数据存在非数字，请检查！");
                    return;
                }
                //检查固定因子
                for (var i = 0; i < this.factors.length; i++) {
                        if(this.factors[i].data.length!=this.dependent_variable.data.length){
                            alert("存在固定因子的数据长度与因变量的数据长度不一致，请检查！");
                            return;
                        }
                        if (this.check_List_isAllNum(this.factors[i].data) == false) {
                            alert("变量"+this.factors[i].head+"中数据存在非数字，请检查！");
                            return;
                        }
                }
                //检查协变量
                for (var i = 0; i < this.covariates.length; i++) {
                        if(this.covariates[i].data.length!=this.dependent_variable.data.length){
                            alert("存在协变量的数据长度与因变量的数据长度不一致，请检查！");
                            return;
                        }
                        if (this.check_List_isAllNum(this.covariates[i].data) == false) {
                            alert("变量"+this.covariates[i].head+"中数据存在非数字，请检查！");
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
                axios
                    .post("/api/ANOVA", {
                        "action":"ANCOVA",
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
        //方差分析anova
        anova() {
            console.log("confirm to ANOVA");
            if (this.dependent_variable != null && this.covariates.length > 0) {
                console.log("ANOVA");
                //检查因变量和固定因子的数据是否都是数字，并且检查数据个数是否一致
                if (this.check_List_isAllNum(this.dependent_variable.data) == false) {
                    alert("因变量的数据存在非数字，请检查！");
                    return;
                }
                for (var i = 0; i < this.covariates.length; i++) {
                        if(this.covariates[i].data.length!=this.dependent_variable.data.length){
                            alert("存在固定因子的数据长度与因变量的数据长度不一致，请检查！");
                            return;
                        }
                        if (this.check_List_isAllNum(this.covariates[i].data) == false) {
                            alert("变量"+this.covariates[i].head+"中数据存在非数字，请检查！");
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
                axios
                    .post("/api/ANOVA", {
                        "action":"ANOVA",
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
        //可靠性分析
        reliabilityAnalysis(){
            console.log("confirm to reliabilityAnalysis");
            if (this.variables.length > 0) {
                console.log("reliabilityAnalysis");
                if(this.variables.length==1){
                    alert("选择的变量个数需要大于等于2，请检查！");
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
                    .post("/api/reliabilityAnalysis", 
                        {
                            "action":this.method,
                            "dataList":this.variables
                        }
                    )
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
        //描述性统计
        descriptiveStatistics(){
            console.log("confirm to descriptiveStatistics");
            if (this.variables.length > 0) {
                console.log("descriptiveStatistics");
                //检查变量的数据是否都是数字
                var len=this.variables[0].data.length;
                for (var i = 0; i < this.variables.length; i++) {
                    if (this.check_List_isAllNum(this.variables[i].data) == false) {
                        alert("变量"+this.variables[i].head+"中数据存在非数字，请检查！");
                        return;
                    }
                }

                //
                axios
                    .post("/api/descriptiveStatistics", this.variables)
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
        //相关性分析
        correlation(){
            console.log("confirm to correlation");
            if (this.variables.length > 0) {
                console.log("correlation");
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
                    .post("/api/correlation", this.variables)
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
        //线性回归分析
        linearRegression() {
            console.log("confirm to linearRegression");
            if (this.dependent_variable != null && this.covariates.length > 0) {
                console.log("linearRegression");
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
                axios
                    .post("/api/linearRegression", axiosData

                        // "covariates": this.covariates,
                        // "dependent_variable": this.dependent_variable
                    )
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
        //逻辑回归分析
        logisticRegression() {
            console.log("confirm to logisticRegression");
            if (this.dependent_variable != null && this.covariates.length > 0) {
                console.log("logisticRegression");
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
                //检查因变量的数据的值,0<=值<=1
                for(var i=0;i<this.dependent_variable.data.length;i++){
                    if(this.dependent_variable.data[i]<0||this.dependent_variable.data[i]>1){
                        alert("因变量的数据的值必须在 [0,1] 区间内,请检查！");
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
                axios
                    .post("/api/logisticRegression", axiosData)
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
/* 已选择的变量的项的样式 */
.depent-var {
    padding: 2px;
    padding-left: 5px;
    border-radius: 3px;
}
.depent-var:hover {
    cursor: pointer;
    background: rgb(220, 220, 220);
}
/* 显示多个因变量的 div*/
#dependents-div{
    width:100%;
    height: 100px;
    padding: 5px;
    border-radius: 4px;
    background: white;
    color: rgb(235, 174, 61);
    overflow-y: auto;
    overflow-x: auto;
}
/* 显示 Factor 的 div*/
#Factor-div{
    width:100%;
    height: 100px;
    padding: 5px;
    border-radius: 4px;
    background: white;
    color: rgb(235, 87, 61);
    overflow-y: auto;
    overflow-x: auto;
}
/* 显示 Variale 的 div*/
#Variable-div{
    width:100%;
    height: 278px;
    padding: 5px;
    border-radius: 4px;
    background: white;
    color: rgb(61, 203, 235);
    overflow-y: auto;
    overflow-x: auto;
}
/* 显示协变量 covariates 的 div */
#Covar-div {
    width: 100%;
    height: 198px;
    padding: 5px;
    border-radius: 4px;
    background: white;
    color: rgb(61, 203, 235);
    overflow-y: auto;
    overflow-x: auto;
}
/* 显示单个因变量 dependent-variale 的div */
#Depent-Var-div {
    width: 100%;
    height: 30px;
    padding: 3px;
    border-radius: 4px;
    background: white;
    color: rgb(235, 174, 61);
    overflow-x: auto;
}
/* 选择按钮的图片样式 */
.btn-img {
    width: 15px;
    height: 15px;
    margin-top: -5px;
}
/* 选择按钮的样式 */
.select-btn-div {
    height: 20px;
    width: 40px;
    border: rgb(150, 150, 150) solid 1px;
    border-radius: 4px;
    background: rgb(245, 245, 245);
    margin-left: 35%;
    margin-top: 10px;
}
.select-btn-div:hover {
    cursor: pointer;
    background: rgb(220, 220, 220);
}
/* 右边展示已选的数据项的div */
#show-selected-div {
    width: 33%;
    height: 300px;
    float: left;
    margin-left: 20px;
    /* padding: 10px; */
    /* background: white; */
}
/* 包含中间的按钮的div样式 */
#mid-btn {
    text-align: center;
    margin-left: 20px;
    float: left;
    width: 20%;
    height: 300px;
    /* background: white; */
}
/* 左边的数据项的样式 */
.select-var {
    padding-left: 5px;
    padding-right: 30px;
    margin-bottom: 2px;
    border-radius: 4px;
}
.select-var:hover {
    cursor: pointer;
    background: rgb(200, 200, 200);
}
/* 已选择的项的样式 */
.selected {
    background: rgb(200, 200, 200);
}
/* 左边选择数据项的div */
#select-div {
    padding: 4px;
    padding-bottom: 200px;
    margin-left: 20px;
    width: 33%;
    height: 300px;
    overflow-y: auto;
    overflow-x: auto;
    background: white;
    border-radius: 5px;
    float: left;
}
/* 左边的div */
#main-left-div {
    width: 42%;
    padding: 10px;
    height: 760px;
    background: rgb(235, 235, 235);
    font-size: 14px;
    float: left;
    border-radius: 5px;
    /* border:rgb(100,100,100) solid 1px; */
}
/* 右边显示结果的div */
#main-right-div {
    width: 58%;
    height: 760px;
    overflow-y:auto;
    overflow-x: auto;
    padding: 10px;
    background: white;
    float: left;
    border-radius: 5px;
    /* border:rgb(100,100,100) solid 1px; */
}
</style>
