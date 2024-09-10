import Link from "next/link";

interface NavigationProps {
  pages: {
    title: string;
    slug: string;
    childPages?: any;
  }[];
  onClose: () => void;
}

const MenuContent = ({ pages, onClose }: NavigationProps) => {
  const currentUrl =
    typeof window !== "undefined" ? window.location.pathname : "";

  return (
    <div className="fixed inset-0 bg-sky-950 z-10 top-24 px-6">
      <nav>
        <ul>
          {pages.map(({ title, slug, childPages }) => (
            <li key={title}>
              <Link
                href={`/${slug}`}
                className="text-white underlined-header text-2xl font-bold mb-2"
                onClick={onClose}
              >
                {title.toUpperCase()}
              </Link>
              {childPages && (
                <ul className="mb-8">
                  {childPages.map((childPage: any) => (
                    <li key={childPage?.fields?.slug}>
                      <Link
                        href={`/${childPage?.fields?.slug}`}
                        className={`block text-white mb-2 ${
                          currentUrl.includes(childPage?.fields?.slug)
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
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-8">
        <Link href="https://x.com/plasticprotocol" className="text-sky-500">
          Follow <span className="underline">PlasticProtocols</span> on X
        </Link>
      </div>
    </div>
  );
};

export default MenuContent;
