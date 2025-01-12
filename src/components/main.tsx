import { ReactNode } from "react"

interface MainProps {
 children: ReactNode
}

export default function Main({ children }: MainProps) {
 return (
  <main className="mt-8 p-4 lg:px-8">{children}</main>
 )
}