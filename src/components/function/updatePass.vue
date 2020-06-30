<template>
    <div>
        <div v-if="show==true" class="pass-myModal">
            <div class="pass-header">
                <button type="button" @click="close" class="pass-btn-close" title="close">&times;</button>
                <div style="text-align:center;">
                    <h5>
                        <span class="text-warning">Change Password</span>
                    </h5>
                </div>
                <div>new password:</div>
                <input type="password" v-model="password1" class="form-control" placeholder="enter new password">
                <div style="margin-top:5px;">new password again:</div>
                <input type="password" v-model="password2" class="form-control" placeholder="enter new password">
                <div class="text-info" style="font-size:13px;">{{statu}}</div>
                <div style="margin-top:10px;">
                    <button type="button" @click="updatePass" class="btn btn-warning">confirm</button>
                </div>
            </div>
        </div>
        <transition name="over">
            <div v-if="show==true" class="pass-over"></div>
        </transition>     
    </div>
</template>
<script>
import axios from "axios";
export default {
    name: 'updatePassword',
    props:['show'],
    data(){
        return{
            password1:null,
            password2:null,
            statu:null,
        }
    },
    mounted(){
    },
    methods:{
        //修改密码
        updatePass(){
            this.statu="Changing...";
            //
            var p1=this.password1;
            var p2=this.password2;
            if(p1==""||p2==""||p1==null||p2==null)
            {
                this.statu="Each item cannot be empty";
                return;
            }
            else if(p1.length<6||p2.length<6){
                this.statu="Password must be at least 6 characters!";
                return;
            }
            else if(p1!=p2){
                this.statu="Two passwords do not match!";
                return;
            }
            //
            axios
                .post("/api/updatePass",{
                    "password":p1
                })
                .then(response=>{
                    var res=response.data;
                    if(res.statu=="success"){
                        this.statu="Change password successfully!";
                        this.confirm();
                    }
                    else{
                        this.statu=res.msg;
                    }
                })
                .catch(function(error){
                    this.statu="Server error";
                    console.log(error);
                })
        },
        confirm(){
            this.$emit("confirm");
        },
        close(){
            this.$emit("close");
        }
    },
    
}
</script>
<style>
    /* 窗口主体 */
    .pass-myModal{
        border-radius: 5px;
        height: 250px;
        width: 300px;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        z-index: 9999;
        background: white;
       
    }
    /* 遮罩层 */
    .pass-over{
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
    .pass-header{
        /* background-color: red; */
        padding: 20px;
        padding-top: 10px;
        height: 60%;
        font-family:Arial, Helvetica, sans-serif;
        font-size: 16px;
    }
    .pass-btn-close{
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
    .pass-btn-close:focus{
        outline: none;
    }
</style>