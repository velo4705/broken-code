'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AuthForm() {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        const { error } = await supabase.auth.signInWithOtp({ email })

        if (error) alert(error.message)
        else alert('Check your email for the magic link!')
        setLoading(false)
    }

    return (
        <form onSubmit={handleLogin} className="flex flex-col gap-4 p-4 border rounded-lg">
            <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 border rounded text-black"
                required
            />
            <button disabled={loading} className="bg-blue-600 text-white p-2 rounded">
                {loading ? 'Sending...' : 'Send Magic Link'}
            </button>
        </form>
    )
}