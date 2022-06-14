import jwt_decode from "jwt-decode";
import api from '@api';
import {parseErrorObj} from '@sharedFunctions';
export default {
    namespaced: true,
    state: function(){
        return {
            status: '',
            errors: []
        }
    }
    ,
    getters: {
      IsCorrect (state) {
        return state.errors.length === 0
      }
    },
    mutations: {
        registration_request (state) {
            state.status = 'loading';
            state.errors = [];
        },
        registration_error (state, data) {
            state.status = 'error';
            if(data.errors) {
              state.errors = parseErrorObj(data.errors)
            }
            else{
              state.errors = data
            }         
        },
        registration_success (state) {
            state.status = 'success';
            state.errors = [];
        },
    },
    actions: {
        register ({ commit, rootState, dispatch}, user) {
            return new Promise((resolve, reject) => {
              commit('registration_request');
              api
                .post('/user/register', user)
                .then(resp => {
                  const user = resp.data
                  commit('registration_success');
                  resolve(resp);
                })
                .catch(err => {
                  commit('registration_error', err.data);
                  reject(err);
                });
            })
          }
    }
  };