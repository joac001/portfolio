export default function BotBubble({text}) {
    return (
        // Chat bubble like every chat app
        <span className="flex flex-wrap justify-start max-w-[65%]">
            <div className="bg-white rounded-lg p-2 m-2">
                <p className="text-black">{text}</p>
            </div>
        </span>

    );
}