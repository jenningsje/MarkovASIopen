import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import { FlowStatus } from "@/generated/graphql";
import { Button } from "../Button/Button";
import { Message } from "./Message/Message";
import { messagesListWrapper, messagesWrapper, modelStyles, newMessageTextarea, titleStyles, } from "./Messages.css";
export const Messages = ({ tasks, name, flowStatus, onSubmit, isNew, onFlowStop, model, }) => {
    const messages = tasks.map((task) => ({
        id: task.id,
        message: task.message,
        time: task.createdAt,
        status: task.status,
        type: task.type,
        output: task.results,
    })) ?? [];
    const messagesRef = useRef(null);
    const autoScrollEnabledRef = useRef(true);
    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            const message = e.currentTarget.value;
            e.currentTarget.value = "";
            onSubmit(message);
        }
    };
    useEffect(() => {
        const messagesDiv = messagesRef.current;
        if (!messagesDiv)
            return;
        const scrollHandler = () => {
            if (messagesDiv.scrollTop + messagesDiv.clientHeight + 50 >=
                messagesDiv.scrollHeight) {
                autoScrollEnabledRef.current = true;
            }
            else {
                autoScrollEnabledRef.current = false;
            }
        };
        messagesDiv.addEventListener("scroll", scrollHandler);
        return () => {
            messagesDiv.removeEventListener("scroll", scrollHandler);
        };
    }, []);
    useEffect(() => {
        const messagesDiv = messagesRef.current;
        if (!messagesDiv)
            return;
        if (autoScrollEnabledRef.current) {
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }
    }, [tasks]);
    const isFlowFinished = flowStatus === FlowStatus.Finished;
    return (_jsxs("div", { className: messagesWrapper, children: [name && (_jsxs("div", { className: titleStyles, children: [name, _jsx("span", { className: modelStyles, children: ` - ${model?.id}` }), " ", isFlowFinished ? (" (Finished)") : (_jsx(Button, { hierarchy: "danger", size: "small", onClick: onFlowStop, children: "Finish" })), " "] })), _jsx("div", { className: messagesListWrapper, ref: messagesRef, children: messages.map((message) => (_jsx(Message, { ...message }, message.id))) }), _jsx("textarea", { autoFocus: true, className: newMessageTextarea, placeholder: isFlowFinished
                    ? "The task is finished."
                    : isNew
                        ? "Type a new message to start the flow..."
                        : "Type a message...", onKeyPress: handleKeyPress, disabled: isFlowFinished })] }));
};
