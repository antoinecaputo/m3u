package player

import "os/exec"

func OpenPlayerCommand() string {
	return "/Applications/VLC.app/Contents/MacOS/VLC"
}

func Play(url string) {
	openVLC := OpenPlayerCommand()

	cmd := exec.Command(openVLC, url, "--fullscreen")
	err := cmd.Start()
	if err != nil {
		panic(err)
	}
}
