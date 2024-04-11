
import TecGridDesktop from "@/app/components/tecGridDesktop";
import TecGridMobile from "@/app/components/tecGridMobile";
import AbilityTagsDesktop from "@/app/components/abilityTagsDesktop";

export default function Home() {

    return (
        <section className="justify-self-center min-[1000px]:mt-10">

            <span className="max-[1000px]:hidden">
                <TecGridDesktop/>
            </span>
            <span className="min-[1001px]:hidden">
                <TecGridMobile/>
            </span>

            <AbilityTagsDesktop/>
        </section>
    );
}
