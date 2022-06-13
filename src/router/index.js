import Vue from 'vue'
import VueJwtDecode from 'vue-jwt-decode'
import VueRouter from 'vue-router'
import AuthView from '@views/Auth.vue'
import AllEventsView from '@views/AllEvents.vue'
import FriendsView from '@views/Friends.vue'
import OptionsView from '@views/Options.vue'
import UserEvents from '@views/UserEvents.vue'
import EventPage from '@views/EventPage.vue'
import MyEvents from '@components/MyEvents.vue'
import FinishedEvents from '@components/FinishedEvents.vue'
import AddEvent from '@components/AddEvent.vue'
import EventPageView from '@components/MyEvents_EventPages/EventPage.View.vue'
import EventPageUpdate from '@components/MyEvents_EventPages/EventPage.Update.vue'
import EventPageFinish from '@components/MyEvents_EventPages/EventPage.Finish.vue'
import store from '@store';

Vue.use(VueRouter)

const routes = [
  {
    path: '/signin',
    name: 'AuthView',
    component: AuthView
  },
  {
    path: '/',
    name: 'AllEventsView',
    component: AllEventsView
  },
  {
    path: '/eventpage',
    name:'eventpage',
    component: EventPage,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/usercreatedeventpage',
    name:'usercreatedeventpage',
    component: EventPageUpdate,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/userparticipanteventpage',
    name:'userparticipanteventpage',
    component: EventPageView,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/usereventfinish',
    name:'usereventfinish',
    component: EventPageFinish,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/userevents',
    name: 'UserEvents',
    meta: {
      requiresAuth: true
    },
    component: UserEvents,
    children: [
      {
        path: 'myevents',
        name: 'MyEvents',
        component: MyEvents,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'finished',
        name: 'FinishedEvents',
        component: FinishedEvents,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'addevent',
        name: 'AddEvent',
        component: AddEvent,
        meta: {
          requiresAuth: true
        }
      },
    ],
  },
  {
    path: '/friends',
    name: 'FriendsView',
    meta: {
      requiresAuth: true
    },
    component: FriendsView
  },
  {
    path: '/options',
    name: 'OptionsView',
    meta: {
      requiresAuth: true
    },
    component: OptionsView
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  store.commit('SET_ROUTE', to);
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const user = isTheUserIsStored();
    if (user !== null) {
      store.commit('login/login_success', user);
      store.commit('login/changeLogInStatus', true);
      next();
      return;
    }
    store.commit('login/changeLogInStatus', false)
    next('/signin');
  } else {
    const user = isTheUserIsStored();
    if (user !== null){
      store.commit('login/login_success', user);
      store.commit('login/changeLogInStatus', true);
    }
    else
      store.commit('login/changeLogInStatus', false)
    next();
  }
});

function isTheUserIsStored(){
  if(localStorage.getItem('token') && VueJwtDecode.decode(localStorage.getItem('token')))
    return VueJwtDecode.decode(localStorage.getItem('token'));
  else
    return null;
}

export default router
