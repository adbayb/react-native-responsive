package fr.ayoubdev.rnr;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import fr.ayoubdev.rnr.modules.DeviceData;
import fr.ayoubdev.rnr.modules.OrientationManager;

import java.util.ArrayList;
import java.util.List;


public class RNRPackage implements ReactPackage {
	@Override
	public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
		List<NativeModule> modules = new ArrayList<>();

		modules.add(new DeviceData(reactContext));
		modules.add(new OrientationManager(reactContext));

		return modules;
	}

	@Override
	public List<Class<? extends JavaScriptModule>> createJSModules() {
		return null;
	}

	@Override
	public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
		return null;
	}
}
