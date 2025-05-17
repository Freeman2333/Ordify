import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const mainApi = createApi({
  reducerPath: "mainApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: ({ status }) => ({
        url: `/orders`,
        params: {
          status,
        },
      }),
    }),
    getOrder: builder.query({
      query: (id) => ({ url: `/orders/${id}` }),
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({ url: `/orders/${id}`, method: "DELETE" }),
    }),
  }),
});

export const { useGetOrdersQuery, useGetOrderQuery, useDeleteOrderMutation } =
  mainApi;
