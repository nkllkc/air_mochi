//
//  TVILocalParticipant.h
//  TwilioVideo
//
//  Copyright © 2016-2017 Twilio, Inc. All rights reserved.
//

#import "TVIParticipant.h"

@protocol TVILocalParticipantDelegate;

@class TVIEncodingParameters;

@class TVILocalAudioTrackPublication;
@class TVILocalDataTrackPublication;
@class TVILocalVideoTrackPublication;

@class TVILocalAudioTrack;
@class TVILocalDataTrack;
@class TVILocalVideoTrack;

/**
 *  `TVILocalParticipant` represents your Participant in a Room which you are connected to.
 */
NS_SWIFT_NAME(LocalParticipant)
@interface TVILocalParticipant : TVIParticipant

/**
 *  @brief The Local Participant's delegate. Set this property to be notified about Participant events such as tracks being
 *  published.
 */
@property (atomic, weak, nullable) id<TVILocalParticipantDelegate> delegate;

/**
 * @brief A collection of `TVILocalAudioTrackPublication` objects.
 */
@property (nonatomic, copy, readonly, nonnull) NSArray<TVILocalAudioTrackPublication *> *localAudioTracks;

/**
 * @brief A collection of `TVILocalDataTrackPublication` objects.
 */
@property (nonatomic, copy, readonly, nonnull) NSArray<TVILocalDataTrackPublication *> *localDataTracks;

/**
 * @brief A collection of `TVILocalVideoTrackPublication` objects.
 */
@property (nonatomic, copy, readonly, nonnull) NSArray<TVILocalVideoTrackPublication *> *localVideoTracks;

/**
 *  @brief The Local Participant's Network Quality Level
 *
 *  @discussion This property represents the quality of a Local Participant's connection in a Room. This value may not
 *  be immediately available, and, in some cases, it's impossible to calculate it. In these instances,
 *  `networkQualityLevel` will return `TVINetworkQualityLevelUnknown`. Calling this API in a Peer-to-Peer Room will
 *  always return `TVINetworkQualityLevelUnknown`. This is part of the Network Quality API and must be enabled by
 *  enabling the `networkQualityEnabled` option in `TVIConnectOptions`.
 */
@property (nonatomic, assign, readonly) TVINetworkQualityLevel networkQualityLevel;

/**
 *  @brief Where the Participant's signaling traffic enters and exits Twilio's communications cloud.
 *  This property reflects the `TVIConnectOptions.region` provided by the Participant and when "gll"
 *  (the default value) is provided, the region that was selected using latency based routing.
 */
@property (nonatomic, copy, readonly, nonnull) NSString *signalingRegion;

/**
 *  @brief Publishes the audio track to the Room.
 *
 *  @param track The `TVILocalAudioTrack` to publish.
 *
 *  @return `YES` if the track was published successfully, `NO` otherwise.
 */
- (BOOL)publishAudioTrack:(nonnull TVILocalAudioTrack *)track;

/**
 *  @brief Publishes the data track to the Room.
 *
 *  @param track The `TVILocalDataTrack` to publish.
 *
 *  @return `YES` if the track was published successfully, `NO` otherwise.
 */
- (BOOL)publishDataTrack:(nonnull TVILocalDataTrack *)track;

/**
 *  @brief Publishes the video track to the Room.
 *
 *  @param track The `TVILocalVideoTrack` to publish.
 *
 *  @return `YES` if the track was published successfully, `NO` otherwise.
 */
- (BOOL)publishVideoTrack:(nonnull TVILocalVideoTrack *)track;

/**
 *  @brief Unpublishes the audio track from the Room.
 *
 *  @param track The `TVILocalAudioTrack` to unpublish.
 *
 *  @return `YES` if the track was unpublished successfully, `NO` otherwise.
 */
- (BOOL)unpublishAudioTrack:(nonnull TVILocalAudioTrack *)track;

/**
 *  @brief Unpublishes the data track from the Room.
 *
 *  @param track The `TVILocalDataTrack` to unpublish.
 *
 *  @return `YES` if the track was unpublished successfully, `NO` otherwise.
 */
- (BOOL)unpublishDataTrack:(nonnull TVILocalDataTrack *)track;

/**
 *  @brief Unpublishes the video track from the Room.
 *
 *  @param track The `TVILocalVideoTrack` to unpublish.
 *
 *  @return `YES` if the track was unpublished successfully, `NO` otherwise.
 */
- (BOOL)unpublishVideoTrack:(nonnull TVILocalVideoTrack *)track;

