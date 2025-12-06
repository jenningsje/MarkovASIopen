import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useEffect } from "react";
import { Dropdown, dropdownMenuContentStyles, dropdownMenuItemStyles, } from "@/components/Dropdown/Dropdown";
import { dropdownMenuItemIconStyles } from "@/components/Dropdown/Dropdown.css";
import { Icon } from "@/components/Icon/Icon";
import { buttonStyles } from "./ModelSelector.css";
export const ModelSelector = ({ availableModels = [], selectedModel, activeModel, setSelectedModel, }) => {
    // Automatically select the first available model
    useEffect(() => {
        if (!activeModel && availableModels[0]) {
            setSelectedModel(availableModels[0]);
        }
    }, [activeModel, availableModels]);
    const handleValueChange = (value) => {
        const newModel = availableModels.find((model) => model.id === value);
        if (!newModel)
            return;
        setSelectedModel(newModel);
    };
    const dropdownContent = (_jsx(DropdownMenu.Content, { className: dropdownMenuContentStyles, sideOffset: 5, children: _jsx(DropdownMenu.RadioGroup, { value: selectedModel?.id, onValueChange: handleValueChange, children: availableModels.length > 0 ? (availableModels.map((model) => (_jsxs(DropdownMenu.RadioItem, { className: dropdownMenuItemStyles, value: model.id, children: [_jsx(DropdownMenu.ItemIndicator, { className: dropdownMenuItemIconStyles, children: _jsx(Icon.Check, {}) }), model.id] }, model.id)))) : (_jsx(DropdownMenu.Item, { disabled: true, className: dropdownMenuItemStyles, children: "No available models" })) }) }));
    return (_jsx(Dropdown, { content: dropdownContent, children: _jsx("div", { className: buttonStyles, children: activeModel?.id || "No model" }) }));
};
