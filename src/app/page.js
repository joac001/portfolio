'use client';
import TecGrid from "@/app/components/tecgrid";
import AbilityTags from "@/app/components/abilityTags";

export default function Home() {
    return (
        <section className="justify-self-center">
            <TecGrid/>
            <AbilityTags/>
        </section>
    );
}
