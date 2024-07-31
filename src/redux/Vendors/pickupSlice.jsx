import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getApi, postApi, deleteApi, putApi } from '../../services/helpers/apiCall';
import axios from '../../services/helpers/axios/axios';


const initialState = {
    isLoading: false,
    error: null,
    data: []
}


export const fetchPickUp = createAsyncThunk(
    'pickup/fetchPickUp',
    async (_, { rejectWithValue }) => {

        try {
            // Call your API function to fetch all vendors
            const response = await getApi({
                url: '/vendor/pickupinfo',
                data: {},
                config: {}
            });
            const formattedData = response.data.map(item => ({
                ...item,
                vendorCode: item.vendorcode && item.vendorcode.code ? item.vendorcode.code : 'N/A'
            }));

            return formattedData; // Return the data if successful
        } catch (error) {
            // Return the error message if the request fails
            return rejectWithValue(error.message);
        }
    }
);

export const createPickUp = createAsyncThunk(
    'pickup/create',
    async (newPickUp, { rejectWithValue }) => {
        try {
            const response = await postApi({
                url: '/vendor/pickupcreate',
                data: newPickUp,
                config: {}
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deletePickUp = createAsyncThunk('pickup/delete', async (pickUpId, { rejectWithValue }) => {
    try {
        const response = await deleteApi({
            url: `/vendor/pickupdelete/${pickUpId}`,
            data: pickUpId,
            config: {}
        });

        return response.data.id
    } catch (error) {
        return rejectWithValue(err.response.data);
    }
})

export const updatePickUp = createAsyncThunk('pickup/update', async (pickup, { rejectWithValue }) => {
    try {
        const response = await putApi({
            url: `vendor/updatepickup/${pickup.id}`,
            data: pickup,
            config: {}
        })
        const item = response.data.response;
        const formattedData = {
            ...item,
            vendorCode: item.vendorcode && item.vendorcode.code ? item.vendorcode.code : 'N/A'
        };

        return formattedData;
    } catch (error) {
        return rejectWithValue(err.response.data);
    }
})

export const searchPickup = createAsyncThunk(
    'pickup/search',
    async (searchCriteria, { rejectWithValue }) => {
        try {
            const response = await axios.get('/vendor/searchpickup', {
                params: searchCriteria,
            });

            const formattedData = response.data.map(item => ({
                ...item,
                vendorCode: item.vendorcode && item.vendorcode.code ? item.vendorcode.code : 'N/A'
            }));

            return formattedData;

        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


const pickUpSlice = createSlice({
    name: 'pickup',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPickUp.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchPickUp.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchPickUp.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(createPickUp.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createPickUp.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data.push(action.payload);
            })
            .addCase(createPickUp.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(deletePickUp.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deletePickUp.fulfilled, (state, action) => {
                state.data = state.data.filter(vendor => vendor.id !== action.payload);
                state.isLoading = false;

            })
            .addCase(deletePickUp.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updatePickUp.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updatePickUp.fulfilled, (state, action) => {
                const index = state.data.findIndex(vendor => vendor.id === action.payload.id);
                if (index !== -1) {
                    state.data[index] = action.payload;
                }
                state.isLoading = false;
            })
            .addCase(updatePickUp.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(searchPickup.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(searchPickup.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(searchPickup.rejected, (state, action) => {
                state.isLoading = false;
                state.error = null;
            });
    }
});


export default pickUpSlice.reducer;