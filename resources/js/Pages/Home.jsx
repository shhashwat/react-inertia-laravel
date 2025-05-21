import { Link } from "@inertiajs/react"

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Halloooo</h1>

      <Link preserveScroll href="/" className="block mt-[1000px] title">
        {new Date().toLocaleDateString("en-UK", {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          weekday: "long",
          hour12: true,
        })}
      </Link>
    </div>
  )
}

export default Home
