# Hud

My desktop HUD.

![Screenshot](screenshot.png)

## Modules

- Weather
- Clock
- Date
- Greeter
- Calendar
- Train

## Building

Building Hud requires [Node.js](https://nodejs.org/en/download/) and npm. First, clone Hud:

~~~
$ git clone https://github.com/yishn/Hud
$ cd Hud
~~~

Rename `settings-demo.json` to `settings.json` and edit it to your taste. Install the dependencies using npm:

~~~
$ npm install
~~~

You can build Hud by using one of the following build instructions depending on the target OS:

* `$ npm run build:win`
* `$ npm run build:osx`

The binaries will be in `Hud/bin/`.
