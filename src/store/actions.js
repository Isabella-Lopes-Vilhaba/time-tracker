import db from "@/services/localbase"

export default {
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
}