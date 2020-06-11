<template>
<div>
    <div id="nav">
        <!-- 描述性分析 -->
        <div class="dropdown">
            <div class="dropdown-toggle nav-div" data-toggle="dropdown">
                <img class="nav-img" src="../assets/descriptives.png" alt="descriptives">
                <br>
                描述性分析
            </div>
            <div class="dropdown-menu">
                <router-link :to="{path:'/Descriptives/',query:{'method':'DescriptiveStatistics'}}" class="dropdown-item">
                    描述性统计(Descriptive Statistics)
                </router-link>
                <hr>
                <router-link :to="{path:'/Descriptives/',query:{'method':'ReliabilityAnalysis'}}" class="dropdown-item">
                    可靠性分析(Reliability Analysis)
                </router-link>
            </div>
        </div>
        <!-- T-检验 -->
        <div class="dropdown">
            <div class="dropdown-toggle nav-div" data-toggle="dropdown">
                <img class="nav-img" src="../assets/T-tests.png" alt="descriptives">
                <br>
                T检验
            </div>
            <div class="dropdown-menu">
                <!-- <a class="dropdown-item" href="#">线性回归(Linear Regression)</a> -->
                <router-link :to="{path:'/T_test/',query:{'method':'IndependentSamplesT-Test'}}" class="dropdown-item">
                    独立样本T检验(Independent Samples T-Test)
                </router-link>
                <router-link :to="{path:'/T_test/',query:{'method':'PairedSamplesT-Test'}}" class="dropdown-item">
                    配对样本T检验(Paired Samples T-Test)
                </router-link>
                <router-link :to="{path:'/T_test/',query:{'method':'OneSampleT-Test'}}" class="dropdown-item">
                    单样本T检验(One Sample T-Test)
                </router-link>
            </div>
        </div>
        <!-- 回归分析 -->
        <div class="dropdown">
            <div class="dropdown-toggle nav-div" data-toggle="dropdown">
                <img class="nav-img" src="../assets/Regression.png" alt="Regression">
                <br>
                回归分析
            </div>
            <div class="dropdown-menu">
                <!-- <a class="dropdown-item" href="#">线性回归(Linear Regression)</a> -->
                <router-link :to="{path:'/Regression/',query:{'method':'Correlation'}}" class="dropdown-item">
                    相关性(Correlation)
                </router-link>
                <hr>
                <router-link :to="{path:'/Regression/',query:{'method':'LinearRegression'}}" class="dropdown-item">
                    线性回归(Linear Regression)
                </router-link>
                <router-link :to="{path:'/Regression/',query:{'method':'LogisticRegression'}}" class="dropdown-item">
                    逻辑回归(Logistic Regression)
                </router-link>
                <router-link :to="{path:'/Regression/',query:{'method':'PoissonRegression'}}" class="dropdown-item">
                    泊松回归(Poisson Regression)
                </router-link>
                <!-- <hr style="margin-top:5px;margin-bottom:5px;">
                <a class="dropdown-item" href="#">贝叶斯相关性(Bayesian Correlation)</a>
                <a class="dropdown-item" href="#">贝叶斯线性回归(Bayesian Linear Regression)</a> -->
            </div>
        </div>
        <!-- 方差分析 -->
        <div class="dropdown">
            <div class="dropdown-toggle nav-div" data-toggle="dropdown">
                <img class="nav-img" src="../assets/ANOVA.png" alt="Regression">
                <br>
                方差分析
            </div>
            <div class="dropdown-menu">
                <!-- <a class="dropdown-item" href="#">线性回归(Linear Regression)</a> -->
                <router-link :to="{path:'/Anova/',query:{'method':'ANOVA'}}" class="dropdown-item">
                    方差分析(ANOVA)
                </router-link>
                <router-link :to="{path:'/Anova/',query:{'method':'ANCOVA'}}" class="dropdown-item">
                    协方差分析(ANCOVA)
                </router-link>
                <router-link :to="{path:'/Anova/',query:{'method':'MANOVA'}}" class="dropdown-item">
                    多变量方差分析(MANOVA)
                </router-link>
                <!-- <router-link :to="{path:'/Analysis',query:{'method':'RepeatedMeasuresANOVA'}}" class="dropdown-item">
                    重复测量方差分析(Repeated Measures ANOVA)
                </router-link> -->
            </div>
        </div>
        <!-- 频率分析 -->
        <div class="dropdown">
            <div class="dropdown-toggle nav-div" data-toggle="dropdown">
                <img class="nav-img" src="../assets/Frequencies.png" alt="Regression">
                <br>
                频率分析
            </div>
            <div class="dropdown-menu">
                <!-- <a class="dropdown-item" href="#">线性回归(Linear Regression)</a> -->
                <router-link :to="{path:'/Frequencies/',query:{'method':'BinomialTest'}}" class="dropdown-item">
                    二项检验(Binomial Test)
                </router-link>
                <hr>
                <!-- <router-link :to="{path:'/Analysis',query:{'method':'MultinomialTest'}}" class="dropdown-item">
                    多项检验(Multinomial Test)
                </router-link>
                <hr> -->
                <router-link :to="{path:'/Frequencies/',query:{'method':'ContingencyTables'}}" class="dropdown-item">
                    列联表(Contingency Tables)
                </router-link>
                <router-link :to="{path:'/Frequencies/',query:{'method':'Log-LinearRegression'}}" class="dropdown-item">
                    对数线性回归(Log-Linear Regression)
                </router-link>
            </div>
        </div>
        <!-- 因子分析 -->
        <div class="dropdown">
            <div class="dropdown-toggle nav-div" data-toggle="dropdown">
                <img class="nav-img" src="../assets/Factor.png" alt="Regression">
                <br>
                因素分析
            </div>
            <div class="dropdown-menu">
                <router-link :to="{path:'/Factor/',query:{'method':'PrincipalComponentAnalysis'}}" class="dropdown-item">
                    主成分分析(Principal Component Analysis)
                </router-link>
                <hr>
                <router-link :to="{path:'/Factor/',query:{'method':'ExploratoryFactorAnalysis'}}" class="dropdown-item">
                    探索性因子分析(Exploratory Factor Analysis)
                </router-link>
                <!-- <router-link :to="{path:'/Factor/',query:{'method':'ConfirmatoryFactorAnalysis'}}" class="dropdown-item">
                   验证性因子分析(Confirmatory Factor Analysis)
                </router-link> -->
            </div>
        </div>
    </div>
    <div id="index-table-div">
        <table border="0">
            <tr>
                <td style="width:60px;height:20px;"></td>
                <td :id="c*max" v-for="c in colNum" @click="clearCol" class="my-td-input my-cowNum" title="点击删除此列数据">{{c}}</td>
                <td class="addCol_Row" @click="colNum++;" title="点击添加列">
                    <img src="../assets/add.png" alt="addCol" width="20" height="20">
                </td>
            </tr>
            <tr v-for="r in rowNum" :key="r">
                <td :id="r" @click="clearRow" class="my-rowNum" style="height:20px;text-align:center;" title="点击删除此行数据">{{r-1}}</td>
                <td v-for="c in colNum" :key="c">
                    <input :id="c*max+r" type="text" @keydown.enter="moveFocus" class="my-td-input" :class="{'table-head-input':r==1}">
                </td>
            </tr>
            <tr>
                <td class="addCol_Row" @click="rowNum++;" style="text-align:center;" title="点击添加行">
                    <img src="../assets/add.png" alt="addCol" width="20" height="20">
                </td>
            </tr>
        </table>
    </div>
