package com.bangkit.wizzmate.view.main

import android.content.Intent
import android.os.Bundle
import android.util.Log
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
import com.bangkit.wizzmate.view.main.estimator.EstimatorFragment
import com.bangkit.wizzmate.view.main.history.HistoryFragment
import com.bangkit.wizzmate.view.main.home.HomeFragment

class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val username = intent.getStringExtra("USERNAME")
        if (savedInstanceState == null) {
            val bundle = Bundle()
            bundle.putString("USERNAME", username)

            val homeFragment = HomeFragment()
            homeFragment.arguments = bundle

            supportFragmentManager.beginTransaction()
                .replace(R.id.fragment_container, homeFragment)
                .commit()
        }

        binding.bottomNavigationView.setOnItemSelectedListener { item ->
            when (item.itemId) {
                R.id.nav_home -> {
                    supportFragmentManager.beginTransaction()
                        .replace(R.id.fragment_container, HomeFragment())
                        .commit()
                    true
                }
                R.id.nav_cost_estimator -> {
                    supportFragmentManager.beginTransaction()
                        .replace(R.id.fragment_container, EstimatorFragment())
                        .commit()
                    true
                }
                R.id.nav_History -> {
                    supportFragmentManager.beginTransaction()
                        .replace(R.id.fragment_container, HistoryFragment())
                        .commit()
                    true
                }
                else -> false
            }
        }

    }
}