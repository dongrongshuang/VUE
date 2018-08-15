<template>
    <div>
        <div class="album">
            <div class="album-mask" :style="{background:'url('+albumImg+') no-repeat center/cover'}"></div>
            <div class="album-img">
                <img :src="albumImg " alt="">
            </div>
            <div class="album-info">
                <p class="album-info-title">{{albumTitle}}</p>
                <p class="album-info-author">{{albumAuthor}}</p>
                <div class="album-info-control clearfix">
                    <div class="album-info-control-icon" >
                        <i class="icon iconfont icon-shangyishou" @click="prev" ></i>
                        <i class="icon iconfont icon-bofang" v-show="!isPlay" @click="play"></i>
                        <i class="icon iconfont icon-zanting" v-show="isPlay" @click="pause"></i>
                        <i class="icon iconfont icon-xiayishou" @click="next"></i>
                    </div>
                    <span @click="toggleList=!toggleList" class="album-info-control-menu">歌单</span>
                </div>
            </div>
        </div>
        <transition name="silde">
            <ul class="music-list" v-show="toggleList">
            <li @click="selectMusic(music,index)" :class="['music-list-item',nowIndex ==index?'selected':'']" v-for="(music,index) in musicList" :key="index">
                <span class="music-list-item-title">{{music.title}}&nbsp;-&nbsp;</span>
                <span class="music-list-item-author">{{music.author}}</span>
            </li>
        </ul>
        </transition>
        <!--//播放控件  mbn网站-->
        <div class="audio">
            <audio ref="musicAudio" @play="isPlay=true" @pause="isPlay=false" class="audio-ctrl" :src="musicSrc" autoplay controls></audio>
        </div>

    </div>

</template>

<script>
    import '@/assets/font/iconfont.css';
    export default {
        props: ['musicList'],
        data() {
            return {
                nowIndex: -1,//当前选中歌曲的索引
                albumImg: 'http://img1.imgtn.bdimg.com/it/u=261942438,4045190201&fm=27&gp=0.jpg',
                albumTitle: '',
                albumAuthor: '',
                isPlay: false,
                toggleList: true,//歌单是否显示
                musicSrc: ''//歌曲的URL
            }
        },
        methods: {
            selectMusic(music, index) {
                this.nowIndex = index;
                // this.albumImg=music.musicImgSrc;
                // this.albumTitle=music.title;
                // this.albumAuthor=music.author;
                // this.musicSrc =music.src
            },
            play() {
                this.$refs.musicAudio.play();
            },
            pause() {
                this.$refs.musicAudio.pause();
            },
            prev() {
                this.nowIndex--;
                if (this.nowIndex == -1) {
                    this.nowIndex = this.musicList.length - 1;
                }
            },
            next() {
                this.nowIndex++;
                if (this.nowIndex == this.musicList.length) {
                    this.nowIndex = 0
                }
            }
        },
        watch: {
            nowIndex() {
                let nowMusic = this.musicList[this.nowIndex]
                this.albumImg = nowMusic.musicImgSrc;
                this.albumTitle = nowMusic.title;
                this.albumAuthor = nowMusic.author;
                this.musicSrc = nowMusic.src
            }
        }
    };
</script>


<style lang="scss" scoped>
.clearfix::after{
    content: '';
    display: block;
    clear: both;
}
.music-list{
    position: fixed;
    width: 100%;
    background-color: #2a2929;
    bottom: 2rem;
    height: 4rem;
    overflow-y: scroll;
    &-item{
        color: #dcdbdb;
        border-bottom: 0.02rem solid #343433;
        padding: 0.2rem;
        &.selected{
            color: #299597;
        }
    }
}
.album{
    display: flex;
    text-align: center;
    position: relative;
    color: #fff;
    &-mask {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        filter: blur(20px);//滤镜
        z-index: -1;
    }
    &-img{
        flex: 1;
        width: 0;
        margin-left: 0.2rem;
        margin-top: 0.1rem;
        img{
            width: 100%;
        }
    }
    &-info{
        flex: 2;
        width: 0;
        &-title{
           font-size: 0.5rem;
        }
        &-control{
            position: relative;
            height: 0.9rem;
            line-height: 0.9rem;
            &-icon{
                float: left;
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
               .icon{
                   font-size: 0.5rem;
               }
            }
            &-menu{
                float:right;
                margin-right: 0.4rem;
            }
        }
    }
}
.slide{
    &-enter{
        transform: translateY(100%);
        &-to{
            transform: translateY(0);
        }
        &-active{
            transition: transform 1s ease;
        }
    }
    &-leave{
        transform: translateY(0);
        &-to {
            transform: translateY(100%);
        }
        &-active {
            transition: transform 1s ease;
        }
    }
}

.audio {
    background: #fff;
    height: 1rem;
    position: fixed;
    bottom: 1rem;
    width: 100%;
    &-ctrl {
        width: 100%;
    }
}
</style>