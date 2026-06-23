import { create } from 'zustand'

export type PageSection = 
  | 'home'
  | 'about'
  | 'services'
  | 'equipment'
  | 'projects'
  | 'hse'
  | 'news'
  | 'careers'
  | 'quote'
  | 'contact'

interface NavigationState {
  currentPage: PageSection
  previousPage: PageSection | null
  selectedService: string | null
  selectedEquipment: string | null
  selectedProject: string | null
  selectedJob: string | null
  mobileMenuOpen: boolean
  setPage: (page: PageSection) => void
  setService: (slug: string | null) => void
  setEquipment: (slug: string | null) => void
  setProject: (slug: string | null) => void
  setJob: (id: string | null) => void
  toggleMobileMenu: () => void
  closeMobileMenu: () => void
}

export const useNavigation = create<NavigationState>((set) => ({
  currentPage: 'home',
  previousPage: null,
  selectedService: null,
  selectedEquipment: null,
  selectedProject: null,
  selectedJob: null,
  mobileMenuOpen: false,
  setPage: (page) =>
    set((state) => ({
      currentPage: page,
      previousPage: state.currentPage,
      selectedService: null,
      selectedEquipment: null,
      selectedProject: null,
      selectedJob: null,
      mobileMenuOpen: false,
    })),
  setService: (slug) => set({ selectedService: slug }),
  setEquipment: (slug) => set({ selectedEquipment: slug }),
  setProject: (slug) => set({ selectedProject: slug }),
  setJob: (id) => set({ selectedJob: id }),
  toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
  closeMobileMenu: () => set({ mobileMenuOpen: false }),
}))