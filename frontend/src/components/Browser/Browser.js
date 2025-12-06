import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { headerStyles, imgStyles, imgWrapperStyles, wrapperStyles, } from "./Browser.css";
export const Browser = ({ url = "Not active", screenshotUrl, }) => {
    return (_jsxs("div", { className: wrapperStyles, children: [_jsx("div", { className: headerStyles, children: url }), _jsx("div", { className: imgWrapperStyles, children: _jsx("img", { src: screenshotUrl, className: imgStyles }) })] }));
};
export default Browser;
