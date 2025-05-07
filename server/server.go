package server

import "fmt"

type Server struct {
	Username string
	Password string
	Host     string
	Port     int
	Protocol string
	Type     string
	Output   string
}

func (s Server) Url() string {
	return fmt.Sprintf("%s://%s:%s@%s:%d", s.Protocol, s.Username, s.Password, s.Host, s.Port)
}
