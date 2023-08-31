<template>
  <v-container class="full-height">
    <v-form @submit.prevent="login" class="form">
        <v-card
          class="mx-auto pa-12 pb-8"
          elevation="8"
          max-width="448"
          rounded="lg"
        >
          <div class="text-center"><router-link to="/"><v-icon>mdi-widgets</v-icon></router-link></div>
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

            <a
              class="text-caption text-decoration-none text-blue"
              href="#"
              rel="noopener noreferrer"
            >
              Forgot login password?</a>
          </div>

          <v-text-field
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            density="compact"
            placeholder="Enter your password"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            @click:append-inner="visible = !visible"
            v-model="form.password"
            :rules="[rules.required]"
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
            <span v-if="logging"> Log In ...</span>
            <span v-else>Log In</span>
          </v-btn>

          <v-card-text class="text-center">
            <router-link to="/registration"
             class="text-blue text-decoration-none">Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
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
        required: value => !!value || 'Required.',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
      },

      form: {
        email: "john@example.com",
        password: "12345678",
      },
      errors: [],
      logging: false,
      visible: false,
    };
  },

  methods: {
    login() {
      this.logging = true;
      apiMethods.userLogin(this.form)
        .then(() => {
          localStorage.setItem("auth", "true");
          this.$router.push({ name: "Dashboard" });
        }).catch(error => {
          if (error.response.status === 422) {
            this.errors = error.response.data.errors
          }
        });
        this.logging = false;
    }

  }

};
</script>