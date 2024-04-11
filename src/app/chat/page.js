'use client';
import {useEffect, useRef, useState} from "react";
import BotBubble from "@/app/components/botBubble";
import UserBubble from "@/app/components/userBubble";
import QuestionOption from "@/app/components/questionOption";
import {wait} from "next/dist/lib/wait";

export default function Chat() {
    const questions =["¿Que puedes contarme sobre ti?", "¿que estudias y porque?", "¿cuales son tus fortalezas y debilidades?", "¿Cuales son tus metas a futuro?"];
    const responses = ["Soy un estudiante en la Universidad de Buenos Aires. Me apasiona la tecnología y la programación. Me gusta aprender cosas nuevas y enfrentar retos. ¿Quieres saber algo más?", "Estudio la carrera de Ingeniería en informatica ¿Porque? Me encantan los desafios y encontrarme con obstaculos a resolver. ¿Quieres saber algo más?", "Mis fortalezas son la responsabilidad, la perseverancia y la creatividad. Mis debilidades son la impaciencia y la falta de experiencia dentro de una empresa. ¿Quieres saber algo más?", "Mis metas a futuro son graduarme de la universidad, trabajar en una empresa de tecnología desarrollando soluciones y seguir aprendiendo y mejorando mis habilidades. ¿Quieres saber algo más?"]
    const [conversation, setConversation] = useState(["B:Hola, soy Joaquín Ordóñez. Preguntame lo que quieras."]);
    const [disableOptions, setDisableOptions] = useState(false);
    const chatEndRef = useRef(null);

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollTo(0, chatEndRef.current.scrollHeight);
        }

    }, [conversation]);


    function askQuestion(newQuestionIdx) {
        if (!disableOptions) {
            setDisableOptions(true);

            const newMessage = [...conversation, "U:" + questions[newQuestionIdx]];
            setConversation(newMessage);

            const newResponse = [...newMessage, "B:" + responses[newQuestionIdx]];
            wait(3000).then(() => {
                setConversation(newResponse);
                setDisableOptions(false);
            });
        }
    }

    return (
        <section className="justify-self-center grid grid-cols-[90vh] grid-rows-[40vh,25vh] mt-32 gap-10">
            {/*Bot chat section*/}
            <section ref={chatEndRef} className="scroll-auto overflow-y-scroll flex flex-col rounded-bl-2xl rounded-tl-2xl bg-gray-950 p-3">
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
                    <QuestionOption key={index} text={question} qIndex={index} onClick={askQuestion} />
                )}
            </section>
        </section>
    );
}