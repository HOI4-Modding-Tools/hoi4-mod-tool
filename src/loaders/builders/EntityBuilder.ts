import * as contexts from "./contexts";
import * as _ from "lodash";

export default class EntityBuilder {
    private entityConstructorFunction: any;
    private currentContext: any[] = [];
    private workingInstance: any;
    private expectedTokens: string[] = [];
    private entities = {};

    constructor(entityConstructorFunction: Function) {
        this.entityConstructorFunction = entityConstructorFunction;
        const originalPush = this.currentContext.push.bind(this.currentContext);
        this.currentContext.push = function (name:string, values:any) {
            return originalPush({
                name,
                values
            })
        }
    }

    visitChildren(ctx) {
        if (!ctx) {
            return;
        }
        if (ctx.children) {
            return ctx.children.map(child => {
                    if (child.children && child.children.length) {
                        return child.accept(this);
                    } else {
                        const text = child.getText();
                        const expectedToken = this.expectedTokens.pop();
                        if (expectedToken) {
                            if (expectedToken != text) {
                                throw new Error("Received unexpected token " + text + " when expected " + expectedToken);
                            } else {
                                return;
                            }
                        }
                        const isEndNode: boolean = text === "}";
                        const contextValues = this.currentContext.map(context => context.values).reduce((merged, nextProps) => _.merge(merged, nextProps), {});
                        const contextName = isEndNode ? this.currentContext.map(context => context.name).join(":") + ":end" : this.currentContext.map(context => context.name).join(":");
                        const contextHandler = contextHandlers[contextName];
                        if(isEndNode) {
                            this.currentContext.pop();
                        }
                        if(contextHandler) {
                            const contextHandlerReturn = contextHandler.bind(this)(text, contextValues);
                            if (contextHandlerReturn === undefined) {
                                throw new Error("The context handler for '" + contextName + "' returned undefined, which is not allowed. To indicate successful handling, return an array of strings for tokens that should be expected next or null otherwise.");
                            } else if (_.isArray(contextHandlerReturn)) {
                                contextHandlerReturn.forEach(token => {
                                    this.expectedTokens.push(token);
                                })
                            }
                        } else if (!isEndNode) {
                            throw new Error("No context handler was found for context " + contextName)
                        }
                    }
                }
            )
        }
    }

    buildFrom(tree) {
        tree.accept(this);
        return this.entities;
    }
}

const contextHandlers = _.merge({
    "": function (text) {
        switch (text) {
            case "equipments":
                this.workingInstance = {};
                this.currentContext.push(text);
                return ["{", "="]
        }
    }
}, contexts.default);