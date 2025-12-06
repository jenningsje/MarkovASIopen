import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { formatDistanceToNowStrict } from "date-fns";
import { useState } from "react";
import logoPng from "@/assets/logo.png";
import mePng from "@/assets/me.png";
import { Button } from "@/components/Button/Button";
import { Icon } from "@/components/Icon/Icon";
import { TaskStatus, TaskType } from "@/generated/graphql";
import { avatarStyles, contentStyles, iconStyles, messageStyles, outputStyles, rightColumnStyles, timeStyles, wrapperStyles, } from "./Message.css";
export const Message = ({ time, message, type, status, output, }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpand = () => {
        setIsExpanded((prev) => !prev);
    };
    return (_jsxs("div", { className: wrapperStyles, children: [_jsx("img", { src: type === TaskType.Input ? mePng : logoPng, alt: "avatar", className: avatarStyles, width: "40", height: "40" }), _jsxs("div", { className: rightColumnStyles, children: [_jsx("div", { className: timeStyles, children: formatDistanceToNowStrict(new Date(time), { addSuffix: true }) }), _jsxs("div", { className: type === TaskType.Input
                            ? messageStyles.Input
                            : status !== TaskStatus.Failed
                                ? messageStyles.Regular
                                : messageStyles.Failed, onClick: toggleExpand, children: [_jsxs("div", { className: contentStyles, children: [_jsx("span", { className: status !== TaskStatus.Failed
                                            ? iconStyles.Regular
                                            : iconStyles.Failed, children: getIcon(type) }), _jsx("div", { children: message })] }), status === TaskStatus.InProgress && (_jsx(Button, { size: "small", hierarchy: "danger", children: "Stop" }))] }), isExpanded && _jsx("div", { className: outputStyles, children: output })] })] }));
};
const getIcon = (type) => {
    let icon = null;
    switch (type) {
        case TaskType.Browser:
            icon = _jsx(Icon.Browser, {});
            break;
        case TaskType.Terminal:
            icon = _jsx(Icon.Terminal, {});
            break;
        case TaskType.Code:
            icon = _jsx(Icon.Code, {});
            break;
        case TaskType.Ask:
            icon = _jsx(Icon.MessageQuestion, {});
            break;
        case TaskType.Done:
            icon = _jsx(Icon.CheckCircle, {});
            break;
    }
    return icon;
};
