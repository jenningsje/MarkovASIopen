import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { dropdownMenuContentStyles, dropdownMenuItemStyles, triggerStyles, } from "./Dropdown.css";
export const Dropdown = ({ children, content, ...rest }) => {
    return (_jsxs(DropdownMenu.Root, { ...rest, children: [_jsx(DropdownMenu.Trigger, { asChild: true, children: _jsx("button", { className: triggerStyles, "aria-label": "Customise options", children: children }) }), _jsx(DropdownMenu.Portal, { children: content })] }));
};
export { dropdownMenuItemStyles, dropdownMenuContentStyles };
