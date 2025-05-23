import { useState, useEffect, type ChangeEvent } from 'react'
import database from '../lib/db/database.ts'
import type { Session } from '@supabase/supabase-js'

type AccountProps = {
    session: Session
}
export default function Account({ session }: AccountProps) {
    const [loading, setLoading] = useState<boolean>(true)
    const [username, setUsername] = useState<string | null>(null)
    const [website, setWebsite] = useState<string | null>(null)

    useEffect(() => {
        let ignore = false
        async function getProfile() {
            setLoading(true)
            const { user } = session

            const { data, error } = await database
                .from('profiles')
                .select(`username, website, avatar_url`)
                .eq('id', user.id)
                .single()

            if (!ignore) {
                if (error) {
                    console.warn(error)
                } else if (data) {
                    setUsername(data.username)
                    setWebsite(data.website)
                }
            }

            setLoading(false)
        }

        getProfile()

        return () => {
            ignore = true
        }
    }, [session])

    async function updateProfile({
        event,
    }: {
        event: React.FormEvent<HTMLFormElement>
    }) {
        event.preventDefault()

        setLoading(true)
        const { user } = session

        const updates = {
            id: user.id,
            username,
            website,
            updated_at: new Date(),
        }

        const { error } = await database.from('profiles').upsert(updates)

        if (error) {
            alert(error.message)
        }

        setLoading(false)
    }

    return (
        <form onSubmit={updateProfile} className="form-widget">
            <div>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="text"
                    value={session.user.email}
                    disabled
                />
            </div>
            <div>
                <label htmlFor="username">Name</label>
                <input
                    id="username"
                    type="text"
                    required
                    value={username || ''}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setUsername(e.target.value)
                    }
                />
            </div>
            <div>
                <label htmlFor="website">Website</label>
                <input
                    id="website"
                    type="url"
                    value={website || ''}
                    onChange={(e) => setWebsite(e.target.value)}
                />
            </div>

            <div>
                <button
                    className="button block primary"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? 'Loading ...' : 'Update'}
                </button>
            </div>

            <div>
                <button
                    className="button block"
                    type="button"
                    onClick={() => database.auth.signOut()}
                >
                    Sign Out
                </button>
            </div>
        </form>
    )
}
