import React from "react";
import { LucideIcon } from "lucide-react";

interface ContactInfoLineProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

const ContactInfoLine: React.FC<ContactInfoLineProps> = ({
  icon: Icon,
  label,
  value,
}) => {
  return (
    <div className="py-1.5">
      <p className="text-sm text-black">
        <Icon className="inline-block" size={16} />{" "}
        <span className="font-medium">{label}: </span>
        <span>{value}</span>
      </p>
    </div>
  );
};

export default ContactInfoLine;
