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
  tagTypes: ["Orders", "Order"],
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: ({ status }) => ({
        url: `/orders`,
        params: { status },
      }),
      providesTags: (result) => {
        if (!result) return [{ type: "Orders", id: "LIST" }];
        return [
          { type: "Orders", id: "LIST" },
          ...result.map((order) => ({ type: "Order", id: order.id })),
        ];
      },
      transformErrorResponse,
    }),

    getOrder: builder.query({
      query: (id) => ({ url: `/orders/${id}` }),
      providesTags: (result, error, id) => [{ type: "Order", id }],
      transformErrorResponse,
    }),

    createOrder: builder.mutation({
      query: (order) => ({
        url: `/orders`,
        method: "POST",
        body: order,
      }),
      invalidatesTags: [{ type: "Orders", id: "LIST" }],
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
      invalidatesTags: (result, error, { id }) => [{ type: "Order", id }],
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
      invalidatesTags: (result, error, { id }) => [{ type: "Order", id }],
    }),

    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Orders", id: "LIST" }],
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
