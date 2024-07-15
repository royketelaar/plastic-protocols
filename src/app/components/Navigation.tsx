// "use client";

// import { useEffect, useState } from "react";
// import { fetchEntries, fetchNavigationEntries } from "../lib/contentful";

// // components/Navigation.tsx
// const Navigation = () => {
//   const [menuItems, setMenuItems] = useState<any[]>([]);
//   useEffect(() => {
//     fetchNavigationEntries().then((menuItems) => {
//       // Filter or process entries as needed to get navigation entries
//       setMenuItems(menuItems);
//     });
//   },);

//   return (
//     <nav className="h-24">
//       <ul className="flex items-center justify-center space-x-4">
//         {menuItems.map((menuItem) => (
//           <li key={menuItem.index}>
//             <a
//               href={`/${menuItem.toLowerCase()}`}
//               className="text-white hover:text-gray-300 font-bold"
//             >
//               {menuItem}
//             </a>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// };

// export default Navigation;

// components/Navigation.tsx

import Link from "next/link";

interface NavigationProps {
  pages: string[];
}

const Navigation = ({ pages }: NavigationProps) => {
  return (
    <nav className="h-24">
      <ul className="flex items-center justify-center space-x-4">
        {pages.map((title) => (
          <li key={title}>
            <Link
              href={`/${title}`}
              className="text-white hover:text-gray-300 font-bold"
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
