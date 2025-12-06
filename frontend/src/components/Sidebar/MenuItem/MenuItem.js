import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink } from "react-router-dom";
import { Icon } from "@/components/Icon/Icon";
import { checkIconStyles, linkStyles, wrapperStyles } from "./MenuItem.css";
export const MenuItem = ({ title, id, done }) => {
    return (_jsx("div", { className: wrapperStyles, children: _jsxs(NavLink, { to: `/chat/${id}`, className: linkStyles, children: [title, _jsx("span", { children: done && _jsx(Icon.Check, { className: checkIconStyles }) })] }) }));
};
