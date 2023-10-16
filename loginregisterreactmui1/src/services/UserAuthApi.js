




import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'




export const UserAuthApi = createApi({
  reducerPath: 'UserAuthApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/user/' }),
  endpoints: (builder) => ({
    LoginUser: builder.mutation({
        query:(user)=>{
            return {
                url:'login/',
                method:'POST',
                body:user,
                headers:{
                    'Content-type':'application/json'
                }
            }
        }
    }),


    registerUser: builder.mutation({
      query:(user)=>{
          return {
              url:'register/',
              method:'POST',
              body:user,
              headers:{
                  'Content-type':'application/json'
              }
          }
      }
  }), 


  getLoggedUser: builder.query({
    query:(access_token)=>{
        return {
            url:'profile/',
            method:'GET',
            headers:{
                'authorization':`Bearer ${access_token}`,
            }
        }
    }
}), 


changeuserPassword: builder.mutation({
    query:({ actual_data, access_token})=>{
        return {
            url:'changepassword/',
            method:'POST',
            body: actual_data,
            headers:{
                'authorization':`Bearer ${access_token}`,
            }
        }
    }
}), 


sendPasswordResetEmail: builder.mutation({
    query:(user)=>{
        return {
            url:'sendpasswordresetlink/',
            method:'POST',
            body: user,
            headers:{
                'Content-type':'application/json',
            }
        }
    }
}), 


resetPassword: builder.mutation({
    query:({actual_data, id, token})=>{
        return {
            url:`/reset/${id}/${token}`,
            method:'POST',
            body: actual_data,
            headers:{
                'Content-type':'application/json',
            }
        }
    }
}),

    
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginUserMutation, useRegisterUserMutation,useGetLoggedUserQuery , useChangeuserPasswordMutation , useSendPasswordResetEmailMutation, useResetPasswordMutation} = UserAuthApi