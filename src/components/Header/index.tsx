import SignIn from '../SignIn'

export default function Header() {
  return (
    <header className="fixed top-0 right-0 left-0 flex min-h-20 justify-end bg-white p-4 shadow-md">
      <SignIn />
    </header>
  )
}
