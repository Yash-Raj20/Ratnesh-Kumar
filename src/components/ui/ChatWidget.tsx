"use client";

import Script from "next/script";

export default function ChatWidget() {
    return (
        <Script
            src="https://chat-six-lac-30.vercel.app/widget.js"
            strategy="afterInteractive"
            onLoad={() => {
                if (typeof window !== "undefined" && window.Chat) {
                    window.Chat.init("f39c5e84b6e47bf5130da30e3779ec6d");
                }
            }}
        />
    );
}
