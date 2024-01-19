package main

import (
	"github.com/joho/godotenv"
	"iptvstudio/cli"
	"iptvstudio/cmd"
	"iptvstudio/downloader"
	"iptvstudio/parser"
	"iptvstudio/web"
	"log"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalln(err)
	}

	programArgs := cmd.ParseArgs()

	lib, err := parser.LoadLibrary()
	if err != nil {
		log.Fatalln(err)
	}

	lib.String()

	// Downloader should be handled by the library loading
	// And all the stuff above for asking if the user wants to update the library
	_, err = downloader.Download(programArgs.Update)
	if err != nil {
		log.Fatalln(err)
	}

	if programArgs.WebServer {
		err = web.Server(lib)
		if err != nil {
			log.Fatalln(err)
		}

		return
	}

	cli.Run(lib, &programArgs)
}
