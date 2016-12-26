#import "Device.h"
#import "RCTLog.h"


@implementation Device

- (void)addEvent {
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
	RCTLogInfo(@"%@ %d %d %d", self.str, self.size, [self size], self->privateVar);
}

- (NSDictionary *)getResolution {
	int width = UIScreen.mainScreen.bounds.size.width;
	int height = UIScreen.mainScreen.bounds.size.height;
	int screenWidth = MIN(width, height);
	int screenHeight = MAX(width, height);
	CGFloat density = self.getDensity;

	return @{
		@"dip": @{
			@"width":  @(screenWidth),
			@"height": @(screenHeight)
		},
		@"px": @{
			@"width": @(screenWidth * density), // ou sans les literals NSNumber: [NSNumber numberWithInt:screenWidth],
			@"height": @(screenHeight * density)
		}
	};
}

- (CGFloat)getDensity {
	// cf. https://material.io/devices/
	return UIScreen.mainScreen.scale;
}

- (NSString *)getOrientation {
	UIInterfaceOrientation orientation = UIApplication.sharedApplication.statusBarOrientation;
	
	if (UIInterfaceOrientationIsLandscape(orientation)) {
		return @"landscape";
	}

	return @"portrait";
}

- (NSDictionary *)constantsToExport {
	return @{ 
		@"resolution": self.getResolution,
		@"density": @(self.getDensity),
		@"orientation": self.getOrientation
	};
}

@end


/*
@interface InheritedFromDevice : Device {
}
@end

@implementation InheritedFromDevice

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(addEvent:(NSString *)name location:(NSString *)location)
{
	self->privateVar = 666; // ;) //error: instance variable 'privateVar' is private
	RCTLogInfo(@"ARGS %d", self->privateVar);
}

@end
*/
