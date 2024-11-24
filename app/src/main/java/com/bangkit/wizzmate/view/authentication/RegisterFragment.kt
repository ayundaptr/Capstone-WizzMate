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
import com.bangkit.wizzmate.databinding.FragmentRegisterBinding
import com.bangkit.wizzmate.helper.StringHelper.makeTextLink

class RegisterFragment : Fragment() {

    private lateinit var binding: FragmentRegisterBinding
    private val viewModel: LoginViewModel by viewModels()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        binding = FragmentRegisterBinding.inflate(inflater, container, false)
        val root: View = binding.root
        return root

    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        makeTextLink(binding.tvAlreadyHaveAccount, "Sign In", false, R.color.primaryColor) {
            val intent = Intent(context, AuthenticationActivity::class.java).apply {
                putExtra("isRegister", false)
            }
            startActivity(intent)
        }
    }
}