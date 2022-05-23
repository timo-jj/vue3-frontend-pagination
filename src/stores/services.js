import { defineStore } from 'pinia'
import axios from 'axios'
import FlexSearch from 'flexsearch'

export const useServicesStore = defineStore({
  id: 'services',

  state: () => ({
    stored: localStorage.getItem('stored')
      ? JSON.parse(localStorage.getItem('stored'))
      : [],
    services: [],
    isLoading: true,
    paginatedServices: [],
    activeServices: [],
    activePage: 0,
    searchString: localStorage.getItem('search-string')
      ? JSON.parse(localStorage.getItem('search-string'))
      : null,
  }),

  getters: {
    firstActiveIdx: (state) => state.activeServices[0],
    lastActiveIdx: (state) => state.activeServices[state.activeServices.length - 1],
  },

  actions: {
    setActivePage(activePage) {
      // Set active pages
      this.activeServices = this.paginatedServices[activePage]
    },

    setPaginationList(list) {
      // init first pagination index
      this.activePage = 0
      // add index to each object model
      this.services = list.map((item, i) => ({
        idx: i,
        ...item,
      }))
      const pages = []
      // Split services into chunks of 12 - each chunk will be a page
      for (let i = 0; i < this.services.length; i += 12) {
        const page = this.services.slice(i, i + 12)
        pages.push(page)
      }
      this.paginatedServices = pages
      this.isLoading = false
    },

    async getServices() {
      const response = await axios.get('/api/service_packages')
      this.setPaginationList(response.data)
      this.setActivePage(this.activePage)
      this.stored = response.data
      localStorage.setItem('stored', JSON.stringify(this.stored))
      this.isLoading = false
    },

    goNextPage() {
      if (this.activePage < this.paginatedServices.length - 1) {
        this.activePage += 1
        this.setActivePage(this.activePage)
      }
    },

    goPreviousPage() {
      if (this.activePage > 0) {
        this.activePage -= 1
        this.setActivePage(this.activePage)
      }
    },

    flexSearch(str) {
      const index = new FlexSearch({
        encode: 'icase',
        tokenize: 'full',
        depth: 10,
        cache: true,
        doc: {
          id: 'id',
          field: ['name', 'description'],
        },
      })
      index.add(this.stored)
      return index.search({
        query: str,
      })
    },

    search(str) {
      this.searchString = str
      localStorage.setItem('search-string', JSON.stringify(this.searchString))
      if (!str) {
        this.getServices()
      } else {
        this.setPaginationList(this.flexSearch(str))
        this.setActivePage(this.activePage)
      }
    },
  },
})
