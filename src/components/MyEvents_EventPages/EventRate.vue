<template>
  <v-card
    class="elevation-16 mx-auto"
  >
    <v-card-title class="text-h5">
      Rate this event
    </v-card-title>
    <v-card-text>
      If you enjoyed this event, please take a few seconds to share your opinion about that!

      <div class="text-center mt-12">
        <v-rating
          v-model="rating"
          color="yellow darken-3"
          background-color="grey darken-1"
          empty-icon="$ratingFull"
          hover
          large
        ></v-rating>
      </div>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="justify-center">
      <v-btn
        @click="RateClicked"
        color="primary"
        text
      >
        Rate Now
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from 'axios';
export default {
  name: 'EventPage',
  props: {
    event: Object
  },
  computed: {

  },
  data: function() {
    return {
      rating: 2
    }
  },
  mounted(){

  },
  components: {

  },
  methods:{
    RateClicked() {
      this.$store.dispatch('review/addReview', 
        {
          rate: this.rating, 
          authorId: this.$store.getters['login/getUserCreds'].UserId,
          eventId: this.event.eventId
        });
    },
  }
}
</script>