import db from "@/services/localbase"

export default {
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
}