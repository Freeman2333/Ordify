import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const mainApi = createApi({
  reducerPath: "mainApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: ({ status }) => ({
        url: `/orders`,
        params: { status },
      }),
      providesTags: ["Orders"],
    }),
    getOrder: builder.query({
      query: (id) => ({ url: `/orders/${id}` }),
      providesTags: (_result, _error, id) => [{ type: "Orders", id }],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const { useGetOrdersQuery, useGetOrderQuery, useDeleteOrderMutation } =
  mainApi;
