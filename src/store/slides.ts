import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { Slide, ResponseJson, fromJson } from '~/domain/Slide'

export const state = () => ({
  slides: [] as Slide[],
})

export type WorkState = ReturnType<typeof state>

export const getters: GetterTree<WorkState, WorkState> = {
  all: (state) => state.slides,
  byId: (state) => (id: number) => state.slides.find((n) => n.id === id),
  hasItems: (state) => state.slides.length > 0,
}

export const mutations: MutationTree<WorkState> = {
  add(state, item: Slide) {
    state.slides.push(item)
  },
  remove(state, itemId: number) {
    const index = state.slides.findIndex((w) => w.id === itemId)
    state.slides.splice(index, 1)
  },
  update(state, item: Slide) {
    const index = state.slides.findIndex((w) => w.id === item.id)
    state.slides.splice(index, 0, item)
  },
}

export const actions: ActionTree<WorkState, WorkState> = {
  async fetch({ commit, state }) {
    if (state.slides.length > 0) {
      return
    }

    const { data } = await this.$axios.get<{ slides: ResponseJson[] }>(
      '/data/slide/all.json'
    )
    const { slides } = data
    slides
      .map(fromJson)
      // .sort((a, b) => b.id - a.id)
      .forEach((item: Slide) => commit('add', item))
  },
}
