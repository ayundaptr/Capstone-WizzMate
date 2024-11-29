package com.bangkit.wizzmate.view.welcome

import android.content.Intent
import android.content.pm.PackageManager
import android.os.Bundle
import android.util.Log
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import com.bangkit.wizzmate.R
import com.bangkit.wizzmate.databinding.ActivityWelcomeBinding
import com.bangkit.wizzmate.helper.StringHelper.makeTextLink
import com.bangkit.wizzmate.view.authentication.AuthenticationActivity

class WelcomeActivity : AppCompatActivity() {
    private lateinit var binding: ActivityWelcomeBinding

    private val requestPermissionLauncher = registerForActivityResult(
        ActivityResultContracts.RequestPermission()
    ) { isGranted ->
        if (isGranted) {
            Log.d("Permission", "Location permission granted")
        } else {
            Log.d("Permission", "Location permission denied")
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityWelcomeBinding.inflate(layoutInflater)
        setContentView(binding.root)
        requestLocationPermission()
        binding.buttonLogin.setOnClickListener {
            startActivity(Intent(this, AuthenticationActivity::class.java))
        }

        makeTextLink(binding.confirmAccount, "Sign Up", true, R.color.white) {
            val intent = Intent(this, AuthenticationActivity::class.java).apply {
                putExtra("isRegister", true)
            }
            startActivity(intent)
        }
        makeTextLink(binding.tvTermDescription, "Terms of Services", false, R.color.primaryColor) {
            val intent = Intent(this, AuthenticationActivity::class.java).apply {
                putExtra("isRegister", true)
            }
            startActivity(intent)
        }
        makeTextLink(binding.tvTermDescription, "Privacy Policy", false, R.color.primaryColor) {
            val intent = Intent(this, AuthenticationActivity::class.java).apply {
                putExtra("isRegister", true)
            }
            startActivity(intent)
        }
    }

    private fun requestLocationPermission() {
        when {
            ContextCompat.checkSelfPermission(
                this,
                android.Manifest.permission.ACCESS_FINE_LOCATION
            ) == PackageManager.PERMISSION_GRANTED -> {
                // Permission is already granted
                Log.d("Permission", "Location permission already granted")
            }

            shouldShowRequestPermissionRationale(android.Manifest.permission.ACCESS_FINE_LOCATION) -> {
                // Show an explanation to the user
                Log.d("Permission", "Explain why the app needs location access")
                // Here, you can show a dialog explaining why the permission is needed
                requestPermissionLauncher.launch(android.Manifest.permission.ACCESS_FINE_LOCATION)
            }

            else -> {
                // Directly ask for the permission
                requestPermissionLauncher.launch(android.Manifest.permission.ACCESS_FINE_LOCATION)
            }
        }
    }
}