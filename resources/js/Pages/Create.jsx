import { Head, useForm } from "@inertiajs/react"

const Create = () => {
  const {data, setData, post, errors, processing} = useForm({
    body: ''
  });

  const submit = (e) => {
      e.preventDefault();
      post('/posts', {
          onSuccess: () => {
              setData('body', '');
          },
      });
  }
  return (
      <>
          <Head title="Create Post" />
          <h1 className="title">Create a post</h1>
          <form onSubmit={submit} className="w-1/2 mx-auto">
              <textarea
                  name="body"
                  id="post"
                  rows="10"
                  value={data.body}
                  onChange={(e) => setData("body", e.target.value)}
                  className={errors.body ? '!ring-red-500' : ''}
              ></textarea>
              {errors.body && <div className="error">{errors.body}</div>}
              <button type="submit" className="primary-btn mt-4" disabled={processing}>
                  {processing ? "Creating..." : "Create Post"}
              </button>
          </form>
      </>
  );
}

export default Create
