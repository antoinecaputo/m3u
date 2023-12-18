package cmd

import "os"

type ProgramArgs struct {
	Update bool // `default:"false"`
}

func factory() ProgramArgs {
	return ProgramArgs{
		Update: false,
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
	case "-u", "--update":
		p.Update = true
	}
}
