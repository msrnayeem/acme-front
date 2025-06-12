// components/TotalUsersCard.tsx
import Image from "next/image";

type Props = {
  total: number;
  icon: string;
  title: string;
  currency?: boolean;
};

export default function TotalStatUserDetailsCard({
  total,
  icon,
  title,
  currency,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm flex items-start justify-between w-[278px] ">
      <div className="flex  flex-col  gap-4">
        <div>
          <Image src={icon} alt="icon" width={44} height={44} />
        </div>
        <div>
          <p className="text-3xl font-semibold text-gray-900">
            {currency && "$"} {total.toLocaleString("en-US")}
          </p>
          <p className="text-gray-500 text-base capitalize font-medium">
            {title}
          </p>
        </div>
      </div>
    </div>
  );
}
