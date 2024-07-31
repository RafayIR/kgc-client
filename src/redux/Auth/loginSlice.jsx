import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { postApi } from '../../services/helpers/apiCall';
import LocalStorageService from '../../services/localStorageServices';


const initialState = {
    isLoading: false,
    isLoggedIn: false,
    error: null,
    role : null
}

export const logInUser = createAsyncThunk(
    'LogIn/logInUser',
    async (credentials, { rejectWithValue }) => {
        const { email, pass } = credentials;

        try {
            const res = await postApi({
                url: '/admin/login',
                data: {
                    email: email,
                    password: pass
                },
                config: {}
            });

            const admin = res.data;
            LocalStorageService.setObject("token", admin.token);
            LocalStorageService.setObject("role" , admin.role)

            // Check if the response contains a token to determine if login was successful
            if (admin) {
                return res.data; // Resolve with response data if login was successful
            } else {
                // Reject with a custom error message if login failed
                return rejectWithValue({ message: 'Incorrect email or password' });
            }
        } catch (err) {
            // If the error is due to unauthorized access, handle it separately
            if (err.response && err.response.status === 401) {
                // Clear token from local storage
                LocalStorageService.remove("admin");
            }

            return rejectWithValue(err.response.data); // Pass the error data to the reducer
        }
    }
);


export const logInSlice = createSlice({
    name: 'LogIn',
    initialState,
    reducers: {
        logInStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        logInSuccess: (state) => {
            state.isLoading = false;
            state.isLoggedIn = true;
            state.error = null;
            
        },
        logInFailure: (state, action) => {
            state.isLoading = false;
            state.isLoggedIn = false;
            state.error = action.payload;
        },
        logOut: (state) => {
            state.isLoggedIn = false;
            LocalStorageService.clear()
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(logInUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(logInUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isLoggedIn = true;
                state.error = null;
                state.role = action.payload.role;
            })
            .addCase(logInUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isLoggedIn = false; // Set isLoggedIn to false on login failure
                state.role = null;
                state.error = action.error.message;
            })
    }
})

export const { logInStart, logInSuccess, logInFailure, logOut } = logInSlice.actions;

// Export reducer
export default logInSlice.reducer;