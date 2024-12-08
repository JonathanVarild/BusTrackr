import { createSlice } from "@reduxjs/toolkit";

const interfaceSlice = createSlice({
    name: "interface",
    initialState: {
        navigationOpen: false
    },
    reducers: {
        toggleNavigation: (state) => {
            state.navigationOpen = !state.navigationOpen;
        }
    }
})

export const { toggleNavigation } = interfaceSlice.actions;

export default interfaceSlice.reducer;