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
	return string(`
		<div class="channel">
			<div class="channel__logo">
				<img src="` + channel.Logo + `" alt="` + channel.Name + `">
			</div>
			<div class="channel__name">
				` + channel.Name + `
			</div>
			<div class="channel__group">
				` + channel.Group + `
			</div>
		</div>
	`)
}
