import axios from "axios";

const API = axios.create({
  baseURL: "https://mern-tour-app.onrender.com/",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const login = (formData) => API.post("/api/v1/users/signin", formData);
export const register = (formData) =>
  API.post("/api/v1/users/signup", formData);
export const googleLogin = (result) =>
  API.post("/api/v1/users/googleLogin", result);
export const getProfile = () => API.get("/users/profile");

export const createTour = (tourData) => API.post("/api/v1/tours", tourData);
// export const getTours = () => API.get("/api/v1/tours");
export const getTours = (page) => API.get(`/api/v1/tours?page=${page}`);
export const getTour = (tourId) => API.get(`/api/v1/tours/${tourId}`);
export const getToursByUser = (userId) =>
  API.get(`/api/v1/tours/userTours/${userId}`); // id -> user id
export const deleteTour = (tourId) => API.delete(`/api/v1/tours/${tourId}`);
export const updateTour = (tourId, updatedTourData) =>
  API.patch(`/api/v1/tours/${tourId}`, updatedTourData);
export const getToursBySearch = (searchQuery) => {
  return API.get(`/api/v1/tours/search?searchQuery=${searchQuery}`);
};
export const getToursByTag = (tag) => {
  return API.get(`/api/v1/tours/tag/${tag}`);
};
export const getRelatedTours = (tags) => {
  return API.post("/api/v1/tours/relatedTours", tags);
};
export const likeTour = (id) => API.patch(`/api/v1/tours/like/${id}`);
