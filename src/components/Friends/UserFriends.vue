<template>
    <div>
        <v-card v-if="$store.state.friends.allUserFriends.length > 0">
            <v-list 
            >
                <template v-for="item in $store.state.friends.allUserFriends" >
                    <v-list-item class="mt-5" :key="item.id">
                        <v-row align = "center">
                            <v-col cols="1">
                                <v-icon large>account_circle</v-icon>
                            </v-col>
                            <v-col class="d-flex flex-column " cols="10">
                                <div>{{item.login}}</div>
                                <div class="text-subtitle-1">{{item.email}}</div>
                            </v-col>
                        </v-row>
                    </v-list-item>
                     <v-divider :key="item.id" class="mt-5"></v-divider>
                </template>
            </v-list>
        </v-card>
        <div class="text-h1 d-flex justify-center text-h1" v-else>
           <div>
                You dont have friends yet. Invite someone  
           </div> 
        </div>
    </div>
</template>

<script>


export default {
  name: 'UserFriends',
  methods: {

  },
  mounted() {
    this.$store.dispatch('friends/getUserFriends', this.$store.getters['login/getUserCreds'].UserId);
  },
  data: function() {
    return {
     
    }
  }
}
</script>
