package com.bangkit.wizzmate.view.authentication

import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.bangkit.wizzmate.data.remote.request.LoginRequest
import com.bangkit.wizzmate.data.remote.response.AuthResponse
import com.bangkit.wizzmate.data.remote.retrofit.ApiConfig
import kotlinx.coroutines.launch
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class LoginViewModel : ViewModel() {
    private val _isLogin = MutableLiveData<Boolean>()
    val isLogin: LiveData<Boolean> = _isLogin

    fun login(email: String, password: String){
        val request = LoginRequest(email, password)
        val client = ApiConfig.getApiService().login(request)
        client.enqueue(object : Callback<AuthResponse> {
            override fun onResponse(call: Call<AuthResponse>, response: Response<AuthResponse>) {
                val responseBody = response.body()
                if (responseBody != null) {
                    _isLogin.value = true
                } else {
                    _isLogin.value = false
                    Log.e("Login gagal", "Login failed, response body is null")
                }
            }

            override fun onFailure(call: Call<AuthResponse>, t: Throwable) {
                _isLogin.value = false
                Log.e("Login gagal", "onFailure: ${t.message.toString()}")
            }
        })

    }
}