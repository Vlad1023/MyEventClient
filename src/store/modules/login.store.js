import api from '@api';
import router from '@router'
import {parseErrorObj} from '@sharedFunctions';
import Vue from 'vue'
export default {
    namespaced: true,
    state: function(){
        return {
            user: null,
            status: '',
            errors: [],
            isLoggedIn: false
        }
    },
    getters: {
      IsCorrect (state) {
        return state.errors.length === 0
      },
      isLoggedIn (state) {
        return state.isLoggedIn;
      },
      getUserCreds (state) {
        return state.user;
      }
    },
    mutations: {
        login_request (state) {
            state.status = 'loading';
            state.errors = [];
        },
        login_error (state, data) {
            state.status = 'error';
            if(data.errors) {
              state.errors = parseErrorObj(data.errors)
            }
            else{
              state.errors = data
            }         
        },
        changeLogInStatus (state, value) {
          state.isLoggedIn = value;
        },
        login_success (state, user) {
            state.status = 'success';
            state.errors = [];
            state.user = user;           
        },
        logout (state) {
          state.status = 'logout';
          state.errors = [];
          state.user = null;
          localStorage.removeItem('token');
        }
    },
    actions: {
        login ({ commit, rootState }, user) {
            return new Promise((resolve, reject) => {
              commit('login_request');
              api
                .post('/user/login', user)
                .then(resp => {
                  const user = resp.data
                  commit('login_success', user);
                  localStorage.setItem('token', user.token);
                  resolve(resp);
                })
                .catch(err => {
                  commit('login_error', err.data);
                  reject(err);
                });
            });
          },
          logout ({ commit, rootState }) {
            commit('logout');
            Vue.$toast.warning("Log out", {
              position: "bottom-left",
              timeout: 3000,
              closeOnClick: true,
              closeButton: "button",
              icon: true,
              rtl: false
            });
            router.push('/signin');
          }
    }
  };