import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const transformErrorResponse = ({ originalStatus: status }) => {
  let message = "An error occurred";

  if (status === 400) {
    message = "Bad Request";
  } else if (status === 404) {
    message = "Not Found";
  } else if (status === 500) {
    message = "Server Error";
  }

  return { status, message };
};

export const mainApi = createApi({
  reducerPath: "mainApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: ({ status }) => ({
        url: `/orders`,
        params: { status },
      }),
      transformErrorResponse,
    }),
    getOrder: builder.query({
      query: (id) => ({ url: `/orders/${id}` }),
      transformErrorResponse,
    }),
    createOrder: builder.mutation({
      query: (order) => ({
        url: `/orders`,
        method: "POST",
        body: order,
      }),
    }),

    updateOrder: builder.mutation({
      query: ({ id, ...updatedOrder }) => ({
        url: `/orders/${id}`,
        method: "PUT",
        body: updatedOrder,
      }),
    }),

    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/orders/${id}`,
        method: "PATCH",
        body: { status },
      }),
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
      transformErrorResponse,
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
} = mainApi;
