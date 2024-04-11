'use client';
import {useState} from "react";
import BotBubble from "@/app/components/botBubble";
import UserBubble from "@/app/components/userBubble";
import QuestionOption from "@/app/components/questionOption";

export default function Chat() {
    const questions =["¿Que puedes contarme sobre ti?", "¿que estudias y porque?", "¿cuales son tus fortalezas y debilidades?", "¿Cuales son tus metas a futuro?"];
    const responses =[""];
    const [conversation, setConversation] = useState(["B:Hola, soy Joaquín Ordóñez. Preguntame lo que quieras."]);

    function askQuestion(newQuestionIdx) {
        setConversation(conversation.clear());
        setConversation(conversation.add("U:" + questions[newQuestionIdx]));
        setConversation(conversation.add("B:" + responses[newQuestionIdx]));
    }

    return (
        <section className="justify-self-center grid grid-cols-[90vh] grid-rows-[40vh,25vh] mt-25 min-[1000px]:mt-10">
            {/*Bot chat section*/}
            <section className="flex flex-col border-2 border-gray-500 rounded-2xl bg-gray-950 p-3">
                {
                    conversation.map((bubble, index) => (
                        (bubble.slice(0,2) === "B:") ?
                            <BotBubble key={index} text={bubble.slice(2)}/>
                        :
                            <UserBubble key={index} text={bubble.slice(2)}/>

                    ))
                }
            </section>

            {/*Options*/}
            <section className="flex flex-col-reverse flex-wrap-reverse justify-end items-start">
                {questions.map((question, index)=>
                    <QuestionOption key={index} text={question}/>
                )}
            </section>
        </section>
    );
}