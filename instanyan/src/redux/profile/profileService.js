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
        getProfile: builder.query({
            query: (args) => {
                const queryArgs = new URLSearchParams(args).toString();
                return {
                    url: `api/user/profile?${queryArgs}`,
                    method: 'GET',               
                };
            },
        }),
    }),
});

export const { useGetProfileQuery } = profileApi