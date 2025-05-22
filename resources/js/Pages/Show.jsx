import { useForm, usePage } from "@inertiajs/react";
import { useRoute } from "../../../vendor/tightenco/ziggy";
import { useEffect, useState } from "react";

const Show = ({post}) => {
  const { delete: destroy, data, setData, errors, processing, put } = useForm({
    body: post.body,
  });

  const route = useRoute();

  const { flash } = usePage().props;

  const [edited, setEdited] = useState(false);
  const [flashMsg, setFlashMsg] = useState(flash.message);
  const [errorsMsg, setErrorsMsg] = useState(flash.error);

  useEffect(() => {
    setTimeout(() => {
        setFlashMsg(null);
        setErrorsMsg(null);
    }, 2000);
  }, []);



  const submit = (e) => {
    e.preventDefault();
    destroy(route("posts.destroy", post));
  };

  const update = (e) => {
    e.preventDefault();
    put(route("posts.update", post), {
      onSuccess: () => {
        setEdited(false);
      },
    });
  };

  return (
      <>
        {flashMsg && <div className="m-4 text-green-500"> {flashMsg} </div>}
        {errorsMsg && <div className="m-4 text-red-500"> {errorsMsg} </div>}
          <div className="mt-2 px-6 py-4 border border-gray-300 rounded shadow-md mb-2 space-y-1 min-w-full">
              {edited ? (
                  <>
                      <form action="">
                          <textarea
                              name="body"
                              id="update"
                              rows="4"
                              value={data.body}
                              onChange={(e) => setData("body", e.target.value)}
                          ></textarea>

                          {errors.body && (
                              <div className="error">{errors.body}</div>
                          )}
                          <button
                              type="submit"
                              className="primary-btn mt-4"
                              onClick={update}
                              disabled={processing}
                          >
                              {processing ? "Updating..." : "Update Post"}
                          </button>
                      </form>
                  </>
              ) : (
                  <>
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
                      <p className="underline font-semibold">{post.body}</p>
                  </>
              )}

              <div className="flex items-center justify-end gap-2">
                  {!edited && (
                      <>
                          <form onSubmit={submit}>
                              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                  Delete
                              </button>
                          </form>
                          <button
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                              onClick={() => setEdited(!edited)}
                          >
                              Edit
                          </button>
                      </>
                  )}
              </div>
          </div>
      </>
  );
}

export default Show
