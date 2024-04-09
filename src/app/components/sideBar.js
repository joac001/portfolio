'use client';
import NavBar from "@/app/components/navBar";
import Image from "next/image";

export default function SideBar() {
    return (
        <section>
            <NavBar/>
            <div className="flex flex-col">
                <Image src="/profile-picture.png" className="self-center" width={400} height={400} alt="Joaquín Ordóñez"></Image>

                <span className="w-80 h-1 bg-gray-500 self-center"></span>

                <span className="gird grid-cols-3 gap-0">
                    <span className="flex items-center">
                        <Image src="/location-icon.png" width={100} height={100} alt="Ubicacion"></Image>
                        <h1>Pilar, Buenos Aires</h1>
                    </span>

                    <span className="flex items-center mt-2">
                        <Image src="/email-icon.png" width={100} height={100} alt="Ubicacion"></Image>
                        <h1>joacoordo@gmail.com</h1>
                    </span>

                    <span className="flex items-center">
                        <Image src="/wpp-icon.png" width={100} height={100} alt="Ubicacion"></Image>
                        <h1>+54 11 63000-5345</h1>
                    </span>
                </span>
            </div>
        </section>
    );
}