<template>
    <div>
        <div v-if="show==true" class="myModal">
            <div class="header">
                {{title}}
                <div v-if="notAnimation==null||notAnimation==false" style="font-size:30px;">
                    <b>{{animationText}}</b>
                </div>
            </div>
            <!-- <div class="footer">
                <button class="confirm mbtn" @click="confirm">确认</button>
                <button class="cancel mbtn" @click="close">关闭</button>
            </div> -->
        </div>
        </transition>
        <transition name="over">
            <div v-if="show==true" class="over"></div>
        </transition>  
        
        
    </div>
</template>
<script>
export default {
    name: 'myModal',
    props:['show','title','notAnimation'],
    data(){
        return{
            confirm_click:false,
            animationText:"",
        }
    },
    mounted(){
        if(this.show==true){
            console.log("show animation");
            this.loadAnimation();
        }
        else console.log("not show animation");
        
    },
    methods:{
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
        close(){
            this.$emit("close");
        }
    },
    
}
</script>
<style scoped>
    /* @import url("../../lib/css/shadow.css"); */
    /* 窗口主体 */
    .myModal{
        border-radius: 5px;
        /* text-align: center; */
        /* height: 14%;
        width: 15%; */
        height: 110px;
        width: 200px;
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
        text-align: center;
        padding-top: 5%;
        height: 60%;
        font-family:Arial, Helvetica, sans-serif;
        font-size: 16px;
        color:saddlebrown;
    }
    .footer{
        margin: 0;
        height: 40%;
        display: flex;
        flex-direction: row;
    }
    /* 确定和取消按钮 */
    .confirm,.cancel{
        outline: none;
        background-color: white;
        width: 50%;
    }
    
    .confirm{
        border-width: 1px 0px 0px 0px;
        border-bottom-left-radius: 5px;
        transition: background-color 0.5s;
    }
    .cancel{
        border-width: 1px 0px 0px 1px;
        border-bottom-right-radius: 5px;
        transition: background-color 0.5s;
    }
    .confirm:hover{
        background-color: rgb(200,200,200);
    }
    .cancel:hover{
        background-color: rgb(200,200,200);
    }
</style>