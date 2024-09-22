'use client';

import '@rainbow-me/rainbowkit/styles.css';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

interface User {
  id: number,
  nickname: string,
  address: string,
  avatar?: string,
}

export const RegisterForm = () => {
  const [nickname, setNickname] = useState('')
  const [avatar] = useState('')

  const { address, isConnected } = useAccount()
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<User>()
  const [userLoading, setUserLoading] = useState(false)


  const fetchUser = async (userAddress: string) => {
    try {
      if (userLoading) return
      setUserLoading(true)
      const res = await fetch(`/api/user/${userAddress}`)
      if (res.status === 200) {
       const retUser = await res.json()
       setUser(retUser)
      }
    } finally {
      setUserLoading(false)
    }
  }

  useEffect(() => {
    if (address) {
      fetchUser(address)
    }
  }, [address])

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (!address) {
      return
    }
    if (loading) return
    setLoading(true)
    try {
      const body = { nickname, address, avatar }
      const res = await fetch(`/api/user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      // 201 created success
      if (res.status === 201) {
        // router.push('/')
        fetchUser(address)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (!isConnected && !address) {
    return null
  }

  // search user by address loading
  if (userLoading) {
    return null
  }
  
  return (
      <section className="w-full bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Create an account
                    </h1>
                    <form className="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                            <input disabled value={address} type="text" name="address" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="input your address" />
                        </div>
                        <div>
                            <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nickname</label>
                            <input defaultValue={user?.nickname} onChange={(e) => setNickname(e.target.value)} type="text" name="nickname" id="nickname" placeholder="Input your nickname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <button
                          type="button"
                          className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                          disabled={userLoading || loading}
                          onClick={onSubmit}
                        >
                          {user?.address ? 'Update' : 'Create an account'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
      </section>
    );
};