import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-neutral-200 flex h-dvh flex-col items-center justify-center">
      {children}
    </div>
  );
};

export default Layout;
