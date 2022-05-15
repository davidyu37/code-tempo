import { commands, Disposable } from 'vscode';

// import { actionsCreator } from './actions/actions';
// import { getTrackInfoClickBehaviour } from './config/spotify-config';
// import { LyricsController } from './lyrics/lyrics';
// import { Album, Playlist } from './state/state';
// import { SIGN_IN_COMMAND } from './consts/consts';
import { calculateKpm } from './kpm';

export function createCommands(): { dispose: () => void } {

    const typingListener = commands.registerCommand('type', calculateKpm);

    return Disposable.from(typingListener);
}
