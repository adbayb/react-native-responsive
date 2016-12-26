package fr.aybadb.rnr.modules;

import android.hardware.SensorManager;
import android.support.annotation.Nullable;
import android.view.OrientationEventListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import fr.aybadb.rnr.helpers.Helper;


// TODO to rename to listener ?
public class OrientationListener extends ReactContextBaseJavaModule {
	private ReactApplicationContext context;
	private int rotation;

	public OrientationListener(ReactApplicationContext reactContext) {
		super(reactContext);

		this.context = reactContext;
		this.rotation = Helper.getDisplay(context).getRotation();
		OrientationEventListener orientationEventListener = new OrientationEventListener(reactContext, SensorManager.SENSOR_DELAY_NORMAL) {

			@Override
			public void onOrientationChanged(int i) {
				//System.out.println("AYOUB Orientation Changed " + i);
				int newRotation = Helper.getDisplay(context).getRotation();
				//To avoid sending a lot of unknown event (since a little change in degree result in an orientation
				//change), we only send event to native bridge when smartphone is in a new valid orientation:
				if(rotation != newRotation) {
					String orientation = Helper.getOrientationFromRotation(newRotation);
					if(orientation.equals("portrait") || orientation.equals("landscape")) {
						WritableMap params = Arguments.createMap();
						params.putString("orientation", orientation);
						sendEvent("OrientationListener", params);
					}
					rotation = newRotation;
				}

				return;
			}
		};

		this.listen(orientationEventListener);
	}

	private void sendEvent(String eventName, @Nullable WritableMap params) {
		if(this.context != null) {
			this.context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, params);
		}

		return;
	}

	private void listen(OrientationEventListener orientationEventListener) {
		//En java les arguments sont toujours passées par valeur:
		//pour les arguments de type primitif (int, long...), la valeur passée est
		//la valeur actuelle de la primitive (par exemple 3)
		//pour les arguments de type objet, la valeur passée est la référence de l'objet
		//en mémoire et non l'objet en lui même (donc ici on passe la référence de l'objet orientationEventListener).

		//We activate orientation listener only if device support orientation changes:
		if(orientationEventListener.canDetectOrientation())
			orientationEventListener.enable();
		else {
			orientationEventListener.disable();
			//null to allow garbage collect orientationEventListener variable after disabling it:
			orientationEventListener = null;
		}

		return;
	}

	@Override
	public String getName() {
		return "OrientationListener";
	}
}
