<template>
  <div class="home">
    <v-row
     align-content="center"
    >
      <v-col cols="1">
        <router-link to="/userevents/myevents">
            <v-icon class="ml-10" x-large>arrow_back</v-icon>
        </router-link>
      </v-col>
      <v-col offset="1" cols="4">
          <v-img
            aspect-ratio="0.1"
            max-height="250"
            v-bind:src="event.imagePath"
          ></v-img>

          <div class="grey--text text-h1 text-darken-1 mb-2 text-center">
            {{event.eventName}}
          </div>
          <div class = "d-flex align-center justify-center  flex-row">
              <div class="my-4 text-h5 ">
                  {{event.startDatetime | eventConvertDatetime(event.startDatetime)}} - {{event.endDatetime | eventConvertDatetime(event.endDatetime)}}
              </div>
              <v-icon class="ml-2" small>event</v-icon>
          </div>
          <div v-if="event.IsCreatedFromOriginal" class="d-flex align-center justify-center  flex-row">
                    <v-rating
            :value="event.rate"
            color="amber"
            dense
            half-increments
            readonly
            size="14"
            ></v-rating>

            <div class="grey--text ms-4">
            {{event.rate}}
            </div>
            <div class="grey--text ms-4 ml-2">
            ({{event.reviewsCount}} reviews)
            </div>
          </div>
      </v-col>
      <v-col cols="4">
        <v-card class = "text-body-1 pa-5 blue-grey lighten-3"
          elevation="2"
          outlined
          shaped
          tile
        >
          <span class="description">{{event.description}}</span>
        </v-card>
        <div>
                      <v-btn
                v-if="IsAlreadySubscribed(event)"
                @click="UnsubscribeClicked(event)"
                depressed
                color="red"
                class = "ml-2 mb-2 mt-2"
                >
                Unsubscribe
             </v-btn>
            <v-btn
                v-else
                @click="SubscribeClicked(event)"
                depressed
                color="primary"
                class = "ml-2 mb-2 mt-2"
                >
                Subscribe
            </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row v-if="isLocationLoaded" align-content="center">
      <v-col offset="2" cols="8">
        <GmapMap
          :center="getEventLocation"
          :zoom='12'
          style='width:100%;  height: 400px;'
        >
          <GmapMarker
            :position="getEventLocation"
          />
        </GmapMap>
      </v-col>
    </v-row>
    <CommentsComponent :event = event />
  </div>
</template>

<script>
import CommentsComponent from '@components/Comments.vue'
export default {
  name: 'EventPage',
  props: {
      event: {}
  },
  computed: {
    getEventLocation(){
      return this.event.location;
    },
    IsAlreadySubscribed(){
      return event => event.pariticipantsIds.indexOf(this.$store.getters['login/getUserCreds'].UserId) > -1;
    },
    UnsubscribeClicked(){
        return event => { 
            event.pariticipantsIds.splice(event.pariticipantsIds.indexOf(this.$store.getters['login/getUserCreds'].UserId), 1)
            this.$store.dispatch("events/deleteEventParticipant", {UserId: this.$store.getters['login/getUserCreds'].UserId, EventId: event.eventId})
        };
    },
    SubscribeClicked(){
        return event => { 
          event.pariticipantsIds.push(this.$store.getters['login/getUserCreds'].UserId);
          this.$store.dispatch("events/addEventParticipant", {UserId: this.$store.getters['login/getUserCreds'].UserId, EventId: event.eventId})
          };
      },
  },
  data: function() {
    return {
      isLocationLoaded: false
    }
  },
  mounted(){
    const locationId = this.event.locationId;
    const eventId = this.event.eventId;
    this.$store.dispatch("myEvents/getEventLocation", {locationId, eventId})
    .then((resp) => {
        const location = resp.data
        this.event.location = {lat: location.latitude, lng: location.longitude};
        this.isLocationLoaded = true;
    })
  },
  components: {
    CommentsComponent
  }
}
</script>

<style scoped>
.arrow{
    width: 80px;
    height: 80px;
}
.description{
    min-width: 100px;
    min-height: 100px;
}
</style>

