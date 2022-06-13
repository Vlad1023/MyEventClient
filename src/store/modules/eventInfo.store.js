import jwt_decode from "jwt-decode";
import api from '@api';
import {parseErrorObj} from '@sharedFunctions';
export default {
    namespaced: true,
    state: function(){
        return {
            participantList: [],

            isParticipantsLoaded: false
        }
    },
    getters: {
        isEverythingLoaded(state){
            return state.isParticipantsLoaded;
        }
    },
    mutations: {
        setParticipants (state, result) {
            state.participantList = result;
            state.isParticipantsLoaded = true;
        }
    },
    actions: {
        getEventParticipants ({ commit, rootState, state }, participantIds) { 
        state.isParticipantsLoaded = false;
        return new Promise((resolve, reject) => {
            api
                .post('/user/getEventParticipants', participantIds )
                .then(resp => {
                    const responce = resp.data;
                    commit('setParticipants', responce);
                    resolve(resp);
                })
                .catch(err => {
                    reject(err);
                });
            })
        }
    }
  };