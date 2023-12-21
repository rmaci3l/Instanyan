import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const exploreApi = createApi({
    reducerPath: 'exploreApi',
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
        getExplorePosts: builder.query({
            query: (hashtag) => ({
                url: `api/explore/posts/${hashtag}`,
                method: 'GET',
                refetchOnMountOrArgChange: true
            }),
        }),
        getExploreUsers: builder.query({
            query: (username) => ({
                url: `api/explore/${username}`,
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetExplorePostsQuery, useGetExploreUsersQuery } = exploreApi