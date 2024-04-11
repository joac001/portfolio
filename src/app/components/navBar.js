'use client';
import {useCallback, useEffect, useMemo, useState} from "react";
import Link from "next/link";

export default function NavBar() {
    const [page, setPage] = useState();

    const pages = useMemo(() => {
        return {
            Inicio: {
                'idx': 0,
                'url': '/'
            },
            Chat: {
                'idx': 1,
                'url': '/chat'
            },
            Experiencias: {
                'idx': 2,
                'url': '/experiencias'
            }
        };

    }, []);

    const handleChangeView = useCallback((newPageUrl) => {
        switch (newPageUrl) {
            case pages.Inicio.url:
                setPage(pages.Inicio.idx);
                break;
            case pages.Chat.url:
                setPage(pages.Chat.idx);
                break;
            case pages.Experiencias.url:
                setPage(pages.Experiencias.idx);
                break;
            default:
                break;
        }
    }, [pages]);
    
    useEffect(() => {
        handleChangeView(window.location.pathname);
    }, [handleChangeView]);

    return (
        <section className="relative mb-20 max-[1000px]:justify-center">
                <nav className="fixed top-0 left-0 right-0 flex flex-row justify-around items-center h-[5vh] bg-gradient-to-b from-black to-transparent p-4 pt-8 max-[1000px]:w-full">
                <div className="flex flex-row justify-between items-center">
                    <Link href={pages.Inicio.url} onClick={() => handleChangeView(pages.Inicio.url)}>
                        <span
                            className={`flex justify-center items-center text-black font-bold ml-2 rounded-full bg-white w-10 h-10`}>JO</span>
                    </Link>
                    <Link href={pages.Inicio.url} onClick={() => handleChangeView(pages.Inicio.url)}>
                        <span
                            className={`ml-14 max-[1000px]:ml-8 ease-in-out duration-200 ${page === pages.Inicio.idx ? 'border-2 rounded-xl p-1' : ''}`}>Inicio</span>
                    </Link>
                    <Link href={pages.Chat.url} onClick={() => handleChangeView(pages.Chat.url)}>
                        <span
                            className={`ml-14 max-[1000px]:ml-8 transition-all ease-in-out duration-100 ${page === pages.Chat.idx ? 'border-2 rounded-xl p-1' : ''}`}>Chat</span>
                    </Link>
                    <Link href={pages.Experiencias.url} onClick={() => handleChangeView(pages.Experiencias.url)}>
                        <span
                            className={`ml-14 max-[1000px]:ml-8 transition-all ease-in-out duration-100 ${page === pages.Experiencias.idx ? 'border-2 rounded-xl p-1' : ''}`}>Experiencias</span>
                    </Link>
                </div>
            </nav>
        </section>
    );
}