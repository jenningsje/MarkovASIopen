import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MenuItem } from "./MenuItem/MenuItem";
import { NewTask } from "./NewTask/NewTask";
import { wrapperStyles } from "./Sidebar.css";
export const Sidebar = ({ items = [], availableModels = [] }) => {
    return (_jsxs("div", { className: wrapperStyles, children: [_jsx(NewTask, { availableModels: availableModels }), items.map((item) => (_jsx(MenuItem, { ...item }, item.id)))] }));
};
