import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/Networks";
import axios from "axios";

export const createTodo = createAsyncThunk(
    'todos/createTodo',
    async(todo, { rejectWithValue, dispatch}) => {
        try{
            const response = await axios.post(`${BASE_URL}/todo`, todo);
            console.log(response.data)
            dispatch(fetchTodosByDate(new Date().toISOString().split('T')[0]))
            return response.data;
        }catch(error){
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchTodosByDate = createAsyncThunk(
    'todos/getByDate',
    async (date, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/todos/date/${date}`);
            console.log("respo=> ",response.data); 
            return response.data;  
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const updateTodoItem = createAsyncThunk(
  'todos/updateItem',
  async (
    { id, header, description, date, is_completed, category },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/todos/${id}`,
        {
          header,
          description,
          date,
          is_completed, // Send as a boolean if the backend expects it
          category,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data || 'Unexpected error');
    }
  }
);

export const deleteTodo = createAsyncThunk(
  'todos/delete',
  async (id : number, { rejectWithValue }) => {
      try {
          const response = await axios.delete(`${BASE_URL}/todos/${id}`);
          console.log("respo=> ",response.data.message); 
          return {id, message : response.data.message};  
      } catch (error) {
          return rejectWithValue(error.response.data);
      }
  }
)

export const getTodosByCategory = createAsyncThunk(
  'todos/category',
  async(category : string, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${BASE_URL}/todos/category/${category}`);
        console.log("cateres=> ",response.data); 
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})


const todoSlice = createSlice({
    name : 'todos',
    initialState : {
        todos : [],
        status : 'idle',
        error : null,
        responseMessage : ''
    },
    reducers: {
        resetSuccessMessage: (state) => {
            state.responseMessage = ''; // Clear success message
          },
    },
  extraReducers: (builder) => {
    builder
      .addCase(createTodo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos.push(action.payload);
        state.responseMessage = action.payload.message
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.responseMessage = action.payload
      })
      .addCase(fetchTodosByDate.pending, (state) => {
        state.status = 'loading';
    })
    .addCase(fetchTodosByDate.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (Array.isArray(action.payload)) {
          state.todos = action.payload;
        } else {
          state.todos = [];
        }
    })
    .addCase(fetchTodosByDate.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.responseMessage = action.payload?.message || 'Failed to fetch Todos';
    })
    .addCase(updateTodoItem.pending, (state) => {
      state.status = 'loading'; // Set loading state
    })
    .addCase(updateTodoItem.fulfilled, (state, action) => {
      state.status = 'succeeded';
      const updatedTodo = action.payload;
      const index = state.todos.findIndex((todo) => todo.id === updatedTodo.id);
      if (index !== -1) {
        state.todos[index] = updatedTodo; // Update the todo in the list
      }
      state.responseMessage = 'Todo item updated successfully';
    })
    
    .addCase(updateTodoItem.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload; // Set error message
      state.responseMessage = action.payload; // Store error response message
    })
    .addCase(deleteTodo.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(deleteTodo.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
      state.responseMessage = action.payload.message || 'Todo deleted successfully!';
    })
    .addCase(deleteTodo.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload || 'Failed to delete Todo';
      state.responseMessage = state.error.message || 'Error occurred while deleting the Todo';
    })
    .addCase(getTodosByCategory.pending, (state) => {
      state.status = 'loading';
  })
  .addCase(getTodosByCategory.fulfilled, (state, action) => {
      state.status = 'succeeded';
      if (Array.isArray(action.payload)) {
        state.todos = action.payload;
      } else {
        state.todos = [];
      }
  })
  .addCase(getTodosByCategory.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
      state.responseMessage = action.payload?.message || 'Failed to fetch Todos';
  })
  },
});

export default todoSlice.reducer;