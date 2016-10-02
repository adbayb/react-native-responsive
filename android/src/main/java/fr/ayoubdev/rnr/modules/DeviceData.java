package fr.ayoubdev.rnr.modules;


import android.graphics.Point;
import android.view.WindowManager;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

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

	@ReactMethod
	public String test() {
		System.out.println("Ayoub");

		return "test call success";
	}

	@ReactMethod
	public void get() {
		//Equivalent à l'api Dimensions.get de RN (dépendant de l'orientation car lié au screen :():
		Point realSize = new Point();
		WindowManager windowManager = (WindowManager) this.context.getSystemService(WINDOW_SERVICE);

		if(windowManager != null) {
			if(android.os.Build.VERSION.SDK_INT > 16)
				windowManager.getDefaultDisplay().getRealSize(realSize);
			else
				//pour les api <= 16, il n'y a pas de touches donc la taille réelle de l'écran correspond à la
				//taille du window (d'où le fait que getRealSize n'ait été introduit qu'à partir de l'api 17):
				windowManager.getDefaultDisplay().getSize(realSize);

			int width = Math.max(realSize.x, realSize.y);
			int height = Math.min(realSize.x, realSize.y);

			System.out.println("Real Size get call: " + width + " // " + height);
		}

		//display api: https://developer.android.com/reference/android/view/Display.html
		//Contient getOrientation();

		//TODO: brand, model info?

		return;
	}
}
