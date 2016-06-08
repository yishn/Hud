# Hud

My desktop HUD.

![Screenshot](screenshot.png)

## Modules

- Weather
- Clock
- Date
- Greeter
- Timer
- Calendar
- Train

## Building

Building Hud requires [Node.js](https://nodejs.org/en/download/) and npm. First, clone Hud:

~~~
$ git clone https://github.com/yishn/Hud
$ cd Hud
~~~

Install `electron-packager` globally and the dependencies of Hud using npm:

~~~
$ npm install electron-packager -g
$ npm install
~~~

You can build Hud by using one of the three build instructions depending on the target OS:

* `$ npm run build:win`
* `$ npm run build:linux`
* `$ npm run build:osx`

The binaries will be in `Hud/bin/`.
