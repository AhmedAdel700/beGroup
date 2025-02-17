import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface InfoItem {
  id: number;
  FirstName: string | null;
  LastName: string | null;
  Email: string | null;
  Phone: string | null;
  published_at: string;
  created_at: string;
  updated_at: string;
}

interface UserData {
  FirstName: string;
  LastName: string;
  Email: string;
  Phone: string;
}

interface InfoState {
  info: InfoItem[];
  loading: boolean;
  error: string | null;
}

// Define the initial state using that type
const initialState: InfoState = {
  info: [],
  loading: false,
  error: null,
};

export const fetchUserInfo = createAsyncThunk<
  InfoItem[],
  void,
  { rejectValue: string }
>("userInfo/fetchUserInfo", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;

  try {
    const response = await fetch("http://localhost:1337/user-informations");
    if (!response.ok) {
      throw new Error("Failed to fetch user information.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Unknown error"
    );
  }
});

export const createNewUser = createAsyncThunk<
  InfoItem,
  UserData,
  { rejectValue: string }
>("userInfo/createNewUser", async (userData, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;

  try {
    const response = await fetch("http://localhost:1337/user-informations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error("Failed to create user.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Unknown error"
    );
  }
});

export const counterSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get user info
      .addCase(fetchUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.info = action.payload;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      })

      // Create a new user
      .addCase(createNewUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewUser.fulfilled, (state, action) => {
        state.loading = false;
        state.info.push(action.payload);
      })
      .addCase(createNewUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      });
  },
});

export default counterSlice.reducer;
