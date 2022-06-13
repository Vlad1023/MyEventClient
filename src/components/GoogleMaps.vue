<template>
  <v-row>
        <v-row>
            <v-col class="mt-8" cols = "12">
                <v-subheader class = "d-block">Search and add a pin</v-subheader>
            </v-col>
            <v-col class="ml-3 mb-8" cols = "12">             
                <GmapAutocomplete
                :options="this.$autocompleteOptions"
                    @place_changed='setPlace'
                />
                <v-btn @click='addMarker' class = "ml-3"
                  elevation="2">
                  Set location
              </v-btn>
            </v-col>
        </v-row>
    <GmapMap
      :center="getCenter"
      :zoom='12'
      style='width:100%;  height: 400px;'
    >
      <GmapMarker
        :position="getMarkerPos"
        @click="center=getMarkerPos"
      />
    </GmapMap>
  </v-row>
</template>

<script>
import { isThisSecond } from 'date-fns';
import Vue from 'vue'

export default {
  name: 'GoogleMap',
  data() {
    return {
      currentPlace: null,
      marker: {},
      center: undefined
    }
  },
  computed: {
    getCenter(){
      return this.center || this.$store.getters['location/getFormattedLocation'];
    },
    getMarkerPos(){
      return this.marker.position || this.getCenter;
    }
  },
  methods: {
    setPlace(place) {
      this.currentPlace = place;
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
        };
        this.marker = { position: marker };
        this.center = marker;

        this.$store.commit('events/changePickedLocation', {Longitude: marker.lng, Latitude: marker.lat})
        this.currentPlace = null;
      }
    }
  },
};
</script>

<style scoped>

</style>