<template>
<div>
  <v-row align="center">
    <v-col cols="3">
      <EventsMenu class="ml-10" />
    </v-col>
    <v-col offset="1" cols="6">
        <div class="text-h2 font-weight-thin">{{currentTitle}}</div>
    </v-col>
  </v-row>
  <v-navigation-drawer color="teal" v-model="sidebar" app >
          <v-list
            dense
            rounded
          >
            <v-list-item
            @click="MyEventsClicked"
              class="mt-5"
              link
            >
              <v-list-item-icon class = "mr-5">
                <v-icon large> today </v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title ><span class="text-h6 font-weight-bold ">My events</span></v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item
              @click="FinishedEventsClicked"
              class="mt-5"
              link
            >
              <v-list-item-icon class = "mr-5">
                <v-icon large> check_circle_outline </v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title ><span class="text-h6 font-weight-bold">Finished events</span></v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item 
            @click="AddEventClicked"
            class="mt-5"
            link>
              <v-list-item-icon class = "mr-5">
                <v-icon large> control_point </v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title ><span class="text-h6 font-weight-bold">Add event</span></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
  </v-navigation-drawer>
  <router-view></router-view>
</div>

</template>

<script>
import { mapState } from 'vuex'
import EventsMenu from '@components/Events.Menu.vue'

export default {
  name: 'UserEvents',
    computed: {

  },
  mounted(){
    this.$store.commit('myEvents/change_title', '');
  },
  computed: {
   ...mapState({
    currentTitle: state => state.myEvents.currentTitle,
  })},
  methods: {
    MyEventsClicked(){
      this.$router.push('/userevents/myevents');
      this.$store.commit('myEvents/change_title', 'User events');
    },
    FinishedEventsClicked(){
      this.$router.push('/userevents/finished');
      this.$store.commit('myEvents/change_title', 'Finished user events');
    },
    AddEventClicked(){
      this.$router.push('/userevents/addevent');
      this.$store.commit('myEvents/change_title', 'New event');
    }
  },
  data: function() {
    return {
      sidebar:true
    }
  },
  components: {
      EventsMenu
  }
}
</script>

<style scoped>

</style>
