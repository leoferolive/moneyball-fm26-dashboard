import { create } from 'zustand'
import type { PositionKey } from '@/types/position.ts'

interface AppState {
  currentPosition: PositionKey
  setCurrentPosition: (position: PositionKey) => void

  activeView: 'dashboard' | 'comparison' | 'charts'
  setActiveView: (view: 'dashboard' | 'comparison' | 'charts') => void

  sortColumn: string | null
  sortDirection: 'asc' | 'desc'
  setSort: (column: string) => void

  importPanelOpen: boolean
  setImportPanelOpen: (open: boolean) => void

  theme: 'dark' | 'light'
  toggleTheme: () => void

  activeScoringProfileId: string | null
  setActiveScoringProfileId: (id: string | null) => void
}

export const useAppStore = create<AppState>((set, get) => ({
  currentPosition: 'goleiros',
  setCurrentPosition: (position) => set({ currentPosition: position, sortColumn: null }),

  activeView: 'dashboard',
  setActiveView: (view) => set({ activeView: view }),

  sortColumn: null,
  sortDirection: 'desc',
  setSort: (column) => {
    const { sortColumn, sortDirection } = get()
    if (sortColumn === column) {
      set({ sortDirection: sortDirection === 'asc' ? 'desc' : 'asc' })
    } else {
      set({ sortColumn: column, sortDirection: 'desc' })
    }
  },

  importPanelOpen: true,
  setImportPanelOpen: (open) => set({ importPanelOpen: open }),

  theme: 'dark',
  toggleTheme: () => {
    const newTheme = get().theme === 'dark' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', newTheme)
    set({ theme: newTheme })
  },

  activeScoringProfileId: null,
  setActiveScoringProfileId: (id) => set({ activeScoringProfileId: id }),
}))
