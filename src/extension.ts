import 'dotenv/config';
import { ExtensionContext } from 'vscode';
import { createCommands } from './commands';
import * as CodyMusic from "cody-music";

export function activate(context: ExtensionContext) {
	console.log('Musical Keys is ON');

	const config: CodyMusic.CodyConfig = {
		spotifyAccessToken: '',
		spotifyRefreshToken: '',
		spotifyClientSecret: process.env.SPOTIFY_CLIENT_ID || '',
		spotifyClientId: process.env.SPOTIFY_CLIENT_SECRET || '',
		enableItunesDesktop: false,
		enableSpotifyDesktop: true,
		enableSpotifyApi: true,
		enableItunesDesktopSongTracking: false,
	};

	CodyMusic.setConfig(config);

	// CodyMusic.playSpotifyPlaylist(
	// 	CodyMusic.PlayerName.SpotifyDesktop,
	// 	'7dAAuI50JwRIrm1sq6hhDE'
	// ).then(res => {
	// 	console.log(res);
	// });

	CodyMusic.playTrack(
		CodyMusic.PlayerName.SpotifyDesktop,
		"spotify:track:2YarjDYjBJuH63dUIh9OWv"
	).then(result => {
		console.log('playTrack', result);
		// track is playing
	});

	
	context.subscriptions.push(createCommands());
}

// this method is called when your extension is deactivated
export function deactivate() { }
