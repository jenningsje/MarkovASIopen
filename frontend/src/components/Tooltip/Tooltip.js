import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as TooltipRadix from "@radix-ui/react-tooltip";
import { arrowStyles, contentStyles } from "./Tooltip.css";
export const Tooltip = ({ children, content, contentProps }) => {
    if (!content)
        return _jsx(_Fragment, { children: children });
    return (_jsx(TooltipRadix.Provider, { children: _jsxs(TooltipRadix.Root, { delayDuration: 300, children: [_jsx(TooltipRadix.Trigger, { asChild: true, children: children }), _jsx(TooltipRadix.Portal, { children: _jsxs(TooltipRadix.Content, { className: contentStyles, sideOffset: 5, ...contentProps, children: [content, _jsx(TooltipRadix.Arrow, { className: arrowStyles })] }) })] }) }));
};
