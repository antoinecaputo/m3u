package ui

import (
	"fmt"
	"net/http"
)

func Server() error {
	http.HandleFunc("/", handler)

	fmt.Println("🌐 Starting web server on http://localhost:8080")

	return http.ListenAndServe(":8080", nil)
}

func handler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Hello, World!"))
}
