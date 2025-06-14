"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
 
type Props = {
  total: number;
  growthPercentage: number;
  icon: string;
  title: string;
  href?: string;
};
 
export default function TotalStatCard({
  total,
  growthPercentage,
  icon,
  title,
  href,
}: Props) {
  const isGrowthUp = growthPercentage > 0;
  const router = useRouter();
 
  const handleClick = () => {
    if (href) router.push(href);
  };
 
  return (
    <div
      onClick={handleClick}
      className={`rounded-xl border bg-white p-4 shadow-sm flex items-start justify-between w-[278px] ${
        href ? "cursor-pointer hover:shadow-md transition" : ""
      }`}
    >
      <div className="flex flex-col gap-4">
        <div>
          <Image src={icon} alt="icon" width={44} height={44} />
        </div>
        <div>
          <p className="text-3xl font-semibold text-gray-900">
            {total.toLocaleString("en-US")}
          </p>
          <p className="text-gray-500 text-base capitalize font-medium">
            {title}
          </p>
        </div>
      </div>
 
      <div className="text-black flex flex-col items-end gap-2 text-sm font-semibold">
        <div className="flex items-center gap-2 ">
          {Math.abs(growthPercentage)}%
          <Image
            src={
              isGrowthUp ? "/growthIndicatorUp.svg" : "/growthIndicatorDown.svg"
            }
            width={25}
            height={25}
            alt={isGrowthUp ? "growth up" : "growth down"}
          />
        </div>
        <span className="font-normal text-gray-400">VS LAST WEEK</span>
      </div>
    </div>
  );
}