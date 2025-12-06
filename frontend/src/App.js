import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements, } from "react-router-dom";
import { Provider as GraphqlProvider } from "urql";
import { graphqlClient } from "./graphql";
import { AppLayout } from "./layouts/AppLayout/AppLayout";
import { ChatPage } from "./pages/ChatPage/ChatPage";
import "./styles/font.css.ts";
import "./styles/global.css.ts";
import "./styles/theme.css.ts";
export const router = createBrowserRouter(createRoutesFromElements(_jsxs(_Fragment, { children: [_jsx(Route, { element: _jsx(AppLayout, {}), children: _jsx(Route, { path: "/chat/:id?", element: _jsx(ChatPage, {}) }) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/chat" }) })] })));
function App() {
    return (_jsx(GraphqlProvider, { value: graphqlClient, children: _jsx(RouterProvider, { router: router }) }));
}
export default App;
