<template>
    <div>
        <ul>
            <li class="movie" v-for="(movie,index) in movieList" :key="movie.id">
                <div class="movie-img">
                    <img :src="movie.images.large" alt="">
                </div>
                <div class="movie-info">
                    <div class="movie-title">{{movie.title}}</div>
                    <div>观众评：<span class="movie-info-average">{{movie.rating.average}}</span></div>
                    <div class="movie-info-star">主演：
                        <span v-for="item in movie.casts" :key="item.id">{{item.name}}&nbsp</span>
                    </div>
                </div>
            </li>
        </ul>
        <div class="loading" v-show="isLoading">
            <img src="@/assets/img/loading.gif" alt="">
        </div>
    </div>

</template>

<script>
    import axios from 'axios';
    export default {
        data(){
            return {
               movieList:[],
                isLoading:true
            }
        },
        beforeCreate(){
            let url = "https://bird.ioliu.cn/v2?url=https://api.douban.com/v2/movie/in_theaters";
            axios.get(url).then(res =>{
                console.log(res.data.subjects);
                this.movieList = res.data.subjects;
                this.isLoading=false
            })
        }
        }
</script>


<style lang="scss" scoped>
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
            font-size: 0.34rem;
            font-weight: 700;
        }
        &-average{
            color: #ffc107;
        }
        &-star{
        color: #666;
         font-size:0.26rem ;
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