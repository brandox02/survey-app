'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
   label: string;
   to: string;
   icon: any;
}

const extract = (path: string) => path.split('/').filter(x => x !== 'backoffice')[1];

export default function MenuItem({ label, to, icon: Icon }: Props) {
   const pathname = usePathname();
   const isActive = extract(pathname) === extract(to);
   return <Link
      className="flex my-2 cursor-pointer px-12 py-3 rounded-lg items-center"
      style={{ backgroundColor: isActive ? '#0045BE' : '' }}
      href={to}
   >
      <div>
         <Icon size={40} />
      </div>
      <div className="font-normal text-base ml-1 text-center">{label}</div>
   </Link>
}