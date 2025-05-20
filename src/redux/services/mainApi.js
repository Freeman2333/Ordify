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
      invalidatesTags: ["Orders"],
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

export const {
  useGetOrdersQuery,
  useGetOrderQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = mainApi;
