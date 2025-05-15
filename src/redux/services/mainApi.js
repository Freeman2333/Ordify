import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const mainApi = createApi({
  reducerPath: "mainApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => ({ url: `/orders` }),
    }),
  }),
});

export const { useGetOrdersQuery } = mainApi;
