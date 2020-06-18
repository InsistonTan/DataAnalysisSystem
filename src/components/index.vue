<template>
<div>
    <!-- 顶部导航栏 -->
    <div id="nav">
        <div id="nav-menu-div">
            <img id="menu-img" @click="openMenu" src="../assets/menu.png" alt="descriptives">
        </div>
        <!-- 描述性分析 -->
        <div class="dropdown" style="margin-left:20px;">
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
    <!-- 菜单 -->
    <div id="menu" v-if="showMenu==true">
        <input id="file" type="file" @change="uploadFile()" style="display:none;">
        <input id="savefile" type="file" @change="saveToServer()" style="display:none;">
        <div v-if="user==null">
            <div class="menu-item" @click="click_login=true">
                <span class="text-success">登陆</span>/<span class="text-warning">注册</span>
            </div>
        </div>
        <div v-else>
            <div v-if="user.username!=undefined"><b style="color:rgb(205, 133, 63);font-size:18px;">{{user.username}}</b></div>
            <hr>
            <div class="menu-item" @click="openSelectFile('savefile')">
                上传数据文件
            </div>
            <div class="menu-item" @mouseenter="showUploadFiles=true">
                打开已上传的文件
            </div>
        </div>
        <hr>
        <div class="menu-item" @click="openSelectFile('excel')">
            读取本地excel数据
        </div>
        <div class="menu-item" @click="openSelectFile('csv')">
            读取本地csv数据
        </div>
        <div class="menu-item" @click="openSelectFile('sav')">
            读取本地sav数据
        </div>
    </div>
    <!-- 已上传的文件列表 -->
    <div id="FileList" v-show="showUploadFiles==true">
        <div style="text-align:center;"><b>已上传文件列表({{uploadFiles.length}})</b></div>
        <hr>
        <div v-for="item in uploadFiles" @click="openMyFile(item)" class="menu-item" title="点击打开此文件">
            {{item.filename}}&nbsp;&nbsp;
            <span style="font-size:12px;">{{item.time}}</span>
        </div>
    </div>
    <!-- 表格 -->
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
    <!-- 消息框 -->
    <MyModal v-if="showModal==true" :show="showModal" :title="modal_text" :notAnimation="modal_NotAnimation"></MyModal>
    <!-- 登陆界面 -->
    <Login v-if="click_login==true" :show="click_login" @closeLogin="click_login=false" @getLoginUser="doLoginComp($event)"></Login>
</div>
</template>

