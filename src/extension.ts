import { commands, window, ExtensionContext } from 'vscode';
import { createCommands } from './commands';

export function activate(context: ExtensionContext) {
	console.log('Musical Keys is ON');
	
	context.subscriptions.push(createCommands());
}

// this method is called when your extension is deactivated
export function deactivate() { }
