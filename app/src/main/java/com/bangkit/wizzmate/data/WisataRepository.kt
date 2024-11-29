package com.bangkit.wizzmate.data

import androidx.lifecycle.LiveData
import androidx.paging.Pager
import androidx.paging.PagingConfig
import androidx.paging.PagingData
import androidx.paging.liveData
import com.bangkit.wizzmate.data.remote.response.DataItem
import com.bangkit.wizzmate.data.remote.retrofit.ApiService

class WisataRepository(private val apiService: ApiService) {
    fun getWisata(): LiveData<PagingData<DataItem>> {
        return Pager(
            config = PagingConfig(
                pageSize = 5,
                enablePlaceholders = false
            ),
            pagingSourceFactory = {
                WisataPagingSource(apiService)
            }
        ).liveData
    }
}