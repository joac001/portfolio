export default function QuestionOption({text, qIndex, onClick}) {
    return (
        <button onClick={()=>onClick(qIndex)} className="flex flex-wrap justify-center text-white bg-[#1AAEA3] border-2 border-[#1AAEA3] rounded-lg p-2 m-2 transition-all ease-in hover:bg-transparent">
            <div>
                <p className="flex flex-wrap">{text}</p>
            </div>
        </button>

    );
}