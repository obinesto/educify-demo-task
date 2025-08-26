"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Switch } from "@/app/components/ui/switch";
import { Label } from "@/app/components/ui/label";

export default function NavSectionTwo() {
  const [checkedStudentRole, setCheckedStudentRole] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/profile", label: "My Profile" },
    { href: "/availability", label: "My Availability" },
    { href: "/", label: "Recommendations" },
    { href: "/reviews", label: "Reviews" },
    { href: "/notifications", label: "Notifications" },
  ];

  return (
    <nav className="w-full h-16 flex justify-between items-center px-4 bg-white">
      <div className="w-3/4 flex items-center gap-8 text-sm">
        {navLinks.map((link) => {
          const isActive = pathname.startsWith(link.href);
          return (
            <Link
              key={link.label}
              href={link.href}
              className={`hover:text-foreground transition-colors ${
                isActive
                  ? "text-foreground underline"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="availability-button" className="whitespace-nowrap">
          Become a student
        </Label>
        <Switch
          id="availability-button"
          checked={checkedStudentRole}
          onCheckedChange={setCheckedStudentRole}
          className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-800 ml-2"
        />
      </div>
    </nav>
  );
}
