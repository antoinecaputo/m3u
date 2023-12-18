package main

import (
	vlc "github.com/adrg/libvlc-go/v3"
)

func Play(url string) error {
	// Initialize libVLC. Additional command line arguments can be passed in
	// to libVLC by specifying them in the Init function.
	if err := vlc.Init("--no-video", "--quiet"); err != nil {
		return err
	}
	defer vlc.Release()

	// Create a new player.
	player, err := vlc.NewPlayer()
	if err != nil {
		return err
	}
	defer func() {
		player.Stop()
		player.Release()
	}()

	// Add a media file from path or from URL.
	// Set player media from path:
	// media, err := player.LoadMediaFromPath("localpath/test.mp4")
	// Set player media from URL:
	media, err := player.LoadMediaFromURL("http://stream-uk1.radioparadise.com/mp3-32")
	if err != nil {
		return err
	}
	defer media.Release()

	// Retrieve player event manager.
	manager, err := player.EventManager()
	if err != nil {
		return err
	}

	// Register the media end reached event with the event manager.
	quit := make(chan struct{})
	eventCallback := func(event vlc.Event, userData interface{}) {
		close(quit)
	}

	eventID, err := manager.Attach(vlc.MediaPlayerEndReached, eventCallback, nil)
	if err != nil {
		return err
	}
	defer manager.Detach(eventID)

	err = player.Play()
	if err != nil {
		return err
	}

	<-quit

	return nil
}
