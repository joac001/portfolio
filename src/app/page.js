
import TecGridDesktop from "@/app/components/tecGridDesktop";
import TecGridMobile from "@/app/components/tecGridMobile";
import AbilityTagsDesktop from "@/app/components/abilityTagsDesktop";

export default function Home() {

    return (
        <section className="felx flex-col">
            <span className="max-[1300px]:hidden">
                <TecGridDesktop/>
            </span>
            <span className="min-[1300px]:hidden">
                <TecGridMobile/>
            </span>
            <AbilityTagsDesktop/>
        </section>
    );
}
