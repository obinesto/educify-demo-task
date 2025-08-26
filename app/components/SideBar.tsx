"use client";
import { useState } from "react";
import {
  House,
  Shapes,
  TableProperties,
  MessageCircleMore,
  BriefcaseBusiness,
  Wallet,
  User,
  ChevronRight,
  Settings,
  LogOut,
} from "lucide-react";
import { Switch } from "@/app/components/ui/switch";
import { Label } from "@/app/components/ui/label";

interface SideBarType {
  text: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  link: string;
  hasExtension: boolean;
  hasNotifications: boolean;
}
const SideBarItems: SideBarType[] = [
  { text: "Dashboard", icon: House, link: "/", hasExtension: false, hasNotifications: false },
  { text: "Classes", icon: Shapes, link: "/", hasExtension: false, hasNotifications: false },
  {
    text: "My listings",
    icon: TableProperties,
    link: "/",
    hasExtension: true,
    hasNotifications: false
  },
  {
    text: "Messages & Requests",
    icon: MessageCircleMore,
    link: "/",
    hasExtension: false,
    hasNotifications: true
  },
  {
    text: "Workspace",
    icon: BriefcaseBusiness,
    link: "/workspace",
    hasExtension: true,
    hasNotifications: false
  },
  { text: "Financials", icon: Wallet, link: "/financials", hasExtension: true, hasNotifications: false },
  { text: "My Account", icon: User, link: "/account", hasExtension: false, hasNotifications: false },
];
export default function SideBar() {
  const [availability, setAvailability] = useState(true);
  const [notifications, setNotifications] = useState(23);

  return (
    <div className="w-[19%] h-[88vh] bg-foreground text-background flex flex-col justify-between pt-6 px-4">
      <ul>
        {SideBarItems.map((item, index) => (
          <li key={index} className="relative flex items-center gap-2 mb-8">
            <span>
              <item.icon />
            </span>
            <span>{item.text}</span>
            {item.hasExtension && (
              <button type="button" title="Expand">
                <ChevronRight />
              </button>
            )}
            {item.hasNotifications && (
              <span className="absolute -right-3 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-xs">
                {notifications || 0}
              </span>
            )}
          </li>
        ))}
      </ul>
      <div className="mb-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="availability-button">
            {availability ? "Available" : "Unavailable"}
          </Label>
          <Switch
            id="availability-button"
            checked={availability}
            onCheckedChange={setAvailability}
            className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500 ml-2"
          />
        </div>
        <span className="flex items-center mt-4">
          <Settings />
          <p className="ml-2">Settings</p>
        </span>
        <span className="flex items-center mt-4">
          <LogOut />
          <p className="ml-2">Log Out</p>
        </span>
      </div>
    </div>
  );
}
