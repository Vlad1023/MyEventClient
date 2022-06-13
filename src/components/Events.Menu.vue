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

            <v-list-item-content @click="AllEventsClicked">
              <v-list-item-title > All events </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link>
            <v-list-item-icon>
              <v-icon> list </v-icon>
            </v-list-item-icon>

            <v-list-item-content @click="UserEventsClicked">
              <v-list-item-title > My events </v-list-item-title>
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
    AllEventsClicked: function (){
        this.$router.push('/');
    },
    UserEventsClicked: function (){
        this.$router.push('/userevents');
    }
  },
  data: function() {
    return {

    }
  }
}
</script>
