<template>
  <div id="app">
      <CommonHeader :selectMenu="selectMenu"></CommonHeader>
      <router-view class="content" @switchTab="switchTab"/>
      <CommonFooter :footerBgColor="selectMenu.bgColor" :menuList="menuList"></CommonFooter>
  </div>
</template>

<script>
  //把组件引进来
  import CommonHeader from '@/components/CommonHeader.vue';
  import CommonFooter from '@/components/CommonFooter.vue';
  export default{
    components:{
        CommonHeader,
        CommonFooter
    },
  methods:{
  switchTab(menuName){ // 'music'
      this.menuList.forEach(menu => {
          if(menu.name === menuName){
              this.selectMenu = menu;
          }
      });
  }
},
      data(){
          return {
              menuList: [
                  {
                      title: '电影',
                      bgColor: '#e54847',
                      name: 'movie',
                      path: '/Movie'
                  },{
                      title: '音乐',
                      bgColor: '#009688',
                      name: 'music',
                      path: '/Music'
                  },{
                      title: '书籍',
                      bgColor: '#795548',
                      name: 'book',
                      path: '/Book'
                  },{
                      title: '图片',
                      bgColor: '#3f51b5',
                      name: 'photo',
                      path: '/Photo'
                  }
              ],
              selectMenu: {} ,// 当前选中的菜单
          }
      }

}
</script>

<style lang="scss">

.content{
  margin: 1rem 0;
}
</style>
