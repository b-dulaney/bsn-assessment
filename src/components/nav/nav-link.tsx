import { ReactNode } from 'react'

interface NavLinkProps {
  path: string
  active: boolean
  children: ReactNode
}

function NavLink({ path, active, children }: NavLinkProps) {
  const colorClass = active ? 'text-pink-400' : 'text-white'

  return (
    <a
      href={path}
      className={`${colorClass} font-semibold hover:text-pink-600`}
    >
      {children}
    </a>
  )
}

export default NavLink
