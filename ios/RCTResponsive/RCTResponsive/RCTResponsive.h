//
//  RCTResponsive.h
//  RCTResponsive
//
//  Created by Ayoub ADIB on 04/12/2016.
//  Copyright © 2016 Ayoub ADIB. All rights reserved.
//

/*
#import <Foundation/Foundation.h>

@interface RCTResponsive : NSObject

@end
*/

#import <Foundation/Foundation.h>
#import "RCTBridgeModule.h"

@interface Orientation : NSObject <RCTBridgeModule> {
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

    @protected
    int protectedVar;

	@public 
	int publicVar;
}

// @property permet de définir automatiquement, en plus de 
// la variable, le couple getter/setter de la variable:
@property int size;
@property NSString *str;

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