/**
 *  @brief Updates the `TVIEncodingParameters` used to share media in the Room.
 *
 *  @param encodingParameters The `TVIEncodingParameters` to use or `nil` for the default values.
 */
- (void)setEncodingParameters:(nullable TVIEncodingParameters *)encodingParameters;

/**
 *  @brief Developers shouldn't initialize this class directly.
 *
 *  @discussion Use `TwilioVideo` connectWith* methods to join a `TVIRoom` and query its `localParticipant` property.
 */
- (null_unspecified instancetype)init __attribute__((unavailable("Use TwilioVideoSDK connectWith* methods to join a TVIRoom and query its `localParticipant` property.")));

@end

/**
 *  `TVILocalParticipantDelegate` provides callbacks when important events happen to a `TVILocalParticipant`.
 */
NS_SWIFT_NAME(LocalParticipantDelegate)
@protocol TVILocalParticipantDelegate <NSObject>

@optional

/**
 * @brief Delegate method called when the Local Participant successfully publishes an audio track.
 *
 * @param participant The local participant.
 * @param audioTrackPublication The `TVILocalAudioTrackPublication` object.
 */
- (void)localParticipant:(nonnull TVILocalParticipant *)participant didPublishAudioTrack:(nonnull TVILocalAudioTrackPublication *)audioTrackPublication
NS_SWIFT_NAME(localParticipantDidPublishAudioTrack(participant:audioTrackPublication:));


/**
 * @brief Delegate method called when the publication of an audio track fails.
 *
 * @param participant The local participant.
 * @param audioTrack The audio track that failed publication.
 * @param error An `NSError` object describing the reason for the failure.
 */
- (void)localParticipant:(nonnull TVILocalParticipant *)participant
didFailToPublishAudioTrack:(nonnull TVILocalAudioTrack *)audioTrack
               withError:(nonnull NSError *)error
NS_SWIFT_NAME(localParticipantDidFailToPublishAudioTrack(participant:audioTrack:error:));

/**
 * @brief Delegate method called when the Local Participant successfully publishes a data track.
 *
 * @param participant The local participant.
 * @param dataTrackPublication The `TVILocalDataTrackPublication` object.
 */
- (void)localParticipant:(nonnull TVILocalParticipant *)participant didPublishDataTrack:(nonnull TVILocalDataTrackPublication *)dataTrackPublication
NS_SWIFT_NAME(localParticipantDidPublishDataTrack(participant:dataTrackPublication:));

/**
 * @brief Delegate method called when the publication of a data track fails.
 *
 * @param participant The local participant.
 * @param dataTrack The data track that failed publication.
 * @param error An `NSError` object describing the reason for the failure.
 */
- (void)localParticipant:(nonnull TVILocalParticipant *)participant
didFailToPublishDataTrack:(nonnull TVILocalDataTrack *)dataTrack
               withError:(nonnull NSError *)error
NS_SWIFT_NAME(localParticipantDidFailToPublishDataTrack(participant:dataTrack:error:));

/**
 * @brief Delegate method called when the Local Participant successfully publishes a video track.
 *
 * @param participant The local participant.
 * @param videoTrackPublication The `TVILocalVideoTrackPublication` object.
 */
- (void)localParticipant:(nonnull TVILocalParticipant *)participant didPublishVideoTrack:(nonnull TVILocalVideoTrackPublication *)videoTrackPublication
NS_SWIFT_NAME(localParticipantDidPublishVideoTrack(participant:videoTrackPublication:));

/**
 * @brief Delegate method called when the publication of a video track fails.
 *
 * @param participant The local participant.
 * @param videoTrack The video track that failed publication.
 * @param error An `NSError` object describing the reason for the failure.
 */
- (void)localParticipant:(nonnull TVILocalParticipant *)participant
didFailToPublishVideoTrack:(nonnull TVILocalVideoTrack *)videoTrack
               withError:(nonnull NSError *)error
NS_SWIFT_NAME(localParticipantDidFailToPublishVideoTrack(participant:videoTrack:error:));

/**
 * @brief Delegate method called when the Local Participant's `networkQualityLevel` has changed.
 *
 * @param participant The local participant.
 * @param networkQualityLevel The new Network Quality Level.
 */
- (void)localParticipant:(nonnull TVILocalParticipant *)participant networkQualityLevelDidChange:(TVINetworkQualityLevel)networkQualityLevel
NS_SWIFT_NAME(localParticipantNetworkQualityLevelDidChange(participant:networkQualityLevel:));

@end
