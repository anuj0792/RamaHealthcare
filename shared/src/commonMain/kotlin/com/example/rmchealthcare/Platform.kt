package com.example.rmchealthcare

interface Platform {
    val name: String
}

expect fun getPlatform(): Platform