'use client'
import { useAuth } from '@/context/auth-context'
import React from 'react'


const Profile = () => {
  const {signOut} = useAuth();
  return (
    <button onClick={signOut}>Logout</button>
  )
}

export default Profile