<template>
<v-app-bar
      app
      color="primary"
      dark
    >
    <v-col cols="3" class = "text-h5">
      MyEvent
    </v-col>

    <v-col cols="3" class = "text-subtitle-1">
        {{this.$store.state.location.locationAdress}} <v-icon small>place</v-icon>
    </v-col>
    <v-col v-if="this.$store.getters['login/isLoggedIn']" cols="10" class = "text-subtitle-1">
      <v-row>
        <v-col cols="5">
          <v-row justify="end">{{this.$store.getters['login/getUserCreds'].Email}}</v-row>
          <v-row justify="end"  class="mr-15">{{this.$store.getters['login/getUserCreds'].Username}}</v-row>
        </v-col>
        <v-col cols="1">
          <v-icon class="d-flex justify-start" large>account_circle</v-icon>
        </v-col>
        <v-col cols="1">
          <v-icon @click="logOutClicked" class="d-flex justify-end" large>logout</v-icon>
        </v-col>
      </v-row>
    </v-col>
    <v-col v-else cols="6">
      <v-row >
        <v-col cols="10">
        </v-col>
        <v-col cols = "2">
            <v-btn
                depressed
                color="green darken-4"
                @click="loginClicked"
              >
                Login
            </v-btn>
        </v-col>
      </v-row>
    </v-col>
</v-app-bar>
</template>

<script>
import axios from 'axios';

export default {
  name: 'TopBar',
  data: () => ({

  }),
  computed:{

  },
  mounted(){
      this.getCurrentLocation();
      console.log(this);
  },
  methods: {
    getStreetAddressFrom(lat, long) {
      var data = axios.get(
        "https://maps.googleapis.com/maps/api/geocode/json?latlng="
        + lat + ',' + long
        + "&key=" + this.$googleApiKey
        + "&language=en"
      )
      .then((resp) => {
        console.log(resp.data);
        this.$store.commit('location/setLocationAdress', resp.data.results[resp.data.results.length - 2].formatted_address);
        this.$store.commit('location/setLocationAdressShort', resp.data.results[resp.data.results.length - 2].address_components[0].short_name);
      })
      .catch(err => {
        console.log(err.data)
      });
    },
    loginClicked(){
      this.$router.push('/signin');
    },
    getCurrentLocation() {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.$store.commit('location/setLocationCoordinates', {'latitude': position.coords.latitude, 'longitude': position.coords.longitude});
          this.getStreetAddressFrom(position.coords.latitude, position.coords.longitude)
        },
        error => {
          console.log(error.message);
          this.$toast.error("Please, enable geolocation and reload the page", {duration: 5000}); 
        }
     )
    },
    logOutClicked(){
      this.$store.commit('login/changeLogInStatus', false);
      this.$store.dispatch('login/logout');
    }
  }
}
</script>
