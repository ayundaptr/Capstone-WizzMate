package com.bangkit.wizzmate.adapter

import android.content.Intent
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.cardview.widget.CardView
import androidx.paging.PagingDataAdapter
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.RecyclerView
import com.bangkit.wizzmate.data.remote.response.DataItem
import com.bangkit.wizzmate.databinding.DestinationItemBinding
import com.bangkit.wizzmate.view.detail.DetailActivity
import com.bumptech.glide.Glide
import com.bumptech.glide.load.resource.bitmap.RoundedCorners

class WisataAdapter : PagingDataAdapter<DataItem, WisataAdapter.MyViewHolder>(DIFF_CALLBACK){

    class MyViewHolder (val binding: DestinationItemBinding) : RecyclerView.ViewHolder(binding.root) {
        fun bind(wisata: DataItem) {
            binding.tvDestinationName.text = wisata.placeName
            Glide.with(itemView.context)
                .load(wisata.imageUrl)
                .transform(RoundedCorners(16))
                .into(binding.ivDestination)
            binding.tvDestinationLocation.text = wisata.city
            binding.tvDestinationRating.text = wisata.rating.toString()
        }
    }

    override fun onBindViewHolder(holder: WisataAdapter.MyViewHolder, position: Int) {
        val wisata = getItem(position)
        holder.bind(wisata!!)
        holder.itemView.setOnClickListener {
            val context = holder.itemView.context
            val intent = Intent(context, DetailActivity::class.java).apply {
                putExtra("LATITUDE", wisata.lat.toString().toDouble())
                putExtra("LONGITUDE", wisata.long.toString().toDouble())
                putExtra("IMAGE_URL", wisata.imageUrl)
                putExtra("PLACE_NAME", wisata.placeName)
                putExtra("CITY", wisata.city)
                putExtra("RATING", wisata.rating.toString().toDouble())
            }
            context.startActivity(intent)
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): WisataAdapter.MyViewHolder {
        val binding = DestinationItemBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return MyViewHolder(binding)
    }
    companion object {
        val DIFF_CALLBACK = object : DiffUtil.ItemCallback<DataItem>() {
            override fun areItemsTheSame(oldItem: DataItem, newItem: DataItem): Boolean {
                return oldItem == newItem
            }

            override fun areContentsTheSame(
                oldItem: DataItem,
                newItem: DataItem
            ): Boolean {
                return oldItem == newItem
            }
        }
    }
}