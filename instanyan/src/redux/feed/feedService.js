import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const feedApi = createApi({
    reducerPath: 'feedApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.userToken
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
                return headers;
            }
        },
    }),
    endpoints: (builder) => ({
        getFeedPosts: builder.query({
            query: () => ({
                url: 'api/feed',
                method: 'GET',
                refetchOnMountOrArgChange: true,
            }),
        }),
    }),
});

export const { useGetFeedPostsQuery } = feedApi