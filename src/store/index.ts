import Vue from 'vue';
import Vuex from 'vuex';
import { NoteInfo } from './NoteInfo';
import { NoteMutations, NoteActions } from '@/store/mutActions';

Vue.use(Vuex);

const baseUrl = 'https://note-back.kakuom.com/api/notes';
interface NoteStateInfo  {
  notes: NoteInfo[],
  currentNote: NoteInfo
}

const noteState: NoteStateInfo = {
  notes: [],
  currentNote: {
    id: 0,
    title: '',
    content: '',
    completed: false
  }
}

export default new Vuex.Store({
  state: noteState,
  getters: {
    getAllNotes(state): NoteInfo[] {
      return state.notes;
    },
    getCurrentNote(state): NoteInfo {
      return state.currentNote;
    }
  },
  mutations: {
    [NoteMutations.UPDATE_NOTES](state, payload: NoteInfo[]): void {
      state.notes = payload;
    },
    [NoteMutations.UPDATE_SINGLE_NOTE](state, payload: NoteInfo): void {
      state.currentNote = payload;
    }

  },
  actions: {
     [NoteActions.GET_SINGLE_NOTE]({commit, state}, id: number){
      const data = state.notes.find(n => n.id === id)
      if (data){
        commit(NoteMutations.UPDATE_SINGLE_NOTE, data);
      }
    },

    async [NoteActions.DELETE_NOTE]({commit, state}, id: number):Promise<void> {
      const res = await fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
      });
      if (res.status === 200) {
        const val = state.notes.filter((t) => t.id !== id);
        commit(NoteMutations.UPDATE_NOTES, val);
      }
    },

    async [NoteActions.MODIFY_NOTE](
        {commit, state, dispatch}, info: NoteInfo): Promise<void> {
      const noteToUpdate: NoteInfo = {
        ...state.currentNote,
        completed: info.completed,
        title: info.title,
        content: info.content
      }

      const res = await fetch(`${baseUrl}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(noteToUpdate),
      });

      const data = await res.json();
      const h = state.notes.map(note =>
          note.id === data.id ? {...note, title: data.title, completed: data.completed, content: data.content} : note);

      commit(NoteMutations.UPDATE_NOTES, h);
      commit(NoteMutations.UPDATE_SINGLE_NOTE, {
        id: 0,
        title: '',
        content: '',
        completed: false
      })
    },

    async [NoteActions.ADD_NOTE]({commit, state}, note: NoteInfo): Promise<void> {
      const res = await fetch(`${baseUrl}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(note),
      });
      const d = await res.json();
      const data = [...state.notes, d];
      commit(NoteMutations.UPDATE_NOTES, data);
    },

    async [NoteActions.GET_NOTES]({commit}) : Promise<void>{
      const res = await fetch(`${baseUrl}`)
      const data = await res.json()
      commit(NoteMutations.UPDATE_NOTES, data);
    }
  },
  modules: {
  },
});

