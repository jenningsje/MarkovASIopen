import gql from 'graphql-tag';
import * as Urql from 'urql';
export var FlowStatus;
(function (FlowStatus) {
    FlowStatus["Finished"] = "finished";
    FlowStatus["InProgress"] = "inProgress";
})(FlowStatus || (FlowStatus = {}));
export var TaskStatus;
(function (TaskStatus) {
    TaskStatus["Failed"] = "failed";
    TaskStatus["Finished"] = "finished";
    TaskStatus["InProgress"] = "inProgress";
    TaskStatus["Stopped"] = "stopped";
})(TaskStatus || (TaskStatus = {}));
export var TaskType;
(function (TaskType) {
    TaskType["Ask"] = "ask";
    TaskType["Browser"] = "browser";
    TaskType["Code"] = "code";
    TaskType["Done"] = "done";
    TaskType["Input"] = "input";
    TaskType["Terminal"] = "terminal";
})(TaskType || (TaskType = {}));
export const FlowOverviewFragmentFragmentDoc = gql `
    fragment flowOverviewFragment on Flow {
  id
  name
  status
}
    `;
export const ModelFragmentFragmentDoc = gql `
    fragment modelFragment on Model {
  id
  provider
}
    `;
export const LogFragmentFragmentDoc = gql `
    fragment logFragment on Log {
  text
  id
}
    `;
export const BrowserFragmentFragmentDoc = gql `
    fragment browserFragment on Browser {
  url
  screenshotUrl
}
    `;
export const TaskFragmentFragmentDoc = gql `
    fragment taskFragment on Task {
  id
  type
  message
  status
  args
  results
  createdAt
}
    `;
export const FlowFragmentFragmentDoc = gql `
    fragment flowFragment on Flow {
  id
  name
  status
  model {
    ...modelFragment
  }
  terminal {
    containerName
    connected
    logs {
      ...logFragment
    }
  }
  browser {
    ...browserFragment
  }
  tasks {
    ...taskFragment
  }
}
    ${ModelFragmentFragmentDoc}
${LogFragmentFragmentDoc}
${BrowserFragmentFragmentDoc}
${TaskFragmentFragmentDoc}`;
export const FlowsDocument = gql `
    query flows {
  flows {
    ...flowOverviewFragment
  }
}
    ${FlowOverviewFragmentFragmentDoc}`;
export function useFlowsQuery(options) {
    return Urql.useQuery({ query: FlowsDocument, ...options });
}
;
export const AvailableModelsDocument = gql `
    query availableModels {
  availableModels {
    ...modelFragment
  }
}
    ${ModelFragmentFragmentDoc}`;
export function useAvailableModelsQuery(options) {
    return Urql.useQuery({ query: AvailableModelsDocument, ...options });
}
;
export const FlowDocument = gql `
    query flow($id: Uint!) {
  flow(id: $id) {
    ...flowFragment
  }
}
    ${FlowFragmentFragmentDoc}`;
export function useFlowQuery(options) {
    return Urql.useQuery({ query: FlowDocument, ...options });
}
;
export const CreateFlowDocument = gql `
    mutation createFlow($modelProvider: String!, $modelId: String!) {
  createFlow(modelProvider: $modelProvider, modelId: $modelId) {
    id
    name
  }
}
    `;
export function useCreateFlowMutation() {
    return Urql.useMutation(CreateFlowDocument);
}
;
export const CreateTaskDocument = gql `
    mutation createTask($flowId: Uint!, $query: String!) {
  createTask(flowId: $flowId, query: $query) {
    ...taskFragment
  }
}
    ${TaskFragmentFragmentDoc}`;
export function useCreateTaskMutation() {
    return Urql.useMutation(CreateTaskDocument);
}
;
export const FinishFlowDocument = gql `
    mutation finishFlow($flowId: Uint!) {
  finishFlow(flowId: $flowId) {
    id
    status
  }
}
    `;
export function useFinishFlowMutation() {
    return Urql.useMutation(FinishFlowDocument);
}
;
export const TaskAddedDocument = gql `
    subscription taskAdded($flowId: Uint!) {
  taskAdded(flowId: $flowId) {
    ...taskFragment
  }
}
    ${TaskFragmentFragmentDoc}`;
export function useTaskAddedSubscription(options, handler) {
    return Urql.useSubscription({ query: TaskAddedDocument, ...options }, handler);
}
;
export const TerminalLogsAddedDocument = gql `
    subscription terminalLogsAdded($flowId: Uint!) {
  terminalLogsAdded(flowId: $flowId) {
    ...logFragment
  }
}
    ${LogFragmentFragmentDoc}`;
