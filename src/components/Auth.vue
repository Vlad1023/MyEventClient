<template>
<v-app>
        <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px">
            <div>
                <v-tabs v-model="tab" show-arrows background-color="deep-purple accent-4" icons-and-text dark grow>
                    <v-tabs-slider color="purple darken-4"></v-tabs-slider>
                    <v-row>
                      <v-col cols="5">
                        <v-tab>
                            <v-icon large>mdi-account</v-icon>
                            <div class="caption py-1">Login</div>
                        </v-tab>
                      </v-col>
                      <v-col cols="5">
                        <v-tab>
                            <v-icon large>mdi-account-outline</v-icon>
                            <div class="caption py-1">Register</div>
                        </v-tab>
                      </v-col>
                      <v-col cols="2">
                        <v-button class = "v-slider__thumb" @click="Close">
                          <span large class="material-icons ml-14">
                              cancel
                          </span>
                        </v-button>
                      </v-col>
                    </v-row>
                    <v-tab-item>
                        <v-card class="px-4">
                            <v-card-text>
                                <v-form ref="loginForm" v-model="validLoginForm" lazy-validation>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field :rules="[rules.required]" v-model="loginUsername" label="Username" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field v-model="loginPassword" :append-icon="show1?'eye':'eye-off'" :rules="[rules.required]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Password" counter @click:append="show1 = !show1"></v-text-field>
                                        </v-col>
                                        <v-col class="d-flex" cols="12" sm="6" xsm="12">
                                        </v-col>
                                        <v-spacer></v-spacer>
                                        <v-col cols="8" >      
                                        <v-alert v-if="!this.$store.getters['login/IsCorrect']" border="top"
                                                 color="red lighten-2"
                                                  dark>
                                            <li class="text-caption" v-for="item in this.$store.state.login.errors" :key="item">
                                              {{ item }}
                                            </li>
                                        </v-alert>
                                        </v-col>
                                        <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                                            <v-btn x-large block :disabled="!validLoginForm || this.$store.state.login.status === 'loading'" color="success" @click="validateLogin"> Login </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item>
                        <v-card class="px-4">
                            <v-card-text>
                                <v-form ref="registerForm" v-model="validRegisterForm" lazy-validation>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field v-model="userName" :rules="[rules.required]" label="UserName" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field :rules="[rules.email, rules.required]" v-model="email" label="E-mail" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Password" counter @click:append="show1 = !show1"></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field block v-model="verify" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, passwordMatch]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Confirm Password" counter @click:append="show1 = !show1"></v-text-field>
                                        </v-col>
                                        <v-spacer></v-spacer>
                                        <v-col cols="8" >      
                                        <v-alert v-if="!this.$store.getters['registration/IsCorrect']" border="top"
                                                 color="red lighten-2"
                                                  dark>
                                            <li class="text-caption" v-for="item in this.$store.state.registration.errors" :key="item">
                                              {{ item }}
                                            </li>
                                        </v-alert>
                                        </v-col>
                                        <v-col  cols="2">
                                            <v-btn x-large block :disabled="!validRegisterForm || this.$store.state.registration.status === 'loading'" color="success" @click="validateRegister">Register</v-btn>
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                </v-tabs>
            </div>
        </v-dialog>
    </v-app>
</template>

<script>
export default {
  mounted() {
    console.log(this.$store);
  },
  name: 'Auth',
    computed: {
    passwordMatch() {
      return () => this.password === this.verify || "Password must match";
    }
  },
  methods: {
    validateRegister() {
      if (this.$refs.registerForm.validate()) {
        this.$store.dispatch("registration/register", {Username: this.userName, Email: this.email, Password: this.password})
          .then(() => {
              this.$store.dispatch("login/login", {Username: this.userName, Password: this.password})
              .then(() => {
                  this.$toast.success("Registration successful", {
                  position: "bottom-left",
                  timeout: 3000,
                  closeOnClick: true,
                  closeButton: "button",
                  icon: true,
                  rtl: false
                });
              });
              this.$router.push('/');
          });
      }
    },
    Close(){
      this.$router.push('/');
    },
    validateLogin() {
      if (this.$refs.loginForm.validate()) {
        this.$store.dispatch("login/login", {Username: this.loginUsername, Password: this.loginPassword})
        .then(() => {
            this.$toast.success("Login successful", {
            position: "bottom-left",
            timeout: 3000,
            closeOnClick: true,
            closeButton: "button",
            icon: true,
            rtl: false
          });
          this.$router.push('/');
        });
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  },
  data: function() {
    return {
      dialog: true,
      tab: 0,
      userName: "",
      email: "",
      password: "",
      verify: "",
      loginPassword: "",
      loginUsername: "",
      validLoginForm: true,
      validRegisterForm: true,
      show1: false,
      rules: {
        required: value => !!value || "Required.",
        email: v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      }
    }
  }
}
</script>
<style scoped>
.v-slider__thumb{
  cursor:grabbing;
  height:42px;
  width:42px;
}
</style>
