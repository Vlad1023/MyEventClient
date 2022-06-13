<template>
  <v-card
    class="elevation-16 mx-auto"
  >
    <v-card-title class="text-h5">
      Add new event based on original
    </v-card-title>
    <v-card-text>
      Choose new time!
    <v-row class="mt-5">
        <v-col cols = "1">
            <v-icon class = "mt-5" medium>event</v-icon>
         </v-col>
        <v-col  cols = "11">
            <v-datetime-picker
                label="Select start datetime of event"
                v-model="startEventDatetime"> 
            </v-datetime-picker>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols = "1">
            <v-icon class = "mt-5" medium>event</v-icon>
         </v-col>
        <v-col  cols = "11">
            <v-datetime-picker
                label="Select start datetime of event"
                v-model="endEventDatetime"> 
            </v-datetime-picker>
        </v-col>
    </v-row>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="justify-center">
      <v-btn
        @click="AddEventClicked"
        color="primary"
        text
      >
        Add
      </v-btn>
    </v-card-actions>
    <v-alert v-if="!this.$store.getters['events/IsCorrect']" border="top"
            color="red lighten-2"
            dark>
    <li class="text-caption" v-for="item in this.$store.state.events.errors" :key="item">
        {{ item }}
    </li>
    </v-alert>
  </v-card>
</template>

<script>
import axios from 'axios';
export default {
  name: 'EventPage',
  props: {
    event: Object
  },
  computed: {

  },
  data: function() {
    return {
      rating: 2,
      startEventDatetime: new Date(),
      endEventDatetime: new Date()
    }
  },
  mounted(){

  },
  components: {

  },
  methods:{
    AddEventClicked() {
        this.$store.dispatch("events/addEventBasedOnOriginal", 
        {
            EventId: this.event.eventId, 
            StartDatetime: this.startEventDatetime,
            EndDatetime: this.endEventDatetime,
            Rate: this.event.rate
        })
        .then(data => {
            this.$toast.success("Event successfully added"); 
        })
    }
  }
}
</script>