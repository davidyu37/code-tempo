import { commands, window, ExtensionContext } from 'vscode';
import { createCommands } from './commands';
import { getStore } from './store/store';

export function activate(context: ExtensionContext) {
	console.log('Musical Keys is ON');

	getStore(context.globalState);
	
	context.subscriptions.push(createCommands());
}

// this method is called when your extension is deactivated
export function deactivate() { }
