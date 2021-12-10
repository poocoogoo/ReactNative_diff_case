import { Env } from '@helloworld/rn-common'

export const kFavoriteURL = Env.isIOS() ? './ddddd.png': './bbbb.png';


export function getAppType() {
	if (Env.isMT()) {
		return 30000;
	} else if (Env.isWM()) {
		return 10000;
	} else {
		return 200000;
	}
}