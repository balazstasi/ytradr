import { type FormEvent, useState } from 'react'
import database from '../lib/db/database.ts'
import type { AuthError } from '@supabase/supabase-js'

type AuthErrorWithDescription = AuthError & {
    error_description: string
    message: string
}

export default function Auth() {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')

    const handleLogin = async (event: FormEvent) => {
        event.preventDefault()

        setLoading(true)
        const { error } = await database.auth.signInWithOtp({ email })

        if (error) {
            alert(
                (error as AuthErrorWithDescription).error_description ||
                    error.message
            )
        } else {
            alert('Check your email for the login link!')
        }
        setLoading(false)
    }

    return (
        <div className="row flex flex-center">
            <div className="col-6 form-widget">
                <h1 className="header">Supabase + React</h1>
                <p className="description">
                    Sign in via magic link with your email below
                </p>
                <form className="form-widget" onSubmit={handleLogin}>
                    <div>
                        <input
                            className="inputField"
                            type="email"
                            placeholder="Your email"
                            value={email}
                            required={true}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <button className={'button block'} disabled={loading}>
                            {loading ? (
                                <span>Loading</span>
                            ) : (
                                <span>Send magic link</span>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
