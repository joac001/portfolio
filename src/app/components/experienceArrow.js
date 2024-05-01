export default function ExperienceArrow() {
     
    return (
        <span>
            <button className={`p-1 ${active ? 'visible' : 'hidden'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-emerald-500" fill="currentColor"
                 viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
            </svg>
        </button>
        <button className={`p-1 ${!active ? 'visible' : 'hidden'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-emerald-500" fill="currentColor"
                 viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
            </svg>
        </button>
        </span>
    );
}