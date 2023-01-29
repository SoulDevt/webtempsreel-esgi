import { useState } from 'react'

const Home = () => {
  const [count, setCount] = useState(0)

  return (
    <div className="Home container mx-auto px-4 flex flex-col justify-center items-center">
      <h1>Bienvenue sur la page d'accueil</h1>
    </div>
  )
}

export default Home;