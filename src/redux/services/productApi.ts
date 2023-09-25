import { createApi } from "@reduxjs/toolkit/query/react";
import { setProduct } from "../features/productSlice";
import { IGenericResponse, IProductType } from "./types";
import customFetchBase from "./customFetchBase";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: customFetchBase,
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProducts: builder.query<IProductType, void>({
      query: () => ({
        url: "products",
        credentials: "include",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Product" as const, _id })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
      transformResponse: (result: { data: { products: IProductType } }) =>
        result.data.products,
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(setProduct(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    getProductMe: builder.query<IProductType, string>({
      query(userId) {
        return {
          url: `products/me/${userId}`,
          credentials: "include",
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Product" as const, _id })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
      transformResponse: (result: { data: { product: IProductType } }) =>
        result.data.product,
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(setProduct(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    addProduct: builder.mutation<IGenericResponse, FormData>({
      query: (body) => ({
        url: "products/create",
        method: "POST",
        body,
        formData: true,
        credentials: "include",
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
    updateProduct: builder.mutation<IGenericResponse, FormData>({
      query: (body) => ({
        url: "products/update",
        method: "POST",
        body,
        formData: true,
        credentials: "include",
      }),
      async onQueryStarted(_args, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.log(error);
        }
      },
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
    deleteProduct: builder.mutation<IGenericResponse, string>({
      query(id) {
        return {
          url: `products/${id}`,
          method: "DELETE",
          credentials: "include",
        };
      },
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductMeQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
