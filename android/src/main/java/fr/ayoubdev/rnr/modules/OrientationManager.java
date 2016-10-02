package fr.ayoubdev.rnr.modules;


import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

public class OrientationManager extends ReactContextBaseJavaModule{
	public OrientationManager(ReactApplicationContext reactContext) {
		super(reactContext);
	}

	@Override
	public String getName() {
		return "OrientationManager";
	}
}
