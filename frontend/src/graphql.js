import { devtoolsExchange } from "@urql/devtools";
import { cacheExchange } from "@urql/exchange-graphcache";
import { createClient as createWSClient } from "graphql-ws";
import { createClient, fetchExchange, subscriptionExchange } from "urql";
import schema from "../generated/graphql.schema.json";
export const cache = cacheExchange({
    schema: schema,
    updates: {
        Mutation: {
            createFlow: (result, _args, cache) => {
                const flows = cache.resolve("Query", "flows");
                if (Array.isArray(flows)) {
                    flows.push(result.createFlow);
                    cache.link("Query", "flows", flows);
                }
            },
            createTask: (result, _args, cache) => {
                const flowEntityKey = `Flow:${_args.id}`;
                const tasks = cache.resolve(flowEntityKey, "tasks");
                if (Array.isArray(tasks)) {
                    // Check if task already exists
                    const taskExists = tasks.some((task) => task.id === result.createTask.id);
                    if (taskExists)
                        return;
                    tasks.push(result.createTask);
                    cache.link(flowEntityKey, "tasks", tasks);
                }
            },
        },
        Subscription: {
            browserUpdated: (result, _args, cache) => {
                const flowId = _args.flowId;
                const flowEntityKey = `Flow:${flowId}`;
                const browser = result.browserUpdated;
                cache.link(flowEntityKey, "browser", browser);
            },
            terminalLogsAdded: (result, _args, cache) => {
                const flowId = _args.flowId;
                const flowEntityKey = `Flow:${flowId}.terminal`;
                const logs = cache.resolve(flowEntityKey, "logs");
                const log = result.terminalLogsAdded;
                if (Array.isArray(logs)) {
                    logs.push(log);
                    cache.link(flowEntityKey, "logs", logs);
                }
            },
            taskAdded: (result, _args, cache) => {
                const flowId = _args.flowId;
                const flowEntityKey = `Flow:${flowId}`;
                const tasks = cache.resolve(flowEntityKey, "tasks");
                const task = result.taskAdded;
                if (Array.isArray(tasks)) {
                    tasks.push(task);
                    cache.link(flowEntityKey, "tasks", tasks);
                }
            },
        },
    },
    keys: {
        Terminal: (_) => null,
        Browser: (data) => data.url,
    },
});
const wsClient = createWSClient({
    url: "ws://" + import.meta.env.VITE_API_URL + "/graphql",
});
export const graphqlClient = createClient({
    url: window.location.origin + "/graphql",
    fetchOptions: {},
    exchanges: [
        devtoolsExchange,
        cache,
        fetchExchange,
        subscriptionExchange({
            forwardSubscription(request) {
                const input = { ...request, query: request.query || "" };
                return {
                    subscribe(sink) {
                        const unsubscribe = wsClient.subscribe(input, sink);
                        wsClient.on("error", (error) => {
                            console.error("The subscription errored:", error);
                        });
                        return { unsubscribe };
                    },
                };
            },
        }),
    ],
});
