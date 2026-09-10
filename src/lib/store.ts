import { create } from 'zustand'

interface UIState {
  menuOpen: boolean
  inquiryOpen: boolean
  preloaded: boolean
  setMenuOpen: (open: boolean) => void
  setInquiryOpen: (open: boolean) => void
  setPreloaded: (v: boolean) => void
}

export const useUI = create<UIState>((set) => ({
  menuOpen: false,
  inquiryOpen: false,
  preloaded: false,
  setMenuOpen: (open) => set({ menuOpen: open }),
  setInquiryOpen: (open) => set({ inquiryOpen: open }),
  setPreloaded: (v) => set({ preloaded: v }),
}))

export interface ProjectFilters {
  city: string
  config: string
  status: string
}

interface FilterState extends ProjectFilters {
  set: (p: Partial<ProjectFilters>) => void
  reset: () => void
}

export const useFilters = create<FilterState>((set) => ({
  city: '',
  config: '',
  status: '',
  set: (p) => set(p),
  reset: () => set({ city: '', config: '', status: '' }),
}))
