<template>
<div>
  <v-row>
    <v-col cols = "4">
        <FriendsMenu @tabChanged="TabChangeClicked" class = "ml-10"/>
    </v-col>
    <v-col v-if="tabName == 'Invitations'" class="d-flex align-center  flex-row" cols = "5">
          <v-autocomplete
          :search-input.sync="currentInputValue"
          :items="$store.getters['friends/getAllUsersLogins']"
          color="white"
          label="Add friends"
          placeholder="Start typing to search"
          prepend-icon="mdi-account-search"
        >
          <template v-slot:item="{ item }">
            <v-row align="center">
              <v-col cols="10">
                {{item}}
                <v-icon class="ml-8"  large>account_circle</v-icon>
              </v-col>
              <v-col 
                cols="1"
                >
                  <v-btn
                  @click="AddInvitationClicked(item)"
                  small
                  fab
                  dark
                  color="indigo"
                  >
                  <v-icon dark>
                    mdi-plus
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </template>
        </v-autocomplete>
    </v-col>
  </v-row>
  <div class="mt-10 ml-5 mr-5" width="100%">
      <UserFriends v-if="tabName == 'Friends'"/>
      <FriendInvitations v-else/>
  </div>
</div>
</template>

<script>
import UserFriends from '@components/Friends/UserFriends.vue'
import FriendInvitations from '@components/Friends/FriendInvitations.vue'
import FriendsMenu from '@components/Friends/FriendsMenu.vue'


export default {
  name: 'FriendsView',
  components: {
    FriendsMenu,
    UserFriends,
    FriendInvitations
  },
  methods: {
    TabChangeClicked(tabName){
      this.tabName = tabName;
    },
    AddInvitationClicked(item){
      const user = (this.$store.state.friends.allUsers.filter(el => el.login))[0]
      this.$store.dispatch('friends/addFriendInvitation', 
      {
        authorId : this.$store.getters['login/getUserCreds'].UserId, 
        userReceiverId: user.id
      })
    }
  },
  mounted() {
   
  },
  data: function() {
    return {
      items:[
        'John',
        'Jake'
      ],
      tabName: 'Friends',
      currentInputValue: ''
    }
  },
  watch: {
    // whenever question changes, this function will run
    currentInputValue(newValue, oldValue) {
      this.$store.dispatch('friends/getSearchedUsers', 
        {toSearch: newValue, currentUserId: this.$store.getters['login/getUserCreds'].UserId });
    }
  },
}
</script>
