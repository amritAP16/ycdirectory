import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import markdownit from "markdown-it";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";


const md = markdownit()

export const experimental_ppr = true;

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });

  if (!post) return notFound();

  const parsedContent = md.render(post?.pitch || "");

  return (
    <>
      <section className="pink_container pattern !min-h-[230px]">
        <p className="tag tag-tri">{formatDate(post?._createdAt)}</p>
        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading !max-w-5xl">{post.description}</p>
      </section>

      <section className="section_container">
        <img
          src={post.image}
          alt="thumnail"
          className="w-full h-auto rounded-2xl"
        />

        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex justify-between gap-5">
            <Link
              href={`/user/${post.author?._id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={post.author.image}
                alt="avatar"
                width={58}
                height={58}
                className="rounded-full drop-shadow-lg"
              />
              <div>
                <p className="text-20 font-medium">{post.author.name}</p>
                <p className="text-16 font-medium !text-gray-500">@{post.author.username}</p>
              </div>
            </Link>
            <div className="w-40 h-15 flex items-center mt-5 "><p className="category-tag" >{post.category}</p></div>
          </div>
          <h3 className="text-3xl font-extrabold">Pitch Details</h3>
            {parsedContent ? (
              <article
                className="prose"
                dangerouslySetInnerHTML={{__html: parsedContent}}/>
            ) : (
              <p className="no-result">No details Provided</p>
            )}
        </div>

        <hr className="divider" />

        <Suspense fallback={<Skeleton className="view_sekelton"/>}>
            <View id={id}/>
        </Suspense>
      </section>
    </>
  );
};

export default page;
