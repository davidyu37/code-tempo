import { commands, Disposable } from 'vscode';

// import { actionsCreator } from './actions/actions';
// import { getTrackInfoClickBehaviour } from './config/spotify-config';
// import { LyricsController } from './lyrics/lyrics';
import { SpotifyClient } from './spotify/common';
import { Album, Playlist } from './state/state';
// import { SIGN_IN_COMMAND } from './consts/consts';

export function createCommands(): { dispose: () => void } {

    let lastActive: number;
	let averageKPM: number;

    const typingListener = commands.registerCommand('type', (args) => {

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

    return Disposable.from(typingListener);
}
