// #import <Foundation/Foundation.h> // imports all necessary class and object to code in objective-c
#import <UIKit/UIKit.h> // UIKit already import <Foundation/Foundation.h> no need to reimport it !
#import "RCTBridgeModule.h"
#import "RCTEventDispatcher.h"
// #import "RCTLog.h"
// It's necessary to import headers needed on each file even if it's already imported on another file 
// (except if we import the .h of the header containing the interesting import files). Btw, we can 
// pre-import all necessary import for all files via pch file (but it's not recommended for readability purposes)

// Basic class definition :
// cf. http://rypress.com/tutorials/objective-c/index

// @interface permet de définir la signature (déclaration) d'une classe (le plus souvent les @interface sont spécifiés dans les fichiers .h sauf si l'on ne souhaite pas exposer publiquement l'interface à d'autres classes (via l'import .h) et, dans ce cas, on le met dans le .m)
// @implementation permet de définir son implémentation <=> .c en C/C++
// <RCTBridgeModule> est ici un protocole (<=> interface en java): toutes les méthodes de 
// RCTBridgeModule seront ajoutées dans la définition de ResponsiveModule (les méthodes @required (modifier protocole par défaut) du protocole doivent être implémentées obligatoirement
// dans l'implementation de la classe utilisant le protocole sauf si les méthodes sont @optional):
@interface ResponsiveManager: NSObject <RCTBridgeModule> { 
		// RCTBridgeModule nécessaire ici pour "@synthesis bridge" comme il est interdit d'ajouter des propriétés aux catégories 
		// (toutes propriété définie dans un protocole doit être synthétisé manuellement dans la classe l'implémentant (pas fait de 
		// facon automatique contrairement aux @property // // (qui sont synthétisées par le compilateur, l'opération de synthétisation consiste à ajouter automatiquement les getter/setter))... 
		
		// Sans spécification des visibility modifiers @private, @public, @protected
		// les variables ont une encapsulation par défaut à @protected.

		// Attention, il n'est pas possible d'affecter une visibility modifier sur un @property
		// puisque ce dernier définit un couple getter/setter qui ont une visibilité publique:
		
		// Il est important de noter que l'encapsulation via les visibility modifiers ne 
		// sont utilisables que sur les variables. Les méthodes en objective-c sont toujours publiques.
		// Cependant, on peut cacher les méthodes (simulant ainsi une méthode privée) 
		// en les définissant et implémentant dans l'implémentation (i.e. dans le .m).
		// De la même, on peut utiliser le .m pour rendre les @property privées en les définissant 
		// dans l'implémentation au lieu de l'interface.
		@private
		int privateVar;
		int privateVar2;

		@protected
		int protectedVar;

		@public 
		int publicVar;
	}
	// @property permet de définir automatiquement, en plus de 
	// la variable, le couple getter/setter de la variable:
	@property int size;
	@property NSString *str;
	- (NSDictionary *)getResolution;
	- (CGFloat)getDensity;
	- (NSString *)getOrientation;
	// @end met fin à la déclaration (@interface, @implementation... doivent toujours finir par un @end)
@end


/*
PRIMITIVE TYPES:

int i = 5;
float f = 5.3;
double d = 66.76;
long int li = 22;
short int si = 12;
char c = ‘W’;
signed int sint = 34;
unsigned int uint = –23;
int o = 024;
int h = 0xAD;
long long ll = 45;
long double lf = 34.5;
unsigned long long ull = 12;
//NSString* est ici un pointeur (même définition qu'en C)
NSString *msg = @”NSLog Message”;
  

LOG PRIMITIVE TYPES: 

NSLog(@” print int %d”, i);
NSLog(@” print float %f”, f); // use %e for exponential
NSLog(@” print double %f”, d); // use %e for exponential
NSLog(@” print long int %li”, li);
NSLog(@” print short int %i”, si);
NSLog(@” print char %c”, c);
NSLog(@” print signed int %i”, sint);
NSLog(@” print unsigned int %u”, uint);
NSLog(@” print octal %o”, o);
NSLog(@” print hexadecimal %X”, h);
NSLog(@” print long long %lld”, ll);
NSLog(@” print long double %Lf”, lf);
NSLog(@” print unsigned long long %llu”, ull);
NSLog(@” print Object %@”, msg);
*/
