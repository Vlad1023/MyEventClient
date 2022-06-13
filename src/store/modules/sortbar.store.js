import api from '@api';
import router from '@router'
import {parseErrorObj} from '@sharedFunctions';
import Vue from 'vue'
export default {
    namespaced: true,
    state: function(){
        return {
            currentSearchFieldText: 'ANY',
            currentUpcomingEventItems: [],
            currentUserEventItems: {}
        }
    },
    getters: {
      getAllEventAdresses (state, getters, rootState, rootGetters) {
        switch(rootState.route.fullPath) {
          case '/':
              return [...new Set(rootState.events.allEvents.map(event => event.adressShort))];
              break;
          case '/userevents/myevents':
              return [...new Set(rootGetters['myEvents/getConcatedUserEventsList'].map(event => event.adressShort))];
              break;
          case '/userevents/finished':
              return [...new Set(rootGetters['myEvents/getConcatedUserFinishedEventsList'].map(event => event.adressShort))];
              break;
        }
      },
      getCurrentUserEventItems(state){
        for (const prop in state.currentUserEventItems)
          state.currentUserEventItems[prop] = state.currentUserEventItems[prop]?.sort((a,b) => a.friendsParticipantCount !== null ? 1 : -1)
        return state.currentUserEventItems;
      },
      getCurrentUpcomingEventItems(state){
        let currentUpcomingEventItems = []
        currentUpcomingEventItems = state.currentUpcomingEventItems.sort((a,b) => a.friendsParticipantCount !== null ? 1 : -1)
        return currentUpcomingEventItems;
      }
    },
    mutations: {
        changeTextData (state, data) {
          state.currentSearchFieldText = data;
        },
        setCurrentUpcomingEventItems(state, data){
          state.currentUpcomingEventItems = data;
        },
        setCurrentUserEventItems(state, data){
          state.currentUserEventItems = data;
        }
    },
    actions: {
          filterData({ state, getters, rootState, rootGetters }, pickedLocations){
            switch(rootState.route.fullPath) {
              case '/':
                  state.currentUpcomingEventItems = rootState.events.allEvents.filter(event => pickedLocations.some(el => el === event.adressShort));
                  break
              case '/userevents/myevents': 
                if(rootState.myEvents.allUserEvents){
                  state.currentUserEventItems = 
                  {
                    createdEvents: rootState.myEvents.allUserEvents.createdEvents.filter(event => pickedLocations.some(el => el === event.adressShort)),
                    participantEvents: rootState.myEvents.allUserEvents.participantEvents.filter(event => pickedLocations.some(el => el === event.adressShort))
                  }
                }
                else{
                  state.currentUserEventItems = 
                  {
                    createdEvents:  [],
                    participantEvents: []
                  }
                }
                  break;
              case '/userevents/finished':
                if(rootState.myEvents.allUserFinishedEvents){
                  state.currentUserEventItems = 
                  {
                    finishedEvents: rootState.myEvents.allUserFinishedEvents.finishedEvents.filter(event => pickedLocations.some(el => el === event.adressShort)),
                    cancelledEvents: rootState.myEvents.allUserFinishedEvents.cancelledEvents.filter(event => pickedLocations.some(el => el === event.adressShort))
                  }
                }
                else{
                  state.currentUserEventItems = 
                  {
                    finishedEvents: [],
                    cancelledEvents: []
                  }
                }

                break;
            }
        }
    }
  };