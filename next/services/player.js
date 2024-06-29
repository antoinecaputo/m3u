export const HOST = 'http://cf.loyxy.cloud';
export const USERNAME = '1fa24dde5b92';
export const PASSWORD = '97ee8a8b77';

export function getStreamUrl(streamId, containerExtension = undefined,  stream_type = 'movie') {
  return `${HOST}/${stream_type}/${USERNAME}/${PASSWORD}/${streamId}${containerExtension ? '.' + containerExtension : ''}`;
}

export function getCommand(url) {
  const path = '/Applications/VLC.app/Contents/MacOS/VLC';

  return `${path} ${url}`;
}
