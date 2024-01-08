import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { backend_url } from '../../constants'

export const authApi = createApi({
    reducerPath: 'authApi',
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
        getUserDetails: builder.query({
            query: () => ({
                url: 'auth/user',
                method: 'GET',
            }),
        }),
    }),
})

export const { useGetUserDetailsQuery } = authApi