import Vue from 'vue';
import Router from 'vue-router';
import Movie from '@/views/Movie/Movie.vue'
import Music from '@/views/Music/Music.vue'
import Book from '@/views/Book/Book.vue'
import Photo from '@/views/Photo/Photo.vue'


Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
      {
        path: '/',
         redirect: '/movie'
      },
      {
          path: '/Movie',
          name: 'movie',
          component: Movie
      }, {
          path: '/Music',
          name: 'music',
          component: Music
      }, {
          path: '/Book',
          name: 'book',
          component: Book
      }, {
          path: '/Photo',
          name: 'photo',
          component: Photo
      },
  ],
});

