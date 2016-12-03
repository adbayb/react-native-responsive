// Ici on expose les headers accessibles par nos codes Swift
// En effet, Swift ne peut pas importer les .h depuis du code objective-c
// Le Bridging Header permet de lever cette limite:
#import "RCTBridge.h"
#import "RCTBridgeModule.h"
#import "RCTEventDispatcher.h"