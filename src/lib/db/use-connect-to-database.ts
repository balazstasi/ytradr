import {useEffect, useState} from "react";
import type {Session} from "@supabase/supabase-js";
import database from "./database.ts";

export const useConnectToDatabase = () => {
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        database.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        database.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])

    return {
        session
    }
}