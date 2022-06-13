<template>
<div>
  <v-row>
    <v-col cols = "4">
        <EventsMenu class = "ml-10"/>
    </v-col>
    <v-col cols = "8">
        <v-checkbox @change="CheckboxChanged" class="ml-12" v-model="checkbox">
          <template v-slot:label>
            <div class="text-h5">
              Only nearby events
            </div>
            <v-icon v-if="checkbox" class="ml-5" large>near_me</v-icon>
          </template>
        </v-checkbox>
        <EventsSortbar v-if="!checkbox" class = "ml-10"/>
    </v-col>
  </v-row>
  <v-row>
      <EventsList/>
  </v-row>
</div>
</template>

<script>
import EventsMenu from '@components/Events.Menu.vue'
import EventsSortbar from '@components/Events.Sortbar.vue'
import EventsList from '@components/Events.List.vue'
export default {
  name: 'AllEventsView',
  components: {
    EventsMenu,
    EventsSortbar,
    EventsList
  },
  methods:{
    CheckboxChanged(){
      if(this.checkbox)
        this.$store.dispatch('events/getNearestEvents', this.$store.getters['location/getFormattedLocation']);
    }
  },
  data: function() {
    return {
      checkbox: false
    }
  },
}
</script>
