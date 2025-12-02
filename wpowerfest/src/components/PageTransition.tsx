import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setIsAnimating(true)
    const timer = setTimeout(() => {
      setIsAnimating(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [location.pathname])

  return (
    <div
      className={`transition-all duration-500 ease-in-out ${
        isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
      }`}
    >
      {children}
    </div>
  )
}

export default PageTransition

