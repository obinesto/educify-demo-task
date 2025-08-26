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
} from "lucide-react";

interface sideBarType {
  text: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  link: string;
  hasExtension: boolean;
}
const SideBarItems: sideBarType[] = [
  { text: "Dashboard", icon: House, link: "/", hasExtension: false },
  { text: "Classes", icon: Shapes, link: "/classes", hasExtension: false },
  {
    text: "My listings",
    icon: TableProperties,
    link: "/listings",
    hasExtension: true,
  },
  {
    text: "Messages & Requests",
    icon: MessageCircleMore,
    link: "/messages",
    hasExtension: false,
  },
  {
    text: "Workspace",
    icon: BriefcaseBusiness,
    link: "/workspace",
    hasExtension: true,
  },
  { text: "Financials", icon: Wallet, link: "/financials", hasExtension: true },
  { text: "My Account", icon: User, link: "/account", hasExtension: false },
];
export default function SideBar() {
  return (
    <div>
      <ul>
        {SideBarItems.map((item, index) => (
          <li key={index}>
            <span>{item.icon}</span>
            <span>{item.text}</span>
            {item.hasExtension && (
              <button type="button" title="Expand">
                <ChevronRight />
              </button>
            )}
          </li>
        ))}
      </ul>
      <div>
        <span>
          <p>Available</p>
          <button type="button" title="Availability"></button>
        </span>
        <span>
          <Settings />
          <p>Settings</p>
        </span>
      </div>
    </div>
  );
}
