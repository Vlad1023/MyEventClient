export default {
  computed: {
    IsUserAnAuthor(){
      return event => event.authorId === this.$store.getters['login/getUserCreds'].UserId;
    },
    IsAlreadySubscribed(){
      return event => event.pariticipantsIds.indexOf(this.$store.getters['login/getUserCreds'].UserId) > -1;
    },
    IsLoggedIn(){
      return this.$store.getters['login/isLoggedIn'];
    }
  }
}