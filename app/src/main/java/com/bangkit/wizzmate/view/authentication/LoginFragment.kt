package com.bangkit.wizzmate.view.authentication

import android.content.Intent
import androidx.fragment.app.viewModels
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.bangkit.wizzmate.R
import com.bangkit.wizzmate.databinding.FragmentLoginBinding
import com.bangkit.wizzmate.helper.StringHelper.makeTextLink
import com.bangkit.wizzmate.view.main.MainActivity

class LoginFragment : Fragment() {
    private lateinit var binding: FragmentLoginBinding
    private val viewModel: LoginViewModel by viewModels()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        binding = FragmentLoginBinding.inflate(inflater, container, false)
        val root: View = binding.root
        return root

    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        binding.buttonLogin.setOnClickListener {
            startActivity(Intent(context, MainActivity::class.java))
        }
        makeTextLink(binding.tvDontHaveAccount, "Sign Up", false, R.color.primaryColor) {
            val intent = Intent(context, AuthenticationActivity::class.java).apply {
                putExtra("isRegister", true)
            }
            startActivity(intent)
        }
    }
}