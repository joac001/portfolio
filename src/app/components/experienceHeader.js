import ExperienceArrow from "@/app/components/experienceArrow";

export default function ExperienceHeader({title, onClick}) {
    return (
        <section className="flex flex-row items-center">
            <h1>{title}</h1>
            <ExperienceArrow onClick={onClick}/>
        </section>
    );
}