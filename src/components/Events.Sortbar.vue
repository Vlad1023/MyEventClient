<template>
   <v-row>
     <v-col class="d-flex align-center  flex-row" cols = "6">
        <v-text-field
          @input="up"
          v-model="searchField"
          color="purple darken-2"
          label="Search events"
        ></v-text-field>
        <v-icon>search</v-icon>
      </v-col>
      <v-col cols = "5">
          <v-select
          v-model="pickedLocations"
          :items="getListOfLocations"
          :change="selectChanged"
          label="Select"
          multiple
          chips
          hint="What are the target regions"
          persistent-hint
        ></v-select>
     </v-col>
    </v-row>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'EventsSortbar',
    computed: {
      getListOfLocations(){
        return this.$store.getters['sortBar/getAllEventAdresses'];
      },
      selectChanged(){
        if(this.pickedLocations.length > 0){     
          this.$store.dispatch('sortBar/filterData', this.pickedLocations);
        }
      },
      ...mapGetters({
        allCurrentLocations: "sortBar/getAllEventAdresses"
      })
  },
  methods: {
    up(){
      this.$store.commit('sortBar/changeTextData', this.searchField);
      switch(this.$route.path) {
        case '/':
            this.$store.dispatch('events/getAllUpcomingEvents', this.searchField);
          break;
        case '/userevents/myevents':
            this.$store.dispatch('myEvents/getAllUserEvents', {userId: this.$store.getters['login/getUserCreds'].UserId, textToSearch: this.searchField });
            break;
        case '/userevents/finished':
            this.$store.dispatch('myEvents/getAllFinishedUserEvents', {userId: this.$store.getters['login/getUserCreds'].UserId, textToSearch: this.searchField });
          break;
      }
    }
  },
  mounted(){
    this.pickedLocations = this.$store.getters['sortBar/getAllEventAdresses'];
    this.$store.commit('sortBar/changeTextData', 'ANY');
    this.searchField = '';
    switch(this.$store.state.route.fullPath) {
      case '/':
          this.$store.dispatch('events/getAllUpcomingEvents', this.searchField)
          .then(() => this.$store.dispatch('sortBar/filterData', this.pickedLocations))
          //.then(() => this.pickedLocations = this.$store.getters['sortBar/getAllEventAdresses'])
        break;
      case '/userevents/myevents':
          this.$store.dispatch('myEvents/getAllUserEvents', {userId: this.$store.getters['login/getUserCreds'].UserId, textToSearch: this.searchField })
          .then(() => this.$store.dispatch('sortBar/filterData', this.pickedLocations))
          //.then(() => this.pickedLocations = this.$store.getters['sortBar/getAllEventAdresses'])
          break;
      case '/userevents/finished':
          this.$store.dispatch('myEvents/getAllFinishedUserEvents', {userId: this.$store.getters['login/getUserCreds'].UserId, textToSearch: this.searchField })
          .then(() => this.$store.dispatch('sortBar/filterData', this.pickedLocations))
          //.then(() => this.pickedLocations = this.$store.getters['sortBar/getAllEventAdresses'])
        break;
    }
  },
  data: function() {
    return {
      searchField: '',
      states: [],
      pickedLocations: []
    }
  },
  watch: {
    allCurrentLocations(newValue, oldValue) {
      this.pickedLocations = newValue;
    },
  }
}
</script>

<style scoped>
::v-deep #input-71{
  width: 100px;
}

</style>
