import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getApi, postApi, deleteApi, putApi, searchApi } from '../../services/helpers/apiCall';
import axios from '../../services/helpers/axios/axios';


const initialState = {
    isLoading: false,
    error: null,
    data: []
}


export const fetchAllVendors = createAsyncThunk(
    'vendors/fetchAll',
    async (_, { rejectWithValue }) => {

        try {
            // Call your API function to fetch all vendors
            const response = await getApi({
                url: '/vendor/info',
                data: {},
                config: {}
            });

            const formattedData = response.data?.response.map(item => ({
                ...item,
                vendorCode: item.vendorcodes.map(v => v.code).join(', '),
            }));

            return formattedData; // Return the data if successful
        } catch (error) {
            // Return the error message if the request fails
            return rejectWithValue(error.message);
        }
    }
);

export const createVendor = createAsyncThunk(
    'vendors/create',
    async (newVendor, { rejectWithValue }) => {
        try {
            const response = await postApi({
                url: '/vendor/vendorcreate',
                data: newVendor,
                config: {}
            });

            console.log(response.data?.response)
            return response.data?.response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteVendor = createAsyncThunk(
    'vendors/deleteVendor',
    async (vendorId, { rejectWithValue }) => {
        try {
            const response = await deleteApi({
                url: `/vendor/vendordelete/${vendorId}`,
                data: vendorId,
                config: {}
            })
            return response.data.vendorId;

        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const updateVendor = createAsyncThunk(
    'vendors/update',
    async (vendor, { rejectWithValue }) => {
        const data = {
            vendor: {
                name: vendor.name,
                email: vendor.email,
                phone: vendor.phone,
                address_1: vendor.address_1,
                address_2: vendor.address_2,
                city: vendor.city,
                state: vendor.state,
                country: vendor.country,
                region: vendor.region,
                postal_code: vendor.postal_code
            },
            vendorCode: {
                code: vendor.vendorCode // Ensure vendorCode is a single object
            }
        }
        try {
            const response = await putApi({
                url: `/vendor/updatevendor/${vendor.id}`,
                data: data,
                config: {}
            })
            // Check if response data is an object
            if (typeof response.data === 'object' && response.data !== null) {
                let formattedData = {
                    ...response.data.response,
                    vendorCode: response.data.response.vendorcodes.map(v => v.code).join(', '),
                };
                return formattedData;
            } else {
                console.error('Response data is not an object:', response.data);
                return null; // Or handle the error accordingly
            }


        } catch (err) {
            return rejectWithValue(err.response.data);
        }


    }
);

export const searchVendors = createAsyncThunk(
    'vendors/search',
    async (searchCriteria, { rejectWithValue }) => {
        try {
            const response = await axios.get('/vendor/searchVendor', {
                params: searchCriteria,
            });

            const formattedData = response.data?.map(item => ({
                ...item,
                vendorCode: item.vendorcodes.map(v => v.code).join(', '),
            }));

            return formattedData;


        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


const vendorsSlice = createSlice({
    name: 'vendors',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllVendors.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAllVendors.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchAllVendors.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(createVendor.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createVendor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data.push(action.payload); // Add the new vendor to the state
            })
            .addCase(createVendor.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(deleteVendor.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteVendor.fulfilled, (state, action) => {
                state.data = state.data.filter(vendor => vendor.id !== action.payload);
                state.isLoading = false;

            })
            .addCase(deleteVendor.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateVendor.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateVendor.fulfilled, (state, action) => {
                const index = state.data.findIndex(vendor => vendor.id === action.payload.id);
                if (index !== -1) {
                    state.data[index] = action.payload;
                }
                state.isLoading = false;
            })
            .addCase(updateVendor.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(searchVendors.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(searchVendors.fulfilled, (state, action) => {
                state.isLoading = false;
                console.log(action.payload)
                state.data = action.payload;
                console.log('payload', state.data)
            })
            .addCase(searchVendors.rejected, (state, action) => {
                state.isLoading = false;
                state.error = null;
            });
    }
});


export default vendorsSlice.reducer;