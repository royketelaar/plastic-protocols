import Link from "next/link";

interface NavigationProps {
  pages: {
    title: string;
    slug: string;
    childPage?: { title: string; slug: string };
  }[];
  onClose: () => void;
}

const MenuContent = ({ pages, onClose }: NavigationProps) => {
  return (
    <div className="fixed inset-0 bg-sky-950 flex justify-center items-center z-10 top-24">
      <nav>
        <ul className="flex">
          {pages.map(({ title, slug, childPage }) => (
            <div key={title}>
              <li className="ml-4">
                <Link
                  href={`/${slug}`}
                  className="text-blue-500 hover:text-blue-800"
                  onClick={onClose}
                >
                  {title}
                </Link>
              </li>
              <Link onClick={onClose} href={`/${childPage?.slug}`}>
                {childPage?.title}
              </Link>
            </div>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default MenuContent;
