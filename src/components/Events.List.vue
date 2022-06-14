<template>
<v-row class = "d-flex align-start justify-start  flex-row">
    <v-col  v-for="event in this.$store.getters['sortBar/getCurrentUpcomingEventItems']" :key="event.eventId" cols = "4">
        <v-card
        class="mx-auto my-12"
        max-width="374"
        >
        <v-overlay
            v-if = "IsLoggedIn && IsUserAnAuthor(event)"
            :absolute="true"
            :value="true"
          >
            <span class="text-h6 font-weight-bold ">You are the author</span>
        </v-overlay>
        <v-img
        height="250"
        v-bind:src="event.imagePath"
        ></v-img>
        <v-row align="center">
          <v-col cols="6">
            <v-card-title>{{event.eventName}}</v-card-title>
            <v-card-subtitle>Author: {{event.authorName}}</v-card-subtitle>
          </v-col>
          <v-col cols="6">
            <v-card-subtitle>{{event.pariticipantsIds.length}} participants</v-card-subtitle>
          </v-col>
        </v-row>
      
        <v-card-text>
        <v-row v-if="event.isCreatedFromOriginal"
            align="center"
            class="mx-0 mb-3"
        >
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
        </v-row>

            <div class = "d-flex align-center justify-start  flex-row">
                <div class="my-4 text-subtitle-1 ">
                    {{event.startDatetime | eventConvertDatetime(event.startDatetime)}} - {{event.endDatetime | eventConvertDatetime(event.endDatetime)}}
                </div>
                <v-icon class="ml-2" small>event</v-icon>
                <v-icon v-if="event.isCreatedFromOriginal" class="ml-2" small>restart_alt</v-icon>
            </div>
        

        <div class = "description">{{event.description | textTruncate(event.description)}}</div>
        </v-card-text>

        <v-divider class="mx-4"></v-divider>

        <div v-if="IsLoggedIn">
          <div v-if="IsUserAnAuthor(event)">

          </div>
          <div v-else-if="IsAlreadySubscribed(event)">
              <v-btn
              @click="DetailsClicked(event)"
              depressed
              color="secondary"
              class = "ml-2 mb-2 mt-2"
              >
              Details
              </v-btn>
              <v-btn
                @click="UnsubscribeClicked(event)"
                depressed
                color="red"
                class = "ml-2 mb-2 mt-2"
                >
                Unsubscribe
              </v-btn>
          </div>
          <div v-else>
              <v-btn
                @click="DetailsClicked(event)"
                depressed
                color="secondary"
                class = "ml-2 mb-2 mt-2"
                >
                Details
              </v-btn>
              <v-btn
                @click="SubscribeClicked(event)"
                depressed
                color="primary"
                class = "ml-2 mb-2 mt-2"
                >
                Subscribe
            </v-btn>
          </div>
        </div>

        <div v-else>
          <v-btn
          depressed
          @click="LogOut"
          color="secondary"
          class = "ml-2 mb-2 mt-2"
          >
          Details
          </v-btn>
          <v-btn
            @click="LogOut"
            depressed
            color="primary"
            class = "ml-2 mb-2 mt-2"
            >
            Subscribe
          </v-btn>
        </div>
           <v-alert v-if="event.friendsParticipantCount > 0"
                dense
                type="info"
              >
                One of your friends participate here
            </v-alert>
    </v-card>
  </v-col>
</v-row>
</template>

<script>
import mixin from '@sharedFunctions/Mixin.js'
export default {
  name: 'EventsList',
  mixins: [mixin],
  computed: {
      SubscribeClicked(){
        return event => { 
          event.pariticipantsIds.push(this.$store.getters['login/getUserCreds'].UserId);
          this.$store.dispatch("events/addEventParticipant", {UserId: this.$store.getters['login/getUserCreds'].UserId, EventId: event.eventId})
          };
      },
      UnsubscribeClicked(){
          return event => { 
            event.pariticipantsIds.splice(event.pariticipantsIds.indexOf(this.$store.getters['login/getUserCreds'].UserId), 1)
            this.$store.dispatch("events/deleteEventParticipant", {UserId: this.$store.getters['login/getUserCreds'].UserId, EventId: event.eventId})
          };
      },
      DetailsClicked(){
        return event => {
          this.$router.push({ name: 'eventpage', params: {event}})
        };
      }
  },
  methods: {
    LogOut(){
      this.$router.push('/signin')
    }
  },
  data: function() {
    return {
      loading: false,
      selection: 1
    }
  }
}
</script>
<style scoped>
.description{
  min-height:130px;
}
</style>
