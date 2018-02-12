import Vue from 'vue'
import Router from 'vue-router'
import  recommend from '../components/recommend'
import  search from '../components/search'
import  singer from '../components/singer'
import  ranking from '../components/ranking'
import SongDetail from '../components/singer-detail'
import Player  from '../components/player'
import SongSheetDetail  from '../components/song_sheet_detail'
import PlayList from '../components/playList'
import topList from  '../components/top-list'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/",
      redirect:"/recommend",
    },{
      path:'/player',
      component:PlayList
    },
    {
      path:"/recommend",
      component: recommend,
      name:'recommend',
      meta:{
        index:0
      },
      children:[
        {
          path:':id',
          component:SongSheetDetail,
        }
      ]
    },{
      path:'/search',
      component:search,
      name:'search',
      meta:{
        index:3
      }
    },{
      path:'/singer',
      component:singer,
      name:'singer',
      meta:{
        index:1
      },
      children:[
        {
         path:':id',
         component:SongDetail,
        }
      ]
    },{
      path:'/ranking',
      component:ranking,
      name:'ranking',
      meta:{
        index:2
      },children:[
        {
          path:':id',
          component:topList,
        }
      ]
    }
  ]
})
