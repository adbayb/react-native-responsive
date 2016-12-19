//
//  RCTResponsive.m
//  RCTResponsive
//
//  Created by Ayoub ADIB on 04/12/2016.
//  Copyright © 2016 Ayoub ADIB. All rights reserved.
//

/*
#import "RCTResponsive.h"

@implementation RCTResponsive

@end
*/

#import "RCTResponsive.h"
#import "RCTLog.h"

@implementation Orientation

- (NSString *)getOrientationStr: (int)orientation {
  NSString *orientationStr;
  switch (orientation) {
    case 0:
      orientationStr = @"PORTRAIT";
      break;
    case 1:
    case 2:
      orientationStr = @"LANDSCAPE";
      break;

    case 3:
      orientationStr = @"PORTRAITUPSIDEDOWN";
      break;

    default:
      orientationStr = @"UNKNOWN";
      break;
  }
  return orientationStr;
}

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(addEvent:(NSString *)name location:(NSString *)location)
{
  NSString *orientationStr = [self getOrientationStr:3];
  // Dot operator VS Arrow operator:
  // self.propertyVar est un sucre syntaxique pour accéder au getter ou setter 
  // (en mode passage de message avec self comme receveur et propertyVar 
  // comme expéditeur: [self propertyVar] par exemple)
  // en fonction de la présence ou non d'un =. Mais behind, le compilateur fait
  // appel à l'arrow operator car self est un pointeur (self <=> this en C) et 
  // ses attributs et méthodes ne peuvent-être accédés que par déréférencement du pointeur 
  // via self->var ou (*self).var:
  
  self.str = @"POPO"; // <=> [self setStr:@"POPO"];
  self.size = 78;
  self->privateVar = 1212; // <=> privateVar = 1212; // <=> (*self).privateVar = 1212;
  RCTLogInfo(@"ARGS JS %@ ARGS IOS %@ %@ %d %d %d", name, orientationStr, self.str, self.size, [self size], self->privateVar);
}

@end





/*
@interface InheritedFromOrientation : Orientation {
}
@end

@implementation InheritedFromOrientation

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(addEvent:(NSString *)name location:(NSString *)location)
{
  self->privateVar = 666; // ;) //error: instance variable 'privateVar' is private
  RCTLogInfo(@"ARGS %d", self->privateVar);
}

@end
*/