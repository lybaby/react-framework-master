#React Framework CLI

Simple CLI for scaffolding React projects 
npm 5.03

## Features

* React full packs
* ES7 support
* Hot reload
* Testing support
* Free combination modules (redux/router/some component/eslint/test)


## Files struct
```
|-- build
|   |-- build.js				Build product .
|   |-- start.js				Start dev-environment.
|   |-- test.js				    Test js file.
|-- config                      some webpack config
|-- public                      some public file as html,ico
|-- public_src                  build product file folder
|-- src							React source code files.
|   |-- common                  some common js
    |-- components              some useful components
    |-- css                     some main css file
    |-- images                  some img file
    |-- redux                   redux file
    |-- router                  router config
    |-- service                 some web api
    |-- views                   some views
|-- .eslintrc.js					eslint config file.
|-- package.json					NPM package file.
`--

```

## Installation

Install react-9f-cli using [npm](https://www.npmjs.com/) (assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g react_9f_cli
```

## Usage

```
frame -h   # show react_9f_cli help
```
help info:
```
Usage: frame|framework [path] [options]

Options:
  -x, --redux    Use redux
  -c, --component     Use react component
  -n, --name     Project name
  -y             Force to confirm
  -i, --install  Install all dependencies
  -v             Show verbose log
```

The `react` command have a alias `re`.

### Example

```
frame myapp -xci 
```
1. Create a react app under **myapp** directory.
2. It's use `redux` , `css moudules` libraries. 
3. When it done, install all dependencies with `yarn install` command and follow with a `npm start` command. 

## Packages include

* base
	* webpack
	* babel
	* proxy
	* fetch

* react
	* react
	* react-router
	* redux
	* react-redux

* css
	* sass
	* postcss
	* autoprefixer
	* less

* lint
	* eslint
    * stylelint

* testing
    *jest

