package player

import (
	"fmt"
	"os/exec"
)

func OpenPlayerCommand() string {
	return "/Applications/VLC.app/Contents/MacOS/VLC"
}

func PlayCommand(url string) string {
	openVLC := OpenPlayerCommand()

	return fmt.Sprintf("%s %s --fullscreen", openVLC, url)
}

func Play(url string) {
	openVLC := OpenPlayerCommand()

	cmd := exec.Command(openVLC, url, "--fullscreen")
	err := cmd.Start()
	if err != nil {
		panic(err)
	}
}
