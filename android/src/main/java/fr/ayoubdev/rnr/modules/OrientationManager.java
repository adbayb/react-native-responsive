package fr.ayoubdev.rnr.modules;


import android.hardware.SensorManager;
import android.view.OrientationEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

public class OrientationManager extends ReactContextBaseJavaModule {
	private OrientationEventListener orientationEventListener;

	public OrientationManager(ReactApplicationContext reactContext) {
		super(reactContext);

		this.orientationEventListener = new OrientationEventListener(reactContext, SensorManager.SENSOR_DELAY_NORMAL) {

			@Override
			public void onOrientationChanged(int i) {
				System.out.println("AYOUB Orientation Changed " + i);
				//TODO: event emitter
				return;
			}
		};

		//We activate orientation listener only if device support orientation changes:
		if(this.orientationEventListener.canDetectOrientation())
			this.orientationEventListener.enable();
		else {
			this.orientationEventListener.disable();
			//null to allow garbage collect orientationEventListener variable after disabling it:
			this.orientationEventListener = null;
		}
	}

	@Override
	public String getName() {
		return "OrientationManager";
	}
}
