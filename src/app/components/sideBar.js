'use client';
import NavBar from "@/app/components/navBar";
import {useEffect, useState} from "react";
import Image from "next/image";

export default function SideBar() {
    const [iconsSize, setIconsSize] = useState(0);
    const [profileImageSize, setProfileImageSize] = useState(0);

    useEffect(() => {
        switch (screen.width){
            case screen.width < 900:
                setIconsSize(60);
                setProfileImageSize(400);
                break;
            case screen.width < 450:
                setIconsSize(30);
                setProfileImageSize(100);
                break;
            default:
                setIconsSize(100);
                setProfileImageSize(400);
                break;
        }
    }, []);

    function scrollToTitle() {
        const title = document.getElementById("title");
        if (title) title.scrollIntoView({ behavior: "smooth" });
    }

    function handleCopyInfo(copyId) {
        switch (copyId) {
            case 0:
                navigator.clipboard.writeText("Pilar, Buenos Aires");
                break;
            case 1:
                navigator.clipboard.writeText("joacoordo@gmail.com");
                break;
            case 2:
                navigator.clipboard.writeText("+54 11 63000-5345");
                break;
        }
        alert("Copied to clip board");
    }

    return (
        <section>
            <NavBar/>
            <div className="flex flex-col max-[900px]:grid max-[900px]:grid-rows-2 justify-center items-center my-2">
                <Image src="/profile-picture.png" className="self-center" width={profileImageSize}
                       height={profileImageSize} alt="Joaquín Ordóñez"></Image>

                <span className="w-80 h-1 bg-gray-500 self-center max-[900px]:hidden"></span>
                <button onClick={()=> scrollToTitle()} className="justify-self-center min-[900px]:hidden max-[900px]:visible">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 animate-pulse" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                    </svg>
                </button>

                <span className="
                    flex flex-col justify-center items-center mt-[-2%]
                    max-[900px]:flex-row max-[900px]:text-xs
                ">
                    <span className="flex items-center text-xl" onClick={()=>handleCopyInfo(0)}>
                        <Image src="/location-icon.png" width={iconsSize} height={iconsSize} alt="Ubicacion"></Image>
                        <p1 className="max-[900px]:hidden">Pilar, Buenos Aires</p1>
                    </span>

                    <span className="flex items-center text-xl mt-2" onClick={()=>handleCopyInfo(1)}>
                        <Image src="/email-icon.png" width={iconsSize} height={iconsSize} alt="Ubicacion"></Image>
                        <p className="max-[900px]:hidden">joacoordo@gmail.com</p>
                    </span>

                    <span className="flex items-center text-xl" onClick={()=>handleCopyInfo(2)}>
                        <Image src="/wpp-icon.png" width={iconsSize} height={iconsSize} alt="Ubicacion"></Image>
                        <p className="max-[900px]:hidden">+54 11 63000-5345</p>
                    </span>
                </span>
            </div>
        </section>
    );
}