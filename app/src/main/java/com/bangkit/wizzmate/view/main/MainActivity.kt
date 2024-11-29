package com.bangkit.wizzmate.view.main

import android.content.Intent
import android.os.Bundle
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.DividerItemDecoration
import androidx.recyclerview.widget.LinearLayoutManager
import com.bangkit.wizzmate.R
import com.bangkit.wizzmate.adapter.WisataAdapter
import com.bangkit.wizzmate.data.WisataRepository
import com.bangkit.wizzmate.data.remote.retrofit.ApiConfig
import com.bangkit.wizzmate.databinding.ActivityMainBinding
import com.bangkit.wizzmate.view.detail.DetailActivity

class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        val apiService = ApiConfig.getApiService()
        val repository = WisataRepository(apiService)
        val mainViewModel = ViewModelProvider(
            this,
            MainViewModelFactory(repository)
        )[MainViewModel::class.java]

        binding.button.setOnClickListener {
            startActivity(Intent(this, DetailActivity::class.java))
        }
        val storyAdapter = WisataAdapter()
        val dividerItemDecoration = DividerItemDecoration(this, LinearLayoutManager.VERTICAL)
        binding.rvWisata.apply{
            addItemDecoration(dividerItemDecoration)
            layoutManager = LinearLayoutManager(this@MainActivity)
            adapter = storyAdapter
        }

        mainViewModel.wisata.observe(this) {
            storyAdapter.submitData(lifecycle, it)
        }

    }
}