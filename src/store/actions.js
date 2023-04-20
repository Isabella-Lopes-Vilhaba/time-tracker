import db from "@/services/localbase"

export default {
  // start
  popularDatabase({commit}) {
    db.collection('users').get().then(usersDB => {
      if(!usersDB.length) {
        db.collection('users').add({
          id: 1,
          userName: "Isabella",
          password: "$enha_Forte",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null
        }).then(() => {
          commit('getUsers')
        })
      } else {
        commit('getUsers')
      }
    })
    db.collection('collaborators').get().then(collaboratorsDB => {
      if(!collaboratorsDB.length) {
        db.collection('collaborators').add({
          id: 2,
          name: "Anna",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null
        })
        db.collection('collaborators').add({
          id: 3,
          name: "João",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null
        })
        db.collection('collaborators').add({
          id: 4,
          name: "Mariana",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null
        })
        db.collection('collaborators').add({
          id: 5,
          name: "Carlos",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null
        }).then(() => {
          commit('getCollaborators')
        })
      } else {
        commit('getCollaborators')
      }
    })
  },
  // users

  // collaborators

  // timeTrackers
  addTimeTracker(state, {commit}, taskId, timeTracker) {
    const index = state.tasks.findIndex(task => task.id === taskId)
    if(index !== -1) {
      db.collection('tasks').doc({ id: taskId }).update({
        timeTrackers: [...state.tasks[index].timeTrackers, timeTracker]
      }).then(() => {
        commit('getTasks')
      })
    }
  },
  updateTimeTracker(state, {commit}, taskId, timeTrackerId, newTimeTracker) {
    const indexTask = state.tasks.findIndex(task => task.id === taskId)
    const indexTimeTracker = state.tasks[indexTask].timeTrackers.findIndex(timeTracker => timeTracker.id === timeTrackerId)
    const newTimeTrackers = state.tasks[indexTask].timeTrackers
    newTimeTrackers[indexTimeTracker] = newTimeTracker
    if(indexTask !== -1 && indexTimeTracker !== -1) {
      db.collection('tasks').doc({ id: taskId }).update({
        timeTrackers: newTimeTrackers
      }).then(() => {
        commit('getTasks')
      })
    }
  },
  deleteTimeTracker(state, {commit}, taskId, timeTrackerId) {
    const indexTask = state.tasks.findIndex(task => task.id === taskId)
    const indexTimeTracker = state.tasks[indexTask].timeTrackers.findIndex(timeTracker => timeTracker.id === timeTrackerId)
    const newTimeTracker = state.tasks[indexTask].timeTrackers.splice(indexTimeTracker, 1)
    if(indexTask !== -1 && indexTimeTracker !== -1) {
      db.collection('tasks').doc({ id: taskId }).update({
        timeTrackers: newTimeTracker
      }).then(() => {
        commit('getTasks')
      })
    }
  },
  // {
  //   id: new Date().getTime(),
  //   startDate: timeTrackers.startDate,
  //   endDate: timeTrackers.endDate,
  //   timeZoneId: Intl.DateTimeFormat().resolvedOptions().timeZone,
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  // }

  // tasks
  addTask({commit}, task) {
    db.collection('tasks').add({
      id: new Date().getTime(),
      title: task.title,
      done: false,
      description: task.description,
      projectId: task.projectId,
      collaboratorId: task.collaboratorId,
      createdAt: new Date(),
      updatedAt: new Date(),
      timeTrackers: []
    }).then(() => {
      commit('getTasks')
    })
  },
  updateTask({commit}, updatedTask) {
    db.collection('tasks').doc({ id: updatedTask.id }).update({
      title: updatedTask.title,
      description: updatedTask.description,
      projectId: updatedTask.projectId,
      collaboratorId: updatedTask.collaboratorId,
      updatedAt: new Date(),
      timeTrackers: [...updatedTask.timeTrackers]
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
  },

  // projects
  addProject({commit}, project) {
    db.collection('projects').add({
      id: new Date().getTime(),
      name: project.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).then(() => {
      commit('getProjects')
    })
  },
  updateProject({commit}, updatedProject) {
    db.collection('projects').doc({ id: updatedProject.id }).update({
      name: updatedProject.name,
      updatedAt: new Date(),
    }).then(() => {
      commit('getProjects')
    })
  },
  removeProject({commit}, removedProjectId) {
    db.collection('projects').doc({ id: removedProjectId }).delete()
    .then(() => {
      commit('getProjects')
    })
  }
}