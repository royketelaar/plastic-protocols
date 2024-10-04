import React, { ReactNode } from "react";

interface ContentBodyProps {
  children: ReactNode;
}

const ContentBody: React.FC<ContentBodyProps> = ({ children }) => {
  return (
    <div>{children}</div>
  );
};

export default ContentBody;
