package fr.ayoubdev.rnr.modules;


import android.view.WindowManager;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import static android.content.Context.WINDOW_SERVICE;

public class DeviceData extends ReactContextBaseJavaModule {
	private ReactApplicationContext context;

	public DeviceData(ReactApplicationContext reactContext) {
		super(reactContext);
	}

	@Override
	public String getName() {
		return "DeviceData";
	}

	@ReactMethod
	public String test() {
		System.out.println("Ayoub");

		return "test call success";
	}

	@ReactMethod
	public void get() {
		WindowManager windowManager = (WindowManager) this.context.getSystemService(WINDOW_SERVICE);
		int width = windowManager.getDefaultDisplay().getWidth();
		int height = windowManager.getDefaultDisplay().getHeight();

		System.out.println("Ayoub get call: " + width + " // " + height);

		return;
	}
}
