package downloader

import (
	"fmt"
	"github.com/schollz/progressbar/v3"
	"io"
	"net/http"
	"os"
	"path"
	"strings"
	"sync"
	"time"
)

const DownloadDir = "downloads"

func Download(update bool) (string, error) {

	server := os.Getenv("SERVER")

	output := os.Getenv("OUTPUT")

	extension := os.Getenv("TYPE")

	filename, err := getFileName(server, output, extension)
	if err != nil {
		return "", err
	}

	if !update {
		if isDownloadedFileExists(filename) {
			return filename, nil
		}

		fmt.Println("File not found. Downloading...")
	}

	protocol := os.Getenv("PROTOCOL")

	req, err := http.NewRequest("GET", fmt.Sprintf("%s://%s/get.php", protocol, server), nil)
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

	fmt.Printf("Downloading %s\n", req.URL.String())

	now := time.Now()

	response, err := http.Get(req.URL.String())
	if err != nil {
		return "", err
	}

	if response.StatusCode != 200 {
		return "", fmt.Errorf("server returned %d", response.StatusCode)
	}

	if response.Header.Get("Content-Type") == "text/html" {
		return "", fmt.Errorf("server returned an error: %s", response.Status)
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

	filePath, err := GetDownloadedFilePath(filename)
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

func GetDownloadedFilePath(filename string) (string, error) {
	/*
		filename, err := getDownloadedFileName()
		if err != nil {
			return "", err
		}
	*/

	cwd, err := os.Getwd()
	if err != nil {
		return "", err
	}

	return path.Join(cwd, DownloadDir, filename), nil
}

func getFileName(server string, output string, extension string) (string, error) {
	if server == "" || extension == "" {
		return "", fmt.Errorf("server or extension is empty")
	}

	// Add separator if output is not empty
	if output != "" {
		output = "." + output
	}

	return fmt.Sprintf("%s%s.%s", server, output, extension), nil
}

func isDownloadedFileExists(filename string) bool {
	filePath, err := GetDownloadedFilePath(filename)
	if err != nil {
		return false
	}

	if _, err := os.Stat(filePath); os.IsNotExist(err) {
		return false
	}

	return true
}

type DownloadQueue struct {
	mutex        *sync.Mutex
	files        map[string]bool
	ProgressChan chan int64
	DoneChan     chan bool
}

func InitDownloadQueue() *DownloadQueue {
	d := &DownloadQueue{}

	d.mutex = &sync.Mutex{}
	d.files = make(map[string]bool)
	d.ProgressChan = make(chan int64)
	d.DoneChan = make(chan bool)

	return d
}

func (d *DownloadQueue) DownloadedVideo(url string) {
	d.mutex.Lock()

	tokens := strings.Split(url, "/")
	fileName := tokens[len(tokens)-1]

	if d.files[fileName] {
		d.mutex.Unlock()
		fmt.Printf("File %s is already being downloaded\n", fileName)
		d.DoneChan <- true
		return
	}

	d.files[fileName] = true
	d.mutex.Unlock()

	var completed bool

	defer func() {
		d.mutex.Lock()
		delete(d.files, fileName)
		d.mutex.Unlock()

		if !completed {
			fmt.Println("Removing incomplete file", fileName)
			os.Remove(path.Join(DownloadDir, fileName))
		}
	}()

	filepath := path.Join(DownloadDir, fileName)

	if _, err := os.Stat(filepath); err == nil {
		fmt.Println("File exists. Skipping download.")
		completed = true
		d.DoneChan <- false
		return
	}

	output, err := os.Create(filepath)
	if err != nil {
		fmt.Println(err)
		d.DoneChan <- false
		return
	}

	defer output.Close()

	response, err := http.Get(url)
	if err != nil {
		fmt.Println(err)
		d.DoneChan <- false
		return
	}

	defer response.Body.Close()

	bar := progressbar.DefaultBytes(
		response.ContentLength,
	)

	writer := io.MultiWriter(output, bar)

	_, err = io.Copy(writer, response.Body)
	if err != nil {
		fmt.Printf("Error writing file: %s\n", err)
		d.DoneChan <- false
		return
	}

	completed = true

	d.DoneChan <- true
}
