# Babel preset-to-plugins

Proof of concept to dynamically obtain the plugins used by a list of Babel presets. It is the realtime-and-always-updated version of the [table](https://gist.github.com/gabmontes/c3a1e922bdd73a36f5bf6690d6ac4680) I developed for my [talk](https://www.youtube.com/watch?v=_Ol8Qptkz60) on oct-2016.

## Some technical details

The webiste has only a single page that renders the plugins-to-presets table. It is hosted using [Surge](https://surge.sh/) and queries a server hosted in [Now](https://zeit.co/now) that queries the NPM registry. DNS services are provided by [CloudFlare](https://www.cloudflare.com).

Both the server and the website were done with simplicity in mind.

The server is based on Node v6/v7 and [Express](http://expressjs.com/). It provides a route that receives a list of presets and returns a list of plugins after querying the NPM registry.

What about the website? Was it done with [React](https://facebook.github.io/react/)? No. [jQuery](https://jquery.com/)? Nop. Was all done the 90's way? No, not either. In fact, the only library used is [`not-jquery`](https://gist.github.com/gabmontes/535a7b3b059b2a301a55b43e90ee0101) a 100-lines-long helper library that mimics the jQuery interface but is much simpler. It was made for training and learning purposes! On top of that library, the architecture is very similar to React but there is no React at all! Modern browsers required...

See `/server` and `/site` folders for more information.

## Disclaimer

Both the server and the site were done with training, learning and teaching purposes. It may fail, it may break!
