import { ReactNode } from 'react'

interface NavLinkProps {
  path: string
  active: boolean
  children: ReactNode
}

function NavLink({ path, active, children }: NavLinkProps) {
  const colorClass = active ? 'text-sky-500' : 'text-zinc-900'

  return (
    <a href={path} className={`${colorClass} font-semibold hover:text-sky-600`}>
      {children}
    </a>
  )
}

export default NavLink
