package main

import (
	"bufio"
	"fmt"
	"github.com/joho/godotenv"
	"iptvstudio/downloader"
	"iptvstudio/parser"
	"log"
	"os"
	"os/exec"
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

	for {
		reader = bufio.NewReader(os.Stdin)

		fmt.Print("👀 What you want to watch? ")

		query, err := reader.ReadString('\n')
		if err != nil {
			log.Fatalln(err)
		}

		query = strings.Trim(query, "\n")

		result := lib.MasterSearch(query)

		fmt.Printf("🍿 %d matches found\n", len(result))

		for displayName, url := range result {
			fmt.Printf("%s - %s\n", displayName, url)
		}

		fmt.Println("")
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
