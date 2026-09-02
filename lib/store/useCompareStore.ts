import { create } from 'zustand';

interface CompareState {
  selectedSlugs: string[];
  category: string | null;
  toggleProduct: (slug: string, category: string) => void;
  clearComparison: () => void;
}

export const useCompareStore = create<CompareState>((set) => ({
  selectedSlugs: [],
  category: null,

  toggleProduct: (slug, category) => set((state) => {
    // If the category is different, reset the list and add the new item
    if (state.category && state.category !== category) {
      return {
        category,
        selectedSlugs: [slug]
      };
    }

    // Toggle logic
    const isSelected = state.selectedSlugs.includes(slug);
    let newSlugs;
    if (isSelected) {
      newSlugs = state.selectedSlugs.filter((s) => s !== slug);
    } else {
      // Limit to 3 items
      if (state.selectedSlugs.length >= 3) {
        // You could optionally show a toast here, but for now we just prevent adding more
        return state;
      }
      newSlugs = [...state.selectedSlugs, slug];
    }

    return {
      category: newSlugs.length > 0 ? category : null,
      selectedSlugs: newSlugs
    };
  }),

  clearComparison: () => set({ selectedSlugs: [], category: null }),
}));
