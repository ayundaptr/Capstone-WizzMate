package com.bangkit.wizzmate.data.remote.request

data class RegisterRequest(
    val username: String,
    val email: String,
    val password: String
)