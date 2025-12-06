import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { FlowStatus, useAvailableModelsQuery, useFlowsQuery, } from "@/generated/graphql";
import { wrapperStyles } from "./AppLayout.css";
export const AppLayout = () => {
    const [{ data }] = useFlowsQuery();
    const [{ data: availableModelsData }] = useAvailableModelsQuery();
    const sidebarItems = data?.flows.map((flow) => ({
        id: flow.id,
        title: flow.name,
        done: flow.status === FlowStatus.Finished,
    })) ?? [];
    return (_jsxs("div", { className: wrapperStyles, children: [_jsx(Sidebar, { items: sidebarItems, availableModels: availableModelsData?.availableModels ?? [] }), _jsx(Outlet, {})] }));
};
