//
//  TVIVideoView.h
//  TwilioVideo
//
//  Copyright © 2016-2017 Twilio, Inc. All rights reserved.
//

#import <UIKit/UIKit.h>

#import "TVIVideoRenderer.h"

@class TVIVideoView;
@protocol TVIVideoRenderer;

/**
 *  Specifies the type of video rendering used.
 */
typedef NS_ENUM(NSUInteger, TVIVideoRenderingType) {
    /**
     *  Metal video rendering is supported on 64-bit iOS and iPadOS devices, not including simulators.
     */
    TVIVideoRenderingTypeMetal = 0,
    /**
     *  OpenGL ES video rendering is supported on all iOS devices, including the simulator.
     *  As of iOS 12.0, Apple has deprecated the usage of OpenGL ES. In iOS 13.0 texture caching for video frames is disabled on the iOS simulator.
     *  `UIWindowScene` is not supported when OpenGL ES rendering is used.
     */
    TVIVideoRenderingTypeOpenGLES NS_DEPRECATED_IOS(8_1, 12_0, "Use TVIVideoRenderingTypeMetal, instead")
}
NS_SWIFT_NAME(VideoView.RenderingType);

/**
 *  `TVIVideoViewDelegate` allows you to respond to, and customize the behavior of `TVIVideoView`.
 */
NS_SWIFT_NAME(VideoViewDelegate)
@protocol TVIVideoViewDelegate <NSObject>

@optional
/**
 *  @brief This method is called once, and only once after the first frame is received.
 *  Use it to drive user interface animations.
 *  @note: Querying hasVideoData will return 'YES' within, and after this call.
 *
 *  @param view The video view which became ready.
 */
- (void)videoViewDidReceiveData:(nonnull TVIVideoView *)view
NS_SWIFT_NAME(videoViewDidReceiveData(view:));

/**
 *  @brief This method is called every time the video track's dimensions change.
 *
 *  @param view The video view.
 *  @param dimensions The new dimensions of the video stream.
 */
- (void)videoView:(nonnull TVIVideoView *)view videoDimensionsDidChange:(CMVideoDimensions)dimensions
NS_SWIFT_NAME(videoViewDimensionsDidChange(view:dimensions:));

/**
 *  @brief This method is called when the video track's orientation changes, and your app is handling content rotation.
 *
 *  @param view The video view.
 *  @param orientation The new orientation of the video stream.
 *
 *  @discussion This method will only be called when `TVIVideoView.viewShouldRotateContent` is set to NO.
 */
- (void)videoView:(nonnull TVIVideoView *)view videoOrientationDidChange:(TVIVideoOrientation)orientation
NS_SWIFT_NAME(videoViewOrientationDidChange(view:dimensions:));

@end

/**
 *  A `TVIVideoView` draws video frames from a `TVIVideoTrack`.
 *  `TVIVideoView` should only be used on the application's main thread. Subclassing `TVIVideoView` is not supported.
 *  UIViewContentModeScaleToFill, UIViewContentModeScaleAspectFill and UIViewContentModeScaleAspectFit are the
 *  supported content modes.
 *
 *  When `TVIVideoView` is contained within a `UIWindowScene` on iOS 13.0+, it registers for lifecycle notifications from the scene. When the view is used on
 *  earlier versions of iOS or added to a `UIWindow` without a `UIWindowScene`, it registers for `UIApplication` lifecycle notifications instead.
 */
NS_SWIFT_NAME(VideoView)
@interface TVIVideoView : UIView <TVIVideoRenderer>

/**
 *  @brief Creates a video view with a frame and delegate.
 *
 *  @discussuion The default video rendering type is determined based upon your device model. For 64-bit devices the
 *  Metal APIs will be used otherwise OpenGL ES video rendering APIs will be used.
 *
 *  @param frame The frame rectangle for the view.
 *  @param delegate An object implementing the `TVIVideoViewDelegate` protocol (often a UIViewController).
 *
 *  @return A renderer which is appropriate for your device and OS combination.
 */
- (null_unspecified instancetype)initWithFrame:(CGRect)frame delegate:(nullable id<TVIVideoViewDelegate>)delegate;

/**
 *  @brief Creates a video view with a frame, delegate and rendering type.
 *
 *  @discussion The rendering type, OpenGL ES supports zero copy rendering of NV12 sources. However, it currently fails 
 *  to create textures when the input is an NV12 CVPixelBuffer without `kCVPixelBufferOpenGLTextureCacheCompatibilityKey` 
 *  set to `true`. This is only an issue for custom capturers which produce NV12 buffers without this flag set.
 *
 *  @param frame The frame rectangle for the view.
 *  @param delegate An object implementing the `TVIVideoViewDelegate` protocol (often a UIViewController).
 *  @param renderingType The rendering type.
 *
 *  @return A renderer which uses a specific `TVIVideoRenderingType`.
 *  OpenGL rendering will be used if the rendering type is not supported on the current device.
 */
- (null_unspecified instancetype)initWithFrame:(CGRect)frame
                                      delegate:(nullable id<TVIVideoViewDelegate>)delegate
                                 renderingType:(TVIVideoRenderingType)renderingType;

/**
 *  @brief A delegate which receives callbacks when important view rendering events occur.
 *
 *  @note The delegate is always called on the main thread in order to synchronize with UIKit.
 */
@property (nonatomic, weak, nullable) id<TVIVideoViewDelegate> delegate;

/**
 *  @brief Specify if the video view or the application will handle rotated video content.
 *
 *  @discussion Handling rotations at the application level is more complex, but allows you to smoothly animate
 *  transitions. By default, video frame rotation is performed by `TVIVideoView`. Set this property to `NO` if
 *  you want to handle rotations in your own layout using `[TVIVideoViewDelegate videoView:videoOrientationDidChange:].
 */
@property (nonatomic, assign) BOOL viewShouldRotateContent;

/**
 *  @brief The dimensions of incoming video frames (without rotations applied). Use this to layout `TVIVideoView`.
 */
@property (nonatomic, assign, readonly) CMVideoDimensions videoDimensions;

/**
 *  @brief The orientation of incoming video frames. Use this to layout `TVIVideoView`.
 */
@property (nonatomic, assign, readonly) TVIVideoOrientation videoOrientation;

/**
 *  @brief Indicates that at least one frame of video data has been received.
 */
@property (atomic, assign, readonly) BOOL hasVideoData;

/**
 *  @brief Determines whether the view should be mirrored.
 *
 *  @discussion This is useful when rendering the local feed from the front camera. The default is `NO`.
 */
@property (nonatomic, assign, getter=shouldMirror) BOOL mirror;

@end

