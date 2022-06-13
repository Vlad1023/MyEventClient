!<template>
<div>
    <v-col class="text-h4" offset="2" cols="4">Comments:</v-col>
    <v-col offset="3" cols="6">
        <div class="text-subtitle">Add new</div>
         <v-text-field @keydown.enter="addComment"
            v-model="currentValue"
            label="Type and hit enter"
            solo
          ></v-text-field>
    </v-col>
    <v-col offset="3" cols="6">
        <v-card>   
            <v-card-text>
            <div class="font-weight-bold ml-8 mb-2">
                Last 5 comments
            </div>

            <v-timeline :key="comment.commentId || comment.authorId" v-for="comment in $store.getters['comments/getLastNComments']"
                align-top
                dense
            >
                <v-timeline-item
                small
                >
                <div>
                    <div class="font-weight-normal">
                    <strong>{{comment.authorName}}</strong> @{{comment.dateAdded | eventConvertDatetime(comment.dateAdded)}}
                    </div>
                    <div>{{comment.comment}}</div>
                </div>
                </v-timeline-item>
            </v-timeline>
            </v-card-text>
        </v-card>
    </v-col>
</div>
</template>

<script>
import mixin from '@sharedFunctions/Mixin.js'
export default {
  props: {
    event: {}
  },
  name: 'CommentsComponent',
  mixins: [mixin],
  computed: {
      
  },
  methods: {
   addComment(){
     const result = this.currentValue.trim();
     if(this.currentValue != ''){
        const eventId = this.event.eventId;
        this.$store.dispatch('comments/addComment',
            {
                comment : result,
                authorId: this.$store.getters['login/getUserCreds'].UserId,
                eventId: eventId
            }
        ).then(() => this.$store.dispatch('comments/getEventComments', this.event.eventId))
     }
   }
  },
  data: function() {
    return {
      currentValue: ''
    }
  },
  mounted(){
    this.$store.dispatch('comments/getEventComments', this.event.eventId)
  }
}
</script>
