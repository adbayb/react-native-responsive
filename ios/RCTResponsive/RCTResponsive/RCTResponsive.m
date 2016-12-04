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

@implementation CalendarManager

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(addEvent:(NSString *)name location:(NSString *)location)
{
  RCTLogInfo(@"Pretending to create an event %@ at %@", name, location);
}

@end
