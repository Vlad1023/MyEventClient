import api from '@api';
import router from '@router'
import {parseErrorObj} from '@sharedFunctions';
import Vue from 'vue'
export default {
    namespaced: true,
    state: function(){
        return {
            allUsers: [],
            allUserFriends: [],
            friendInvitations: [],
            errors: []
        }
    },
    getters: {
      getAllUsersLogins (state) {
        return state.allUsers.map(el => el.login);
      }
    },
    mutations: {
        changeListOfUserFriends (state, newList) {
            state.allUserFriends = newList;
        },
        changeListOfUsers (state, newList) {
            state.allUsers = newList;
        },
        changeInvitationsList (state, newList){
            state.friendInvitations = newList;
        },
        removeInvitationItem (state, itemId){
          state.friendInvitations = state.friendInvitations.filter(el => el.invitationId !== itemId);
        }
    },
    actions: {
        getUserFriends ({ commit, rootState }, userId) {
            return new Promise((resolve, reject) => {
              api
                .get(`/friends/getUserFriends`, 
                    {
                        params: {
                            userId: userId
                        }
                    }
                )
                .then(resp => {
                  const friendsList = resp.data
                  commit('changeListOfUserFriends', friendsList);
                  resolve(resp);
                })
                .catch(err => {
                  reject(err);
                });
            });
        },
        getSearchedUsers ({ commit, rootState }, reqObject) {
          return new Promise((resolve, reject) => {
            api
              .get(`/friends/getSearchedUsers`,
              {
                params : {
                  toSearch: reqObject.toSearch,
                  currentUserId: reqObject.currentUserId,
                }
              }
              )
              .then(resp => {
                const usersList = resp.data
                commit('changeListOfUsers', usersList);
                resolve(resp);
              })
              .catch(err => {
                reject(err);
              });
          });
      },
      getFriendsInvitations ({ commit, rootState }, userId) {
        return new Promise((resolve, reject) => {
          api
            .get(`/friends/getUserFriendInvitations`,
            {
              params : {
                userId: userId
              }
            }
            )
            .then(resp => {
              const invitationsList = resp.data
              commit('changeInvitationsList', invitationsList);
              resolve(resp);
            })
            .catch(err => {
              reject(err);
            });
        });
    },
    addFriendInvitation ({ commit, rootState }, reqObject) {
      return new Promise((resolve, reject) => {
        api
          .post(`/friends/addFriendInvitation`, reqObject)
          .then(resp => {
            Vue.$toast.success("Invitation sent"); 
            resolve(resp);
          })
          .catch(err => {
            Vue.$toast.error("Oops... something went wrong"); 
            reject(err);
          });
      });
    },
    approveInvitation ({ commit, rootState }, invitationId) {
      return new Promise((resolve, reject) => {
        commit('removeInvitationItem', invitationId);
        api
          .patch(`/friends/approveInvitation?invitationId=${invitationId}`)
          .then(resp => {
            Vue.$toast.success("Invitation approved"); 
            resolve(resp);
          })
          .catch(err => {
            Vue.$toast.error("Oops... something went wrong"); 
            reject(err);
          });
      });
    },
    rejectInvitation ({ commit, rootState }, invitationId) {
      commit('removeInvitationItem', invitationId);
      return new Promise((resolve, reject) => {
        api
          .patch(`/friends/rejectInvitation?invitationId=${invitationId}`)
          .then(resp => {
            Vue.$toast.success("Invitation rejected"); 
            resolve(resp);
          })
          .catch(err => {
            Vue.$toast.error("Oops... something went wrong"); 
            reject(err);
          });
      });
    }
  }
};