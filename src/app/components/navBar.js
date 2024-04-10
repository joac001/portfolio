'use client';
import {useEffect, useState} from "react";
import Link from "next/link";

export default function NavBar() {
    const [page, setPage] = useState(0);

    const pages = {
    Inicio: {
            'idx': 0,
            'url': '/'
        },
    Chat: {
            'idx':1,
            'url':'/chat'
    },
    Experiencias: {
            'idx':2,
            'url':'/experiencias'
    }
};

    function handleClick(newPageIdx) {
        switch (newPageIdx) {
            case pages.Inicio.idx:
                setPage(pages.Inicio.idx);
                break;
            case pages.Chat.idx:
                setPage(pages.Chat.idx);
                break;
            case pages.Experiencias.idx:
                setPage(pages.Experiencias.idx);
                break;
            default:
                break;
        }
    }

    return (
        <nav className="fixed flex flex-row justify-between items-center h-[5vh] bg-[#000000] p-4 pt-5">
            <div className="flex flex-row justify-between items-center">
                <Link href={pages.Inicio.url} onClick={()=> handleClick(pages.Inicio.idx)}>
                    <span className={`flex justify-center items-center text-black font-bold ml-2 rounded-full bg-white w-10 h-10`}>JO</span>
                </Link>
                <Link href={pages.Inicio.url} onClick={()=> handleClick(pages.Inicio.idx)}>
                    <span className={`ml-14 max-[900px]:ml-8 transition-all ease-out ${page === pages.Inicio.idx ? 'border-2 rounded-xl p-1' : ''}`}>Inicio</span>
                </Link>
                <Link href={pages.Chat.url} onClick={()=> handleClick(pages.Chat.idx)}>
                    <span className={`ml-14 max-[900px]:ml-8 transition-all ease-in-out ${page === pages.Chat.idx ? 'border-2 rounded-xl p-1' : ''}`}>Chat</span>
                </Link>
                <Link href={pages.Experiencias.url} onClick={()=> handleClick(pages.Experiencias.idx)}>
                    <span className={`ml-14 max-[900px]:ml-8 transition-all ease-in-out ${page === pages.Experiencias.idx ? 'border-2 rounded-xl p-1' : ''}`}>Experiencias</span>
                </Link>
            </div>
        </nav>
    );
}