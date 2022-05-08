// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { commands, window, ExtensionContext } from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
	console.log('Musical Keys is ON');

	let lastActive: number;
	let averageKPM: number;
	
	let disposable = commands.registerCommand('type', (args) => {

		const now = Date.now();
		if(lastActive) {
			const diff = now - lastActive;
			const diffInSeconds = diff / 1000;

			console.log(diffInSeconds);
			// KPM: keys per minute
			const KPM = 60 / diffInSeconds;

			console.log({KPM});

			
			if(averageKPM) {
				averageKPM = (averageKPM + KPM) / 2;
			} else {
				averageKPM = KPM;
			}
			

			console.log({averageKPM});

		}

		lastActive = now;

        commands.executeCommand('default:type', {
            text: args.text
        });
    });

    context.subscriptions.push(disposable);

}

// this method is called when your extension is deactivated
export function deactivate() {}
