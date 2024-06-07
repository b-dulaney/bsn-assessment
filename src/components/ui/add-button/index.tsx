interface AddButtonProps {
  href: string
  children: React.ReactNode
}

function AddButton({ href, children }: AddButtonProps) {
  return (
    <a
      href={href}
      className="bg-sky-500 text-white inline-flex text-center rounded-lg px-3 py-1.5 shadow-sm font-semibold hover:bg-sky-600 transition-colors"
    >
      {children}
    </a>
  )
}

export default AddButton
