export default function AbilityTags() {
    const tools = ["TDD", "SOLID", "Scrum", "GIT", "Patrones de diseño", "POO"];
    const so = ["Ubuntu 19.20+", "Windows 7, 10, 11", "Kali 2021+"];
    const lang = ["Ingles bilingüe"];

    return (
        <section className="m-5">
            <h1 className="font-bold mb-5">HABILIDADES</h1>

            <table>
                <tbody>
                <tr>
                    <td className="flex">
                        {tools.map((ability, index) => (
                            <span key={index}
                                  className="inline-block bg-[#BDE3FF] rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{ability}</span>
                        ))}
                    </td>
                    <td className="flex">
                        {so.map((ability, index) => (
                            <span key={index}
                                  className="inline-block bg-[#AFF4C6] rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{ability}</span>
                        ))}
                    </td>
                    <td className="flex">
                        {lang.map((ability, index) => (
                            <span key={index}
                                  className="inline-block bg-[#E4CCFF] rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{ability}</span>
                        ))}
                    </td>
                </tr>
                </tbody>
            </table>

        </section>
    );
}