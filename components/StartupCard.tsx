import { formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
  const {
    _createdAt,
    views,
    author: { _id: authorId, name },
    title,
    category,
    _id,
    image,
    description,
  } = post;

  return (
    <li className="startup-card group">
      <div className="flex justify-between">
        <p className="startup_card_date text-black">
          {formatDate(post._createdAt)}
        </p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-16 font-medium"> {post.views} </span>
        </div>
      </div>

      <div className="flex justify-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${post.author?._id}`}>
            <p className="text-16 font-medium line-clamp-1">{name}</p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className="text-26 font-semibold line-clamp-1">{title}</h3>
          </Link>
        </div>
        <Link href={`/user/${post.author?._id}`}>
          <Image
            src="https://placehold.co/48x48"
            alt="placeholder"
            width={48}
            height={48}
            className="rounded-full"
          />
        </Link>
      </div>

      <Link href={`/startup/${_id}`}>
        <p className="startup-card_desc">{description}</p>

        <Image src={image} alt="placeholder" className="startup-card_img" />
      </Link>

      <div className="flex justify-between gap-3 mt-5">
        <Link href={`/query=${category.toLowerCase()}`}>
          <p className="text-16 font-medium">{category}</p>
        </Link>
        <Button className="startup-card_btn" asChild>
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};

export default StartupCard;
