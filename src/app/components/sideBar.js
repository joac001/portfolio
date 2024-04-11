'use client';
import NavBar from "@/app/components/navBar";
import {useEffect, useState} from "react";
import Image from "next/image";

export default function SideBar() {
    const [profileImageSize, setProfileImageSize] = useState(0);

    useEffect(() => {
        switch (screen.width){
            case screen.width < 900:
                setProfileImageSize(400);
                break;
            case screen.width < 450:
                setProfileImageSize(100);
                break;
            default:
                setProfileImageSize(400);
                break;
        }
    }, []);

    function handleCopyInfo(copyId){
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
            <section className="flex flex-col items">
                <span className="
                flex flex-col justify-center items-start gap-4
                max-[1000px]:flex-row max-[1000px]:text-xs
            ">
                    <span className="flex items-center text-xl bg-green-700 rounded-xl p-2 ml-5" onClick={() => handleCopyInfo(0)}>
                        <span className="material-symbols-outlined min-[1000px]:mr-2">
                            location_on
                        </span>
                        <p1 className="max-[1000px]:hidden">Pilar, Buenos Aires</p1>
                    </span>

                    <span className="flex items-center text-xl bg-green-700 rounded-xl p-2 ml-5" onClick={() => handleCopyInfo(1)}>
                        <span className="material-symbols-outlined min-[1000px]:mr-2">
                            mail
                        </span>
                        <p className="max-[1000px]:hidden">joacoordo@gmail.com</p>
                    </span>

                    <span className="flex items-center text-xl bg-green-700 rounded-xl p-2 ml-5" onClick={() => handleCopyInfo(2)}>
                        <span className="material-symbols-outlined min-[1000px]:mr-2">
                            phone_iphone
                        </span>
                        <p className="max-[1000px]:hidden">+54 11 63000-5345</p>
                    </span>
            </span>
            <Image src="/profile-picture.png" className="self-center" width={profileImageSize}
                   height={profileImageSize} alt="Joaquín Ordóñez"/>
            </section>
        </section>
    );
}