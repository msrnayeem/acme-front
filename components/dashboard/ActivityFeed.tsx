import { formatDistanceToNow } from "date-fns";
import Image from "next/image";

interface ActivityFeedProps {
  iconSrc: string;
  activity: string;
  time: string;
}

const ActivityFeed = ({ iconSrc, activity, time }: ActivityFeedProps) => {
  const relativeTime = formatDistanceToNow(new Date(time), { addSuffix: true }); // addSuffix: true will add "ago" or "in" to the output

  return (
    <div className="flex gap-3 items-start w-[290px] border-1 rounded-3xl border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition duration-200 ease-in-out">
      <div className="mt-1 flex items-center justify-center ">
        <Image
          src={iconSrc}
          alt="icon"
          width={44}
          height={44}
          className="rounded-full"
        />
      </div>
      <div className="font-medium">
        <p className=" text-sm leading-6 text-black">{activity}</p>
        <p className="text-gray-500 text-xs">{relativeTime} </p>
      </div>
    </div>
  );
};

export default ActivityFeed;
