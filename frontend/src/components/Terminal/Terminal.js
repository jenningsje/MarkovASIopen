import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
// This terminal is a combination of the following packages:
// https://gist.github.com/mastersign/90d0ab06f040092e4ca27a3b59820cb9
// https://github.com/reubenmorgan/xterm-react/blob/6c8bb143387a6abc35ff54a3e099c46e5be8819c/src/Xterm.tsx
import { useEffect, useRef } from "react";
import { Terminal as XTerminal } from "xterm";
import { CanvasAddon } from "xterm-addon-canvas";
import { FitAddon } from "xterm-addon-fit";
import { Unicode11Addon } from "xterm-addon-unicode11";
import { WebLinksAddon } from "xterm-addon-web-links";
import { WebglAddon } from "xterm-addon-webgl";
// @ts-ignore - This package is not typed
import { Broadcast } from "xterm-theme";
import "xterm/css/xterm.css";
import dockerSvg from "@/assets/docker.svg";
import { headerStyles } from "./Terminal.css";
const isWebGl2Supported = !!document
    .createElement("canvas")
    .getContext("webgl2");
function useBind(termRef, handler, eventName) {
    useEffect(() => {
        if (!termRef.current || typeof handler !== "function")
            return;
        const term = termRef.current;
        const eventBinding = term[eventName](handler);
        return () => {
            if (!eventBinding)
                return;
            eventBinding.dispose();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [handler]);
}
const addons = [
    new Unicode11Addon(),
    new CanvasAddon(),
    isWebGl2Supported ? new WebglAddon() : new WebLinksAddon(),
];
export const Terminal = ({ id, className, onBell, onBinary, onCursorMove, onData, onKey, onLineFeed, onRender, onResize, onScroll, onSelectionChange, onTitleChange, onWriteParsed, customKeyEventHandler, onInit, title, logs = [], isRunning = false, }) => {
    const divRef = useRef(null);
    const xtermRef = useRef(null);
    const renderedLogIds = useRef([]);
    useEffect(() => {
        if (!xtermRef.current)
            return;
        xtermRef.current.clear();
        renderedLogIds.current = [];
    }, [id]);
    useEffect(() => {
        if (!xtermRef.current)
            return;
        for (const log of logs) {
            if (renderedLogIds.current.includes(log.id))
                continue;
            xtermRef.current.writeln(log.text);
            renderedLogIds.current.push(log.id);
        }
    }, [logs]);
    useEffect(() => {
        if (!divRef.current || xtermRef.current)
            return;
        const xterm = new XTerminal({
            convertEol: true,
            allowProposedApi: true,
            theme: Broadcast,
        });
        // Load addons if the prop exists.
        addons.forEach((addon) => {
            xterm.loadAddon(addon);
        });
        const fitAddon = new FitAddon();
        xterm.loadAddon(fitAddon);
        // Add Custom Key Event Handler if provided
        if (customKeyEventHandler) {
            xterm.attachCustomKeyEventHandler(customKeyEventHandler);
        }
        xtermRef.current = xterm;
        xterm.open(divRef.current);
        fitAddon.fit();
    }, [id]);
    useBind(xtermRef, onBell, "onBell");
    useBind(xtermRef, onBinary, "onBinary");
    useBind(xtermRef, onCursorMove, "onCursorMove");
    useBind(xtermRef, onData, "onData");
    useBind(xtermRef, onKey, "onKey");
    useBind(xtermRef, onLineFeed, "onLineFeed");
    useBind(xtermRef, onRender, "onRender");
    useBind(xtermRef, onResize, "onResize");
    useBind(xtermRef, onScroll, "onScroll");
    useBind(xtermRef, onSelectionChange, "onSelectionChange");
    useBind(xtermRef, onTitleChange, "onTitleChange");
    useBind(xtermRef, onWriteParsed, "onWriteParsed");
    useEffect(() => {
        if (!xtermRef.current)
            return;
        if (typeof onInit !== "function")
            return;
        onInit(xtermRef.current);
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [xtermRef.current]);
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: headerStyles, children: isRunning ? (_jsxs(_Fragment, { children: [_jsx("img", { src: dockerSvg, alt: "Docker", width: "14", height: "14" }), title, " - Active"] })) : ("Disconnected") }), _jsx("div", { id: id, className: className, ref: divRef })] }));
};
