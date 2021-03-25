<template>
  <v-dialog v-model="dialog" max-width="550px">
    <template v-slot:activator="{on, attrs}">
      <v-btn v-bind="attrs" v-on="on" plain slot="activator"
             @click="getCurrentNote()"
             :class="[isEdit ? 'warning' : 'purple accent-1']">
        {{ isEdit ? "Edit " : 'Add Note'}}</v-btn>
    </template>

    <v-card>
      <v-card-title>
        <h3 class="ml-9">{{ isEdit ? "Edit " : 'Add '}}Note</h3>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field
              :rules="inputRules"
              label="Title"
              v-model="title"
              prepend-icon="mdi-format-title"></v-text-field>
          <v-textarea
              :rules="inputRules"
              label="Content"
              v-model="content"
              prepend-icon="mdi-pencil"></v-textarea>
          <v-checkbox class="ml-4" v-model="completed" label="Completed"></v-checkbox>

          <v-btn plain class="success ml-9 mt-3" @click="submit">{{ isEdit ? "Edit " : 'Add '}}</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import {NoteInfo} from "@/store/NoteInfo";
import {NoteActions} from "@/store/mutActions";
import {mapGetters} from "vuex";


export default Vue.extend({
  name: "NoteForm",
  props: {
    isEdit: {
      type: Boolean,
      required: true
    },
    noteId: {
      type: Number
    }
  },

  data() {
    return {
      dialog: false,
      title: '',
      content: "",
      completed: false,
      inputRules: [
        (v: string) => !!v || 'Required',
        (v: string) => v.length >= 4 || "Must be more than 4 characters"
      ],
    }
  },
  computed: {
    ...mapGetters({note: 'getCurrentNote'})
  },

  methods: {
    submit() {
      const info: NoteInfo = {
        title: this.title,
        completed: this.completed,
        content: this.content
      }
      const formElem = (this.$refs.form as HTMLFormElement)
      if (formElem.validate()) {
        if (!this.isEdit) {
          this.$store.dispatch(NoteActions.ADD_NOTE, info);
        } else {
          this.$store.dispatch(NoteActions.MODIFY_NOTE, info)
        }
        this.title = ''
        this.completed = false;
        this.content = ''
        this.dialog = false;

      }

    },
    getCurrentNote() {
      if (this.isEdit){
        this.$store.dispatch(NoteActions.GET_SINGLE_NOTE, this.noteId);
        this.title = this.note.title;
        this.content = this.note.content;
        this.completed = this.note.completed;
      }
    }
  }
})
</script>

<style scoped>

</style>
