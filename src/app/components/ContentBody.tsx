import React, { ReactNode } from "react";

interface ContentBodyProps {
  children: ReactNode;
}

const ContentBody: React.FC<ContentBodyProps> = ({ children }) => {
  return (
    <div className="mx-auto max-w-4xl p-6 lg:p-0 text-sky-50">{children}</div>
  );
};

export default ContentBody;
