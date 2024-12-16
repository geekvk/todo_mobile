import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/Networks";

export const fetchCategories = createAsyncThunk(
    'categories/getCategories',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/categories`);
            console.log(response.data);  // You can remove this in production
            return response.data;  // This will be the payload that the slice reducer will handle
        } catch (error) {
            return rejectWithValue(error.response.data);  // Handles the error response
        }
    }
)

const initialState = {
    categories: [],
    categoryStatus: 'idle',  // 'idle', 'loading', 'succeeded', 'failed'
    categoryError: null,
};

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default categorySlice.reducer;