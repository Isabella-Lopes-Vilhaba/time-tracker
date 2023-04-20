import db from "@/services/localbase"

export default {
  // users
  getUsers(state) {
    db.collection('users').get().then(usersDB => {
      state.users = usersDB
    })
  },

  // collaborators
  getCollaborators(state) {
    db.collection('collaborators').get().then(collaboratorsDB => {
      state.collaborators = collaboratorsDB
    })
  },

  // tasks
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

  // projects
  getProjects(state) {
    db.collection('projects').get().then(projectsDB => {
      state.projects = projectsDB
    })
  },
}