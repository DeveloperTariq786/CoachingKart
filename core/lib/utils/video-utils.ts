export type VideoProvider = 'video' | 'hls' | 'youtube' | 'vimeo';

export function getProviderFromUrl(url?: string): VideoProvider {
  if (!url) return 'video';
  
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return 'youtube';
  }
  
  if (url.includes('vimeo.com')) {
    return 'vimeo';
  }
  
  if (url.endsWith('.m3u8') || url.includes('.m3u8?')) {
    return 'hls';
  }
  
  return 'video';
}
