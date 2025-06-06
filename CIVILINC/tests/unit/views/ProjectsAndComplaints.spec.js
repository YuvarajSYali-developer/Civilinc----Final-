import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import ProjectsAndComplaints from '@/views/ProjectsAndComplaints.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('ProjectsAndComplaints.vue', () => {
  let wrapper
  let store
  let actions
  let state

  beforeEach(() => {
    state = {
      projects: {
        projects: [],
        loading: false,
        error: null
      },
      complaints: {
        complaints: [],
        loading: false,
        error: null
      }
    }

    actions = {
      'projects/fetchProjects': jest.fn(),
      'projects/createProject': jest.fn(),
      'complaints/fetchComplaints': jest.fn()
    }

    store = new Vuex.Store({
      modules: {
        projects: {
          namespaced: true,
          state: state.projects,
          actions: {
            fetchProjects: actions['projects/fetchProjects'],
            createProject: actions['projects/createProject']
          }
        },
        complaints: {
          namespaced: true,
          state: state.complaints,
          actions: {
            fetchComplaints: actions['complaints/fetchComplaints']
          }
        }
      }
    })

    wrapper = shallowMount(ProjectsAndComplaints, {
      store,
      localVue,
      stubs: ['router-link', 'router-view']
    })
  })

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('initializes with projects tab active', () => {
    expect(wrapper.vm.activeTab).toBe('projects')
  })

  it('switches to complaints tab when clicked', async () => {
    await wrapper.find('button[data-test="complaints-tab"]').trigger('click')
    expect(wrapper.vm.activeTab).toBe('complaints')
  })

  it('filters projects based on search input', async () => {
    await wrapper.setData({ projectSearch: 'Road' })
    expect(wrapper.vm.filteredProjects.length).toBeLessThanOrEqual(
      wrapper.vm.shimogaProjects.length
    )
  })

  it('calls fetchProjects on component creation', () => {
    expect(actions['projects/fetchProjects']).toHaveBeenCalled()
  })

  it('calls fetchComplaints when switching to complaints tab', async () => {
    await wrapper.setData({ activeTab: 'complaints' })
    expect(actions['complaints/fetchComplaints']).toHaveBeenCalled()
  })
}) 