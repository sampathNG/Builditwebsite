import Navbar from "@/components/Navbar";
import NavbarWithoutDark from "@/components/NavbarWithoutdark";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main>
        {/* <Navbar /> */}
        <NavbarWithoutDark />
        {children}
      </main>
    </>
  );
}
