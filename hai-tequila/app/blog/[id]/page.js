import Link from "next/link";

export default async function BlogPost({ params }) {
  // BƯỚC QUAN TRỌNG: Await params trước khi dùng (bắt buộc trong Next.js 15+)
  const resolvedParams = await params;
  const id = resolvedParams.id;

  // In ra Terminal (không phải console trình duyệt) để check chắc chắn ID đã ăn chưa
  console.log("👉 ID nhận được là:", id);

  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

  if (!res.ok) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl text-gray-500">Post not found. (Lỗi tại API hoặc ID)</p>
      </div>
    );
  }

  const post = await res.json();

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white p-6 sm:p-10 rounded-2xl shadow-sm border border-gray-100">
        <Link
          href="/"
          className="text-indigo-600 hover:text-indigo-800 font-semibold mb-8 inline-block transition-colors"
        >
          &larr; Back to Blog
        </Link>
        <article>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 capitalize leading-tight">
            {post.title}
          </h1>
          <div className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
            {post.body}
          </div>
        </article>
      </div>
    </main>
  );
}
