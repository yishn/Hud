# Hud

My desktop HUD.

![Screenshot](screenshot.png)

## Modules

- `weather` — *Uses Yahoo Weather service*
- `clock` — *Shows local time*
- `date` — *Shows local date*
- `greeter` — *Greets you when you open Hud*
- `system` — *Shows CPU and memory usage*
- `calendar` — *Ability to download `ics` files from the internet*
- `lunch` — *Displays lunch main menu items at SAP Headquarters*
- `train` — *Displays [Deutsche Bahn](https://bahn.de/) data*

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

## License

The MIT License (MIT)

Copyright (c) 2015-2017 Yichuan Shen

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