</div>
</template>

<script>
import axios from "axios";
import qs from "qs";
//全局变量模块，用于保存输入的数据data
import GlobalData from "@/components/GlobalData";
export default {
    name: 'index',
    data() {
        return {
            max: 100000, //最大的行数和列数
            rowNum: 20, //当前行数
            colNum: 21, //当前列数
        }
    },
    created() {

    },
    mounted() {
        //this.test();
    },
    beforeRouteLeave (to, from, next) {
        GlobalData.setData(this.getData());
        console.log(GlobalData.data);
        next();
    },
    methods: {
        //获取所有输入数据
        getData(){
            //
            var data=new Array();
            //循环遍历每一列
            for(var i=1;i<=this.colNum;i++){
                var colData=new Array();
                var col_head=null;
                //处理一列的每个数据
                for(var j=1;j<=this.rowNum;j++){
                    var id=i*this.max+j;
                    var value=$("#"+id).val();
                    if(value!=undefined&&value!=null&&value!=""){
                        if(j==1)
                            col_head=value;
                        else
                            colData.push(value);
                    }
                }
                //
                if(col_head!=null&&col_head!=undefined&&colData.length>0){
                    var col_json={"head":col_head,"data":colData};
                    data.push(col_json);
                }    
            }
            //console.log(data);
            //
            if(data.length>0)
                return data;
            else return null;
            
        },
        //删除这一行数据
        clearRow(e) {
            var this_rowNum = parseInt(e.target.id); //当前处在第几行
            for (var i = 1; i <= this.colNum; i++) {
                var clearId = i * this.max + this_rowNum;
                $("#" + clearId).val("");
            }
        },
        //删除这一列数据
        clearCol(e) {
            var id = parseInt(e.target.id);
            console.log("点击的是" + id);
            for (var i = 1; i < this.rowNum; i++) {
                var clearId = id + i;
                $("#" + clearId).val("");
            }
        },
        //按回车，光标移到下一行
        moveFocus(e) {
            //获取当前的id
            var id = e.target.id;
            //下一个项的id
            var next_id = parseInt(id) + 1;
            var next_input = $("#" + next_id);
            //判断下一个项存在，直接设光标
            var next_rowNum = next_id % this.max; //下一个项所处的行数
            //下一个项所处的行数小于等于生成的行数，则直接设置光标
            if (next_rowNum <= this.rowNum) {
                //console.log("下一项存在");
                next_input.focus();
            }
            //不存在，则添加一行
            else {
                //console.log("下一项不存在");
                this.rowNum++;
            }
            //console.log(id);
        },
        //获取一列的数据
        getCowData(index) {
            var col1 = new Array();
            var col1_head;
            for (var i = 1; i <= this.rowNum; i++) {
                var id = index * this.max + i;
                var value = $("#" + id).val();
                if (value == "" || value == null)
                    break;
                else if (i == 1)
                    col1_head = value;
                else if (i >= 2) //因为第一项是表头，第二项开始才是数据 
                    col1.push(value);
            }
            console.log("第" + index + "列\t" + col1_head + ":" + col1);
            return col1;
        },
        test() {
            var x = new Array(10, 11, 13, 16, 15);
            var y = new Array(1, 1.5, 2, 3, 2.3);
            axios
                .post("/api/linearRegression", qs.stringify({
                    "x": x,
                    "y": y
                }, {
                    indices: false
                }))
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }
}
</script>

<style>
hr{
    margin:3px;
}
#nav {
    width: 100%;
    height: 80px;
    display: flex;
    flex-direction: row;
    padding-left: 30px;
    background: rgb(235, 235, 235);
}
.nav-img{
    width: 70px;
    height: 45px;
    transition: all 0.1s;
}
.nav-div {
    height: 55px;
    width: 95px;
    padding: 5px;
    padding-top: 0;
    margin-left: 20px;
    text-align: center;
}
.nav-div:hover {
    cursor: pointer;
}
.nav-div:hover img{
    width: 76px;
    height: 53px;
}
.addCol_Row:hover {
    cursor: pointer;
    background: rgb(200, 200, 200);
}

#index-table-div {
    width: 95%;
    height: 700px;
    overflow-y: auto;
    overflow-x: auto;
    margin: 30px;
    margin-top: 5px;
    margin-bottom: 0;
    padding-top: 5px;
    padding-right: 20px;
    padding-bottom: 5px;
    background: rgb(235, 235, 235);
}

.table-head {
    border: none;
    outline: none;
}

.table-head-input {
    border: rgb(150, 150, 150) solid 1px;
    background: rgb(220, 220, 220);
}

.my-td-input {
    width: 60px;
    height: 30px;
    text-align: center;
}

.my-cowNum:hover {
    cursor: pointer;
    background: rgb(200, 200, 200);
}

.my-rowNum:hover {
    cursor: pointer;
    background: rgb(200, 200, 200);
}
</style>
