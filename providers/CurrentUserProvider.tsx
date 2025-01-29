'use client'

import { onAuthStateChanged } from 'firebase/auth'
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

import Loading from '@/components/loading'
import { User } from '@/domain/User'
import { auth } from '@/infrastracture/service/firebase/config'
import { FirestoreUserService } from '@/infrastracture/service/firebase/firestore/firestore_user_service'

type AuthContextType = {
  currentUser: User | null
  isEmailVerified: boolean
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  isEmailVerified: false,
  setCurrentUser: () => null,
})

export const useAuthContext = () => useContext(AuthContext)

export const CurrentUserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isEmailVerified, setIsVerified] = useState<boolean>(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRepository = new FirestoreUserService()
        const userDTO = await userRepository.findById({ id: user.uid })

        // ユーザ情報を変換
        const response = new User({
          id: userDTO.id,
          email: userDTO.email,
          createdAt: userDTO.createdAt,
        })

        // 取得したユーザ情報を格納
        setCurrentUser(response)

        // メール認証済みかどうか
        if (user.emailVerified) {
          setIsVerified(true)
        } else {
          setIsVerified(false)
        }
      } else {
        // ユーザ情報が取得できなかった場合はnullを格納
        setCurrentUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isEmailVerified,
        setCurrentUser,
      }}
    >
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  )
}
