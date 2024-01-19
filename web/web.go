package web

import (
	"fmt"
	"iptvstudio/library"
	"net/http"
)

func Server(lib *library.Library) error {
	http.HandleFunc("/home", func(w http.ResponseWriter, r *http.Request) {
		homeHandler(w, r, lib)
	})

	http.HandleFunc("/search", func(w http.ResponseWriter, r *http.Request) {
		searchHandler(w, r, lib)
	})

	http.HandleFunc("/image-not-found/", imageNotFoundHandler)

	http.Handle("/", http.FileServer(http.Dir("./static")))

	fmt.Println("🌐 Starting web server on http://localhost:8080/home")

	return http.ListenAndServe(":8080", nil)
}
