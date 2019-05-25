package com.jpbcsi.mbackend;

import android.net.Uri;


import com.getcapacitor.FileUtils;
import com.getcapacitor.JSObject;
import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;

import org.json.JSONObject;


import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Date;


@NativePlugin()
public class MBackend extends Plugin {

    @PluginMethod()
    public void echo(PluginCall call) {
        String value = call.getString("value");

        JSObject ret = new JSObject();
        ret.put("value", value);
        call.success(ret);
    }

    @PluginMethod()
    public void downloadImage(PluginCall call) throws MalformedURLException, IOException {
        String urlString = call.getString("url");
        URL url = new URL(urlString);
        String urlPath = url.getPath();
        String extfileName = urlPath.substring(urlPath.lastIndexOf('.') + 1);
        String fileName = new Date().getTime() + "." + extfileName;
        String imgFilename = bridge.getContext().getCacheDir().getAbsolutePath() + '/' + fileName;

        try (InputStream imageReader = new BufferedInputStream(url.openStream());
             OutputStream imageWriter = new BufferedOutputStream(new FileOutputStream(imgFilename));)
        {
            int readByte;

            while ((readByte = imageReader.read()) != -1)
            {
                imageWriter.write(readByte);
            }

            final Uri uri = Uri.fromFile(new File(imgFilename));
            String addDownloaded = FileUtils.getPortablePath(getContext(), bridge.getLocalUrl(), uri);
            JSObject retImg = new JSObject();
            retImg.put("value", addDownloaded);
            call.success(retImg);

        } catch (Exception e) {
            call.error("Image not downloaded");
        }
    }
}
