<template>
    <div>
        <div v-if="show==true" class="myModal">
            <div class="header">
                <button type="button" @click="closeLogin" class="btn-close" title="点击关闭">&times;</button>
                <div style="text-align:center;">
                    <h5>
                        <span class="text-muted">用户登陆</span>
                    </h5>
                </div>
                <div>用户名:</div>
                <input type="text" class="form-control" v-model="username" placeholder="请输入用户名">
                <div style="margin-top:5px;">密码:</div>
                <input type="password" class="form-control" v-model="password" placeholder="请输入密码">
                <VerificationCode v-if="showCode==true" @getCode="getVerCode($event)" width="70" height="35"></VerificationCode>
                <input type="text" class="form-control" v-model="input_code" style="width:75px;height:30px;" placeholder="验证码">
                <div class="text-info" style="font-size:14px;">{{statu}}</div>
                <div style="margin-top:10px;">
                    <button @click="login" type="button" class="btn btn-success">登陆</button>
                    <button @click="register" type="button" class="btn btn-warning" style="margin-left:10px;">注册</button>
                </div>
            </div>
        </div>
        </transition>
        <transition name="over">
            <div v-if="show==true" class="over"></div>
        </transition>     
    </div>
</template>
<script>
import axios from "axios";
import VerificationCode from "@/components/function/verificationCode";
export default {
    name: 'login',
    props:['show'],
    components:{
        VerificationCode
    },
    data(){
        return{
            username:null,
            password:null,
            verCode:null,
            showCode:true,
            input_code:null,
            statu:null,
        }
    },
    mounted(){
    },
    methods:{
        //登陆
        login(){
            if(this.username==""||this.username==null){
                this.statu="用户名为空，请检查...";
                return;
            }
            if(this.password==""||this.password==null){
                this.statu="密码为空，请检查...";
                return;
            }
            if(this.input_code!=this.verCode){
                this.statu="验证码错误";
                this.refleshCode();
                this.input_code=null;
                return;
            }
            this.input_code=null;
            this.statu="正在登陆...";
            //
            this.refleshCode();
            //
            axios
                .post("/api/login",{
                    "username":this.username,
                    "password":this.password
                })
                .then(response=>{
                    var res=response.data;
                    //console.log(res);
                    if(res.statu=="success"){
                        if(res.uid!=null&&res.uid!=""&&res.uid!="null"&&res.uid!=undefined){
                            this.statu==null;
                            var user={"uid":res.uid,"username":res.username};
                            this.$emit("getLoginUser",user);
                            this.$emit("closeLogin");
                        }
                        else{
                            this.statu="登陆成功，但获取信息失败...";
                        }
                    }
                    else{
                        this.statu="登陆失败:"+res.msg;
                    }
                })
                .catch(function(error){
                    console.log();
                    alert("服务器出了点小问题...");
                })
        },
        //注册
        register(){
            if(this.username==""||this.username==null){
                this.statu="用户名为空，请检查...";
                return;
            }
            if(this.password==""||this.password==null){
                this.statu="密码为空，请检查...";
                return;
            }
            if(this.password.length<6){
                this.statu="密码太短了，至少要6个字符...";
                return;
            }
            if(this.input_code!=this.verCode){
                this.statu="验证码错误";
                this.refleshCode();
                this.input_code=null;
                return;
            }
            this.input_code=null;
            this.statu="正在注册...";
            //
            this.refleshCode();
            //
            axios
                .post("/api/register",{
                    "username":this.username,
                    "password":this.password
                })
                .then(response=>{
                    var res=response.data;
                    //console.log(res);
                    if(res.statu=="success"){
                        this.statu="注册成功！";
                    }
                    else{
                        this.statu="注册失败:"+res.msg;
                    }
                })
                .catch(function(error){
                    console.log();
                    alert("服务器出了点小问题...");
                })
        },
        //刷新验证码
        refleshCode(){
            this.showCode=false;
            this.$nextTick(()=>{
                this.showCode=true;
            });
        },
        //获得验证码
        getVerCode(code){
            this.verCode=code;
        },
        //
        loadAnimation(){
            if(this.show==true){
                if(this.animationText==""){
                    this.animationText=".";
                    setTimeout(this.loadAnimation,300);
                }
                else if(this.animationText=="."){
                    this.animationText="..";
                    setTimeout(this.loadAnimation,300);
                }
                else if(this.animationText==".."){
                    this.animationText="...";
                    setTimeout(this.loadAnimation,300);
                }
                else if(this.animationText=="..."){
                    this.animationText="";
                    setTimeout(this.loadAnimation,300);
                }
            }
        },
        confirm(){
            this.$emit("confirm");
        },
        closeLogin(){
            this.$emit("closeLogin");
        }
    },
    
}
</script>
<style>
    /* 窗口主体 */
    .myModal{
        border-radius: 5px;
        height: 340px;
        width: 300px;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        z-index: 9999;
        background: white;
       
    }
    /* 遮罩层 */
    .over{
        width: 100%;
        height: 100%;
        opacity: 0.7;/*透明度 */
        filter: alpha(opacity=70);/*IE透明度 */
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9998;
        background: rgb(0,0,0);
        /* transition: background 1s; */
    }
    .header{
        /* background-color: red; */
        padding: 20px;
        padding-top: 10px;
        height: 60%;
        font-family:Arial, Helvetica, sans-serif;
        font-size: 16px;
    }
    .btn-close{
        padding: 0;
        width: 20px;
        height: 20px;
        position: fixed;
        top: 0px;
        right: 5px;
        border:none;
        background: white;
        font-size: 25px;
    }
    .btn-close:focus{
        outline: none;
    }
</style>