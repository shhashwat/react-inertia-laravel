import { Link } from "@inertiajs/react";

const Home = ({posts}) => {
  return (
      <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold">Home Page</h1>
          {posts.data.map((post) => (
              <div
                  className="mt-4 px-6 py-4 border border-gray-300 rounded shadow-md mb-2 space-y-1"
                  key={post.id}
              >
                  <p className="text-sm text-gray-600 text-left">
                      Posted on:{" "}
                      {new Date(post.created_at).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                      })}
                  </p>
                  <p className="underline font-semibold">{post.body}</p>
              </div>
          ))}
          <footer className="flex space-x-2 m-4">
              {posts.links.map((link, index) => (
                  <Link
                      key={index}
                      href={link.url ?? "#"}
                      className={`px-3 py-1 border rounded ${
                          link.active
                              ? "bg-blue-500 text-white"
                              : link.url
                              ? "text-blue-600 hover:underline"
                              : "text-gray-400 cursor-not-allowed"
                      }`}
                      preserveScroll
                      dangerouslySetInnerHTML={{ __html: link.label }}
                      disabled={!link.url}
                  />
              ))}
          </footer>
      </div>
  );
}

export default Home
