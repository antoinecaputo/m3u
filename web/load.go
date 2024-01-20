package web

import (
	"fmt"
	"iptvstudio/downloader"
	"iptvstudio/library"
	"iptvstudio/parser"
	"net/http"
)

func loadHandler(w http.ResponseWriter, r *http.Request, lib *library.Library) {
	filename, err := downloader.Download(true)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(err.Error()))
		return
	}

	newLib, err := parser.LoadLibrary(filename)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("500 - Something bad happened!"))
		return
	}

	*lib = *newLib

	http.Redirect(w, r, "/home", http.StatusSeeOther)
}
