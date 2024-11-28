package com.bangkit.wizzmate.view.detail

import android.os.Bundle
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.bangkit.wizzmate.R
import com.bangkit.wizzmate.databinding.ActivityDetailBinding
import com.google.android.gms.maps.SupportMapFragment

class DetailActivity : AppCompatActivity() {
    private lateinit var binding: ActivityDetailBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityDetailBinding.inflate(layoutInflater)
        setContentView(binding.root)

        if (savedInstanceState == null) {
            val mapFragment = SupportMapFragment()
            supportFragmentManager.beginTransaction()
                .replace(R.id.fragment_container, mapFragment)
                .commit()
        }
    }
}