import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { backend_url } from '../../constants';

export const postApi = createApi({
    reducerPath: 'postApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${backend_url}`,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.userToken
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
                return headers;
            }
        },
    }),
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: (args) => {
                const queryArgs = new URLSearchParams(args).toString();   
                return {
                    url: `api/posts/retrieve?${queryArgs}`,
                    method: 'GET',
                };
            },
        }),
    }),
});

export const { useGetPostsQuery } = postApi;