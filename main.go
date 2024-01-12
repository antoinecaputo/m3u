package main

import (
	"bufio"
	"fmt"
	"github.com/joho/godotenv"
	"iptvstudio/cmd"
	"iptvstudio/downloader"
	"iptvstudio/library"
	"iptvstudio/parser"
	"iptvstudio/player"
	"log"
	"os"
	"os/exec"
	"path"
	"strconv"
	"strings"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalln(err)
	}

	programArgs := cmd.ParseArgs()

	downloadQueue := downloader.InitDownloadQueue()

	// Downloader should be handled by the library loading
	// And all the stuff above for asking if the user wants to update the library
	_, err = downloader.Download(programArgs.Update)
	if err != nil {
		log.Fatalln(err)
	}

	lib, err := parser.LoadLibrary()
	if err != nil {
		log.Fatalln(err)
	}

	lib.String()

	// Should probably be handled by the library too
	// Save automatically when updating the library
	if programArgs.Update {
		err = lib.Save()
		if err != nil {
			log.Fatalln(err)
		}
	}

	var reader *bufio.Reader

	for {
		reader = bufio.NewReader(os.Stdin)

		fmt.Print("\n👀 What you want to watch? ")

		query, err := reader.ReadString('\n')
		if err != nil {
			log.Fatalln(err)
		}

		query = strings.Trim(query, "\n")

		if query == "" {
			continue
		}

		result := lib.MasterSearch(query)

		fmt.Println()

		if len(result) == 0 {
			fmt.Println("😢 Nothing found")
			continue
		}

		for i, channel := range result {
			fmt.Printf("#%d : %s %s - %s\n", i, library.Icon(channel.Playlist), channel.String(), channel.Url)
		}

		fmt.Print("\n🍿 Select a match or press enter to search again:\n")

		fmt.Print("#")

		reader = bufio.NewReader(os.Stdin)

		selector, err := reader.ReadString('\n')
		if err != nil {
			log.Fatalln(err)
		}

		selector = strings.Trim(selector, "#")
		selector = strings.Trim(selector, "\n")

		if selector == "" {
			continue
		}

		fmt.Print("\n")

		selectorInt, err := strconv.Atoi(selector)
		if err != nil {
			fmt.Printf("%s is not a number\n", selector)
			continue
		}

		if selectorInt >= len(result) {
			fmt.Printf("%s is not a valid number [0-%d]\n", selector, len(result)-1)
			continue
		}

		selectedChannel := (result)[selectorInt]

		if programArgs.Download {
			fmt.Printf("📥 Downloading %s\n", selectedChannel.String())

			go downloadQueue.DownloadedVideo(selectedChannel.Url)

			select {
			case progress := <-downloadQueue.ProgressChan:
				fmt.Printf("Progress: %d bytes\n", progress)
			case completed := <-downloadQueue.DoneChan:
				if completed {
					err = OpenFinder(downloader.DownloadDir)
					if err != nil {
						log.Fatalln(err)
					}

					continue
				}
			}

			continue
		}

		fmt.Printf("🛋️  VLC startup with %s\n", selectedChannel.Url)

		player.Play(selectedChannel.Url)
	}
}

func OpenFinder(subdirectory string) error {
	cwd, err := os.Getwd()
	if err != nil {
		return err
	}

	return exec.Command("open", path.Join(cwd, subdirectory)).Run()
}
