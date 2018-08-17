<!--电影接口需要自己写 但是没有 用豆瓣网上的-->
<!--应该在movie组件加载时候发送一个axios请求，请求电影详情的一些数据-->

<template>
    <div>
        <ul>
            <li class="movie" v-for="(movie,index) in movieList" :key="movie.id">
                <div class="movie-img">
                    <img :src="movie.images.large" alt="">
                </div>
                <div class="movie-info">
                    <div class="movie-info-title">{{movie.title}}</div>
                    <div>观众评：<span class="movie-info-average">{{movie.rating.average}}</span></div>
                    <div class="movie-info-star">主演：
                        <span v-for="item in movie.casts" :key="item.id">{{item.name}}&nbsp</span>
                    </div>
                </div>
            </li>
        </ul>
        <div v-show="isEnd">
            <h3>数据到底了</h3>
        </div>
        <div class="loading" v-show="isLoading">
            <img src="@/assets/img/loading.gif" alt="">
        </div>
    </div>

</template>


<script>
    // 然后需要发送这个请求  不写./是要在node_modules里找
    import axios from 'axios';
    export default {
        data(){
            return {
                movieList:[],
                //这个movieList要在界面上循环遍历他
                isLoading:true,
                isEnd:false
            };
        },
        methods:{
          getData(){
              // let url = "https://bird.ioliu.cn/v2?url=https://api.douban.com/v2/movie/in_theaters";
              let url1 = "https://bird.ioliu.cn/v2?url=https://api.douban.com/v2/movie/top250?start=0&count=5";
              // 方法返回一个promise对象 .then() 在他里面输出相应返回的值
              let url2 = "https://api.myjson.com/bins/pb8vw";
              this.isLoading = true;
              axios.get(url2).then(res=>{
                  console.log(res.data.subjects);
                  //concat返回一个新的数组
                  let getList =res.data.subjects.slice(this.movieList.length ,this.movieList.length +5);
                  if (getList.length < 5){
                      this.isEnd=true;
                  }
                  // this.movieList = this.movieList.concat(res.data.subjects.slice(this.movieList.length,this.movieList.length+5));
                  this.movieList = this.movieList.concat(getList);
                  this.isLoading = false
              });
          },
        },
        beforeCreate(){
        },
        created(){
            this.$emit("switchTab", "movie");
          this.getData();  //一上来就请求这个数据   到底的时候还得请求数据
        },
        //el都渲染完成以后
        mounted(){
           window.onscroll  = () =>  {
               let scrollTop = document.documentElement.scrollTop;//滚动了多高
               let scrollHeight = document.documentElement.scrollHeight;//当前高度
               let clientHeight = document.documentElement.clientHeight; //可适区域的高度
               console.log(scrollHeight, scrollTop, clientHeight);
               if (scrollHeight == scrollTop + clientHeight && !this.isEnd) {
                   // 请求数据
                   this.getData();

               }
           } ;
        }
    }
</script>

<style lang="scss" scoped>
    /*如果弹性盒模型里面就是三个div里面啥也没有1:1:1没有问题  如果div里面有元素 解决方法是把宽度设为0*/
.movie{
    display: flex;
    padding: 0.2rem;
    border-bottom: 0.02rem solid #ccc;
    &-img{
        flex: 1;
        width: 0;
        img{
            width: 100%;
        }
    }
    &-info{
        flex: 3;
        width: 0;
        margin-left: 0.2rem;
        &-title{
            color: #333;
            font-weight: 700;
            font-size: 0.34rem;
        }
        &-average{
            color: #ffc107;
        }
        &-star{
            color: #666;
            font-size: 0.26rem;
        }
    }
}
.loading{
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    img{
        width: 3rem;
    }
}
</style>