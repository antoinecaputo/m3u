package parser

import (
	"bufio"
	"fmt"
	"iptvstudio/downloader"
	"iptvstudio/library"
	"log"
	"os"
	"regexp"
	"strings"
)

func LoadLibrary() (*library.Library, error) {
	filePath, err := downloader.GetDownloadedFilePath()
	if err != nil {
		return nil, fmt.Errorf("error getting downloaded file path: %v", err)
	}

	fmt.Println("📄 Loading library...")

	channels, err := ProcessFile(filePath)
	if err != nil {
		log.Fatalln(err)
	}

	playlistTv := make([]library.Channel, 0)
	playlistMovies := make([]library.Channel, 0)
	playlistSeries := make([]library.Channel, 0)
	playlistRadio := make([]library.Channel, 0)

	for _, channel := range channels {
		switch channel.Playlist {
		case library.PlaylistTV:
			playlistTv = append(playlistTv, channel)
		case library.PlaylistMovies:
			playlistMovies = append(playlistMovies, channel)
		case library.PlaylistSeries:
			playlistSeries = append(playlistSeries, channel)
		case library.PlayListRadio:
			playlistRadio = append(playlistRadio, channel)
		}
	}

	return &library.Library{
		TV:     playlistTv,
		Series: playlistSeries,
		Movies: playlistMovies,
		Radio:  playlistRadio,
		Queue:  downloader.InitDownloadQueue(),
	}, nil
}

func ProcessFile(filePath string) ([]library.Channel, error) {

	file, err := os.Open(filePath)
	if err != nil {
		return nil, fmt.Errorf("Error opening file: %v", err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	scanner.Scan()
	firstLine := scanner.Text()

	if !strings.HasPrefix(firstLine, "#EXTM3U") {
		return nil, fmt.Errorf("File %s is not a valid m3u file", filePath)
	}

	channels := make([]library.Channel, 0)

	currentEXTINF := ""
	currentURL := ""
	for scanner.Scan() {

		if strings.HasPrefix(scanner.Text(), "#EXTINF") {
			currentEXTINF = scanner.Text()
		}

		if strings.HasPrefix(scanner.Text(), "http") {
			currentURL = scanner.Text()
		}

		if currentEXTINF == "" || currentURL == "" {
			continue
		}

		tvgID, err := ExtractAttribute(currentEXTINF, TvgID)
		if err != nil {
			return nil, fmt.Errorf("Error parsing tvg-id : %v", err)
		}

		tvgName, err := ExtractAttribute(currentEXTINF, TvgName)
		if err != nil {
			return nil, fmt.Errorf("Error parsing tvg-name : %v", err)
		}

		tvgLogo, err := ExtractAttribute(currentEXTINF, TvgLogo)
		if err != nil {
			return nil, fmt.Errorf("Error parsing tvg-logo : %v", err)
		}

		groupTitle, err := ExtractAttribute(currentEXTINF, GroupTitle)
		if err != nil {
			return nil, fmt.Errorf("Error parsing group-title : %v", err)
		}

		reg := regexp.MustCompile(`,([^\n]*)`)
		if !reg.MatchString(currentEXTINF) {
			return nil, fmt.Errorf("Error parsing display name : %v", err)
		}
		displayName := reg.FindStringSubmatch(currentEXTINF)[1]

		playlist := library.ParsePlaylist(currentEXTINF, currentURL)

		metadata := make(map[library.Metadata]string)
		switch playlist {
		case library.PlaylistTV:
			reg = regexp.MustCompile(`group-title="(.*)"`)
			metadata[library.ChannelName] = reg.FindStringSubmatch(currentEXTINF)[1]
		case library.PlaylistSeries:
			reg = regexp.MustCompile(`S(\d+)`)
			metadata[library.Season] = reg.FindStringSubmatch(currentEXTINF)[1]

			reg = regexp.MustCompile(`E(\d+)`)
			metadata[library.Episode] = reg.FindStringSubmatch(currentEXTINF)[1]
		case library.PlaylistMovies:
			reg = regexp.MustCompile(`group-title="(.*)"`)
			metadata[library.Category] = reg.FindStringSubmatch(currentEXTINF)[1]
		}

		channels = append(channels, library.Channel{
			Id:          library.TvgAttribut(tvgID),
			Name:        library.TvgAttribut(tvgName),
			Logo:        library.TvgAttribut(tvgLogo),
			Group:       library.TvgAttribut(groupTitle),
			DisplayName: displayName,
			Url:         currentURL,
			Playlist:    playlist,
			Metadata:    metadata,
		})

		currentEXTINF = ""
		currentURL = ""
	}

	return channels, nil
}

func ExtractAttribute(line string, attr Attribut) (string, error) {
	reg := regexp.MustCompile(string(attr) + `="([^"]*)"`)
	if !reg.MatchString(line) {
		return "", fmt.Errorf("Error parsing %s", attr)
	}

	if len(reg.FindStringSubmatch(line)) != 2 {
		return "", fmt.Errorf("Error parsing %s", attr)
	}

	return reg.FindStringSubmatch(line)[1], nil
}
