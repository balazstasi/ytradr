import Auth from './pages/Auth.tsx'
import Account from './pages/Account.tsx'
import { useConnectToDatabase } from './lib/db/use-connect-to-database.ts'

function App() {
    const { session } = useConnectToDatabase()

    return (
        <div className="container" style={{ padding: '50px 0 100px 0' }}>
            {!session ? (
                <Auth />
            ) : (
                <Account key={session.user.id} session={session} />
            )}
        </div>
    )
}

export default App
