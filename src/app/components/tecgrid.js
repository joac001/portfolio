'use client';
import Image from "next/image";

export default function TecGrid(){
    const tecnologies= ["Java", "C", "C++", "C#", "Python", "JavaScript", "Dart", "SmallTalk", "Flutter", "JavaFX", "ReactJS", "Next.js", "Vercel", "CSS3", "Bootstrap", "Tailwind", "HTML5"];

    return (
        <section className="m-5">
            <h1 className="font-bold mb-4">TECNOLOGIAS</h1>
            <div className="grid grid-cols-8 gap-4">
                {
                    tecnologies.map((tec, index) => (
                        <div key={index} className="flex flex-col justify-center items-center bg-gray-700/65 h-32 w-24">
                            <h1 className="font-bold">{tec}</h1>
                            <Image src="/landscape-placeholder.svg" alt="placeholder" width={90} height={100} />
                        </div>
                    ))
                }
            </div>
        </section>

    );
}