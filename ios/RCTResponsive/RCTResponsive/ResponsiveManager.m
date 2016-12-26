#import "ResponsiveManager.h"

@implementation ResponsiveManager
	@synthesize bridge = _bridge;
	// instancetype renvoie au type de l'objet que retournera la classe (ici <=> ResponsiveModule, en gros c'est this)
	// On peut utiliser id à la place mais id <=> void * donc pas de type (même si dans la pratique, le compilateur ios
	// remplace id par instancetype):
	- (instancetype)init {
		self = super.init;
		
		if (self) {
			// Orientation listener
			[[NSNotificationCenter defaultCenter] 
				addObserver:self \
				selector:@selector(onOrientationChange:) \
				name:@"UIApplicationDidChangeStatusBarOrientationNotification" \
				object:nil];
		}

		return self;
	}

	- (void)dealloc {
		[[NSNotificationCenter defaultCenter] 
			removeObserver: self];
	}

	- (void)onOrientationChange: (NSNotification *)notification {
		// RCTLogInfo(@"CHANGEEEEE %@", self.getOrientation);
		[self.bridge.eventDispatcher 
			sendAppEventWithName:@"orientationDidChange" body:@{
				@"orientation": self.getOrientation
			}];
	}

	- (void)testBridge {
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
		// RCTLogInfo(@"%@ %d %d %d", self.str, self.size, [self size], self->privateVar);
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
@interface InheritedFromResponsiveModule : ResponsiveModule {
}
@end

@implementation InheritedFromResponsiveModule

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(addEvent:(NSString *)name location:(NSString *)location)
{
	self->privateVar = 666; // ;) //error: instance variable 'privateVar' is private
	RCTLogInfo(@"ARGS %d", self->privateVar);
}

@end
*/
