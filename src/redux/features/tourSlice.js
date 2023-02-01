import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

// Actions
// 1. Create Tour
export const createTour = createAsyncThunk(
  "tour/createTour",
  async ({ updatedTourData, navigate, toast }, { rejectWithValue }) => {
    try {
      const { data } = await api.createTour(updatedTourData);
      toast.success("Tour Created Successfully");
      navigate("/");
      return data;
    } catch (err) {
      // toast.error(err.response.data.message);
      return rejectWithValue(err.response.data);
    }
  }
);

// // 2. Get Tours
// export const getTours = createAsyncThunk(
//   "tour/getTours",
//   async (_, { rejectWithValue }) => {
//     try {
//       const { data } = await api.getTours();
//       return data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );
// update getTours to getTours with pagination
// 2. Get Tours and Pagination
export const getTours = createAsyncThunk(
  "tour/getTours",
  async (page, { rejectWithValue }) => {
    try {
      const { data } = await api.getTours(page);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// 3. Get Tour
export const getTour = createAsyncThunk(
  "tour/getTour",
  async (tourId, { rejectWithValue }) => {
    try {
      const { data } = await api.getTour(tourId);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

// 4. Get Tour By User
export const getToursByUser = createAsyncThunk(
  "tour/getToursByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await api.getToursByUser(userId);
      console.log("data", data);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// 5. Delete Tour
export const deleteTour = createAsyncThunk(
  "tour/deleteTour",
  async ({ tourId, toast }, { rejectWithValue }) => {
    try {
      await api.deleteTour(tourId);
      toast.success("Tour Deleted Successfully");
      return tourId;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// 6. Update Tour
export const updateTour = createAsyncThunk(
  "tour/updateTour",
  async ({ id, updatedTourData, toast, navigate }, { rejectWithValue }) => {
    try {
      const { data } = await api.updateTour(id, updatedTourData);
      toast.success("Tour Updated Successfully");
      navigate("/");
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// 7. SearchTours
export const searchTours = createAsyncThunk(
  "tour/searchTours",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const { data } = await api.getToursBySearch(searchQuery);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// 8. GetToursByTag
export const getToursByTag = createAsyncThunk(
  "tour/getToursByTag",
  async (tag, { rejectWithValue }) => {
    try {
      const { data } = await api.getToursByTag(tag);
      console.log("data", data);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// 9. GetRelatedTours
export const getRelatedTours = createAsyncThunk(
  "tour/getRelatedTours",
  async (tags, { rejectWithValue }) => {
    try {
      const { data } = await api.getRelatedTours(tags);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// 10. Like Tour
export const likeTour = createAsyncThunk(
  "tour/likeTour",
  async ({ _id }, { rejectWithValue }) => {
    try {
      const response = await api.likeTour(_id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const tourSlice = createSlice({
  name: "tour",
  initialState: {
    tour: {},
    tours: [],
    tagTours: [],
    userTours: [],
    relatedTours: [],
    currentPage: 1,
    numberOfPages: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    // 1. Create Tour
    builder.addCase(createTour.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createTour.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tours = [...state.tours, action.payload];
    });
    builder.addCase(createTour.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload?.message;
    });
    // // 2. Get Tours
    // builder.addCase(getTours.pending, (state) => {
    //   state.isLoading = true;
    // });
    // builder.addCase(getTours.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.tours = action.payload;
    // });
    // builder.addCase(getTours.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload?.message;
    // });

    // 2. Get Tours and Pagination
    builder.addCase(getTours.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTours.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tours = action.payload.data;
      state.numberOfPages = action.payload.numberOfPages;
      state.currentPage = action.payload.currentPage;
    });
    builder.addCase(getTours.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload?.message;
    });
    // 3. Get Tour
    builder.addCase(getTour.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTour.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tour = action.payload;
    });
    builder.addCase(getTour.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload?.message;
    });
    // 4. Get Tour By User
    builder.addCase(getToursByUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getToursByUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userTours = action.payload;
    });
    builder.addCase(getToursByUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload?.message;
    });
    // 5. Delete Tour
    builder.addCase(deleteTour.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteTour.fulfilled, (state, action) => {
      state.isLoading = false;
      // arg is the argument passed to the action creator
      const { arg } = action.meta;
      console.log("arg", arg);
      if (arg) {
        state.userTours = state.userTours.filter(
          (tour) => tour._id !== arg.tourId
        );
        state.tours = state.tours.filter((tour) => tour._id !== arg.tourId);
      }
    });
    builder.addCase(deleteTour.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload?.message;
    });
    // 6. Update Tour
    builder.addCase(updateTour.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateTour.fulfilled, (state, action) => {
      state.isLoading = false;
      const { arg } = action.meta;
      if (arg) {
        state.tours = state.tours.map((tour) =>
          tour._id === arg.id ? action.payload : tour
        );
        state.userTours = state.userTours.map((tour) =>
          tour._id === arg.id ? action.payload : tour
        );
      } else {
        state.tour = action.payload;
      }
    });
    builder.addCase(updateTour.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload?.message;
    });
    // 7. Get Tours By Search
    builder.addCase(searchTours.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(searchTours.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tours = action.payload;
    });
    builder.addCase(searchTours.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload?.message;
    });
    // 8. Get Tours By Tag
    builder.addCase(getToursByTag.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getToursByTag.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tagTours = action.payload;
    });
    builder.addCase(getToursByTag.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    });
    // 9. Get Related Tours
    builder.addCase(getRelatedTours.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getRelatedTours.fulfilled, (state, action) => {
      state.isLoading = false;
      state.relatedTours = action.payload;
    });
    builder.addCase(getRelatedTours.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    });
    // 10. Like Tour
    builder.addCase(likeTour.pending, (state) => {
      // state.isLoading = true;
    });
    builder.addCase(likeTour.fulfilled, (state, action) => {
      state.isLoading = false;
      const {
        arg: { _id },
      } = action.meta;
      if (_id) {
        state.tours = state.tours.map((tour) =>
          tour._id === _id ? action.payload : tour
        );
      } else {
        state.tour = action.payload;
      }
    });
    builder.addCase(likeTour.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    });
  },
});

export const { setCurrentPage } = tourSlice.actions;
export default tourSlice.reducer;
