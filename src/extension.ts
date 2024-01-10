import * as vscode from 'vscode';
import { getFunctionNode } from './main';


export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "teach-vscode-extension-del-fun" is now active!');

	let disposable = vscode.commands.registerCommand('teach-vscode-extension-del-fun.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from teach-vscode-extension-del-fun!');
		// vscode 中应该如何删除字符
		const editor = vscode.window.activeTextEditor;
		if (!editor) { return; }

		const code = editor.document.getText();// 获取文件内容
		const active = editor.selection.active;// 获取光标位置
		const index = editor.document.offsetAt(active);// 获取光标所在位置的索引

		const functionNode = getFunctionNode(code, index);// 获取光标所在函数

		if (!functionNode) { return; }
		editor.edit((editBuilder) => {
			editBuilder.delete(new vscode.Range(new vscode.Position(functionNode.start.line - 1, functionNode.start.column),
				new vscode.Position(functionNode.end.line - 1, functionNode.end.column)));
		});
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }
