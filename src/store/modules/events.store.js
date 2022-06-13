import api from '@api';
import router from '@router'
import {parseErrorObj} from '@sharedFunctions';
import Vue from 'vue'
import store from '@store';
export default {
    namespaced: true,
    state: function(){
        return {
            allEvents: [],
            errors: [],

            currentPickedLocation: undefined,
        }
    },
    getters: {
      IsCorrect (state) {
        return state.errors.length === 0
      }
    },
    mutations: {
        retriveve_error (state, data) {
            if(data.errors) {
              state.errors = parseErrorObj(data.errors)
            }
            else{
              state.errors = data
            }         
        },
        retriveve_success (state, events) {
            state.allEvents = events;
            state.errors = [];
        },
        changePickedLocation (state, location) {
          state.currentPickedLocation = location;
        },
        addLocationToEvent (state, {location, eventId}) {
          let objIndex = state.allEvents.findIndex((el => el.eventId === eventId));
          state.allEvents[objIndex].location = {lat: location.latitude, lng: location.longitude};
        },

        request_AddEvent (state){
          state.status = 'loading';
        },
        request_AddEvent_success (state){
            state.status = 'success';
            state.errors = [];
        },
        request_AddEvent_error (state, data){
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
        getAllUpcomingEvents ({ commit, rootState }, textToSearch) {
            return new Promise((resolve, reject) => {
              api
                .get(`/event/getAllUpcomingEvents`, 
                {
                  params: {
                    textToSearch: textToSearch,
                    userId: store.getters['login/isLoggedIn'] ? 
                      store.getters['login/getUserCreds'].UserId
                      :
                      null
                  }
                }
                )
                .then(resp => {
                  const events = resp.data
                  commit('retriveve_success', events);
                  commit('sortBar/setCurrentUpcomingEventItems', events, { root: true });
                  resolve(resp);
                })
                .catch(err => {
                  commit('retriveve_error', err.data);
                  reject(err);
                });
            });
          },
          getNearestEvents ({ commit, rootState }, locationObj) {
            return new Promise((resolve, reject) => {
              api
                .get(`/event/GetNearestEvents`,
                  {
                    params: {
                      longitute: locationObj.lng,
                      latitude: locationObj.lat,
                      userId: store.getters['login/isLoggedIn'] ? 
                      store.getters['login/getUserCreds'].UserId
                      :
                      null
                    }
                  }
                )
                .then(resp => {
                  const events = resp.data
                  commit('retriveve_success', events);
                  commit('sortBar/setCurrentUpcomingEventItems', events, { root: true });
                  resolve(resp);
                })
                .catch(err => {
                  commit('retriveve_error', err.data);
                  reject(err);
                });
            });
          },
          addEvent ({ commit, rootState }, formdata) {
            return new Promise((resolve, reject) => {
              commit('request_AddEvent');
              api
                .post('/event/addEvent', formdata, { headers: { 'Content-Type': 'multipart/form-data'}})
                .then(resp => {
                  commit('request_AddEvent_success');
                  resolve(resp);
                })
                .catch(err => {
                  Vue.$toast.error("Oops... something went wrong"); 
                  commit('request_AddEvent_error', err.data);
                  reject(err);
                });
            });
          },
          addEventBasedOnOriginal ({ commit, rootState }, event) {
            return new Promise((resolve, reject) => {
              commit('request_AddEvent');
              api
                .post('/event/addEventBasedOnOriginal', event)
                .then(resp => {
                  commit('request_AddEvent_success');
                  resolve(resp);
                })
                .catch(err => {
                  Vue.$toast.error("Oops... something went wrong"); 
                  commit('request_AddEvent_error', err.data);
                  reject(err);
                });
            });
          },
          addEventParticipant ({ commit, rootState }, participant) {
            return new Promise((resolve, reject) => {
              api
                .post('/event/addEventParticipant',  participant)
                .then(resp => {
                  Vue.$toast.success("Ok, you are in!"); 
                  resolve(resp);
                })
                .catch(err => {
                  Vue.$toast.error("Oops... something went wrong"); 
                  reject(err);
                });
            });
          },
          deleteEventParticipant ({ commit, rootState }, participant) {
            return new Promise((resolve, reject) => {
              api
                .delete('/event/deleteEventParticipant', {data: participant}  )
                .then(resp => {
                  Vue.$toast.success("Ok, feel free!))"); 
                  resolve(resp);
                })
                .catch(err => {
                  Vue.$toast.error("Oops... something went wrong"); 
                  reject(err);
                });
            })
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
                  const responceObj = resp.data;
                  commit('addLocationToEvent', {'location': responceObj, 'eventId': eventId});
                  resolve(resp);
                })
                .catch(err => {
                  reject(err);
                });
            })
          }
    }
  };