package fr.aybadb.rnr.helpers;

import android.graphics.Point;
import android.view.*;
import com.facebook.react.bridge.ReactApplicationContext;
import static android.content.Context.WINDOW_SERVICE;


public class Helper {
	private Helper() {
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

	public static Display getDisplay(ReactApplicationContext context) {
		if(context != null) {
			WindowManager windowManager = (WindowManager) context.getSystemService(WINDOW_SERVICE);
			if(windowManager != null) {
				return windowManager.getDefaultDisplay();
			}
		}

		return null;
	}

	public static String getOrientationFromDegree(int degree) {
		if(degree == 0 || degree == 180)
			return "portrait";
		else if(degree == 90 || degree == 270)
			return "landscape";

		//if(degree == ORIENTATION_UNKNOWN)
		//	return "unknown";
		return "unknown";
	}

	public static String getOrientationFromRotation(int rotation) {
		if(rotation == Surface.ROTATION_0 || rotation == Surface.ROTATION_180)
			return "portrait";
		else if(rotation == Surface.ROTATION_90 || rotation == Surface.ROTATION_270)
			return "landscape";

		return "unknown";
	}
}
