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
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: ({ status }) => ({
        url: `/orders`,
        params: { status },
      }),
      providesTags: ["Orders"],
      transformErrorResponse,
    }),
    getOrder: builder.query({
      query: (id) => ({ url: `/orders/${id}` }),
      providesTags: (_result, _error, id) => [{ type: "Orders", id }],
      transformErrorResponse,
    }),
    createOrder: builder.mutation({
      query: (order) => ({
        url: `/orders`,
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["Orders"],
    }),

    updateOrder: builder.mutation({
      query: ({ id, ...updatedOrder }) => ({
        url: `/orders/${id}`,
        method: "PUT",
        body: updatedOrder,
      }),
      async onQueryStarted(
        { id, ...updatedOrder },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          mainApi.util.updateQueryData("getOrder", id, (draft) => {
            Object.assign(draft, updatedOrder);
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (_, __, { id }) => ["Orders", { type: "Orders", id }],
    }),

    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/orders/${id}`,
        method: "PATCH",
        body: { status },
      }),
      async onQueryStarted({ id, status }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          mainApi.util.updateQueryData("getOrder", id, (draft) => {
            draft.status = status;
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (_, __, { id }) => ["Orders", { type: "Orders", id }],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Orders"],
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
