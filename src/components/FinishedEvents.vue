<template>
<div>
      <EventsSortbar class = "ml-10 mt-10"/>
      <v-col offset="7" cols="4">
          <div
          class="d-flex"
          
          sm="6"
        >
          <v-select
            v-model="currentItem"
            @change="TypeChanged"
            :items="items"
            label="Type of items"
            solo
          ></v-select>
        </div>
      </v-col>
      <div v-if="currentItem == items[0]">
        <v-row class = "d-flex align-start justify-start  flex-row">
        <v-col  v-for="event in this.$store.getters['sortBar/getCurrentUserEventItems'].cancelledEvents" :key="event.eventId" cols = "4">
            <v-card
            class="mx-auto my-12"
            max-width="374"
            >
            <v-img
            height="250"
            v-bind:src="event.imagePath"
            ></v-img>

          <v-row align="center">
            <v-col cols="6">
              <v-card-title>{{event.eventName}}</v-card-title>
            </v-col>
            <v-col cols="6">
                <v-dialog
                  transition="dialog-bottom-transition"
                  max-width="600"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-card-subtitle
                      v-bind="attrs"
                      v-on="on"
                      @click="$store.dispatch('eventInfo/getEventParticipants', event.pariticipantsIds)"
                    >
                      {{event.pariticipantsIds.length}} participants
                    </v-card-subtitle>
                  </template>
                  <template v-slot:default="dialog">
                    <v-card>
                      <v-toolbar
                        color="primary"
                        dark
                      >List of participants</v-toolbar>
                      <v-card-text v-if="$store.getters['eventInfo/isEverythingLoaded']">
                         <v-list
                        class="overflow-y-auto mx-auto"
                        max-height="500" 
                      >
                        <v-list-item  class="d-flex flex-column">
                        <div class="participant" v-for="user in $store.state.eventInfo.participantList" :key="user.name">
                          <v-divider></v-divider>
                          <div  class="d-flex flex-row" >
                            <v-list-item-icon>
                              <v-icon large>person</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                              <v-list-item-title class="text-h5">{{ user.name }}</v-list-item-title>
                            </v-list-item-content>
                           </div>
                        </div>
                        </v-list-item>
                      </v-list>
                      </v-card-text>
                      <v-card-actions class="justify-end">
                        <v-btn
                          text
                          @click="dialog.value = false"
                        >Close</v-btn>
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>
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
                    <v-icon v-if="event.IsCreatedFromOriginal" class="ml-2" small>restart_alt</v-icon>
                </div>
            

              <div class = "description">{{event.description | textTruncate(event.description)}}</div>
              </v-card-text>

              <v-divider class="mx-4"></v-divider>
              <v-btn
                @click="UncancelClicked(event)"
                depressed
                color="green"
                class = "ml-2 mb-2 mt-2"
                >
                Uncancel
              </v-btn>
                  <v-alert v-if="event.friendsParticipantCount > 0"
                dense
                type="info"
              >
                One of your friends participate here
            </v-alert>
          </v-card>
        </v-col>
    </v-row>
  </div>  


    <div v-else>
      <v-row class = "d-flex align-start justify-start  flex-row">
      <v-col  v-for="event in this.$store.getters['sortBar/getCurrentUserEventItems'].finishedEvents" :key="event.eventId" cols = "4">
          <v-card
          class="mx-auto my-12"
          max-width="374"
          >
          <v-img
          height="250"
          v-bind:src="event.imagePath"
          ></v-img>

                   <v-row align="center">
            <v-col cols="6">
              <v-card-title>{{event.eventName}}</v-card-title>
            </v-col>
            <v-col cols="6">
                <v-dialog
                  transition="dialog-bottom-transition"
                  max-width="600"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-card-subtitle
                      v-bind="attrs"
                      v-on="on"
                      @click="$store.dispatch('eventInfo/getEventParticipants', event.pariticipantsIds)"
                    >
                      {{event.pariticipantsIds.length}} participants
                    </v-card-subtitle>
                  </template>
                  <template v-slot:default="dialog">
                    <v-card>
                      <v-toolbar
                        color="primary"
                        dark
                      >List of participants</v-toolbar>
                      <v-card-text v-if="$store.getters['eventInfo/isEverythingLoaded']">
                          <v-list
                        class="overflow-y-auto mx-auto"
                        max-height="500" 
                      >
                        <v-list-item  class="d-flex flex-column">
                        <div class="participant" v-for="user in $store.state.eventInfo.participantList" :key="user.name">
                          <v-divider></v-divider>
                          <div  class="d-flex flex-row" >
                            <v-list-item-icon>
                              <v-icon large>person</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                              <v-list-item-title class="text-h5">{{ user.name }}</v-list-item-title>
                            </v-list-item-content>
                           </div>
                        </div>
                        </v-list-item>
                      </v-list>
                      </v-card-text>
                      <v-card-actions class="justify-end">
                        <v-btn
                          text
                          @click="dialog.value = false"
                        >Close</v-btn>
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>
              </v-col>
          </v-row>

          <v-card-text>
            <v-row
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
                  <v-icon v-if="event.IsCreatedFromOriginal" class="ml-2" small>restart_alt</v-icon>
              </div>
          

            <div class = "description">{{event.description | textTruncate(event.description)}}</div>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>
              <v-btn
                @click="DetailsClicked(event)"
                depressed
                color="secondary"
                class = "ml-2 mb-2 mt-2"
                >
                Details
               </v-btn>
               <v-dialog v-if="IsUserAnAuthor(event)"
                  transition="dialog-bottom-transition"
                  max-width="600"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-bind="attrs"
                      v-on="on"
                      color="primary"
                      class = "ml-2 mb-2 mt-2"
                      >
                      Create new
                    </v-btn>
                  </template>
                  <template>
                    <AddNewEvent :event = event />
                  </template>
                </v-dialog>
                <v-dialog v-if="!IsUserAnAuthor(event)"
                  transition="dialog-bottom-transition"
                  max-width="600"
                >
                  <template v-slot:activator="{ on, attrs }">
                      <v-btn
                      v-bind="attrs"
                      v-on="on"
                      color="green"
                      class = "ml-2 mb-2 mt-2"
                      >
                      Rate
                    </v-btn>
                  </template>
                  <template>
                    <EventRate :event = event />
                  </template>
                </v-dialog>
                <v-alert class="mb-0"
                  v-if="IsUserAnAuthor(event)"
                    dense
                    type="info"
                  >
                    Created by you
              </v-alert>
              <v-alert v-if="event.friendsParticipantCount > 0"
                dense
                type="info"
              >
                One of your friends participate here
            </v-alert>
          </v-card>
        </v-col>
      </v-row>
    </div>  
