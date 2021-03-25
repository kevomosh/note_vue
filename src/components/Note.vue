<template>
  <v-container>
    <v-card :class="[note.completed ? 'green lighten-4' : 'red lighten-3']">
      <v-card-title>
        {{note.title}}
      </v-card-title>
      <v-card-subtitle>
        Created: {{new Date(Date.parse(note.created)).toLocaleDateString()}}
      </v-card-subtitle>
      <v-divider class="mx-2"></v-divider>
      <v-card-text>
        <p>{{note.content}}</p>
      </v-card-text>
      <v-card-actions>
          <v-btn
              plain
              class="red darken-3"
              text
              @click="deleteNote(note.id)"
          >Delete
          </v-btn>
        <v-spacer></v-spacer>
          <NoteForm :is-edit="true" :note-id="note.id"/>

      </v-card-actions>
    </v-card>

  </v-container>

</template>

<script lang="ts">
import Vue, {PropType} from 'vue';
import {mapActions} from "vuex";
import {NoteInfo} from "@/store/NoteInfo";
import {NoteActions} from "@/store/mutActions";
import NoteForm from "@/components/NoteForm.vue";

export default  Vue.extend({
name: "Note",
  props: {
    note: {
      type: Object as PropType<NoteInfo>,
      required: true
    }
  },
  components: {
  NoteForm
  },
  methods: {
    ...mapActions({
      deleteNote: NoteActions.DELETE_NOTE,
    })
  },

})
</script>

<style scoped>

</style>
