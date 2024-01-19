package web

import (
	"iptvstudio/library"
	"net/http"
	"strconv"
)

func searchHandler(w http.ResponseWriter, r *http.Request, lib *library.Library) {
	limit, err := strconv.Atoi(r.URL.Query().Get("limit"))
	if err != nil {
		limit = 10
	}

	playlist := r.URL.Query().Get("playlist")

	query := r.URL.Query().Get("query")

	var result []*library.Channel

	if playlist != "" {
		result = lib.Search(library.Playlist(playlist), query)
	} else {
		result = lib.MasterSearch(query)
	}

	var resultHTML string

	for i, channel := range result {
		if i >= limit {
			break
		}

		resultHTML += searchResultHTML(channel)
	}

	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(resultHTML))
}

func searchResultHTML(channel *library.Channel) string {

	//playerLink := fmt.Sprintf("rtsp://%s", channel.Url)

	// openVLC := `window.open("` + player.PlayCommand(channel.Url) + `")`

	playAction := `
		<button
			class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
			onclick="` + "" + `">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
					<path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
				</svg>
		</button>`

	downloadAction := `
		<button
			class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
			onclick="window.open('` + channel.Url + `')">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
					<path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
				</svg>
		</button>`

	actions := playAction

	if channel.Playlist == library.PlaylistMovies || channel.Playlist == library.PlaylistSeries {
		actions += downloadAction
	}

	return `
		<div class="channel mb-4">
    		<div class="flex flex-col items-center justify-center">
				<div class="channel__logo">
					<img class="h-32" src="` + string(channel.Logo) + `" alt="` + string(channel.Name) + `"
   						onerror="this.onerror=null;this.src='/image-not-found';">
				</div>

				<div class="channel__name">` + string(channel.Name) + `</div>

				<div class="channel__group">` + string(channel.Group) + `</div>

				<div class="mb-4 flex items-center space-x-2 py-2">` + actions + `</div>			
			</div>
		</div>
	`
}
