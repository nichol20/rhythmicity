// Original file: src/proto/mainApi/track.proto

import type { YoutubeStatistics as _rhythmicity_main_api_YoutubeStatistics, YoutubeStatistics__Output as _rhythmicity_main_api_YoutubeStatistics__Output } from '../../rhythmicity/main_api/YoutubeStatistics';
import type { YoutubeThumbnails as _rhythmicity_main_api_YoutubeThumbnails, YoutubeThumbnails__Output as _rhythmicity_main_api_YoutubeThumbnails__Output } from '../../rhythmicity/main_api/YoutubeThumbnails';

export interface Youtube {
  'title'?: (string);
  'durationMs'?: (number);
  'publishedAt'?: (string);
  'statistics'?: (_rhythmicity_main_api_YoutubeStatistics | null);
  'thumbnails'?: (_rhythmicity_main_api_YoutubeThumbnails | null);
}

export interface Youtube__Output {
  'title'?: (string);
  'durationMs'?: (number);
  'publishedAt'?: (string);
  'statistics'?: (_rhythmicity_main_api_YoutubeStatistics__Output);
  'thumbnails'?: (_rhythmicity_main_api_YoutubeThumbnails__Output);
}
