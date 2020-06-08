<template>
    <div>
        <div id='topNav-main'>
            <div class="topNav-img">
                <img src="../../assets/back.png"  alt="back">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'topNav',
    data(){
        return{

        }
    }
}
</script>
<style>
    #topNav-main{
        width:100%;
        height: 60px;
        /* padding: 10px; */
        background: rgb(220,220,220);
        display: flex;
        flex-direction: row;
    }
    #topNav-img{
        margin-left: 10px;
        width: 30px;
        height: 30px;
    }
    /* #topNav-img:hover{

    } */
</style>