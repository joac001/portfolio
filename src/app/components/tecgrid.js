import Image from "next/image";

export default function TecGrid(){
    const tecnologies= ["Java", "C", "C++", "C#", "Python", "JavaScript", "Dart", "SmallTalk", "Flutter", "React", "NextJS", "Vercel", "CSS3", "Bootstrap", "Tailwind", "HTML5"];

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

    return (
        <section className="m-5">
            <h1 className="font-bold mb-4">TECNOLOGIAS</h1>
            <div className="grid grid-cols-8 gap-4">
                {
                    tecnologies.map((tech, index) => (
                        <div key={index} className="grid grid-rows-[auto, auto] bg-gray-700/65 h-32 w-24">
                            <h1 className="font-bold justify-self-center">{tech}</h1>

                            {
                                tech !== "SmallTalk" ? <img src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${strToImg(tech)}/${strToImg(tech)}-original.svg`}
                                                            className="justify-self-center" alt={tech} width={80} height={80}/>
                                    : <Image src="/smalltalk-pharo.png"
                                           className="justify-self-center" alt={tech} width={80} height={80}/>
                            }

                            </div>
                    ))
                }
            </div>
        </section>

    );
}