import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getApi, postApi } from '../../services/helpers/apiCall';


const initialState = {
    isLoading: false,
    isRegistered: false,
    error: null
}


export const signUp = createAsyncThunk(
    'signUp/signUpUser',
    async (credentials, { rejectWithValue }) => {
        const { email, pass, role } = credentials;

        try {
            const res = await postApi({
                url: '/admin/register',
                data: {
                    email: email,
                    password: pass,
                    role: role
                },
                config: {}
            });

            console.log(res)

            // // Check if the response contains a token to determine if signup was successful
            if (res) {
                return res.data; // Resolve with response data if signup was successful
            } else {
                // Reject with a custom error message if signup failed
                // return rejectWithValue({ message: 'email already exist' });
            }
        } catch (err) {
            // If the error is due to unauthorized access, handle it separately
            if (err.response && err.response.status === 401) {
                // Clear token from local storage
                LocalStorageService.remove("token");
            }

            return rejectWithValue(err.response.data); // Pass the error data to the reducer
        }
    }
);

export const fetchAllUsers = createAsyncThunk('user/getuser', async (_, { rejectWithValue }) => {
    try {

        const response = await getApi({
            url: 'admin/getall',
            data: {},
            config: {}
        })

        console.log(response?.data)

        return response.data

    } catch (error) {
        return rejectWithValue(error.response.data);

    }
})



const signUpSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signUp.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isRegistered = true
                state.data = action.payload;
            })
            .addCase(signUp.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchAllUsers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });

    }
});


export default signUpSlice.reducer;