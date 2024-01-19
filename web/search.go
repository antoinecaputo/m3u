package web

import (
	"fmt"
	"iptvstudio/library"
	"net/http"
	"strconv"
)

func searchHandler(w http.ResponseWriter, r *http.Request, lib *library.Library) {
	limit, err := strconv.Atoi(r.URL.Query().Get("limit"))
	if err != nil {
		limit = 10
	}

	filter := r.URL.Query().Get("filter")

	query := r.URL.Query().Get("query")

	var result []*library.Channel

	if filter != "" {
		result = lib.Search(library.Playlist(filter), query)
	} else {
		result = lib.MasterSearch(query)
	}

	resultHTML := "<div class=\"search-result\">"
	for i, channel := range result {
		if i >= limit {
			break
		}

		resultHTML += searchResultHTML(channel)
	}
	resultHTML += "</div>"

	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(resultHTML))
}

func searchResultHTML(channel *library.Channel) string {

	playerLink := fmt.Sprintf("rtsp://%s", channel.Url)

	return `
		<div class="channel">
			<div style="flex-direction: column; display: flex; justify-content: center; align-items: center;">
				<div class="channel__logo" onclick="window.location.href='` + playerLink + `'">
					<img src="` + string(channel.Logo) + `" alt="` + string(channel.Name) + `">
				</div>
				<div class="channel__name">` + string(channel.Name) + `</div>
				<div class="channel__group">` + string(channel.Group) + `</div>
				<div class="channel__download">
					<li><a href="` + string(channel.Logo) + `" download>Download</a></li>
				</div>
			</div>
		</div>
	`
}