<script>
import axios from "axios";
import qs from "qs";
//全局变量模块，用于保存输入的数据data
import GlobalData from "@/components/GlobalData";
import MyModal from "@/components/function/myModal";
import Login from "@/components/function/login";
export default {
    name: 'index',
    components: {
        MyModal,
        Login
    },
    data() {
        return {
            max: 100000, //最大的行数和列数
            rowNum: 20, //当前行数
            colNum: 21, //当前列数
            showMenu: false, //显示菜单
            file_type: null, //上传的文件类型
            showModal: false, //显示消息框
            modal_text:null,//消息框modal_animation:true,显示的内容
            modal_NotAnimation:false,//不要消息框动画
            res_data: null,
            user: null, //登陆的用户
            click_login: false, //点击登陆
            uploadFiles:[],//已上传的文件列表
            showUploadFiles: false, //显示已上传的文件列表
        }
    },
    created() {
        this.checkLogin();
        //this.getMyfiles();
    },
    mounted() {
        // var a={"xx":[1,2,3],"yy":[2,5,4]};
        // for(var item in a){
        //     console.log(item+":"+a[item]);
        //     for(var i in a[item])
        //         console.log(a[item][i]);
        // }
    },
    beforeRouteLeave(to, from, next) {
        GlobalData.setData(this.getData());
        console.log(GlobalData.data);
        next();
    },
    watch: {
        rowNum: function () {
            console.log("rowNum发生了变化");
            if (this.res_data != null) {
                this.$nextTick(function () {
                    this.showDataToTable(this.res_data);
                });
            }
        },
        colNum: function () {
            console.log("colNum发生了变化");
            if (this.res_data != null) {
                this.$nextTick(function () {
                    this.showDataToTable(this.res_data);
                });
            }

        }
    },
    methods: {
        //登陆组件登陆成功
        doLoginComp(loginUser){
            if(loginUser.uid!=null&&loginUser.uid!="null"&&loginUser.uid!=undefined){
                this.user=loginUser;//保存用户信息
                this.getMyfiles();//获取上传文件记录
            }
        },
        //检查登陆
        checkLogin() {
            axios
                .post("/api/checkLogin")
                .then(response => {
                    var res = response.data;
                    if (res.uid != null && res.uid != "null") {
                        console.log("用户已经登陆");
                        this.user = res;
                        this.getMyfiles();//获取上传的文件记录
                    } else {
                        console.log("用户还未登陆");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        //打开菜单
        openMenu() {
            console.log("open Menu");
            if (this.showMenu == false)
                this.showMenu = true;
            else{
                this.showUploadFiles=false;
                this.showMenu = false;
            }
                
        },
        //打开已上传的文件
        openMyFile(file){
            //上传文件
            this.modal_text="正在处理数据";
            this.modal_NotAnimation=false;//要动画
            this.showModal = true;
            //return;
            axios
                .post("/api/openMyFile",{
                    "index":file.index
                })
                .then(response => {
                    if (response.data.statu == "success") {
                        console.log(response.data);
                        this.checkData(response.data.data);
                    } else alert(response.data.msg);
                })
                .catch(function (error) {
                    setTimeout(this.closeModal, 1200);
                    console.log(error);
                    alert("服务器出了点小问题...");
                })
        },
        //获取登录用户上传的所有文件记录
        getMyfiles(){
            axios
                .post("/api/getMyFiles")
                .then(response=>{
                    //console.log(response.data);
                    var res=response.data;
                    if(res.statu=="success"){
                        this.uploadFiles=res.data;//保存记录
                    }
                    else alert(res.msg);
                })
                .catch(function(error){
                    console.log(error);
                })
        },
        //上传文件(持久保存在服务器)
        saveToServer() {
            console.log("uploadFile...");
            var select_file = document.getElementById("savefile").files[0]; //获得选择的文件
            if (select_file == null || select_file == undefined)
                return;
            //获取文件信息
            var file_name = select_file.name;
            var file_size = select_file.size;
            console.log("文件名:" + file_name + "大小:" + file_size);
            //截取文件后缀
            var strs = new Array();
            strs = file_name.split(".");
            var length = strs.length;
            var type = strs[length - 1];
            //判断文件后缀是否合法
            if (!(type == "xlsx" || type == "XLSX" || type == "xls" || type == "XLS" || type == "csv" || type == "CSV" || type == "sav" || type == "SAV")) {
                    alert("不支持的文件类型:"+type);
                    return;
            }

            //用formData来传文件
            var formData = new FormData();
            formData.append("file", select_file);
            //上传文件
            this.modal_text="文件正在上传:";
            this.modal_NotAnimation=true;
            this.showModal = true;
            //return;
            axios
                .post("/api/saveFile", formData, {
                    headers: {'Content-Type': 'multipart/form-data'},
                    //上传进度
                    onUploadProgress: progressEvent => {
                        var complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%';
                        this.modal_text= "文件正在上传："+complete;
                    }
                })
                .then(response => {
                    //console.log(response.data);
                    if (response.data.statu == "success") {
                        this.getMyfiles();
                        this.modal_text="文件上传成功！";
                        setTimeout(this.closeModal,1000);
                    } else alert(response.data.msg);
                })
                .catch(function (error) {
                    //setTimeout(this.closeModal, 1500);
                    console.log(error);
                    alert("服务器出了点小问题...");
                })
        },
        //检查数据的个数和长度
        checkData(data) {
            this.res_data = data;
            //获取数据的列数和最大的行数
            var data_col = 0;
            var max_row = 0;
            for (var item in data) {
                if (data[item].length > max_row)
                    max_row = data[item].length;
                data_col++;
            }
            console.log("数据列数：" + data_col);
            console.log("数据最大行数：" + max_row);
            var flag = false;
            if (data_col > this.colNum) {
                this.colNum = data_col;
                flag = true;
            }
            if (max_row > (this.rowNum - 1)) { //因为第一行是表头，不是数据项，所以减一
                this.rowNum = max_row + 1;
                flag = true;
            }
            //
            if (flag == false)
                this.showDataToTable(data);
        },
        //将后台处理好的文件数据，显示在表格里
        showDataToTable(data) {
            //清空原来的数据
            for (var i = 1; i <= this.colNum; i++) {
                for (var j = 1; j <= this.rowNum; j++) {
                    var id = i * this.max + j;
                    $("#" + id).val("");
                }
            }
            //循环处理每一列数据
            var col_num = 1;
            for (var item in data) {
                var value = data[item];
                var headId = col_num * this.max + 1;
                $("#" + headId).val(item); //设置这列数据的表头
                for (var i = 0; i < value.length; i++) {
                    var id = headId + 1 + i;
                    $("#" + id).val(value[i]);
                }
                col_num++;
            }
            this.showUploadFiles=false;
            this.showMenu = false;
            setTimeout(this.closeModal, 1000);
        },
        //打开选择文件框
        openSelectFile(type) {
            if(type=="savefile"){

                $("#savefile").click();
            }
            else{
                console.log("select " + type + " file");
                this.file_type = type;
                $("#file").click();
            }
                
            
        },
        //上传文件(非持久保存在服务器)
        uploadFile() {
            console.log("uploadFile...");
            if (this.file_type == "excel" || this.file_type == "csv" || this.file_type == "sav") {
                console.log("upload:" + this.file_type);

                var select_file = document.getElementById("file").files[0]; //获得选择的文件
                if (select_file == null || select_file == undefined)
                    return;
                //获取文件信息
                var file_name = select_file.name;
                var file_size = select_file.size;
                console.log("文件名:" + file_name + "大小:" + file_size);
                //截取文件后缀
                var strs = new Array();
                strs = file_name.split(".");
                var length = strs.length;
                var type = strs[length - 1];
                //判断文件后缀是否合法
                if (type == "xlsx" || type == "XLSX" || type == "xls" || type == "XLS" || type == "csv" || type == "CSV" || type == "sav" || type == "SAV") {
                    if (this.file_type == "excel") {
                        if (!(type == "xlsx" || type == "XLSX" || type == "xls" || type == "XLS")) {
                            alert("选择的文件不是Excel文件，选择的文件类型为:" + type);
                            return;
                        }
                    } else if (this.file_type == "csv") {
                        if (!(type == "csv" || type == "CSV")) {
                            alert("选择的文件不是csv文件，选择的文件类型为:" + type);
                            return;
                        }
                    } else if (this.file_type == "sav") {
                        if (!(type == "sav" || type == "SAV")) {
                            alert("选择的文件不是sav文件，选择的文件类型为:" + type);
                            return;
                        }
                    }

                    //用formData来传文件
                    var formData = new FormData();
                    formData.append("file", select_file);
                    formData.append("type", this.file_type);
                    //上传文件
                    this.modal_text="正在处理数据";
                    this.modal_NotAnimation=false;//要动画
                    this.showModal = true;
                    //return;
                    axios
                        .post("/api/uploadFile", formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        })
                        .then(response => {
                            if (response.data.statu == "success") {
                                console.log(response.data);
                                //this.res_data=response.data.data;
                                this.checkData(response.data.data);
                            } else alert(response.data.msg);
                        })
                        .catch(function (error) {
                            setTimeout(this.closeModal, 1500);
                            console.log(error);
                            alert("服务器出了点小问题...");
                        })
                } else {
                    alert("错误的文件类型：" + type);
                }
            } else {
                alert("文件类型错误");
            }
        },
        //关闭消息框
        closeModal() {
            this.showModal = false;
        },
        //获取所有输入数据
        getData() {
            //
            var data = new Array();
            //循环遍历每一列
            for (var i = 1; i <= this.colNum; i++) {
                var colData = new Array();
                var col_head = null;
                //处理一列的每个数据
                for (var j = 1; j <= this.rowNum; j++) {
                    var id = i * this.max + j;
                    var value = $("#" + id).val();
                    if (value != undefined && value != null && value != "") {
                        if (j == 1)
                            col_head = value;
                        else
                            colData.push(value);
                    }
                }
                //
                if (col_head != null && col_head != undefined && colData.length > 0) {
                    var col_json = {
                        "head": col_head,
                        "data": colData
                    };
                    data.push(col_json);
                }
            }
            //console.log(data);
            //
            if (data.length > 0)
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
            //console.log("当前id:"+id);

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
#FileList{
    position: fixed;
    top: 80px;
    left: 200px;
    width: 300px;
    height: 500px;
    padding: 10px;
    overflow-y: auto;
    overflow-x: auto;
    background: rgba(230, 230, 230, 1);
    /* text-align: center; */
    border-left: rgb(150,150,150) solid 1px;
}
#menu {
    position: fixed;
    top: 80px;
    width: 200px;
    height: 500px;
    padding: 10px;
    /* padding-bottom: 300px; */
    background: rgba(230, 230, 230, 1);
    text-align: center;
    overflow-y: auto;
}

.menu-item {
    margin-top: 10px;
    padding: 4px;
    border-radius: 3px;
    /* transition: all 0.1s; */
}

.menu-item:hover {
    cursor: pointer;
    background: rgb(200, 200, 200);
}

hr {
    margin: 3px;
}

#nav {
    width: 100%;
    height: 80px;
    display: flex;
    flex-direction: row;
    padding-left: 30px;
    background: rgb(235, 235, 235);
}

#nav-menu-div {
    padding: 5px;
    height: 50px;
    width: 50px;
}

#menu-img {
    width: 40px;
    height: 40px;
    margin-top: 10px;
    transition: all 0.1s;
}

#nav-menu-div:hover {
    cursor: pointer;
}

#nav-menu-div:hover img {
    margin-top: 7px;
    margin-left: -3px;
    width: 46px;
    height: 46px;
}

.nav-img {
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

.nav-div:hover img {
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
