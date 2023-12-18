package library

import (
	"encoding/json"
	"fmt"
	"os"
	"strings"
	"time"
)

type Library struct {
	TV     []Channel
	Series []Channel
	Movies []Channel
	Radio  []Channel
}

func (lib *Library) MasterSearch(query string) map[string]string {
	results := make(map[string]string)

	playlists := []Playlist{PlaylistTV, PlaylistSeries, PlaylistMovies, PlayListRadio}

	now := time.Now()

	for _, playlist := range playlists {
		playlistResult := lib.Search(playlist, query)

		if len(playlistResult) == 0 {
			continue
		}

		for displayName, url := range playlistResult {

			displayNameWithPlaylist := fmt.Sprintf("%s (%s)", displayName, string(playlist))

			results[displayNameWithPlaylist] = url
		}

	}

	done := time.Now()

	fmt.Printf("🎬 %d matches found in %v\n", len(results), done.Sub(now))

	return results
}

func (lib *Library) Search(playlist Playlist, query string) map[string]string {
	results := make(map[string]string, 0)

	var playlistPtr *[]Channel

	switch playlist {
	case PlaylistTV:
		playlistPtr = &lib.TV
	case PlaylistSeries:
		playlistPtr = &lib.Series
	case PlaylistMovies:
		playlistPtr = &lib.Movies
	case PlayListRadio:
		playlistPtr = &lib.Radio
	}

	queryStandardized := strings.ToLower(query)

	for i := range *playlistPtr {
		if playlist == PlaylistTV {
			if strings.Contains(strings.ToLower(string((*playlistPtr)[i].Id)), queryStandardized) {
				results[(*playlistPtr)[i].DisplayName] = (*playlistPtr)[i].Url
			}

			continue
		}

		if strings.Contains(strings.ToLower((*playlistPtr)[i].DisplayName), queryStandardized) {
			results[(*playlistPtr)[i].DisplayName] = (*playlistPtr)[i].Url
		}
	}

	return results
}

func (lib *Library) String() {
	fmt.Println("   ******************************")
	fmt.Printf("Playlist TV length: %d\n", len(lib.TV))
	fmt.Printf("Playlist Movies length: %d\n", len(lib.Movies))
	fmt.Printf("Playlist Series length: %d\n", len(lib.Series))
	fmt.Printf("Playlist Radio length: %d\n", len(lib.Radio))
	fmt.Println("   ******************************")
}

func (lib *Library) Save() error {

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
