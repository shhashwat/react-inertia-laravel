import { Head, Link, usePage } from "@inertiajs/react";
import { useRoute } from "../../../vendor/tightenco/ziggy";
import { useState } from "react";

const Home = ({posts}) => {

  const route = useRoute();

  const { flash } = usePage().props;
  const { component } = usePage();

  const [flashMsg, setFlashMsg] = useState(flash.message);

  setTimeout(() => {
      setFlashMsg(null);
  }, 2000);

  return (
      <div className="flex flex-col items-center justify-center">
          <Head title={component}/>
          <h1 className="text-3xl font-bold m-4">Home Page</h1>
          {flashMsg && <div className="m-4 text-green-500"> {flashMsg} </div>}
          <div className="grid grid-cols-3 gap-4 m-4">
              {posts.data.map((post) => (
                  <Link
                      href={route("posts.show", post.id)}
                      key={post.id}
                  >
                      <div className="mt-2 px-6 py-4 border border-gray-300 rounded shadow-md mb-2 space-y-1 min-h-full">
                          <p className="text-sm text-gray-600 text-left">
                              Posted on:{" "}
                              {new Date(post.created_at).toLocaleTimeString(
                                  "en-US",
                                  {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                  }
                              )}
                          </p>
                          <p className="font-semibold">
                              {post.body.length > 100 ? (
                                  <>
                                      {post.body.slice(0, 100)}
                                      <span className="underline text-link">
                                          ... read more
                                      </span>
                                  </>
                              ) : (
                                  post.body
                              )}
                          </p>
                          {/* <Link href={`/posts/${post.id}`} className="text-link">read more...</Link> */}
                      </div>
                  </Link>
              ))}
          </div>
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
