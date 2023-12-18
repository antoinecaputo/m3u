package player

import "os/exec"

func Play(url string) {
	openVLC := "/Applications/VLC.app/Contents/MacOS/VLC"

	cmd := exec.Command(openVLC, url, "--fullscreen")
	err := cmd.Start()
	if err != nil {
		panic(err)
	}
}
