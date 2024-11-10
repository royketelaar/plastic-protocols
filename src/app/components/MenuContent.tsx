import Link from "next/link";

interface NavigationProps {
  pages: {
    title: string;
    slug: string;
    childPages?: any;
  }[];
  onClose?: () => void;
}

const MenuContent = ({ pages, onClose }: NavigationProps) => {
  const currentUrl =
    typeof window !== "undefined" ? window.location.pathname : "";

  return (
    <div>
      <nav>
        <ul>
          {pages.map(({ title, slug, childPages }) => (
            <li key={title}>
              {childPages?.length && (
                <>
                  <Link
                    href={`/${slug}`}
                    className="text-sky-50 underlined-header text-2xl font-bold mb-2"
                    onClick={onClose}
                  >
                    {title.toUpperCase()}
                  </Link>
                  <ul className="mb-8">
                    {childPages.map((childPage: any) => (
                      <li
                        key={childPage?.fields?.slug}
                        className="flex hover:underline"
                      >
                        <span className="inline-block min-h-3 min-w-3 max-h-3 max-w-3 bg-teal-400 rounded-full mr-2 mt-2"></span>
                        <Link
                          href={`/${childPage?.fields?.slug}`}
                          className={`block text-sky-50 mb-2 text-lg ${
                            currentUrl?.includes(childPage?.fields?.slug)
                              ? "underline"
                              : ""
                          }`}
                          onClick={onClose}
                        >
                          {childPage?.fields?.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-8">
        <Link href="https://x.com/plasticprotocol" className="text-white" target="_blank" rel="noopener noreferrer">
          Follow <span className="underline text-sky-500">PlasticProtocols</span> on X
        </Link>
      </div>
    </div>
  );
};

export default MenuContent;
