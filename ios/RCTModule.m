// Définition ici des méthodes
// Exposition des méthodes et modules accessibles en JavaScript via l'api NativeModule de react-native 

#import "RCTBridge.h"
// @interface permet de définir la signature (déclaration) d'une classe (le plus souvent les @interface sont spécifiés dans les fichiers .h sauf si l'on ne souhaite pas exposer publiquement l'interface à d'autres classes (via l'import .h) et, dans ce cas, on le met dans le .m)
// @implementation permet de définir son implémentation <=> .c en C/C++
@interface RCT_EXTERN_MODULE(Module, NSObject)
//or
//@interface RCT_EXTERN_REMAP_MODULE(YourDesiredModuleNameInJS, YourModule, NSObject)

RCT_EXTERN_METHOD(YourMethod:(NSString *)arg1 arg2:(BOOL)arg2)

// @end met fin à la déclaration (@interface, @implementation... doivent toujours finir par un @end)
@end