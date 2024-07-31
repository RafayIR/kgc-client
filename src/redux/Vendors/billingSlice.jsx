import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getApi, postApi, deleteApi, putApi } from '../../services/helpers/apiCall';
import axios from '../../services/helpers/axios/axios';


const initialState = {
    isLoading: false,
    error: null,
    data: []
}


export const fetchBillingInfo = createAsyncThunk(
    'billing/fetchBilling',
    async (_, { rejectWithValue }) => {

        try {
            // Call your API function to fetch all vendors
            const response = await getApi({
                url: '/vendor/billinginfo',
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

export const createBillingInfo = createAsyncThunk(
    'billing/create',
    async (newBilling, { rejectWithValue }) => {
        try {
            const response = await postApi({
                url: '/vendor/billingcreate',
                data: newBilling,
                config: {}
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteBilling = createAsyncThunk(
    'billing/delete',
    async (billingId, { rejectWithValue }) => {

        try {
            const response = await deleteApi({
                url: `/vendor/billingdelete/${billingId}`,
                data: billingId,
                config: {}
            })
            return response.data.id;

        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);


export const updateBilling = createAsyncThunk('billing/update', async (billing, { rejectWithValue }) => {
    try {
        const response = await putApi({
            url: `vendor/billingupdate/${billing.id}`,
            data: billing,
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


export const searchBilling = createAsyncThunk('billing/search', async (searchCriteria, { rejectWithValue }) => {

    try {
        const response = await axios.get('/vendor/searchbilling', {
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


const billingSlice = createSlice({
    name: 'billing',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBillingInfo.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchBillingInfo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchBillingInfo.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(createBillingInfo.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createBillingInfo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data.push(action.payload);
            })
            .addCase(createBillingInfo.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(deleteBilling.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteBilling.fulfilled, (state, action) => {
                state.data = state.data.filter(vendor => vendor.id !== action.payload);
                state.isLoading = false;

            })
            .addCase(deleteBilling.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateBilling.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateBilling.fulfilled, (state, action) => {
                const index = state.data.findIndex(vendor => vendor.id === action.payload.id);
                if (index !== -1) {
                    state.data[index] = action.payload;
                }
                state.isLoading = false;
            })
            .addCase(updateBilling.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(searchBilling.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(searchBilling.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(searchBilling.rejected, (state, action) => {
                state.isLoading = false;
                state.error = null;
            });
    }
});


export default billingSlice.reducer;