import { expect, test } from 'vitest';
import { getFunctionNode } from '../src/main.ts';

test("init", () => {
    const code = `
    function getName(){
        return "张三";
    }
    function getName2(){
        return "张三";
    }
    `;
    const index = 10;
    const functionNode = getFunctionNode(code,index);
    expect(functionNode).toEqual({
        name: 'getName',
        start: {
            line: 2, column: 4, index: 5
        },
        end: {
            line: 4, column: 5, index: 51
        }
    });
});