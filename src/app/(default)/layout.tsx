import RootContainer from "@/components/rootContainer";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <RootContainer>{children}</RootContainer>;
};

export default Layout;
