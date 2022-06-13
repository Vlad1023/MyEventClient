<template>
    <div>
        <v-card>
            <v-list
            >
                <template v-for="item in $store.state.friends.friendInvitations">
                    <v-list-item :key="item.id" class="mt-5">
                        <v-row align = "center">
                            <v-col cols="1">
                                <v-icon large>account_circle</v-icon>
                            </v-col>
                            <v-col class="d-flex flex-column " cols="7">
                                <div>{{item.authorName}}</div>
                                <div class="text-subtitle-1">{{item.authorEmail}}</div>
                            </v-col>
                            <v-col class="d-flex flex-column " cols="4">
                                <v-btn @click="ApproveClicked(item)" color="primary">Approve</v-btn>
                                <v-btn @click="RejectClicked(item)" class="mt-2" color="red">Reject</v-btn>
                            </v-col>
                        </v-row>
                    </v-list-item>
                     <v-divider :key="item.id" class="mt-5"></v-divider>
                </template>
            </v-list>
        </v-card>
    </div>
</template>

<script>
export default {
  name: 'FriendInvitations',
    computed: {

  },
  methods: {
    ApproveClicked(item){
        this.$store.dispatch('friends/approveInvitation', item.invitationId)
    },
    RejectedClicked(item){
        this.$store.dispatch('friends/rejectInvitation', item.invitationId)
    }
  },
  data: function() {
    return {

    }
  }
}
</script>