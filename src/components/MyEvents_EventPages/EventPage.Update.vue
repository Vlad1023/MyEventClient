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
            v-bind:src="getImgSrc"
          ></v-img>
          <v-file-input
              class = "mt-5"
               v-model="currentLoadedFile"
                :rules="[rules.imgrule]"
                filled
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Pick an event image"
                prepend-icon="mdi-camera"
                label="Event image">     
            </v-file-input>
             <v-text-field
             class = "mt-5"
                v-model="eventUserInput.eventName"
                :rules="[rules.required, rules.maxCharacters25]"
                filled
                counter="50"
                hint="Enter event title"
                prepend-icon="title"
                label="Event title">
            </v-text-field>
        
          <div class = "d-flex align-center justify-center  flex-row">
              <div class="my-4 text-h5 ">
                  {{getCurrentStartTime | eventConvertDatetime(eventUserInput.startDatetime)}} - {{getCurrentEndTime | eventConvertDatetime(eventUserInput.endDatetime)}}
              </div>
              <v-icon class="ml-2" small>event</v-icon>
          </div>
          <div>
              <v-col  cols = "12">
                  <v-datetime-picker
                      v-model="eventUserInput.startDatetime"
                      label="Update start datetime of event" 
                     > 
                  </v-datetime-picker>
              </v-col>
              <v-col  cols = "12">
                  <v-datetime-picker
                      v-model="eventUserInput.endDatetime"
                      label="Update end datetime of event"
                      > 
                  </v-datetime-picker>
              </v-col>
          </div>
             <v-col v-if="isLocationLoaded" cols = "12">             
                <GmapAutocomplete
                :options="this.$autocompleteOptions"
                    @place_changed='setPlace'
                />
                <v-btn class = "ml-3"
                  @click='addMarker'
                  elevation="2">
                  Set location
              </v-btn>
            </v-col>

      </v-col>
      <v-col cols="4">
        <v-textarea
            rows="8"
            v-model="eventUserInput.description"
            :rules="[rules.required, rules.maxCharacters200]"
            filled
            name="input-7-4"
            counter="1000"
            prepend-icon="description"
            label="Event description"
        ></v-textarea>
        <div>
                  <v-btn
          @click="init()"
          depressed
          color="red"
          class = "ml-8"
          >
          Reset
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
        <v-btn @click="updateClicked" class = "mt-10" x-large block  color="success" >Update</v-btn>
        <v-alert v-if="!this.$store.getters['myEvents/IsCorrect']" border="top"
                    color="red lighten-2"
                    dark>
            <li class="text-caption" v-for="item in this.$store.state.myEvents.errors" :key="item">
                {{ item }}
            </li>
        </v-alert>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'EventPage',
  props: {
      event: {}
  },
  computed: {
    getEventLocation(){
      return this.currentPickedLocation || this.eventUserInput.location;
    },
    getCurrentStartTime(){
      return this.eventUserInput.startDatetime.toJSON();
    },
    getCurrentEndTime(){
      return this.eventUserInput.endDatetime.toJSON();
    },
    getImgSrc(){
      return this.currentLoadedFile == null ?
        this.eventUserInput.imagePath
        :
        URL.createObjectURL(this.currentLoadedFile);
    }
  },
  data: function() {
    return {
      eventUserInput: {},
      currentPlace: null,

      currentPickedLocation: null,
      currentLoadedFile: null,
      isLocationLoaded: false,
      rules: {
        required: value => !!value || "Required",
        imgrule: value => !value || value.size < 2000000 || 'Image size should be less than 2 MB!',
        maxCharacters25: v => [v => v.length <= 50 || 'Max 50 characters'],
        maxCharacters200: v => [v => v.length <= 1000 || 'Max 1000 characters']
      },
    }
  },
  mounted(){
    const locationId = this.event.locationId;
    const eventId = this.event.eventId;

    this.event.startDatetime = new Date(this.event.startDatetime);
    this.event.endDatetime = new Date(this.event.endDatetime);

    this.$store.dispatch("events/getEventLocation", {locationId, eventId})
    .then((resp) => {
        const location = resp.data
        this.event.location = {lat: location.latitude, lng: location.longitude};
        this.isLocationLoaded = true;

        this.init();
    })
  },
  components: {

  },
  methods:{
    setPlace(place) {
      this.currentPlace = place;
    },
    addMarker() {
      if (this.currentPlace) {
        const lng = this.currentPlace.geometry.location.lng();
        const lat = this.currentPlace.geometry.location.lat();
        this.currentPickedLocation = 
        {          
          'lat': lat,
          'lng': lng
        }
        this.eventUserInput.location = this.currentPickedLocation;
      }
    },
    init(){
      this.currentPickedLocation = null;
      this.currentLoadedFile = null;

      this.eventUserInput = {
        eventId: this.event.eventId,
        eventName: this.event.eventName,
        description: this.event.description,
        startDatetime: this.event.startDatetime,
        endDatetime: this.event.endDatetime,
        location: {lat: this.event.location.lat, lng: this.event.location.lng},
        imagePath: this.event.imagePath
      }
    },
    async updateClicked(){
        const formData = new FormData();
        formData.append('EventName', this.eventUserInput.eventName);
        formData.append('Description', this.eventUserInput.description);
        formData.append('EventId', this.eventUserInput.eventId);
        formData.append('StartDatetime', this.eventUserInput.startDatetime.toJSON());
        formData.append('EndDatetime', this.eventUserInput.endDatetime.toJSON());
        if(this.currentLoadedFile) 
          formData.append('Image', this.currentLoadedFile, this.currentLoadedFile.name);
        else
          formData.append('Image', this.currentLoadedFile);

        const data = (formData,Longitude,Latitude)  => new Promise((resolve, reject) => {
              axios.get(
                  "https://maps.googleapis.com/maps/api/geocode/json?latlng="
                  + Latitude + ',' + Longitude
                  + "&key=" + this.$googleApiKey
                  + "&language=en"
              )
              .then(resp => {
                formData.append("Location.Adress", resp.data.results[resp.data.results.length - 2].address_components[0].short_name);
                resolve(resp);
              })
              .catch(err => {
                reject(err);
              });
            });
        await data(formData,this.eventUserInput.location.lng,this.eventUserInput.location.lat);
        
        if(this.currentPickedLocation){
          formData.append("Location.Longitude", this.currentPickedLocation.lng.toString().replace('.', ","));
          formData.append("Location.Latitude", this.currentPickedLocation.lat.toString().replace('.', ","));
        }
        else{
          formData.append("Location.Longitude", this.eventUserInput.location.lng.toString().replace('.', ","));
          formData.append("Location.Latitude", this.eventUserInput.location.lat.toString().replace('.', ","));
        }
      
        this.$store.dispatch("myEvents/updateEvent",formData)
            .then(data => {
                this.$toast.success("Event successfully updated"); 
            })
    }
  }
}
</script>

<style scoped>
.arrow{
    width: 80px;
    height: 80px;
}
</style>

