import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Property } from '@/lib/types/property';

interface PropertyState {
  selectedProperty: Property | null;
  properties: Property[];
}

const initialState: PropertyState = {
  selectedProperty: null,
  properties: [],
};

const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {
    setSelectedProperty: (state, action: PayloadAction<Property>) => {
      state.selectedProperty = action.payload;
    },
    clearSelectedProperty: (state) => {
      state.selectedProperty = null;
    },
    setProperties: (state, action: PayloadAction<Property[]>) => {
      state.properties = action.payload;
    },
    addProperty: (state, action: PayloadAction<Property>) => {
      state.properties.push(action.payload);
    },
    updateProperty: (state, action: PayloadAction<Property>) => {
      const index = state.properties.findIndex(
        (property) => property.id === action.payload.id
      );
      if (index !== -1) {
        state.properties[index] = action.payload;
      }
      if (
        state.selectedProperty &&
        state.selectedProperty.id === action.payload.id
      ) {
        state.selectedProperty = action.payload;
      }
    },
    removeProperty: (state, action: PayloadAction<string>) => {
      state.properties = state.properties.filter(
        (property) => property.id !== action.payload
      );
      if (
        state.selectedProperty &&
        state.selectedProperty.id === action.payload
      ) {
        state.selectedProperty = null;
      }
    },
  },
});

export const {
  setSelectedProperty,
  clearSelectedProperty,
  setProperties,
  addProperty,
  updateProperty,
  removeProperty,
} = propertySlice.actions;

export default propertySlice.reducer;

export const selectSelectedProperty = (state: { property: PropertyState }) =>
  state.property.selectedProperty;

export const selectProperties = (state: { property: PropertyState }) =>
  state.property.properties;
