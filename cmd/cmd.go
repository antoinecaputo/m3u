package cmd

import "os"

type ProgramArgs struct {
	Download  bool // `default:"false"`
	Update    bool // `default:"false"`
	WebServer bool // `default:"false"`
}

func factory() ProgramArgs {
	return ProgramArgs{
		Update:   false,
		Download: false,
	}
}

func ParseArgs() ProgramArgs {
	args := os.Args[1:]

	programArgs := factory()

	for _, arg := range args {
		programArgs.parse(arg)
	}

	return programArgs
}

func (p *ProgramArgs) parse(arg string) {
	switch arg {
	case "-w", "--webserver":
		p.WebServer = true
		break
	case "-d", "--download":
		p.Download = true
	case "-u", "--update":
		p.Update = true
	}
}
