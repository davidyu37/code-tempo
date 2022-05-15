import { commands } from 'vscode';
let lastActive: number;
let averageKPM: number;

export const calculateKpm = (args: { text: string }) => {
	{
		const now = Date.now();
		if (lastActive) {
			const diff = now - lastActive;
			const diffInSeconds = diff / 1000;

			// KPM: keys per minute
			const kPM = 60 / diffInSeconds;

			console.log({ kPM });


			if (averageKPM) {
				averageKPM = (averageKPM + kPM) / 2;
			} else {
				averageKPM = kPM;
			}

			console.log({ averageKPM });

		}

		lastActive = now;

		commands.executeCommand('default:type', {
			text: args.text
		});
	}
};