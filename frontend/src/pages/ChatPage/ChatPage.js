import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as Tabs from "@radix-ui/react-tabs";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Browser from "@/components/Browser/Browser";
import { Button } from "@/components/Button/Button";
import { Icon } from "@/components/Icon/Icon";
import { Messages } from "@/components/Messages/Messages";
import { Panel } from "@/components/Panel/Panel";
import { tabsContentStyles, tabsListStyles, tabsRootStyles, tabsTriggerStyles, } from "@/components/Tabs/Tabs.css";
import { Terminal } from "@/components/Terminal/Terminal";
import { Tooltip } from "@/components/Tooltip/Tooltip";
import { useBrowserUpdatedSubscription, useCreateFlowMutation, useCreateTaskMutation, useFinishFlowMutation, useFlowQuery, useFlowUpdatedSubscription, useTaskAddedSubscription, useTerminalLogsAddedSubscription, } from "@/generated/graphql";
import { followButtonStyles, leftColumnStyles, tabsStyles, wrapperStyles, } from "./ChatPage.css";
export const ChatPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [, createFlowMutation] = useCreateFlowMutation();
    const [, createTaskMutation] = useCreateTaskMutation();
    const [, finishFlowMutation] = useFinishFlowMutation();
    const isNewFlow = !id || id === "new";
    const [isFollowingTabs, setIsFollowingTabs] = useLocalStorage("isFollowingTabs", true);
    const [selectedModel] = useLocalStorage("model");
    const [activeTab, setActiveTab] = useState("terminal");
    const [{ operation, data }] = useFlowQuery({
        pause: isNewFlow,
        variables: { id },
    });
    // https://github.com/urql-graphql/urql/issues/2507#issuecomment-1159281108
    const isStaleData = operation?.variables.id !== id;
    const tasks = !isStaleData ? data?.flow.tasks ?? [] : [];
    const name = !isStaleData ? data?.flow.name ?? "" : "";
    const status = !isStaleData ? data?.flow.status : undefined;
    const terminal = !isStaleData ? data?.flow.terminal : undefined;
    const browser = !isStaleData ? data?.flow.browser : undefined;
    const model = !isStaleData ? data?.flow.model : undefined;
    useBrowserUpdatedSubscription({
        variables: { flowId: Number(id) },
        pause: isNewFlow,
    }, () => {
        if (isFollowingTabs) {
            setActiveTab("browser");
        }
    });
    useTerminalLogsAddedSubscription({
        variables: { flowId: Number(id) },
        pause: isNewFlow,
    }, () => {
        if (isFollowingTabs) {
            setActiveTab("terminal");
        }
    });
    useTaskAddedSubscription({
        variables: { flowId: Number(id) },
        pause: isNewFlow,
    });
    useFlowUpdatedSubscription({
        variables: { flowId: Number(id) },
        pause: isNewFlow,
    });
    const handleSubmit = async (message) => {
        if (isNewFlow && selectedModel.id) {
            const result = await createFlowMutation({
                modelProvider: selectedModel.provider,
                modelId: selectedModel.id,
            });
            const flowId = result?.data?.createFlow.id;
            if (flowId) {
                navigate(`/chat/${flowId}`, { replace: true });
                createTaskMutation({
                    flowId: flowId,
                    query: message,
                });
            }
        }
        else {
            createTaskMutation({
                flowId: id,
                query: message,
            });
        }
    };
    const handleFlowStop = () => {
        finishFlowMutation({ flowId: id });
    };
    const handleChangeIsFollowingTabs = () => {
        setIsFollowingTabs(!isFollowingTabs);
    };
    return (_jsxs("div", { className: wrapperStyles, children: [_jsx(Panel, { children: _jsx(Messages, { tasks: tasks, name: name, onSubmit: handleSubmit, flowStatus: status, isNew: isNewFlow, onFlowStop: handleFlowStop, model: model }) }), _jsx(Panel, { children: _jsxs(Tabs.Root, { className: tabsRootStyles, value: activeTab, onValueChange: setActiveTab, children: [_jsx(Tabs.List, { className: tabsListStyles, children: _jsxs("div", { className: tabsStyles, children: [_jsxs("div", { className: leftColumnStyles, children: [_jsx(Tabs.Trigger, { className: tabsTriggerStyles, value: "terminal", children: "Terminal" }), _jsx(Tabs.Trigger, { className: tabsTriggerStyles, value: "browser", children: "Browser" }), _jsx(Tabs.Trigger, { className: tabsTriggerStyles, value: "code", disabled: true, children: "Code (Soon)" })] }), _jsx(Tooltip, { content: _jsxs(_Fragment, { children: ["Following the active tab is", " ", _jsx("b", { children: isFollowingTabs ? "enabled" : "disabled" })] }), children: _jsx(Button, { size: "small", hierarchy: isFollowingTabs ? "primary" : "secondary", className: followButtonStyles, onClick: handleChangeIsFollowingTabs, children: isFollowingTabs ? _jsx(Icon.Eye, {}) : _jsx(Icon.EyeOff, {}) }) })] }) }), _jsx(Tabs.Content, { className: tabsContentStyles, value: "terminal", children: _jsx(Terminal, { id: isNewFlow ? "" : id, status: status, title: terminal?.containerName, logs: terminal?.logs ?? [], isRunning: terminal?.connected }) }), _jsx(Tabs.Content, { className: tabsContentStyles, value: "browser", children: _jsx(Browser, { url: browser?.url || undefined, screenshotUrl: browser?.screenshotUrl ?? "" }) }), _jsx(Tabs.Content, { className: tabsContentStyles, value: "code", children: "code" })] }) })] }));
};
