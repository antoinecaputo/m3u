package web

import (
	"html/template"
	"iptvstudio/library"
	"net/http"
)

func homeHandler(w http.ResponseWriter, r *http.Request, lib *library.Library) {
	tpl := template.Must(template.ParseFiles("templates/index.gohtml"))

	err := tpl.Execute(w, nil)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}
