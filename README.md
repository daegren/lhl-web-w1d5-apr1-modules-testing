# Modules & Testing

## Modules

### What?

Modules are just JavaScript files which export values for other JavaScript files to consume.

### Why?

A large reason for modularizing our code is to avoid massive files which contain all of the logic for a given application. Modules in NodeJS allows us to split out our code into multiple files, each of which can focus on a specific part of our applications.

This also allows us to abstract and encapsulate various parts of our applications so not everything is dealing with everything.

### How?

Each module has a special variable called `module` which we can use to define which parts of the file become available to other files.

Really what happens when Node exports a module it wraps it in a function automatically:

```javascript
(function(exports, require, module, __filename, __dirname) {
  // Module code actually lives in here
});
```

This function provides some interesting variables let's take a look at these below:

- `exports` (Object): This is an object on which we can add properties to to add to the things which will be exported from this module. This is essentially a shortcut to the `module.exports` object.
- `require` (Function): This function is what allows us to `require` other modules by passing it a path to where the file is located, or just the name of an NPM module. We'll look at using this function a bit more in a few.
- `module` (module Object): This object contains a bunch of information about the module itself. The `module` object also contains a key called `exports` to which we can re-assign if we want to replace the `exports` object above.
- `__filename` (string): The file name of the current module. This is the current module file's absolute path.
- `__dirname` (string): The directory name of the current module.

See more [here](https://nodejs.org/api/modules.html)

#### Defining a module

```javascript
// circle.js
var PI = Math.PI;

exports.area = function(r) {
  return PI * r ** 2;
};

exports.circumference = function(r) {
  return 2 * PI * r;
};
```

In the above example, we're using the `exports` variable to add some properties (i.e. key-value pairs) to the exports object, in this case we've attached two functions `area` and `circumference` to the exports object.

Alternatively, if we want to export something other than an object, we can re-assign the `module.exports` value:

```javascript
// add.js
module.exports = function(a, b) {
  return a + b;
};
```

#### Using a module

We can then use these functions in another module by using the `require` function to import the exposed functions.

```javascript
// main-circle.js
var circle = require("./circle.js");
// circle === { area: Function, circumference: Function }

// Calculate the area for a circle with a radius of 4
var calculatedArea = circle.area(4);

console.log("The area of a circle with a radius of 4 is " + calculatedArea);
```

```javascript
// main-add.js
var add = require("./add.js");
// add === Function

var result = add(2, 2);

console.log("2 + 2 = " + result);
```

## Node Package Manager (NPM)

### What?

Package Managers are tools which help to manage third-party dependencies in our applications. One of the advantages of working as a developer is that there are often problems which have already been solved by other people, and luckily for us, these people are nice enough to share that code with us.

### Why?

Package Managers take care of several problems when trying to pull in third-party code.

1. They make sure that the packages we pull in also have all of their own dependencies downloaded.
2. They make sure we have specific versions of a module installed.
   - This is important to make sure the modules we're working with match documentation and that functions work the way we're expecting.
3. They keep a repository of packages hosted online to make it easier to download our packages.
4. Since the packages are hosted online, there is also a searchable repository to find out information about each package.

The repository for `npm` lives [here](https://npmjs.org/)

#### Packages

Packages are a collection of modules which are "packaged" together to provide some kind of functionality.

### How?

The `npm` tool comes packaged with `node` which provides all the tools we need to work with packages stored in the `npm` repository.

- `npm init`
  - Creates a `package.json` file for your project by asking a few simple questions. **You should always start your project with this.**
- `npm install --save <package>`
  - Installs a package and adds it to your `package.json` file's `dependencies` section. On Node 8+ this is implied.
- `npm install --save-dev <package>`
  - Same thing, but install the package as a development dependency on `package.json`. Use this for linters, testers, compilers, builders and anything else that won't be needed for the app to run in production, but will be useful during development.
- `npm install -g <package>`
  - Installs a package globally and makes command-line utilities available.
  - Example: `npm install -g express-generator` and then you can use the `express` command from the terminal to start new [Express.js](http://expressjs.com) projects.
  - **NOTE:** If you want to run a command-line tool from a package installed inside `node_modules` with `--save`/`--save-dev`, use `npx <your command here>`
    - Example: `npm install --save-dev mocha`, then `npx mocha`
- `npm install` in a folder with a `package.json` file
  - Installs all project dependencies. Node 8+ will also create a `package-lock.json` file containing a list of dependencies and versions.

#### Notes about `package.json`

There are some things `npm init` won't do for you that you should probably do manually. The `scripts` section contains terminal commands commonly used with your project. Of those, the two most common are `test` and `start`.

- `test` is created automatically by `npm init` and it's automatically assigned to a placeholder. Once you have tests (see below!), you should substitute it with the command you'll use to run the tests (e.g.: `mocha`).
- `start` is NOT created automatically, but it's very useful. It should contain the terminal command used to start the project (e.g. `node index.js`). With this in place, you can start your project by typing `npm start` on the terminal.

Here's a complete `package.json` example:

```json
{
  "name": "w1d5-lecture",
  "version": "1.0.0",
  "description": "LHL - Automated testing example",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "mocha"
  },
  "author": "David Mills",
  "license": "ISC",
  "devDependencies": {
    "chai": "^3.5.0",
    "mocha": "^3.2.0"
  },
  "dependencies": {
    "request": "^2.79.0"
  }
}
```

### What happens when I install a package?

When `npm` installs a package, through the `npm install` command, it will create a directory in your project folder called `node_modules`. It then proceeds to download all of the packages that are directly and indirectly required by your module (as defined in your `package.json` file).

> N.B. It's a good idea to add `node_modules` to your `.gitignore` file to avoid uploading all of your node modules. Since they can be re-downloaded by using the `npm install` command, there is no need to store these files in your git repository.

## Testing

So far, all of our testing has been done through manual testing; write some code, put in some `console.log`s and verifying if the result is what we expected. While this works at the level of complexity we've been working at, it will soon become unwieldy as the application starts to grow.

### `Mocha` & `Chai`

Both `Mocha` & `Chai` help us with testing our code, but each of these packages handle a separate part of the testing problem.

#### [`Mocha`](https://mochajs.org/)

`Mocha` is a test runner, which means it provides us a framework in which to write and run our tests.

#### [`Chai`](https://www.chaijs.com/)

`Chai` on the other hand provides us with tools to make assertions about the code we're running. Allowing us to verify that the functions we're writing are doing what we expect.

Chai has many different ways to approach the assertions, we'll be using the `expect` versions but there are others you can explore [here](http://chaijs.com/guide/styles).

### Example

Let's say we want to test the `add` function above. We would be able to define a test file which looks something like the following:

```javascript
var chai = require("chai");
var expect = chai.expect;
var add = require("../add.js");

// Describe the add function
describe("add", function() {
  // Test to make sure that 2 + 2 === 4;
  // `it` defines tests that will run against our code
  // (in this case the add function)
  it("should produce 4 when adding 2 and 2", function() {
    var result = add(2, 2);
    expect(result).to.equal(4);
  });
});
```

Also, to help us get going with our tests, we'll update the `scripts` section of our `package.json` file to make testing simple.

```JSON
{
  // ...
  "scripts": {
    "test": "mocha"
  }
  // ...
}
```

Now we can run our tests by executing `npm test` in the command line.

```
$ npm test

> mocha



  add
    ✓ should produce 4 when adding 2 and 2


  1 passing (19ms)
```
