export default function BotBubble({key, text}) {
    return (
        // Chat bubble like every chat app
        <span key={key} className="flex flex-wrap justify-start">
            <div className="bg-white rounded-lg p-2 m-2">
                <p className="text-black">{text}</p>
            </div>
        </span>

    );
}