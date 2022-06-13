<template>
    <v-card
      elevation="12"
      width="256"
    >
      <v-navigation-drawer
        floating
        permanent
      >
        <v-list
          dense
          rounded
        >
          <v-list-item
            link
          >
            <v-list-item-icon>
              <v-icon> lock </v-icon>
            </v-list-item-icon>

            <v-list-item-content @click="FriendsClicked">
              <v-list-item-title > Friends </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link>
            <v-list-item-icon>
              <v-icon> list </v-icon>
            </v-list-item-icon>

            <v-list-item-content @click="UserEventsClicked">
              <v-list-item-title > Invitations </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
</template>

<script>
export default {
  name: 'EventsMenu',
    computed: {

  },
  methods: {
    FriendsClicked: function (){
      this.$emit('tabChanged', 'Friends');
    },
    UserEventsClicked: function (){
      this.$emit('tabChanged', 'Invitations');
    }
  },
  mounted(){
     this.$store.dispatch('friends/getFriendsInvitations', this.$store.getters['login/getUserCreds'].UserId);
  },
  data: function() {
    return {

    }
  }
}
</script>
