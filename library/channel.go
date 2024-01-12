package library

type TvgAttribut string

type Channel struct {
	Id          TvgAttribut
	Name        TvgAttribut
	Logo        TvgAttribut
	Group       TvgAttribut
	DisplayName string

	Url      string
	Playlist Playlist
	Metadata map[Metadata]string
}

func (c *Channel) String() string {
	if c.Playlist == PlaylistTV {
		return string(c.Id)
	}

	return c.DisplayName
}

/*
	TvgId        string `xml:"tvg-id,attr"`         // channel code from EPG code table
	TvgName      string `xml:"tvg-name,attr"`       // channel name from EPG code table
	GroupTitle   string `xml:"group-title,attr"`    // channel group
	ParentCode   string `xml:"parent-code,attr"`    // group parent code
	AudioTrack   string `xml:"audio-track,attr"`    // ISO 639-1 audio track code (LG only, see codes table)
	TvgLogo      string `xml:"tvg-logo,attr"`       // path to the big channel logo, minimum height should be 48px
	TvgLogoSmall string `xml:"tvg-logo-small,attr"` // path to the small square channel logo, min height should be 48px (works in the latest app versions only)
	Timeshift    string `xml:"timeshift,attr"`      // timeshift availability for specific channel
	TvgRec       string `xml:"tvg-rec,attr"`        // timeshift availability for specific channel
*/
