import "@/ui/globals.css";
import SideBar from "@/app/components/sideBar";
import NavBar from "@/app/components/navBar";

export const metadata = {
  title: "Portfolio",
  description: "joaquín's portfolio",
};

export default function RootLayout({ children }) {
    return (
    <html lang="en">
        <body className="text-white bg-[#000000]">
            <div className="">
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.10.1/devicon.min.css"></link>

                <NavBar/>

                <div className="flex max-[1250px]:flex-col justify-around">

                    <SideBar/>
                    <main className="mt-14">
                        {children}
                    </main>

                </div>

            </div>
        </body>
    </html>
  );
}
