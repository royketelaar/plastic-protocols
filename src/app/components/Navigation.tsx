import Link from "next/link";

interface NavigationProps {
  pages: { title: string; slug: string }[];
}

const Navigation = ({ pages }: NavigationProps) => {
  return (
    <nav className="h-24">
      <ul className="flex items-center justify-center space-x-4">
        {pages.map(({ title, slug }) => (
          <li key={title}>
            <Link
              href={`/${slug}`}
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
