export default function ExperienceArrow({onClick}) {

    function handleClick() {
        const arrow = document.getElementById('button-svg');
        arrow.classList.toggle('rotate-0');
        onClick();
    }

    return (
        <button className={`p-1`} onClick={handleClick}>
            <svg id="button-svg" xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-emerald-500 rotate-[-90deg] transition-all ease-in-out" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15l-7 -7h14l-7 7z"/>
            </svg>
        </button>
    );
}