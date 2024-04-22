
import TecGridDesktop from "@/app/components/tecGridDesktop";
import TecGridMobile from "@/app/components/tecGridMobile";
import AbilityTags from "@/app/components/abilityTags";

export default function Home() {

    return (
        <section className="min-[1250px]:mt-10">

            <span className="max-[1250px]:hidden">
                <TecGridDesktop/>
            </span>
            <span className="min-[1251px]:hidden">
                <TecGridMobile/>
            </span>

            <AbilityTags/>
        </section>
    );
}
