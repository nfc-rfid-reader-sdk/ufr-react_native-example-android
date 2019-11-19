package com.ufr;

import android.widget.Toast;

import androidx.annotation.NonNull;

import com.dlogic.uFCoder;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.IllegalViewOperationException;

import org.json.JSONException;
import org.json.JSONObject;

public class UFRModule extends ReactContextBaseJavaModule {

    static {
        System.loadLibrary("uFCoder"); //Load uFCoder library
    }

    uFCoder uFCoder = new uFCoder(getReactApplicationContext());

    public UFRModule(ReactApplicationContext reactContext) {
        super(reactContext); //required by React Native
    }

    @Override
    //getName is required to define the name of the module represented in JavaScript
    public String getName() {
        return "UFR";
    }

    private final static char[] hexArray = "0123456789ABCDEF".toCharArray();
    public static String toHexadecimal(byte[] bytes, int len) {
        char[] hexChars = new char[len * 2];
        for ( int j = 0; j < len; j++ ) {
            int v = bytes[j] & 0xFF;
            hexChars[j * 2] = hexArray[v >>> 4];
            hexChars[j * 2 + 1] = hexArray[v & 0x0F];
        }
        return new String(hexChars);
    }

    //This is written without callback to show you that you can use Java code (example Toast) into your application
    //at the same time while you are using JavaScript
    @ReactMethod
    public void ReaderOpenEx(String macAddress) {
        try {

            int status = uFCoder.ReaderOpenEx(0, macAddress, 'L', "");

            if(status == 0)
            {
                Toast.makeText(getReactApplicationContext(), "Reader opened successfully", Toast.LENGTH_SHORT).show();
            }

        } catch (Exception e) {
           e.printStackTrace();
        }
    }

    //This function will show you how to pass value from JavaScript to Java code
    @ReactMethod
    public void ReaderUISignal(int light, int beep) {
        try {

            int status = uFCoder.ReaderUISignal((byte)light, (byte)beep);

        } catch (IllegalViewOperationException e) {

        }
    }

    //This function will show you how you can get value back (with callback function) from Java code and use it in JavaScript code
    @ReactMethod
    public void GetCardIdEx(Callback errorCallback, Callback successCallback)
    {
        try {

            byte[] sak = new byte[1];
            byte[] uid = new byte[10];
            byte[] uidSize = new byte[1];

            int status = uFCoder.GetCardIdEx(sak, uid, uidSize);

            if (status == 0)
            {
                successCallback.invoke("UID[" + Byte.toString(uidSize[0]) + "] = " + toHexadecimal(uid, uidSize[0]));
            }
            else
            {
                successCallback.invoke(uFCoder.UFR_Status2String(status));
            }

        } catch (IllegalViewOperationException e) {
            errorCallback.invoke(e.getMessage());
        }
    }
}
