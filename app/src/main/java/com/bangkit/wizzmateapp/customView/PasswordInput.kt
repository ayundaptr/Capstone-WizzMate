package com.example.intermediatesubmission.customView

import android.content.Context
import android.text.Editable
import android.text.TextWatcher
import android.util.AttributeSet
import com.google.android.material.textfield.TextInputEditText
import com.google.android.material.textfield.TextInputLayout

class PasswordInput @JvmOverloads constructor(
    context: Context, attrs: AttributeSet? = null
) : TextInputEditText(context, attrs) {
    private lateinit var textInputLayout: TextInputLayout

    init {
        addTextChangedListener(object: TextWatcher {
            override fun beforeTextChanged(p0: CharSequence?, p1: Int, p2: Int, p3: Int) {
                textInputLayout = parent.parent as TextInputLayout
                textInputLayout.errorIconDrawable = null
            }

            override fun onTextChanged(p0: CharSequence?, p1: Int, p2: Int, p3: Int) {
                if (p0.toString().length < 8) {
                    textInputLayout.error = "Password minimal harus 8 karakter"
                } else if (p0.toString().isEmpty()) {
                    textInputLayout.error = "password tidak boleh kosong"
                } else {
                    textInputLayout.error = null
                }

            }

            override fun afterTextChanged(p0: Editable?) {
                if (p0.toString().isEmpty()) {
                    textInputLayout.error = "password tidak boleh kosong"
                }
            }

        })
    }
}