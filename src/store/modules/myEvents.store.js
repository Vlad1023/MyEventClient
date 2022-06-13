import api from '@api';
import router from '@router'
import {parseErrorObj} from '@sharedFunctions';
import Vue from 'vue'
export default {
    namespaced: true,
    state: function(){
        return {
            allUserEvents: null,
            allUserFinishedEvents: null,
            errors: [],
            currentTitle: ''
        }
    },
    getters: {
      IsCorrect (state) {
        return state.errors.length === 0
      },
      getConcatedUserEventsList(state){
        if(!state.allUserEvents)
          return []
        return state.allUserEvents.createdEvents.concat(state.allUserEvents.participantEvents);
      },
      getConcatedUserFinishedEventsList(state){
        if(!state.allUserFinishedEvents)
          return []
        return state.allUserFinishedEvents.finishedEvents.concat(state.allUserFinishedEvents.cancelledEvents);
      }
    },
    mutations: {
        change_title(state, newName){
          state.currentTitle = newName;
        },
        userevents_retriveve_success (state, events) {
            state.allUserEvents = events;
        },
        userfinishedevents_retrieve_success (state, events) {
          state.allUserFinishedEvents = events;
        },
        removeUserAsParticipant(state, event){
          const index = state.allUserEvents.participantEvents.indexOf(event);
          state.allUserEvents.participantEvents.splice(index, 1);
        },
        removeEventFromCreatedByUser(state, event){
          const index = state.allUserEvents.createdEvents.indexOf(event);
          state.allUserEvents.createdEvents.splice(index, 1);
        },
        removeEventFromCancelledByUser(state, event){
          const index = state.allUserFinishedEvents.cancelledEvents.indexOf(event);
          state.allUserFinishedEvents.cancelledEvents.splice(index, 1);
        },
        request_UpdateEvent_success (state){
            state.errors = [];
        },
        request_UpdateEvent_error (state, data){
            state.status = 'error';
            if(data.errors) {
              state.errors = parseErrorObj(data.errors)
            }
            else{
              state.errors = data
            }      
        },
    },
    actions: {
        getAllUserEvents ({ commit, rootState }, {userId, textToSearch}) {
            return new Promise((resolve, reject) => {
              api
                .get('/event/getUserEvents', 
                  {
                    params: {
                      userId: userId,
                      textToSearch: textToSearch
                    }
                  }
                )
                .then(resp => {
                  const events = resp.data
                  commit('userevents_retriveve_success', events);
                  commit('sortBar/setCurrentUserEventItems', events, { root: true });
                  resolve(resp);
                })
                .catch(err => {
                  reject(err);
                });
            });
          },
          getAllFinishedUserEvents ({ commit, rootState }, {userId, textToSearch}) {
            return new Promise((resolve, reject) => {
              api
                .get('/event/getUserFinishedEvents', 
                  {
                    params: {
                      userId: userId,
                      textToSearch: textToSearch
                    }
                  }
                )
                .then(resp => {
                  const events = resp.data
                  commit('userfinishedevents_retrieve_success', events);
                  commit('sortBar/setCurrentUserEventItems', events, { root: true });
                  resolve(resp);
                })
                .catch(err => {
                  reject(err);
                });
            });
          },
          cancelEvent ({ commit, rootState }, event) {
            return new Promise((resolve, reject) => {
              api
                .patch(`/event/cancelEvent?eventId=${event.eventId}`)
                .then(resp => {
                  commit('removeEventFromCreatedByUser', event);
                  resolve(resp);
                  Vue.$toast.success("Ok, event is cancelled"); 
                })
                .catch(err => {
                  Vue.$toast.error("Oops... something went wrong"); 
                  reject(err);
                });
            });
          },
          uncancelEvent ({ commit, rootState }, event) {
            return new Promise((resolve, reject) => {
              api
                .patch(`/event/uncancelEvent?eventId=${event.eventId}`)
                .then(resp => {
                  commit('removeEventFromCancelledByUser', event);
                  Vue.$toast.success("Ok, event is uncancelled!"); 
                  resolve(resp);
                })
                .catch(err => {
                  Vue.$toast.error("Oops... something went wrong"); 
                  reject(err);
                });
            });
          },
          updateEvent ({ commit, rootState }, formdata) {
            return new Promise((resolve, reject) => {
              api
                .put('/event/updateEvent', formdata, { headers: { 'Content-Type': 'multipart/form-data'}})
                .then(resp => {
                  commit('request_UpdateEvent_success');
                  resolve(resp);
                })
                .catch(err => {
                  Vue.$toast.error("Oops... something went wrong"); 
                  commit('request_UpdateEvent_error', err.data);
                  reject(err);
                });
            });
          },
          getEventLocation ({ commit, rootState }, {locationId, eventId}) {
            return new Promise((resolve, reject) => {
              api
                .get('/event/getEventLocation',  
                  {
                    params: {
                      locationId: locationId
                    }
                  }
                )
                .then(resp => {
                  resolve(resp);
                })
                .catch(err => {
                  reject(err);
                });
            })
          }  
    }
  };