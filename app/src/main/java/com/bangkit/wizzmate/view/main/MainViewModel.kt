package com.bangkit.wizzmate.view.main

import androidx.lifecycle.LiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import androidx.paging.PagingData
import androidx.paging.cachedIn
import com.bangkit.wizzmate.data.WisataRepository
import com.bangkit.wizzmate.data.remote.response.DataItem

class MainViewModel(wisataRepository: WisataRepository) : ViewModel() {
    val wisata: LiveData<PagingData<DataItem>> = wisataRepository.getWisata().cachedIn(viewModelScope)
}