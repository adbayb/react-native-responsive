// YourModuleBridge.m
#import "RCTBridge.h"
@interface RCT_EXTERN_MODULE(Module, NSObject)
//or
//@interface RCT_EXTERN_REMAP_MODULE(YourDesiredModuleNameInJS, YourModule, NSObject)

RCT_EXTERN_METHOD(YourMethod:(NSString *)arg1 arg2:(BOOL)arg2)

@end