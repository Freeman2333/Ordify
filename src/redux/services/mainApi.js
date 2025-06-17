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
        params: {
          status,
        },
      }),
      transformErrorResponse,
    }),
    getOrder: builder.query({
      query: (id) => `/orders/${id}`,
      transformErrorResponse,
    }),
  }),
});

export const { useGetOrdersQuery, useGetOrderQuery } = mainApi;
