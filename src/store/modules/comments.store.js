import jwt_decode from "jwt-decode";
import api from '@api';
import {parseErrorObj} from '@sharedFunctions';
import Vue from 'vue'
export default {
    namespaced: true,
    state: function(){
        return {
            comments: [],
            n: 5
        }
    },
    getters: {
        getLastNComments(state){
            return (state.comments.sort((a, b) => a.dateAdded - b.dateAdded)).slice(0, state.n);
        }
    },
    mutations: {
        changeCommentsList (state, newList) {
            state.comments = newList;
        }
    },
    actions: {
        addComment ({ commit, rootState, state }, reqObject) { 
            return new Promise((resolve, reject) => {
                api
                    .post('/comments/addComment', reqObject )
                    .then(resp => {
                        resolve(resp);
                    })
                    .catch(err => {
                        Vue.$toast.error("Oops... something went wrong"); 
                        reject(err);
                    });
                })
        },
        getEventComments ({ commit, rootState, state }, eventId) { 
            return new Promise((resolve, reject) => {
                api
                    .get('/comments/getEventComments', 
                    {
                        params: { eventId: eventId }
                    }
                    )
                    .then(resp => {
                        const responce = resp.data;
                        commit('changeCommentsList', responce);
                        resolve(resp);
                    })
                    .catch(err => {
                        Vue.$toast.error("Oops... something went wrong"); 
                        reject(err);
                    });
                })
        }
    }
  };