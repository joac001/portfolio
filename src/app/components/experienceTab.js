'use client'
import ExperienceHeader from "@/app/components/experienceHeader";

export default function ExperienceTab() {
    function showContent() {
        alert('Mostrar contenido');
    }
    return(
        <section>
            <ExperienceHeader title="Experiencia" onClick={showContent}/>
            {/*<ExperienceContent />*/}
        </section>
    );
}