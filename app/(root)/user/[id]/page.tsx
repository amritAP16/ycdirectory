import { auth } from "@/auth";
import { StartupCardSkeleton } from "@/components/StartupCard";
import UserStartups from "@/components/UserStartups";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const experimental_ppr = true;

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();

  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });
  console.log(user)

  // if(!user) return notFound()

  return (
    <>
      <section className="profile_container">
        <div className="profile_card">
          <div className="profile_title">
            <h3 className="text-2xl font-bold text-black uppercase text-center line-clamp-1">
              Amrit Pandey
            </h3>
          </div>
          <Image
            src="https://i.pinimg.com/474x/bf/f0/1d/bff01dd0ae186d938f1af8ba127f12bd.jpg"
            alt="Luffy"
            width={220}
            height={220}
            className="profile_image"
          />
          <p className="text-white text-30 font-extrabold mt-7 text-center">
            @amritAP16
          </p>
          <p className="mt-1 text-white text-center font-medium ">Full Stack Developer</p>
        </div>

        <div className="flex-1 flex flex-col gap-5 lg:-mt-5"> 
            <p className="text-2xl font-bold">
            {session?.id === id ? "Your" : "All" } Startups 
            </p>
            <ul className="card_grid-sm">
                <Suspense fallback={<StartupCardSkeleton/>}>
                    <UserStartups id={id}/>
                </Suspense>
            </ul>
        </div>
      </section>
    </>
  );
};

export default page;
