# About

This is the code for [sethjrothschild.com](http://sethjrothschild.com) which previously was hosted on Google Sites. Mostly, this was an excuse for me to learn more about [Svelte](https://svelte.dev/), [Google Cloud](https://cloud.google.com), and [Playwright](https://playwright.dev/).

If you would like to copy this code for your own website, I've included detailed instructions below where the target audience is someone doing this for the first time. When I was first learning to program I really appreciated and got a lot of value out of explicit instructions, so I've tried to be overly explicit here. If you try it out and there are steps that are unclear or not helpful, please let me know!

# Quick Start

The basics of developing and testing are as follows:

1. Install dependencies with `npm install`
2. Run the development server with `npm run dev`
3. Run the tests `npm run test:unit`. To run tests with playwright you'll need `npx playwright install` followed by `npm run test`

Don't forget to format with `npm run format`!

# Detailed Instructions

## Development Environment

These steps should work by default on Linux and OSX, but if you're on Windows you might need something like [Git Bash](https://gitforwindows.org/) to run this and the other commands in this README.

You will need Node/NPM to install and run this project. I would recommend installing nvm with the instructions [here](https://github.com/nvm-sh/nvm), after which you can use

```
nvm install 18 && nvm use 18
```

to install and use Node.js 18.

You can check that this is working by running `npm --version`. If you get that the package was not found it either didn't install correctly or you'll need to restart your terminal.

## Getting the code and developing

The first step is to download this code, which you can do with

```
git clone https://github.com/Seth-Rothschild/sethjrothschild.com.git
```

if you have git installed. You might instead consider making a "fork" on [github.com](github.com) first and cloning from that so that the `git remote` is set automatically for pushing and pulling.

Now, run

```
cd sethjrothschild.com
```

to make it so your terminal is inside this code directory. Next run

```
npm install
```

to install the dependencies for this project. The command

```
npm run dev
```

will run the website locally, and you can visit it in your browser at [localhost:5173](http://localhost:5173). As you make changes to the code, those changes will be shown in the browser nearly immediately.

You can find the content of the site in files named `+page.svelte` (e.g. [src/routes/+page.svelte](src/routes/+page.svelte)). If you want to learn more about Svelte, their [tutorial](https://svelte.dev/tutorial/basics) is excellent. One nice thing about the framework is that new routes are made by making new folders/files inside of the `/src/routes` folder. The overall layout of the site, the HTML that appears on every page, can be found in [src/routes/+layout.svelte](src/routes/+layout.svelte).

You can write tests that automatically check that the page behaves as you expect with [Playwright](https://playwright.dev). Some example tests are in [tests](tests) that look for particular content or click through links. To run those tests, use `npm test`.

As a last note, it's annoying to manually format code, so don't. You can run `npm run format` which will automatically decide what your code should look like. Run `npm run format` often, and always make sure to run it before committing code.

## Deploying the site

To deploy this site you need to do two things:

1. You need to turn the site into static html/js files
2. You need to put those files somewhere online!

This repository is already configured with the svelte [adapter-static](https://kit.svelte.dev/docs/adapter-static), so all you need to do to make static files is run `npm run build`. This will make a new `build/` folder with your files. Note that it will also include everything in the `static/` folder, which is how you can include images or PDFs. To test out what your site will look like, you can use `npm run preview`.

I use three features of Google Cloud for hosting the site:

1. [Cloud Storage](https://console.cloud.google.com/storage/) for keeping the build files accessible on the internet,
2. [A load balancer](https://console.cloud.google.com/net-services/loadbalancing) to get a static IP, certificate, and redirect from http to https, and
3. [Cloud Build](https://console.cloud.google.com/cloud-build/) for automatically building the project every time I push code to github.

The GCP instructions for [Host a static website](https://cloud.google.com/storage/docs/hosting-static-website) are a little bit terse, but should help you get the job done for the first two steps. From **Edit website configuration** on the bucket you will want to set `index.html` as your index and `404.html` as your error page. For the third step, you'll need to configure a cloud build trigger for when you push a new commit. That trigger will look at the [cloudbuild.yaml](cloudbuild.yaml) local to this code and run the steps as specified there. When you set that trigger, you'll want to give it an environment variable that tells it where the cloud storage bucket is located. I used `_BUCKET` and `gs://yourbucketpath/`. The pipeline steps there run `npm install`, `npm run build` and then copy everything in `/build` to the bucket.
