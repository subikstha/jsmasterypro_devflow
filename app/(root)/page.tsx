import { auth, signOut } from "@/auth"

const Home = async () => {
  const session = await auth()
  console.log(session)
  return <>
  <h1 className="h1-bold">Welcome to the world of NextJS</h1>
  <h1 className="h1-bold font-space-grotesk">Welcome to the world of NextJS</h1>

  
  </>
}

export default Home