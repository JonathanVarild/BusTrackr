import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

function createLocation(latitude = 59.405002, longitude = 17.9508139) {
    return { latitude, longitude };
}

export const fetchQuays = createAsyncThunk("mapData/fetchQuays", async (_, { getState }) => {
    const screenBoundary = getState().mapData.screenBoundary;
    
    return await fetch("https://bustrackr.io/api/quays", {
        method: "POST",
        body: JSON.stringify({
            lat_0: screenBoundary.topLeft.latitude,
            lon_0: screenBoundary.topLeft.longitude,
            lat_1: screenBoundary.bottomRight.latitude,
            lon_1: screenBoundary.bottomRight.longitude
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(resp => resp.json())
});

const mapDataSlice = createSlice({
    name: "mapData",
    initialState: {
        screenBoundary: {
            topLeft: null,
            bottomRight: null,
            zoom: null
        },
        quays: {
            status: "idle",
            error: null,
            requestId: null,
            list: {}
        }
    },
    reducers: {
        updateScreenTopLeft: (state, action) => {
            state.screenBoundary.topLeft = {...state.screenBoundary.topLeft, ...action.payload };
        },
        updateScreenBottomRight: (state, action) => {
            state.screenBoundary.bottomRight = {...state.screenBoundary.bottomRight, ...action.payload };;
        },
        setQuayHovered: (state, action) => {
            state.quays.list[action.payload.id].hovered = action.payload.hovered
        },
        setZoomLevel: (state, action) => {
            state.screenBoundary.zoom = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuays.pending, (state, action) => {
                state.quays.status = "loading";
                state.quays.requestId = action.meta.requestId;
            })
            .addCase(fetchQuays.fulfilled, (state, action) => {
                if (state.quays.requestId === action.meta.requestId) {
                    state.quays.status = "idle"
                    state.quays.requestId = null

                    const newQuays = action.payload.list.map(quay => ({
                        ...quay,
                        location: createLocation(parseFloat(quay.location.lat), parseFloat(quay.location.lon))
                    }));
                    
                    state.quays.list = 
                        Object.fromEntries(newQuays.map(quay => [quay.id, quay]))
                    ;
                }
            })
            .addCase(fetchQuays.rejected, (state, action) => {
                state.quays.status = "failed"
                state.quays.error = action.error.message
            })
    }
})

export const {    
    updateScreenTopLeft,
    updateScreenBottomRight,
    addQuays,
    setQuayHovered,
    setZoomLevel
} = mapDataSlice.actions;

export default mapDataSlice.reducer;