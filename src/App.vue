<template>
  <v-app class="grey lighten-4">
    <Navbar/>
    <v-main class="mx-4 mb-4 grey lighten-4">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Navbar from '@/components/Navbar.vue';
import {NoteActions} from "@/store/mutActions";

export default Vue.extend({
  name: 'App',
  created() {
     this.$store.dispatch(NoteActions.GET_NOTES)
  },
  components: {
    Navbar
  },


  data: () => ({
    //
  }),
});
</script>
