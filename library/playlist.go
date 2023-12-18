package library

import (
	"regexp"
)

type Playlist string

const (
	PlaylistTV      Playlist = "TV"
	PlaylistSeries           = "SERIES"
	PlaylistMovies           = "MOVIES"
	PlayListRadio            = "RADIO"
	PlaylistUnknown          = "UNKNOWN"
)

type Metadata string

const (
	ChannelName Metadata = "channel-name"
	Season      Metadata = "season"
	Episode     Metadata = "episode"
	Category    Metadata = "category"
)

// Playlist TV : group-title = '{CHANNEL_NAME}'
// Playlist Series :
// group-title ='SERIES'
// tvg-name = '{NAME} S{SEASON_NUMBER} E{EPISODE_NUMBER}'
// Playlist Movies :
// group-title ='{CATEGORY}'
// Playlist Radio : group-title = 'RADIO'

func ParsePlaylist(extinf string, url string) Playlist {
	reg := regexp.MustCompile(`group-title="RADIO"`)
	if reg.MatchString(extinf) {
		return PlayListRadio
	}

	reg = regexp.MustCompile(`http://(.*)/series/`)
	if reg.MatchString(url) {
		return PlaylistSeries
	}

	reg = regexp.MustCompile(`http://(.*)/movie/`)
	if reg.MatchString(url) {
		return PlaylistMovies
	}

	// if 'tvg-id="{ID}"' is present, it's a TV channel
	reg = regexp.MustCompile(`tvg-id="(.*)"`)
	if reg.MatchString(extinf) {
		return PlaylistTV
	}
	return PlaylistUnknown
}
