#import <Foundation/Foundation.h>
#import <ReactNativeShareExtension.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <React/RCTLog.h>
#import <Firebase.h>

@interface RizzleShare : ReactNativeShareExtension
@end

@implementation RizzleShare

RCT_EXPORT_MODULE();

- (UIView*) shareView {
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"RizzleShare"
                                               initialProperties:nil
                                                   launchOptions:nil];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:0.87f green:0.85f blue:0.79f alpha:1];

  // Uncomment for console output in Xcode console for release mode on device:
  // RCTSetLogThreshold(RCTLogLevelInfo - 1);

  if ([FIRApp defaultApp] == nil) {
    [FIRApp configure];
  }

  return rootView;
}

@end
