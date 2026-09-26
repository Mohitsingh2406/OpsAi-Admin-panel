import { db } from "@/lib/firebaseAdmin";
import BlogForm from "@/components/BlogForm";
import PageHeader from "@/components/ui/PageHeader";
import { notFound } from "next/navigation";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const doc = await db().collection("blogPosts").doc(id).get();

  if (!doc.exists) notFound();

  const data = doc.data()!;

  return (
    <div>
      <PageHeader title="Edit blog post" subtitle="Update the post and save your changes." />
      <BlogForm
        postId={id}
        initial={{
          title: data.title,
          slug: data.slug,
          excerpt: data.excerpt,
          content: data.content,
          status: data.status,
        }}
      />
    </div>
  );
}
