export const state = () => ({
  status: ''
})

export const mutations = {
  setStatus (state, status) {
    state.status = status
  }
}

export const getters = {
  // ここにgettersを書く
  status (state) {
    return state.status
  },
}

export const actions = {
  updateStatus(context, params) {
    context.commit('setStatus', params.type)
  },
}
