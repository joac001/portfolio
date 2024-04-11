export default function UserBubble({text}) {
    return (
        // Chat bubble like every chat app
        <span className="flex flex-wrap justify-end">
            <div className="bg-[#85E1A4] rounded-lg p-2 m-2">
                <p>{text}</p>
            </div>
        </span>

    );
}