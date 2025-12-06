import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from "react";
import { buttonIconStyles, buttonSizesStyles, buttonStyles, } from "./Button.css";
export const Button = forwardRef(({ icon = null, disabled = false, children, hierarchy = "primary", size = "medium", className, ...rest }, ref) => (_jsxs("button", { ref: ref, className: (hierarchy === "primary"
        ? buttonStyles.Primary
        : hierarchy === "secondary"
            ? buttonStyles.Secondary
            : buttonStyles.Danger) +
        " " +
        (size === "small"
            ? buttonSizesStyles.Small
            : buttonSizesStyles.Medium) +
        " " +
        className, disabled: disabled, ...rest, children: [icon && _jsx("div", { className: buttonIconStyles, children: icon }), children] })));
