package fr.ayoubdev.rnr.modules;


import android.graphics.Point;
import android.view.Display;
import android.view.WindowManager;
import com.facebook.react.bridge.*;
import fr.ayoubdev.rnr.exceptions.DeviceException;
import fr.ayoubdev.rnr.helpers.DeviceHelper;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

import static android.content.Context.WINDOW_SERVICE;

public class DeviceData extends ReactContextBaseJavaModule {
	private ReactApplicationContext context;

	public DeviceData(ReactApplicationContext reactContext) {
		super(reactContext);

		this.context = reactContext;
	}

	@Override
	public String getName() {
		return "DeviceData";
	}

	/*According to React Native documentation:
		To expose a method to JavaScript a Java method must be annotated using @ReactMethod.
		The return type of bridge methods is always void. React Native bridge is asynchronous,
		so the only way to pass a result to JavaScript is by using callbacks or emitting events.

		So we can only set void function but share results via callback or event emitter !
	*/
	@ReactMethod
	public void getScreenResolution(Callback onSuccess, Callback onError) {//in pixel
		//L'api Dimensions.get de RN est dépendant de l'orientation, d'où la réimplémentation de la fonction:
		Point realSize;
		WindowManager windowManager = (WindowManager) this.context.getSystemService(WINDOW_SERVICE);

		if(windowManager != null) {
			if(android.os.Build.VERSION.SDK_INT >= 17)
				realSize = this.getRealSize(windowManager);
			else {
				try {
					realSize = this.getLegacyRealSize(windowManager);
				} catch(DeviceException e) {
					realSize = new Point();
					windowManager.getDefaultDisplay().getSize(realSize);
				}
			}

			if(realSize != null) {
				Point resolution = DeviceHelper.computeScreenResolution(realSize);
				//return (width, height) function to js via native bridge:
				onSuccess.invoke(resolution.x, resolution.y);
			}
			else
				onError.invoke("DeviceData.class.getScreenResolution: Something goes wrong (realSize == null)");
		}
		else
			onError.invoke("DeviceData.class.getScreenResolution: Something goes wrong (windowsManager == null)");

		return;
	}

	private Point getRealSize(WindowManager windowManager) {
		if(windowManager != null) {
			Point size = new Point();

			windowManager.getDefaultDisplay().getRealSize(size);

			return size;
		}

		return null;
	}

	private Point getLegacyRealSize(WindowManager windowManager) throws DeviceException {
		if(windowManager != null) {
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
				//Display Object:
				Display oDisplay = windowManager.getDefaultDisplay();
				//Get adequat Methods via reflection:
				Method getRawHeight = cDisplay.getMethod("getRawHeight");
				Method getRawWidth = cDisplay.getMethod("getRawWidth");

				return new Point(
					(Integer) getRawWidth.invoke(oDisplay),
					(Integer) getRawHeight.invoke(oDisplay)
				);
			} catch(NoSuchMethodException e) {
				throw new DeviceException("getLegacyRealSize() NoSuchMethodException");
			} catch(IllegalAccessException e) {
				throw new DeviceException("getLegacyRealSize() IllegalAccessException");
			} catch(InvocationTargetException e) {
				throw new DeviceException("getLegacyRealSize() InvocationTargetException");
			}
		}

		return null;
	}
}
