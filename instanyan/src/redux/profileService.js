import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const profileApi = createApi({
    reducerPath: 'profileApi',
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
        getProfileDetails: builder.query({
            query: (username) => ({
                url: `api/user/profile/${username}`,
                method: 'GET',
                refetchOnMountOrArgChange: true,
            }),
        }),
    }),
});

export const { useGetProfileDetailsQuery } = profileApi