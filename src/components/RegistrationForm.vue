<template>
  <v-container class="full-height">
    <v-form @submit.prevent="register" class="form">
        <v-card
          class="mx-auto pa-12 pb-8"
          elevation="8"
          max-width="448"
          rounded="lg"
        >
        <div class="text-center"><router-link to="/"><v-icon>mdi-widgets</v-icon></router-link></div>
        <div class="text-subtitle-1 text-medium-emphasis">Name</div>

        <v-text-field
          density="compact"
          placeholder="Fullname"
          prepend-inner-icon="mdi-account-circle"
          variant="outlined"
          v-model="form.name"
          :rules="[rules.required, rules.length]"
        ></v-text-field>


          <div class="text-subtitle-1 text-medium-emphasis">Email</div>

          <v-text-field
            density="compact"
            placeholder="Email address"
            prepend-inner-icon="mdi-email-outline"
            variant="outlined"
            v-model="form.email"
            :rules="[rules.required, rules.email]"
          ></v-text-field>

          <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
            Password
          </div>

          <v-text-field
            :append-inner-icon="password_visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="password_visible ? 'text' : 'password'"
            density="compact"
            placeholder="Enter your password"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            @click:append-inner="password_visible = !password_visible"
            v-model="form.password"
            :rules="[rules.required, rules.password]"
          ></v-text-field>

          <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
            Confirm Password
          </div>

          <v-text-field
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            density="compact"
            placeholder="Enter your password"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            @click:append-inner="visible = !visible"
            v-model="form.password_confirmation"
            :rules="[rules.required, rules.password_confirmation]"
          ></v-text-field>

          <v-card
            class="mb-5"
            color="surface-variant"
            variant="tonal"
          >
          
          </v-card>

          <v-btn
            block
            class="mb-5"
            color="blue"
            size="large"
            variant="tonal"
            type="submit"
          >
            <span v-if="logging"> Signing Up ...</span>
            <span v-else>Sign Up</span>
          </v-btn>

          <v-card-text class="text-center">
            <router-link to="/"
             class="text-blue text-decoration-none">Login <v-icon icon="mdi-chevron-right"></v-icon>
          </router-link>

          </v-card-text>
        </v-card>
    </v-form>
  </v-container>

</template>
<style scope>
  .form{
    margin-top: 50px;
  }
</style>

<script setup>
  //
</script>
<script>
import apiMethods from '../apis/apiMethods';

export default {
  name: "LoginForm",

  data() {
    return {
      rules: {
        length: value => value && value.length >= 3 || 'Min 3 characters',
        required: value => !!value || 'Required.',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
        password: value => value.length >= 8 || 'Min 8 characters',
        password_confirmation: value => value === this.form.password || 'Passwords do not match',
      },

      form: {
      	name: '',
        email: '',
        password: '',
        password_confirmation: '',
      },
      errors: [],
      logging: false,
      password_visible: false,
      visible: false,
    };
  },

  methods: {

    register(){
      apiMethods.userRegistration(this.form)
      .then(() => {
        this.$router.push({name: "Home"});
      }).catch(error =>{
        if(error.response.status === 422){
          this.errors = error.response.data.errors
        }
      });
    }
  }

};
</script>