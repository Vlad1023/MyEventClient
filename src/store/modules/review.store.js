import jwt_decode from "jwt-decode";
import api from '@api';
import {parseErrorObj} from '@sharedFunctions';
import Vue from 'vue'
export default {
    namespaced: true,
    state: function(){
        return {
            status: ''
        }
    }
    ,
    getters: {

    },
    mutations: {
        review_request (state) {
            state.status = 'loading';
        },
        review_error (state) {
            state.status = 'error';      
        },
        review_success (state) {
            state.status = 'success';
        },
    },
    actions: {
        addReview ({ commit, rootState, dispatch}, review) {
            return new Promise((resolve, reject) => {
              commit('review_request');
              api
                .post('/review/addReview', review)
                .then(resp => {
                  commit('review_success');
                  Vue.$toast.success("Review successfully added"); 
                  resolve(resp);
                })
                .catch(err => {
                  commit('review_error', err.data);
                  Vue.$toast.error("Oops... you've already review it"); 
                  reject(err);
                });
            })
          }
    }
  };