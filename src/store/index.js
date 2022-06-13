import Vue from 'vue'
import Vuex from 'vuex'

import registration from './modules/registration.store.js';
import login from './modules/login.store.js';
import location from './modules/location.store.js';
import events from './modules/events.store.js';
import myEvents from './modules/myEvents.store.js';
import sortBar from './modules/sortbar.store.js';
import eventInfo from './modules/eventInfo.store.js';
import review from './modules/review.store.js';
import friends from './modules/friends.store.js';
import comments from './modules/comments.store.js';
import router from '@router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    route: null
  },
  mutations: {
    SET_ROUTE(state, route) {
      state.route = route;
    }
  },
  actions: {
    eventsTabClicked(){
      router.push('/') 
    },
    optionsTabClicked(){
      router.push('/options') 
    },
    friendsTabClicked(){
      router.push('/friends') 
    }
  },
  modules: {
    registration,
    login,
    location,
    events,
    myEvents,
    sortBar,
    eventInfo,
    review,
    friends,
    comments
  }
})
