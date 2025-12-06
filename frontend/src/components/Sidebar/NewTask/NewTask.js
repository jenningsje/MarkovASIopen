import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@/components/Tooltip/Tooltip";
import { ModelSelector } from "./ModelSelector/ModelSelector";
import { linkWrapperStyles, wrapperStyles } from "./NewTask.css";
export const NewTask = ({ availableModels = [] }) => {
    const navigate = useNavigate();
    const [selectedModel, setSelectedModel] = useLocalStorage("model");
    const activeModel = availableModels.find((model) => model.id == selectedModel?.id);
    const handleNewTask = () => {
        navigate("/chat/new");
    };
    const tooltipContent = activeModel
        ? "Create a new flow"
        : "Please select a model first";
    return (_jsxs("div", { className: wrapperStyles, children: [_jsx(Tooltip, { content: tooltipContent, children: _jsx("button", { className: linkWrapperStyles, onClick: handleNewTask, disabled: !activeModel, children: "\u2728 New task" }) }), _jsx(ModelSelector, { availableModels: availableModels, selectedModel: selectedModel, activeModel: activeModel, setSelectedModel: setSelectedModel })] }));
};
