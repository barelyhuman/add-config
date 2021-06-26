<h1 align="center">add-config</h1>
<p align="center">Simple Config Environment Generator</p>

 If you like any of my work, you can support me on: https://barelyhuman.dev/donate

[![](https://img.shields.io/badge/license-mit-black?style=for-the-badge)](LICENSE)



## Motivation 

I setup the same type of config files for most project and this cli basically takes care of those 2-3 steps that I normally do, 
the repo and the cli will change behavior based on how I keep setting up projects in the future.

## Install

```
$ npm install --global @barelyreaper/add-config
```

## Usage

```
$ add-config --help

  Usage
    $ add-config [options]

  Options
    -p, --path  path to consider as root
    -t, --type  type of config, currently supports [react|node|react-native]
  Examples
    $ add-config -p . --type=react
    Created!
```



## Contribute 

The easiest way to contribute to this project is to create a fork of this repository and raise PRs based on the issues you pick. Though let the maintainer know that you are picking up an issue to avoid any kind of overlaps

## License 

[MIT](LICENSE) &copy; Reaper