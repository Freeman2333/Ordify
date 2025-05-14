import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const mainApi = createApi({
  reducerPath: "mainApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3010/" }),
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => ({ url: `/orders` }),
    }),
  }),
});

export const { useGetOrdersQuery } = mainApi;
