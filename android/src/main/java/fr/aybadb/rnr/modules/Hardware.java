package fr.aybadb.rnr.modules;

import android.graphics.Point;
import android.view.Display;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import fr.aybadb.rnr.exceptions.HardwareException;
import fr.aybadb.rnr.helpers.Helper;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;


// TODO rename to device ? and include OrientationListener inside it ?
public class Hardware extends ReactContextBaseJavaModule {
	private ReactApplicationContext context;

	public Hardware(ReactApplicationContext reactContext) {
		super(reactContext);

		this.context = reactContext;
	}

	@Override
	public String getName() {
		return "Hardware";
	}

	/*According to React Native documentation:
		To expose a method to JavaScript a Java method must be annotated using @ReactMethod.
		The return type of bridge methods is always void. React Native bridge is asynchronous,
		so the only way to pass a result to JavaScript is by using callbacks or emitting events.

		So we can only set void function but share results via callback or event emitter !
	*/
	// TODO: exports constants instead !!!
	@ReactMethod
	public void getScreenResolution(Callback onSuccess, Callback onError) {//in pixel
		//L'api Dimensions.get de RN est dépendant de l'orientation, d'où la réimplémentation de la fonction:
		Point realSize;
		Display display = Helper.getDisplay(this.context);

		if(display != null) {
			if(android.os.Build.VERSION.SDK_INT >= 17)
				realSize = this.getRealSize(display);
			else {
				try {
					realSize = this.getLegacyRealSize(display);
				} catch(HardwareException e) {
					realSize = new Point();
					display.getSize(realSize);
				}
			}

			if(realSize != null) {
				Point resolution = Helper.computeScreenResolution(realSize);
				//return (width, height) function to js via native bridge:
				onSuccess.invoke(resolution.x, resolution.y);
			} else
				onError.invoke("Hardware.class.getScreenResolution: Something goes wrong (realSize == null)");
		} else
			onError.invoke("Hardware.class.getScreenResolution: Something goes wrong (windowsManager == null)");

		return;
	}

	// TODO: exports constants instead !!!
	@ReactMethod
	public void getOrientation(Callback onSuccess, Callback onError) {
		Display display = Helper.getDisplay(this.context);

		if(display != null) {
			final int rotation = display.getRotation();
			onSuccess.invoke(Helper.getOrientationFromRotation(rotation));
		} else
			onError.invoke("Hardware.class.getOrientation: Something goes wrong (windowsManager == null)");

		return;
	}

	private Point getRealSize(Display display) {
		if(display != null) {
			Point size = new Point();
			display.getRealSize(size);

			return size;
		}

		return null;
	}

	private Point getLegacyRealSize(Display oDisplay) throws HardwareException {
		if(oDisplay != null) {
			//getRealSize function is not accessible from android api < 17
			//By using reflection we can isolate some interesting functions from android.support.v13.view.Display
			//class that are only accessible during runtime (reflection allows developer to discover all attributes
			//and methods (even private ones) that are loaded by JVM during program execution (JVM create a
			//Class object from the class source code):
			//cf. https://openclassrooms.com/courses/apprenez-a-programmer-en-java/java-et-la-reflexivite
			/*
			//Par exemple pour lister via, la Reflection api, toutes les méthodes disponibles au runtime par une Class:
			for(Method method: Display.class.getMethods())
				System.out.println(method.getName());
			*/
			try {
				//Display class:
				Class<? extends Display> cDisplay = Display.class;
				//Display Object = oDisplay
				//Get adequat Methods via reflection:
				Method getRawHeight = cDisplay.getMethod("getRawHeight");
				Method getRawWidth = cDisplay.getMethod("getRawWidth");

				return new Point(
						(Integer) getRawWidth.invoke(oDisplay),
						(Integer) getRawHeight.invoke(oDisplay)
				);
			} catch(NoSuchMethodException e) {
				throw new HardwareException("getLegacyRealSize() NoSuchMethodException");
			} catch(IllegalAccessException e) {
				throw new HardwareException("getLegacyRealSize() IllegalAccessException");
			} catch(InvocationTargetException e) {
				throw new HardwareException("getLegacyRealSize() InvocationTargetException");
			}
		}

		return null;
	}
}
