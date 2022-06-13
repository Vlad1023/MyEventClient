<template>
  <v-app>
    <v-overlay v-if="errors.length > 0" :value="true">
      <div v-for="error in this.errors" :key="error">
        <div class = "text-h3 black--text">{{error}}</div>
      </div>
    </v-overlay>
    <div>
      <div v-if="errors.length == 0"  class = "topBar">
        <TopBar/>
      </div>
      <div>
        <template class = "navBar">
          <v-tabs>
            <v-tab @click="eventsTabClicked" class = "tab">EVENTS</v-tab>
            <v-tab @click="friendsTabClicked" class = "tab">FRIENDS</v-tab>
            <v-tab @click="optionsTabClicked" class = "tab">OPTIONS</v-tab>
          </v-tabs>
        </template>
      </div>
    </div>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios';
import TopBar from "@components/TopBar.vue"
export default {
  name: 'App',

  data: () => ({
    errors: []
  }),
  created(){
    navigator.geolocation.getCurrentPosition(
        position => {
          const data = axios.get(
            "https://maps.googleapis.com/maps/api/geocode/json?latlng="
            + position.coords.latitude + ',' + position.coords.longitude
            + "&key=" + this.$googleApiKey
            + "&language=en"
          )
          .then((resp) => {
            if(!resp.data.results[0].formatted_address.includes("Ukraine"))
              this.errors.push("Sorry, the application currently works only in Ukraine")
          })
        },
        error => {
          console.log(error.message);
          this.errors.push("Please, enable geolocation and reload the page"); 
        }
     )
  },
  computed:{

  },
  components: {
    TopBar
  },
  methods: {
    eventsTabClicked(){
      this.$store.dispatch("eventsTabClicked");
    },
    optionsTabClicked(){
      this.$store.dispatch("optionsTabClicked");
    },
    friendsTabClicked(){
      this.$store.dispatch("friendsTabClicked");
    }
  }
}
</script>

<style scoped>
.topBar{
  height: 70px;
}
.tab{
  width: 33%;
  padding: 0;
}
::v-deep .v-slide-group__content.v-tabs-bar__content{
  justify-content: space-between;
}

#app {
  min-height: 100vh;
}
</style>
