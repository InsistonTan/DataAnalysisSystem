<template>
<div style="padding:10px;">
    <!-- params 参数选择界面-->
    <div id="main-left-div">
        <!-- title -->
        <div style="padding-bottom: 20px;">
            <b v-if="method=='DescriptiveStatistics'">Descriptive Statistics</b>
            <b v-else-if="method=='ReliabilityAnalysis'">Reliability Analysis<br>Cronbach's alpha</b>
        </div>

        <!-- 描述性统计的界面 -->
        <div v-if="method=='DescriptiveStatistics'">
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
        <!-- 描述性统计的结果 -->
        <div v-if="method=='DescriptiveStatistics'">
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
    name: 'descriptives',
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
            variables:[],
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
            if (this.method == "DescriptiveStatistics")
                this.descriptiveStatistics();
            else if (this.method == "ReliabilityAnalysis")
                this.reliabilityAnalysis();
        },
        
        //可靠性分析
        reliabilityAnalysis(){
            console.log("confirm to reliabilityAnalysis");
            if (this.variables.length > 0) {
                console.log("reliabilityAnalysis");
                if(this.variables.length==1){
                    alert("The number of selected variables needs to be greater than or equal to 2, please check！");
                    return;
                }
                //检查变量的数据是否都是数字，并且检查数据个数是否一致
                var len=this.variables[0].data.length;
                for (var i = 0; i < this.variables.length; i++) {
                    if (this.variables[i].data.length!=len) {
                        alert("The number of data of the selected variable is inconsistent, please check！");
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
                    .post("/api/reliabilityAnalysis", 
                        {
                            "action":this.method,
                            "dataList":this.variables
                        }
                    )
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
        //描述性统计
        descriptiveStatistics(){
            console.log("confirm to descriptiveStatistics");
            if (this.variables.length > 0) {
                console.log("descriptiveStatistics");
                //检查变量的数据是否都是数字
                var len=this.variables[0].data.length;
                for (var i = 0; i < this.variables.length; i++) {
                    if (this.check_List_isAllNum(this.variables[i].data) == false) {
                        alert("The data in the variable:"+this.variables[i].head+" is non-numeric, please check！");
                        return;
                    }
                }
                //
                this.showModal=true;
                //
                axios
                    .post("/api/descriptiveStatistics", this.variables)
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
