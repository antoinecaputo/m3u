package main

import (
	"bufio"
	"fmt"
	"github.com/joho/godotenv"
	"iptvstudio/cmd"
	"iptvstudio/downloader"
	"iptvstudio/parser"
	"iptvstudio/player"
	"log"
	"os"
	"os/exec"
	"strconv"
	"strings"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalln(err)
	}

	programArgs := cmd.ParseArgs()

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

		var indexedResult []string

		for displayName, url := range result {
			fmt.Printf("#%d : %s - %s\n", len(indexedResult), displayName, url)

			indexedResult = append(indexedResult, displayName)
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

		if selectorInt >= len(indexedResult) {
			fmt.Printf("%s is not a valid number [0-%d]\n", selector, len(indexedResult)-1)
			continue
		}

		displayName := indexedResult[selectorInt]

		fmt.Printf("🛋️  VLC startup with %s\n", result[displayName])

		player.Play(result[displayName])
	}

	return

	var url string

	cli := "/Applications/VLC.app/Contents/MacOS/VLC"
	fmt.Printf("\nRun command %s %s\n", cli, url)

	cmd := exec.Command(cli, url)
	err = cmd.Start()
	if err != nil {
		log.Fatalln(err)
	}
	err = cmd.Wait()
	if err != nil {
		log.Fatalln(err)
	}
}
