import { createStore } from 'vuex'
import Localbase from 'localbase'

let db = new Localbase('db')

const store = createStore({
  state: {
    tasks: []
  },
  mutations: {
    getTasks(state) {
      db.collection('tasks').get().then(tasksDB => {
        state.tasks = tasksDB
      })
    },
    updateStatusTask(state, updatedTaskId) {
      const index = state.tasks.findIndex(task => task.id === updatedTaskId)
      if(index !== -1) {
        state.tasks[index].done = !state.tasks[index].done
      }
    },
  },
  actions: {
    addTask({commit}, title) {
      db.collection('tasks').add({
        id: new Date().getTime(),
        title,
        done: false
      }).then(() => {
        commit('getTasks')
      })
    },
    updateTask({commit}, updatedTask) {
      db.collection('tasks').doc({ id: updatedTask.id }).update({
        title: updatedTask.title
      }).then(() => {
        commit('getTasks')
      })
    },
    updateStatusTask({commit}, updatedTask) {
      db.collection('tasks').doc({ id: updatedTask.id }).update({
        done: !updatedTask.done
      }).then(() => {
        commit('updateStatusTask', updatedTask.id)
      })
    },
    removeTask({commit}, removedTaskId) {
      db.collection('tasks').doc({ id: removedTaskId }).delete()
      .then(() => {
        commit('getTasks')
      })
    }
  },
  modules: {}
})

export default store
