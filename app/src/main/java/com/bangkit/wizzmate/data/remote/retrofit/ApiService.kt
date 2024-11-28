package com.bangkit.wizzmate.data.remote.retrofit

import com.bangkit.wizzmate.data.remote.request.LoginRequest
import com.bangkit.wizzmate.data.remote.request.RegisterRequest
import com.bangkit.wizzmate.data.remote.response.AuthResponse
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.POST

interface ApiService {
    @POST("api/auth/register")
    fun register(
        @Body request: RegisterRequest
    ): Call<AuthResponse>

    @POST("api/auth/login")
    fun login(
        @Body request: LoginRequest
    ): Call<AuthResponse>
}