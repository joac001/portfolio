'use client';
import {useState} from "react";
import Image from "next/image";

export default function TecGridMobile(){

    function strToImg(str) {
        if (str === "C++") {
            return "cplusplus";
        } else if (str === "C#") {
            return "csharp";
        } else if (str === "Tailwind") {
            return "tailwindcss";
        }
        return str.toLowerCase();
    }

    const technologies= ["Java", "C", "C++", "C#", "Python", "JavaScript", "Dart", "SmallTalk", "Flutter", "React", "NextJS", "Vercel", "CSS3", "Bootstrap", "Tailwind", "HTML5"];
    const techChunks = [];
    for (let i = 0; i < technologies.length; i += 4) {
        techChunks.push(technologies.slice(i, i + 4));
    }

    const [currentChunkIndex, setCurrentChunkIndex] = useState(0);

    const handleNext = () => {
        setCurrentChunkIndex((currentChunkIndex + 1) % techChunks.length);
    };

    const handlePrev = () => {
        setCurrentChunkIndex((currentChunkIndex - 1 + techChunks.length) % techChunks.length);
    };


    return (
        <section className="flex flex-col items-center">
            <h1 className="font-bold mb-4" id="title">TECNOLOGIAS</h1>
            <span className="flex justify-center items-center">
            <button className="flex items-center bg-green-700 p-3 mr-3 shadow-lg shadow-green-950 hover:shadow-none" onClick={handlePrev}>
                <span className="material-symbols-outlined">
                    arrow_left_alt
                </span>
            </button>
            <div className="grid grid-cols-2 grid-rows-2 gap-4 transition-all ease-in-out">
                {techChunks[currentChunkIndex].map((tech, index) => (
                    <div key={index} className="grid grid-rows-[auto,auto] bg-gray-700/65 h-32 w-24">
                        <h1 className="font-bold justify-self-center">{tech}</h1>
                        {
                            tech !== "SmallTalk" ? <Image
                                    src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${strToImg(tech)}/${strToImg(tech)}-original.svg`}
                                    className="justify-self-center" alt={tech} width={80} height={80}/>
                                : <Image src="/smalltalk-pharo.png"
                                         className="justify-self-center" alt={tech} width={80} height={80}/>
                        }
                    </div>
                ))}
            </div>
            <button className="flex items-center bg-green-700 p-3 ml-3 shadow-lg shadow-green-950 hover:shadow-none" onClick={handleNext}>
                <span className="material-symbols-outlined">
                    arrow_right_alt
                </span>
            </button>
        </span>
        </section>
    );
}