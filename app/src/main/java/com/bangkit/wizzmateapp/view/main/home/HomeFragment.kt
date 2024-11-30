package com.bangkit.wizzmateapp.view.main.home

import android.content.Intent
import androidx.fragment.app.viewModels
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.DividerItemDecoration
import androidx.recyclerview.widget.LinearLayoutManager
import com.bangkit.wizzmateapp.adapter.WisataAdapter
import com.bangkit.wizzmateapp.data.WisataRepository
import com.bangkit.wizzmateapp.data.remote.retrofit.ApiConfig
import com.bangkit.wizzmateapp.databinding.FragmentHomeBinding
import com.bangkit.wizzmateapp.view.detail.DetailActivity
import com.bangkit.wizzmateapp.view.main.MainViewModel
import com.bangkit.wizzmateapp.view.main.MainViewModelFactory

class HomeFragment : Fragment() {

    private lateinit var binding: FragmentHomeBinding
    private val mainViewModel: MainViewModel by viewModels {
        MainViewModelFactory(WisataRepository(ApiConfig.getApiService()))
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentHomeBinding.inflate(inflater, container, false)
        val root: View = binding.root
        return root
    }

    override fun onViewCreated(view: android.view.View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        val username = arguments?.getString("USERNAME")
        Log.d("HomeFragment", "Received username: $username")

        binding.tvProfileName.text = username

        val storyAdapter = WisataAdapter()
        val dividerItemDecoration = DividerItemDecoration(requireContext(), LinearLayoutManager.VERTICAL)

        mainViewModel.wisata.observe(viewLifecycleOwner) {
            storyAdapter.submitData(lifecycle, it)
            binding.rvWisata.apply {
                addItemDecoration(dividerItemDecoration)
                layoutManager = LinearLayoutManager(requireContext())
                adapter = storyAdapter
            }
        }

        binding.button.setOnClickListener {
            startActivity(Intent(requireContext(), DetailActivity::class.java))
        }
    }
}