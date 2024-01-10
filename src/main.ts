import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
interface FunctionNode {
    name: string;
    start: {
        line: number; column: number; index: number
    };
    end: {
        line: number; column: number; index: number
    }
}
export function getFunctionNode(code: string, index: number): FunctionNode | undefined {
    let functionNode;
    const ast = parse(code);
    traverse(ast, {
        FunctionDeclaration(path) {
            console.log(path.node);
            if (index >= path.node?.start! && index <= path.node?.end!) {
                functionNode = {
                    name: path.node?.id?.name,
                    start: path.node?.loc?.start,
                    end: path.node?.loc?.end,
                }
            }
        },
        ArrowFunctionExpression(path) {
            // 箭头函数的解析
            const variableDeclaratorPath = path.parentPath.parentPath;
            function getName() {
                return Object.keys(path.parentPath.getBindingIdentifiers())[0]
            }
            // 判断是否为变量声明语句
            if (variableDeclaratorPath?.isVariableDeclaration()) {
                if (index >= variableDeclaratorPath.node?.start! && index <= variableDeclaratorPath.node?.end!) {
                    functionNode = {
                        name: getName(),
                        start: variableDeclaratorPath.node?.loc?.start,
                        end: variableDeclaratorPath.node?.loc?.end,
                    }
                }
            }
        }
    });
    return functionNode;
}