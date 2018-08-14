<!--这里不是写死的  从CommonFooter里调用  是传进来的  所以在APp.vue 里调用-->
<template>
    <ul class="footer" :style="{background: bgColor}">
        <li  class="footer-menu" v-for="(menu,index) in menuList " :key="index">
            <router-link @click.native="selectMenu(menu)" :to="menu.path">{{menu.title}}</router-link>
            <!--//每个router-link相当于a标签  to 到我要跳转的那个路径上去  路径是menu 传的  因为是可变的 所以是动态-->
            <!--//组件触发事件 需要写一个.native-->
        </li>
    </ul>
</template>

<script>
    export default {
        data(){
          return{
              bgColor:''
          }
        },
    props:['menuList'],
        methods:{
        selectMenu(menu){
            //当前背景颜色付给它
        this.bgColor=menu.bgColor;
        this.$emit('changeTitle',menu)
            //在footer里抛他
        }
        }
    }
</script>


<style lang="scss" scoped>
.footer{
    display: flex;
    position: fixed;
    bottom: 0;
    width: 100%;
    background: #e54847;
    height: 1rem;
    line-height: 1rem;
    &-menu{
        flex: 1;
        text-align: center;
        a{
            color: #ccc;
            outline: none;
            &.router-link-active{
                color: #fff;
            }
        }
    }
}
</style>