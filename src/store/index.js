import { createStore } from 'vuex'

const store = createStore({
  state: {
    tasks: [
      { id: 1, title: "Ir ao mercado", done: false },
      { id: 2, title: "Comprar pão", done: false },
    ]
  },
  mutations: {
    addTask(state, title) {
      if(title) {
        state.tasks.push({
          id: new Date().getTime(),
          title,
          done: false
        })
      }
    },
    updateTask(state, updatedTaskId) {
      const index = state.tasks.findIndex(task => task.id === updatedTaskId)
      if(index !== -1) {
        state.tasks[index].done = !state.tasks[index].done
      }
    },
    removeTask(state, removedTaskId) {
      state.tasks = state.tasks.filter(task => task.id !== removedTaskId)
    }
  },
  actions: {},
  modules: {}
})

export default store
