'use client'

import { motion } from 'motion/react'
import { use, useState } from 'react'
import Cookies from 'js-cookie'

import fetchShortenerApi from '@/api/fetchShortenerApi'
import useClickAway from '@/hooks/useClickAway'
import useRouterWithTransition from '@/hooks/useRouterWithTransition'
import { AUTH_TOKEN } from '@/constants'
import { AuthContext } from '@/context/Auth/Client'
import Button from '../Button'
import ChevronDown from '../icons/ChevronDown'
import Spinner from '../Spinner'

export default function UserMenu() {
  const [showMenu, setShowMenu] = useState(false)
  const { isPending, routeTo, refresh } = useRouterWithTransition()

  const menuRef = useClickAway<HTMLDivElement>(() => {
    if (showMenu) setShowMenu(false)
  })

  const { user } = use(AuthContext)
  const userNameFirstChar = user.name[0]

  const handleLogOut = async () => {
    try {
      const res = await fetchShortenerApi('/auth/sign-out', {
        method: 'POST',
      })
      if (res.ok) {
        Cookies.remove(AUTH_TOKEN)
        routeTo('/')
        refresh()
      }
    } catch {
      // TODO: show error toast
      console.log('Error logging out')
    }
  }

  return (
    <div className="relative" ref={menuRef}>
      <Button
        className="flex items-center gap-1"
        onClick={() => setShowMenu(!showMenu)}
      >
        <div className="bg-secondary flex h-10 w-10 items-center justify-center rounded-full p-4 font-bold text-white capitalize">
          {userNameFirstChar}
        </div>
        <ChevronDown size={16} />
      </Button>
      {showMenu ? (
        <motion.nav
          className="absolute top-full right-0 min-w-[180px] rounded-lg bg-black p-2 text-center text-white shadow-md"
          initial={{ opacity: 0, y: -5 }}
          animate={{
            opacity: 1,
            y: 0,
          }}
        >
          <motion.ul
            className="flex flex-col gap-2 font-semibold"
            initial={{ opacity: 0 }}
            transition={{ delay: 0.1 }}
            animate={{
              opacity: 1,
            }}
          >
            <li>
              <Button
                className="flex w-full items-center justify-center gap-2 px-0"
                onClick={handleLogOut}
                disabled={isPending}
              >
                {isPending && <Spinner />}
                <span>Logout</span>
              </Button>
            </li>
          </motion.ul>
        </motion.nav>
      ) : null}
    </div>
  )
}
