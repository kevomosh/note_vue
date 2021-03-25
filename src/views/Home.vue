<template>
  <div>
    <h1 class="title mt-2 text-center">ALL NOTES</h1>
    <div class="mb-2 text-center">
      <NoteForm  :is-edit="false"/>
    </div>
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 v-for="note in notes" :key="note.id">
        <Note :note="note"/>
      </v-flex>
    </v-layout>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from "vuex";
import Note from "@/components/Note.vue";
import NoteForm from "@/components/NoteForm.vue";

export default Vue.extend({
  name: 'Home',
  components: {
    Note,
    NoteForm
  },
  computed: {
    ...mapGetters({notes: 'getAllNotes'})
  },
  created() {
  }
});
</script>
