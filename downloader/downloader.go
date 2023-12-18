package downloader

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"path"
	"time"
)

const DownloadDir = "downloads"

func Download(update bool) (string, error) {

	if !update {
		if isDownloadedFileExists() {
			return GetDownloadedFilePath()
		}

		fmt.Println("File not found. Downloading...")
	}

	server := os.Getenv("SERVER")

	req, err := http.NewRequest("GET", path.Join(server, "get.php"), nil)
	if err != nil {
		return "", err
	}

	parameters := map[string]string{
		"username": os.Getenv("USERNAME"),
		"password": os.Getenv("PASSWORD"),
		"type":     os.Getenv("TYPE"),
		"output":   os.Getenv("OUTPUT"),
	}

	urlParams := req.URL.Query()

	for key, value := range parameters {
		urlParams.Add(key, value)
	}

	req.URL.RawQuery = urlParams.Encode()

	fmt.Printf("URL: %s\n", req.URL.String())

	response, err := http.Get(req.URL.String())
	if err != nil {
		return "", err
	}

	fmt.Printf("Downloading %s\n", req.URL.String())

	now := time.Now()

	fmt.Println(response.StatusCode)

	if response.StatusCode != 200 {
		return "", fmt.Errorf("server returned %d", response.StatusCode)
	}

	defer response.Body.Close()

	done := time.Now()

	downloadTime := done.Sub(now)

	fileSize := response.ContentLength
	downloadSpeedInBytes := float64(fileSize) / downloadTime.Seconds()

	fmt.Printf("Download time: %v\n", downloadTime)
	fmt.Printf("%fMB - %f(MB/s)\n", float64(fileSize)/1024/1024, downloadSpeedInBytes/1024/1024)

	// contentDisposition := response.Header.Get("Content-Disposition")

	// fileName := contentDisposition[len("attachment; filename="):]

	// fileName = fileName[1 : len(fileName)-1]

	cwd, err := os.Getwd()
	if err != nil {
		return "", err
	}

	os.MkdirAll(path.Join(cwd, DownloadDir), 0755)

	filePath, err := GetDownloadedFilePath()
	if err != nil {
		return "", err
	}

	file, err := os.Create(filePath)
	if err != nil {
		return "", err
	}

	defer file.Close()

	_, err = io.Copy(file, response.Body)
	if err != nil {
		return "", err
	}

	return filePath, nil
}

func GetDownloadedFilePath() (string, error) {
	filename, err := getDownloadedFileName()
	if err != nil {
		return "", err
	}

	cwd, err := os.Getwd()
	if err != nil {
		return "", err
	}

	return path.Join(cwd, DownloadDir, filename), nil
}

func getDownloadedFileName() (string, error) {
	req, err := http.NewRequest("GET", os.Getenv("SERVER"), nil)
	if err != nil {
		return "", err
	}

	return req.URL.Host, nil
}

func isDownloadedFileExists() bool {
	filePath, err := GetDownloadedFilePath()
	if err != nil {
		return false
	}

	if _, err := os.Stat(filePath); os.IsNotExist(err) {
		return false
	}

	return true
}
