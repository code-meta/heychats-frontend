This is the frontend of the heychats web app. [preview image](https://raw.githubusercontent.com/code-meta/heychats-frontend/main/public/heychats-preview.png) 

See [the figma UI design](https://www.figma.com/file/oxGnZmWWayt2Rn9pfbyTky/heychats?type=design&node-id=4-8)  

## Prerequisites to run this project
* **First setup the [backend](https://github.com/code-meta/heychats_backend) of this app**
* [Docker](https://www.docker.com/products/docker-desktop/)

## Getting Started
to build the project:
```bash
docker-compose build app
```

to run the project:
```bash
docker-compose up -d
```
now you can visit the app at http://localhost:3000

![](./public/heychats-preview.svg)

this is a realtime chat application the frontend is built using react.js and next.js.
and the [backend](https://github.com/code-meta/heychats_backend) is built using django.