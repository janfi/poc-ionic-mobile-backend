import Foundation
import Capacitor

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitor.ionicframework.com/docs/plugins/ios
 */
@objc(MBackend)
public class MBackend: CAPPlugin {
    
    @objc func echo(_ call: CAPPluginCall) {
        let value = call.getString("value") ?? ""
        call.success([
            "value": value
        ])
    }
    
    @objc func downloadImage(_ call: CAPPluginCall) {
        var timestamp: String {
            return "\(NSDate().timeIntervalSince1970 * 1000)"
        }
        let urlString = call.getString("url") ?? "";
        let url = URL(string: urlString)!
        getData(from: url) { data, response, error in
            guard let data = data, error == nil else {
                call.error("Image not downloaded")
                return
            }
            let resp = (response as! HTTPURLResponse)
            print("response status: \(resp.statusCode)")
            
            var theFileName = response?.suggestedFilename ?? url.lastPathComponent;
            if (theFileName.count > 20) {
                let endIndex = theFileName.index(theFileName.endIndex, offsetBy: -20)
                theFileName =  String(theFileName[endIndex...]);
            }
            theFileName = timestamp + "_" + theFileName;
            print("Download Finished")
            let destUrl = URL(fileURLWithPath: NSTemporaryDirectory()).appendingPathComponent(theFileName);
            do {
                 try data.write(to: destUrl, options: .atomic);
            } catch {
                call.error("Image not downloaded");
            }
            
            guard let webPath = CAPFileManager.getPortablePath(host: self.bridge.getLocalUrl(), uri: URL(string: destUrl.absoluteString)) else {
                call.reject("Unable to get portable path to file")
                return
            }
            
            call.success([
                "value": webPath
                ])
        }
        
    }
    
    func getData(from url: URL, completion: @escaping (Data?, URLResponse?, Error?) -> ()) {
        URLSession.shared.dataTask(with: url, completionHandler: completion).resume()
    }
}
