import RootContainer from "@/components/rootContainer";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="mt-[75px] w-full">{children}</div>;
};

export default Layout;
