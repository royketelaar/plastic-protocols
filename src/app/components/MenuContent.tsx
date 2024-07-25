import Link from "next/link";

interface NavigationProps {
  pages: { title: string; slug: string }[];
  onClose: () => void;
}

const MenuContent = ({ pages, onClose }: NavigationProps) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-90 z-50 flex justify-center items-center top-24">
      <nav>
        <ul className="flex">
          {pages.map(({ title, slug }) => (
            <li key={title} className="ml-4">
              <Link
                href={`/${slug}`}
                className="text-blue-500 hover:text-blue-800"
                onClick={onClose}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default MenuContent;
