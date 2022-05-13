import { getState } from '../store/store';
import { actionsCreator } from '../actions/actions';
let lastActive: number;
let averageKPM: number;

export const calculateKpm = () => {{
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

            actionsCreator.updateStateAction({
                KPM
            });
			


		}

		lastActive = now;

        commands.executeCommand('default:type', {
            text: args.text
        });
}};