</div>
</template>

<script>
import mixin from '@sharedFunctions/Mixin.js'
import EventsSortbar from '@components/Events.Sortbar.vue'
import EventRate from '@components/MyEvents_EventPages/EventRate.vue'
import AddNewEvent from '@components/MyEvents_EventPages/AddNewEvent.vue'
export default {
  name: 'MyEvents',
  mixins: [mixin],
  mounted(){
    this.currentItem = this.items[0];
  },
  watch: {
    currentItem(newValue, oldValue) {
      if (newValue == this.items[0])
        this.$store.commit('myEvents/change_title', 'My events -> ' + this.items[0]);
      else 
        this.$store.commit('myEvents/change_title', 'My events -> ' + this.items[1]);
    }
  },
  computed: {
      DetailsClicked(){
        return event => {
          this.$router.push({ name: 'usereventfinish', params: {event}})
        };
      },
      UncancelClicked(){
        return event => {
          this.$store.dispatch("myEvents/uncancelEvent", event);
        }
      }
  },
  methods: {
    TypeChanged(){

    }
  },
  data: function() {
    return {
      items:[
        'User cancelled events',
        'User finished events'
      ],
      currentItem: null
    }
  },
  components:{
    EventsSortbar,
    EventRate,
    AddNewEvent
  }
}
</script>

<style scoped>
.description{
  min-height:130px;
}
.participant{
  width: 100%;
}
</style>