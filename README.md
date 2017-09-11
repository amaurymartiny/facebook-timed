# timed

Track the time spent on Facebook and your other favorite websites.

## Download Extension

Chrome Store: https://chrome.google.com/webstore/detail/timed/elimnnkcljpjbhoaoeimjjfimhjiekbj

## Installation

	$ npm install

## Usage

Run `$ gulp --watch` and load the `dist`-directory into chrome (follow [this tutorial](https://developer.chrome.com/extensions/getstarted#unpacked) to load an unpacked extension).

## Contribute with a new website

Follow the following steps to add a new website to track

- In `./app/config/websites/`, create a new file (let's call it mywebsite.js).
- In this file, export default an object with the following fields:
    - `name`: The name of the website
    - `regex`: A regex matching the url's host of the website (i.e the part after http://)
    - `addElement`: A function which will manipulate the DOM on mywebsite.com, by adding a label to show the tracked time. Note: it is necessary to return the label's DOM element at the end of the function! Also note that you can add a className to this element.
- In `./app/config/index.js`, add a line to import the above file.
- In `./app/manifest.json`, add a line in `"content_scripts" -> "matches"` pointing to mywebsite.com, so that the extension knows on which websites to inject the content scripts.
- In `./app/styles/websites/`, create a file called mywebsite.scss. Add all the necessary styling you need for the label to blend in nicely into the website. The class name of the label is the one you defined in the `addElement` function.
- In `./app/styles/contentscript.scss`, import the above .scss file.

Run `$ gulp --watch` and load the `dist`-directory into chrome (if you haven't done it before) and you should see your label on mywebsite.com.


## Entryfiles (bundles)

There are two kinds of entryfiles that create bundles.

1. All js-files in the root of the `./app/scripts` directory
2. All css-,scss- and less-files in the root of the `./app/styles` directory

## Tasks

### Build

    $ gulp


| Option         | Description                                                                                                                                           |
|----------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| `--watch`      | Starts a livereload server and watches all assets. <br>To reload the extension on change include `livereload.js` in your bundle.                      |
| `--production` | Minifies all assets                                                                                                                                   |
| `--verbose`    | Log additional data to the console.                                                                                                                   |
| `--vendor`     | Compile the extension for different vendors (chrome, firefox, opera, edge)  Default: chrome                                                                 |
| `--sourcemaps` | Force the creation of sourcemaps. Default: !production                                                                                                |


### pack

Zips your `dist` directory and saves it in the `packages` directory.

    $ gulp pack --vendor=firefox

### Version

Increments version number of `manifest.json` and `package.json`,
commits the change to git and adds a git tag.


    $ gulp patch      // => 0.0.X

or

    $ gulp feature    // => 0.X.0

or

    $ gulp release    // => X.0.0


## Globals

The build tool also defines a variable named `process.env.NODE_ENV` in your scripts. It will be set to `development` unless you use the `--production` option.


**Example:** `./app/background.js`

```javascript
if(process.env.NODE_ENV === 'development'){
  console.log('We are in development mode!');
}
```

## Donations

If you like this extension, I would really appreciate small donations! My Bitcoin address is: 1MN35ofAhYQVf1oYNmxEeuBiYwD4sdYDRu.



