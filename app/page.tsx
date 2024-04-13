import { getPosts } from "@/datas/posts";
import { format } from "date-fns";
import Form from "./components/form";

export default async function Home() {
  const posts = await getPosts();

  if (!posts) {
    return null;
  }

  return (
    <main className="container max-2xl">
      <Form />


      <div className="space-y-2 container my-6">
        {posts.map((post) => (
          <div className="p-4 border rounded shadow-sm" key={post.id}>
            <h2>{post.body}</h2>
            <p>{format(post.createdAt, "yyyy年MM月dd日")}</p>
          </div>
        ))}
      </div>
    </main>
  );
}