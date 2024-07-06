import { FC, ComponentType, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useHTTPSPrivate } from '@/hooks/useHTTPSPrivate'
import { useRouter } from 'next/navigation'

const withAuth = <P extends {}>(Component: ComponentType<P>): FC<P> => {
    return function WithAuth(props: P) {
        const { user } = useAuth()
        const router = useRouter()

        useHTTPSPrivate()

        useEffect(() => {
            if (!user) {
                router.push("/sign-in")
            }
        }, [user, router])

        return <Component {...props} />
    }
}

export default withAuth
