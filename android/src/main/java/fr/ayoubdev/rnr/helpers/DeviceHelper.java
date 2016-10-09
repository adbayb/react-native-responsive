package fr.ayoubdev.rnr.helpers;

import android.graphics.Point;
import android.view.KeyCharacterMap;
import android.view.KeyEvent;
import android.view.ViewConfiguration;

public class DeviceHelper {
	private DeviceHelper() {
		//Not instanciable
	}

	public static Point computeScreenResolution(Point size) {
		//hardware size aka screen size <=> independent rotation size (width and height fixed)
		if(size != null) {
			//Height is always greater than width on usual devices (ratio >= 4:3)
			if(size.x > size.y) {
				int height = Math.max(size.x, size.y);
				int width = Math.min(size.x, size.y);

				return new Point(width, height);
			}

			return size;
		}

		return null;
	}

	public static boolean hasNavigationBar() {
		//Not working as expected since manufacturers can change KeyCharacterMap api behavior...
		//Staying for educational purpose :)
		boolean hasHardwareBackKey = KeyCharacterMap.deviceHasKey(KeyEvent.KEYCODE_BACK);
		boolean hasHardwareHomeKey = KeyCharacterMap.deviceHasKey(KeyEvent.KEYCODE_HOME);

		return !(hasHardwareBackKey && hasHardwareHomeKey);
	}
}
