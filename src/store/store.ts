import { Map } from 'immutable';
import { Store } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import { Memento } from 'vscode';

import rootReducer from '../reducers/root-reducer';
import { DEFAULT_STATE, ISpotifyStatusState } from '../state/state';

import { createDummyStorage, createVscodeStorage } from './storage/vscode-storage';

export type SpotifyStore = Store<ISpotifyStatusState>;

let store: SpotifyStore;

export function getStore(memento?: Memento) {
    if (!store) {
        const notToPersistList: (keyof ISpotifyStatusState)[] = ['selectedTrack', 'selectedList'];

        const persistConfig: PersistConfig = {
            key: 'root',
            storage: memento ? createVscodeStorage(memento) : createDummyStorage(),
            transforms: [{
                out: (val: any, key: string) => {
                    if (~notToPersistList.indexOf(key as keyof ISpotifyStatusState)) {
                        return null;
                    }
                    if (key === 'tracks') {
                        return Map(val);
                    }
                    return val;
                },
                in: (val: any, key: string) => {
                    if (~notToPersistList.indexOf(key as keyof ISpotifyStatusState)) {
                        return null;
                    }
                    return val;
                }
            }]
        };
        const persistedReducer = persistReducer(persistConfig, rootReducer);

        store = configureStore(persistedReducer, DEFAULT_STATE);
        persistStore(store);
    }
    return store;
}

export function getState() {
    return getStore().getState();
}

/**
 * True if on last state of Spotify it was muted(volume was equal 0)
 */
export function isMuted() {
    const state = getState();
    return state && state.playerState.volume === 0;
}
