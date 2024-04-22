export default function AbilityTags() {
    const tools = ["TDD", "SOLID", "Scrum", "GIT", "POO", "Patrones de diseño"];
    const so = ["Ubuntu 19.20+", "Windows 7, 10, 11", "Kali 2021+"];
    const lang = ["Ingles bilingüe"];

    return (
        <section className="flex flex-col justify-self-center m-5 max-[1250px]:items-center">
            <h1 className="font-bold mb-5">HABILIDADES</h1>

            <table>
                <tbody>
                <tr>
                    <td className="flex flex-wrap gap-2">
                        {tools.map((ability, index) => (
                            <span key={index}
                                  className="bg-[#BDE3FF] text-center rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mb-2">{ability}</span>
                        ))}
                    </td>
                    <td className="flex flex-wrap gap-2">
                        {so.map((ability, index) => (
                            <span key={index}
                                  className="inline-block bg-[#AFF4C6] text-center rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mb-2">{ability}</span>
                        ))}
                    </td>
                    <td className="flex flex-wrap gap-2">
                        {lang.map((ability, index) => (
                            <span key={index}
                                  className="inline-block bg-[#E4CCFF] text-center rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mb-2">{ability}</span>
                        ))}
                    </td>
                </tr>
                </tbody>
            </table>

        </section>
    );
}