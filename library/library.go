package library

import (
	"encoding/json"
	"fmt"
	"iptvstudio/downloader"
	"os"
	"strings"
	"time"
)

type Library struct {
	TV     []Channel
	Series []Channel
	Movies []Channel
	Radio  []Channel
	Queue  *downloader.DownloadQueue
}

func (lib *Library) MasterSearch(query string) []*Channel {
	var results []*Channel

	playlists := []Playlist{PlaylistTV, PlaylistSeries, PlaylistMovies, PlayListRadio}

	now := time.Now()

	for _, playlist := range playlists {
		playlistResult := lib.Search(playlist, query)

		if len(playlistResult) == 0 {
			continue
		}

		for _, channel := range playlistResult {
			results = append(results, channel)
		}
	}

	done := time.Now()

	fmt.Printf("🎬 %d matches found in %v\n", len(results), done.Sub(now))

	return results
}

func (lib *Library) Search(playlist Playlist, query string) []*Channel {
	if query == "" {
		return []*Channel{}
	}

	var results []*Channel

	pointerToChannels := lib.getChannelsPointer(playlist)

	queryStandardized := strings.ToLower(query)

	for i := range *pointerToChannels {
		if !strings.Contains(strings.ToLower((*pointerToChannels)[i].String()), queryStandardized) {
			continue
		}

		results = append(results, &(*pointerToChannels)[i])
	}

	return results
}

func (lib *Library) String() {
	playlistsLength := len(lib.TV) + len(lib.Movies) + len(lib.Series) + len(lib.Radio)

	fmt.Println("******************************")
	fmt.Printf("Found %d channels from the library\n", playlistsLength)
	fmt.Printf("%s TV: %d\n", Icon(PlaylistTV), len(lib.TV))
	fmt.Printf("%s Movies: %d\n", Icon(PlaylistMovies), len(lib.Movies))
	fmt.Printf("%s Series: %d\n", Icon(PlaylistSeries), len(lib.Series))
	fmt.Printf("%s Radio: %d\n", Icon(PlayListRadio), len(lib.Radio))
	fmt.Println("******************************")
}

func (lib *Library) getChannelsPointer(playlist Playlist) *[]Channel {
	switch playlist {
	case PlaylistTV:
		return &lib.TV
	case PlaylistSeries:
		return &lib.Series
	case PlaylistMovies:
		return &lib.Movies
	case PlayListRadio:
		return &lib.Radio
	}

	return nil
}

func (lib *Library) Save() error {
	// Save is disabled for now
	return nil

	err := writeJson(lib.TV, PlaylistTV)
	if err != nil {
		return err
	}

	err = writeJson(lib.Movies, PlaylistMovies)
	if err != nil {
		return err
	}

	err = writeJson(lib.Series, PlaylistSeries)
	if err != nil {
		return err
	}

	err = writeJson(lib.Radio, PlayListRadio)
	if err != nil {
		return err
	}

	return nil
}

func writeJson(channels []Channel, playlist Playlist) error {
	jsonBytes, err := json.MarshalIndent(channels, "", " ")
	if err != nil {
		return err
	}
	err = os.WriteFile("library/"+string(playlist)+".json", jsonBytes, 0644)
	if err != nil {
		return err
	}

	return nil
}
