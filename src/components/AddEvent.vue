<template>
<v-row>
    <v-col cols = "3">

    </v-col>
    <v-col cols = "6">
        <v-form ref="addEventForm" v-model="validAddEventForm" lazy-validation>
            <v-file-input
               v-model="eventImage"
                :rules="[rules.required, rules.imgrule]"
                filled
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Pick an event image"
                prepend-icon="mdi-camera"
                label="Event image">     
            </v-file-input>
            <v-text-field
                v-model="eventTitle"
                :rules="[rules.required, rules.maxCharacters25]"
                filled
                counter="25"
                hint="Enter event title"
                prepend-icon="title"
                label="Event title">
            </v-text-field>
            <v-textarea
                v-model="eventDescription"
                :rules="[rules.required, rules.maxCharacters200]"
                filled
                name="input-7-4"
                counter="200"
                prepend-icon="description"
                label="Event description"
            ></v-textarea>
            <v-row>
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
                        label="Select end datetime of event"        W
                        v-model="endEventDatetime"> 
                    </v-datetime-picker>
                </v-col>
            </v-row>
            <v-row>
                <v-col class = "mt-2" cols = "1">
                    <v-icon medium>place</v-icon>
                </v-col>
                <v-col cols = "11">
                    <v-subheader class="text-h6">Pick location of the event</v-subheader>
                </v-col>
            </v-row>
            <GoogleMaps/>

            <v-btn class = "mt-10" x-large block :disabled="!validAddEventForm || this.$store.state.events.status === 'loading'" color="success" @click="validateAddEventForm">Create</v-btn>
            <v-alert v-if="!this.$store.getters['events/IsCorrect']" border="top"
                        color="red lighten-2"
                        dark>
                <li class="text-caption" v-for="item in this.$store.state.events.errors" :key="item">
                    {{ item }}
                </li>
             </v-alert>
        </v-form>
    </v-col>
</v-row>

</template>

<script>
import GoogleMaps from '@components/GoogleMaps.vue'
import axios from 'axios';
export default {
  name: 'AddEvent',
    computed: {

  },
  methods: {
      async validateAddEventForm(){
        if (this.$refs.addEventForm.validate()){
            const formData = new FormData();
            const currentPickedLocation = this.$store.state.events.currentPickedLocation || this.$store.getters['location/getLocation']
            const Longitude = currentPickedLocation['Longitude'].toString();
            const Latitude =  currentPickedLocation['Latitude'].toString();

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

            await data(formData,Longitude,Latitude);

            formData.append('EventName', this.eventTitle);
            formData.append('Description', this.eventDescription);
            formData.append('StartDatetime', this.startEventDatetime.toJSON());
            formData.append('EndDatetime', this.endEventDatetime.toJSON());
            formData.append('UserID', this.$store.getters['login/getUserCreds'].UserId);
            formData.append('Image', this.eventImage, this.eventImage.name);
            formData.append("Location.Longitude", Longitude.replace('.', ","));
            formData.append("Location.Latitude", Latitude.replace('.', ","));

            this.$store.dispatch("events/addEvent",formData)
                .then(data => {
                    this.$toast.success("Event successfully added"); 
                })
        }
      }
    },
  data: function() {
    return {
      validAddEventForm: false,
      rules: {
        required: value => !!value || "Required",
        imgrule: value => !value || value.size < 2000000 || 'Image size should be less than 2 MB!',
        maxCharacters25: v => [v => v.length <= 25 || 'Max 25 characters'],
        maxCharacters200: v => [v => v.length <= 200 || 'Max 200 characters']
      },
      eventTitle: '',
      eventDescription: '',
      startEventDatetime: new Date(),
      endEventDatetime: new Date(),
      eventImage: null
    }
  },
  components: {
      GoogleMaps
  }
}
</script>