export function useTerminalLogsAddedSubscription(options, handler) {
    return Urql.useSubscription({ query: TerminalLogsAddedDocument, ...options }, handler);
}
;
export const FlowUpdatedDocument = gql `
    subscription flowUpdated($flowId: Uint!) {
  flowUpdated(flowId: $flowId) {
    id
    name
    terminal {
      containerName
      connected
    }
  }
}
    `;
export function useFlowUpdatedSubscription(options, handler) {
    return Urql.useSubscription({ query: FlowUpdatedDocument, ...options }, handler);
}
;
export const BrowserUpdatedDocument = gql `
    subscription browserUpdated($flowId: Uint!) {
  browserUpdated(flowId: $flowId) {
    ...browserFragment
  }
}
    ${BrowserFragmentFragmentDoc}`;
export function useBrowserUpdatedSubscription(options, handler) {
    return Urql.useSubscription({ query: BrowserUpdatedDocument, ...options }, handler);
}
;
export default {
    "__schema": {
        "queryType": {
            "name": "Query",
            "kind": "OBJECT"
        },
        "mutationType": {
            "name": "Mutation",
            "kind": "OBJECT"
        },
        "subscriptionType": {
            "name": "Subscription",
            "kind": "OBJECT"
        },
        "types": [
            {
                "kind": "OBJECT",
                "name": "Browser",
                "fields": [
                    {
                        "name": "screenshotUrl",
                        "type": {
                            "kind": "NON_NULL",
                            "ofType": {
                                "kind": "SCALAR",
                                "name": "Any"
                            }
                        },
                        "args": []
                    },
                    {
                        "name": "url",
                        "type": {
                            "kind": "NON_NULL",
                            "ofType": {
                                "kind": "SCALAR",
                                "name": "Any"
                            }
                        },
                        "args": []
                    }
                ],
                "interfaces": []
            },
            {
                "kind": "OBJECT",
                "name": "Flow",
                "fields": [
                    {
                        "name": "browser",
                        "type": {
                            "kind": "NON_NULL",
                            "ofType": {
                                "kind": "OBJECT",
                                "name": "Browser",
                                "ofType": null
                            }
                        },
                        "args": []
                    },
                    {
                        "name": "id",
                        "type": {
                            "kind": "NON_NULL",
                            "ofType": {
                                "kind": "SCALAR",
                                "name": "Any"
                            }
                        },
                        "args": []
                    },
                    {
                        "name": "model",
                        "type": {
                            "kind": "NON_NULL",
                            "ofType": {
                                "kind": "OBJECT",
                                "name": "Model",
                                "ofType": null
                            }
                        },
                        "args": []
                    },
                    {
                        "name": "name",
                        "type": {
                            "kind": "NON_NULL",
                            "ofType": {
                                "kind": "SCALAR",
                                "name": "Any"
                            }
                        },
                        "args": []
                    },
                    {
                        "name": "status",
                        "type": {
                            "kind": "NON_NULL",
                            "ofType": {
                                "kind": "SCALAR",
                                "name": "Any"
                            }
                        },
                        "args": []
                    },
                    {
                        "name": "tasks",
                        "type": {
                            "kind": "NON_NULL",
                            "ofType": {
                                "kind": "LIST",
                                "ofType": {
                                    "kind": "NON_NULL",
                                    "ofType": {
                                        "kind": "OBJECT",
                                        "name": "Task",
                                        "ofType": null
                                    }
                                }
                            }
                        },
                        "args": []
                    },
                    {
                        "name": "terminal",
                        "type": {
                            "kind": "NON_NULL",
                            "ofType": {
                                "kind": "OBJECT",
                                "name": "Terminal",
                                "ofType": null
                            }
                        },
                        "args": []
                    }
                ],
                "interfaces": []
            },
            {
                "kind": "OBJECT",
                "name": "Log",
                "fields": [
                    {
                        "name": "id",
                        "type": {
                            "kind": "NON_NULL",
                            "ofType": {
                                "kind": "SCALAR",
                                "name": "Any"
                            }
                        },
                        "args": []
                    },
                    {
                        "name": "text",
                        "type": {
                            "kind": "NON_NULL",
                            "ofType": {
                                "kind": "SCALAR",
                                "name": "Any"
                            }
                        },
                        "args": []
                    }
                ],
                "interfaces": []
            },
            {
                "kind": "OBJECT",
                "name": "Model",
                "fields": [
                    {
                        "name": "id",
                        "type": {
                            "kind": "NON_NULL",
                            "ofType": {
                                "kind": "SCALAR",
                                "name": "Any"
                            }
                        },
                        "args": []
                    },
                    {
                        "name": "provider",
                        "type": {
                            "kind": "NON_NULL",
                            "ofType": {
                                "kind": "SCALAR",
                                "name": "Any"
                            }
                        },
                        "args": []
                    }
                ],
                "interfaces": []
            },
            {
                "kind": "OBJECT",
                "name": "Mutation",
                "fields": [
                    {
                        "name": "_exec",
                        "type": {
                            "kind": "NON_NULL",
                            "ofType": {
                                "kind": "SCALAR",
                                "name": "Any"
                            }
                        },
                        "args": [
                            {
                                "name": "command",
                                "type": {
                                    "kind": "NON_NULL",
                                    "ofType": {
                                        "kind": "SCALAR",
                                        "name": "Any"
                                    }
                                }
                            },
                            {
                                "name": "containerId",
                                "type": {
                                    "kind": "NON_NULL",
                                    "ofType": {
                                        "kind": "SCALAR",
                                        "name": "Any"
                                    }
                                }
                            }
                        ]
                    },
                    {
                        "name": "createFlow",
                        "type": {
                            "kind": "NON_NULL",
                            "ofType": {
                                "kind": "OBJECT",
                                "name": "Flow",
                                "ofType": null
                            }
                        },
                        "args": [
                            {
                                "name": "modelId",
                                "type": {
                                    "kind": "NON_NULL",
                                    "ofType": {
                                        "kind": "SCALAR",
                                        "name": "Any"
                                    }
                                }
                            },
                            {
                                "name": "modelProvider",
                                "type": {
                                    "kind": "NON_NULL",
                                    "ofType": {
                                        "kind": "SCALAR",
                                        "name": "Any"
                                    }
                                }
                            }
                        ]
                    },
                    {
                        "name": "createTask",
                        "type": {
                            "kind": "NON_NULL",
                            "ofType": {
                                "kind": "OBJECT",
                                "name": "Task",
                                "ofType": null
                            }
                        },
                        "args": [
                            {
                                "name": "flowId",
                                "type": {
                                    "kind": "NON_NULL",
                                    "ofType": {
                                        "kind": "SCALAR",
                                        "name": "Any"
                                    }
                                }
                            },
                            {
                                "name": "query",
                                "type": {
                                    "kind": "NON_NULL",
                                    "ofType": {
                                        "kind": "SCALAR",
                                        "name": "Any"
                                    }
                                }
                            }
                        ]
                    },
                    {
                        "name": "finishFlow",
                        "type": {
                            "kind": "NON_NULL",
                            "ofType": {
                                "kind": "OBJECT",
                                "name": "Flow",
                                "ofType": null
                            }
                        },
                        "args": [
                            {
                                "name": "flowId",
                                "type": {
                                    "kind": "NON_NULL",
                                    "ofType": {
                                        "kind": "SCALAR",
                                        "name": "Any"
                                    }
                                }
                            }
                        ]
                    }
                ],
                "interfaces": []
            },
            {
                "kind": "OBJECT",
                "name": "Query",
                "fields": [
                    {
                        "name": "availableModels",
                        "type": {
                            "kind": "NON_NULL",
                            "ofType": {
                                "kind": "LIST",
                                "ofType": {
                                    "kind": "NON_NULL",
                                    "ofType": {
                                        "kind": "OBJECT",
                                        "name": "Model",
                                        "ofType": null
                                    }
                                }
                            }
                        },
                        "args": []
                    },
                    {
                        "name": "flow",
                        "type": {
                            "kind": "NON_NULL",
                            "ofType": {
                                "kind": "OBJECT",
                                "name": "Flow",
                                "ofType": null
                            }
                        },
                        "args": [
                            {
                                "name": "id",
                                "type": {
                                    "kind": "NON_NULL",
                                    "ofType": {
                                        "kind": "SCALAR",
                                        "name": "Any"
                                    }
                                }
                            }
                        ]
                    },
                    {
                        "name": "flows",
                        "type": {
                            "kind": "NON_NULL",
                            "ofType": {
                                "kind": "LIST",
                                "ofType": {
                                    "kind": "NON_NULL",
                                    "ofType": {
                                        "kind": "OBJECT",
                                        "name": "Flow",
                                        "ofType": null
                                    }
                                }
                            }
                        },
                        "args": []
                    }
                ],
                "interfaces": []
            },
            {
                "kind": "OBJECT",
                "name": "Subscription",
                "fields": [
                    {
                        "name": "browserUpdated",
                        "type": {
                            "kind": "NON_NULL",
                            "ofType": {
                                "kind": "OBJECT",
                                "name": "Browser",
                                "ofType": null
                            }
                        },
                        "args": [
                            {
                                "name": "flowId",
                                "type": {
                                    "kind": "NON_NULL",
                                    "ofType": {
                                        "kind": "SCALAR",
                                        "name": "Any"
                                    }
                                }
                            }
                        ]
                    },
                    {
                        "name": "flowUpdated",
                        "type": {
                            "kind": "NON_NULL",
                            "ofType": {
                                "kind": "OBJECT",
                                "name": "Flow",
                                "ofType": null
                            }
                        },
                        "args": [
                            {
                                "name": "flowId",
                                "type": {
                                    "kind": "NON_NULL",
                                    "ofType": {
                                        "kind": "SCALAR",
                                        "name": "Any"
                                    }
                                }
                            }
                        ]
                    },
                    {
                        "name": "taskAdded",
                        "type": {
                            "kind": "NON_NULL",
                            "ofType": {
                                "kind": "OBJECT",
                                "name": "Task",
                                "ofType": null
                            }
                        },
                        "args": [
                            {
                                "name": "flowId",
                                "type": {
                                    "kind": "NON_NULL",
                                    "ofType": {
                                        "kind": "SCALAR",
                                        "name": "Any"
                                    }
                                }
                            }
                        ]
                    },
                    {
                        "name": "taskUpdated",
                        "type": {
                            "kind": "NON_NULL",
                            "ofType": {
                                "kind": "OBJECT",
                                "name": "Task",
                                "ofType": null
                            }
                        },
                        "args": []
                    },
                    {
                        "name": "terminalLogsAdded",
                        "type": {
                            "kind": "NON_NULL",
                            "ofType": {
                                "kind": "OBJECT",
                                "name": "Log",
                                "ofType": null
                            }
                        },
                        "args": [
                            {
                                "name": "flowId",
                                "type": {
                                    "kind": "NON_NULL",
                                    "ofType": {
                                        "kind": "SCALAR",
                                        "name": "Any"
                                    }
                                }
                            }
                        ]
                    }
                ],
                "interfaces": []
            },
            {
                "kind": "OBJECT",
                "name": "Task",
                "fields": [
                    {
                        "name": "args",
                        "type": {
                            "kind": "NON_NULL",
                            "ofType": {
                                "kind": "SCALAR",
                                "name": "Any"
                            }
                        },
                        "args": []
                    },
                    {
                        "name": "createdAt",
                        "type": {
                            "kind": "NON_NULL",
                            "ofType": {
                                "kind": "SCALAR",
                                "name": "Any"
                            }
                        },
                        "args": []
                    },
                    {
                        "name": "id",
                        "type": {
                            "kind": "NON_NULL",
                            "ofType": {
                                "kind": "SCALAR",
                                "name": "Any"
                            }
                        },
                        "args": []
                    },
                    {
                        "name": "message",
                        "type": {
                            "kind": "NON_NULL",
                            "ofType": {
                                "kind": "SCALAR",
                                "name": "Any"
                            }
                        },
                        "args": []
                    },
                    {
                        "name": "results",
                        "type": {
                            "kind": "NON_NULL",
                            "ofType": {
                                "kind": "SCALAR",
                                "name": "Any"
                            }
                        },
                        "args": []
                    },
                    {
                        "name": "status",
                        "type": {
                            "kind": "NON_NULL",
                            "ofType": {
                                "kind": "SCALAR",
                                "name": "Any"
                            }
                        },
                        "args": []
                    },
                    {
                        "name": "type",
                        "type": {
                            "kind": "NON_NULL",
                            "ofType": {
                                "kind": "SCALAR",
                                "name": "Any"
                            }
                        },
                        "args": []
                    }
                ],
                "interfaces": []
            },
            {
                "kind": "OBJECT",
                "name": "Terminal",
                "fields": [
                    {
                        "name": "connected",
                        "type": {
                            "kind": "NON_NULL",
                            "ofType": {
                                "kind": "SCALAR",
                                "name": "Any"
                            }
                        },
                        "args": []
                    },
                    {
                        "name": "containerName",
                        "type": {
                            "kind": "NON_NULL",
                            "ofType": {
                                "kind": "SCALAR",
                                "name": "Any"
                            }
                        },
                        "args": []
                    },
                    {
                        "name": "logs",
                        "type": {
                            "kind": "NON_NULL",
                            "ofType": {
                                "kind": "LIST",
                                "ofType": {
                                    "kind": "NON_NULL",
                                    "ofType": {
                                        "kind": "OBJECT",
                                        "name": "Log",
                                        "ofType": null
                                    }
                                }
                            }
                        },
                        "args": []
                    }
                ],
                "interfaces": []
            },
            {
                "kind": "SCALAR",
                "name": "Any"
            }
        ],
        "directives": []
    }
};
