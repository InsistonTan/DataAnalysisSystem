<template>
    <div>
        <div v-if="show==true" class="myModal">
            <div class="header">
                <button type="button" @click="closeLogin" class="btn-close" title="close">&times;</button>
                <div style="text-align:center;">
                    <h5>
                        <span class="text-muted">Sign in</span>
                    </h5>
                </div>
                <div>Username:</div>
                <input type="text" class="form-control" v-model="username" placeholder="enter user name">
                <div style="margin-top:5px;">Password:</div>
                <input type="password" class="form-control" v-model="password" placeholder="enter password">
                <VerificationCode v-if="showCode==true" @getCode="getVerCode($event)" width="70" height="35"></VerificationCode>
                <input type="text" class="form-control" v-model="input_code" style="width:85px;height:30px;" placeholder="captcha">
                <div class="text-info" style="font-size:14px;">{{statu}}</div>
                <div style="margin-top:10px;">
                    <button @click="login" type="button" class="btn btn-success">sign in</button>
                    <button @click="register" type="button" class="btn btn-warning" style="margin-left:10px;">sign up</button>
                </div>
            </div>
        </div>
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
                this.statu="Username is empty, please check...";
                return;
            }
            if(this.password==""||this.password==null){
                this.statu="Password is empty, please check...";
                return;
            }
            if(this.input_code!=this.verCode){
                this.statu="Verification code error";
                this.refleshCode();
                this.input_code=null;
                return;
            }
            this.input_code=null;
            this.statu="sign in...";
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
                            this.statu="Successful sign in, but failed to obtain information...";
                        }
                    }
                    else{
                        this.statu="sign in failed:"+res.msg;
                    }
                })
                .catch(function(error){
                    console.log();
                    alert("server error...");
                })
        },
        //注册
        register(){
            if(this.username==""||this.username==null){
                this.statu="Username is empty, please check...";
                return;
            }
            if(this.password==""||this.password==null){
                this.statu="Password is empty, please check...";
                return;
            }
            if(this.password.length<6){
                this.statu="Password is too short, at least 6 characters...";
                return;
            }
            if(this.input_code!=this.verCode){
                this.statu="Verification code error";
                this.refleshCode();
                this.input_code=null;
                return;
            }
            this.input_code=null;
            this.statu="sign up...";
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
                        this.statu="sign up successfully！";
                    }
                    else{
                        this.statu="sign up failed:"+res.msg;
                    }
                })
                .catch(function(error){
                    console.log();
                    alert("server error...");
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