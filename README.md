## clinical:verification

clinical:verification is a fork and extention of the excellent [practicalmeteor:munit](https://atmospherejs.com/practicalmeteor/munit) package and modified to work with the [StarryNight](http://starrynight.meteor.com) utility and the [Clinical Meteor Track](http://clinical.meteor.com).  The primary reason for forking, rather than contributing, was to clean up some of the APIs to make them isomorphic with Nightwatch.  


#### Installation

Simply install with the following command:

``meteor add clinical:verification``

#### Running Tests  

There are two ways of running the verification tests:

````sh
# via the tinytest runner
cd myapp
meteor test-packages

# via the nightwatch tinytest pickup
starrynight run-tests --framework tinytest-ci
````

See the [StarryNight TinyTest Walkthrough](http://localhost:4000/examples/tinytests) for more information on how to use the ``--framework tinytest-ci`` functionality.

#### TinyTest API

The default API for a package verification test, looks something like this.  

````js
Tinytest.add('example', function (test) {
  test.equal(true, true);
});
````

The `test` argument can take any of [the following methods](https://github.com/meteor/meteor/blob/devel/packages/tinytest/tinytest.js):


* `equal(actual, expected, message)`
* `notEqual(actual, expected, message)`
* `instanceOf(obj, klass)`
* `matches(actual, regexp, message)`
* `throws(func, expected)`
* `isTrue(value, message)`
* `isFalse(value, message)`
* `isNull(value, message)`
* `isNotNull(value, message)`
* `isUndefined(value, message)`
* `isNaN(value, message)`
* `include(object, key)`
* `include(string, substring)`
* `include(array, value)`
* `length(obj, expected_length, message)`


#### Describe/It API  

``clinical:verification`` extends the default API with Describe/It syntax.

* `describe(suiteName, function)`
* `it(testName, function)`

#### Nested Describes

Describe() can arbitrarily nested; and it() supports Chai Expect syntax.

```javascript
describe('top-level describe', function(){
  describe('nested describe', function() {
    describe('deep nested describe', function() {
      it('a test', function () {
        expect(true).to.be.true;
      })
    })
  })
});
```


#### Server & Client Only Tests

```javascript
describe.client('client only test suite', function(){
  it('runs only in client', function(){
    expect(Meteor.isClient).to.be.true;
  });
  it.server('overrides describe.client and runs only in server', function(){
    expect(Meteor.isServer).to.be.true;
  });
});

describe.server('server only test suite', function(){
  it('runs only in server', function(){
    expect(Meteor.isServer).to.be.true;
  });
  it.client('overrides describe.server and runs only in client', function(){
    expect(Meteor.isClient).to.be.true;
  });
});

describe('client only and server only tests', function(){
  it.client('runs only in client', function(){
    expect(Meteor.isClient).to.be.true;
  });
  it.server('runs only in server', function(){
    expect(Meteor.isServer).to.be.true;
  });
});
```





#### Watchers API

````js
// Creates a watcher named 'watcherName' for obj.method which you can later easily access by 'Watchers.spyName'
// @obj [Object] obj and method are optional. If you don't specify them, it will create an anonymous spy function.
// @method [String] The method of @obj to create a spy for.
Watchers.create(spyName, obj, method)

// You can just use Watchers.spyName instead of this method.
Watchers.get(spyName)

// You can just use Watchers.spyName.restore instead of this method.
Watchers.restore(spyName)

// Restore all watchers created with Watchers.create
Watchers.restoreAll()
````


````js
Watchers.create('log', console, 'log');
console.log('Hello world');
expect(Watchers.log).to.have.been.calledWith('Hello world');
...
// Later on in your test or test suite tear down
Watchers.restoreAll();
````

#### Stubs API

````js
// Creates a stub named 'stubName' for obj.method which you can later easily access by 'Stubs.stubName'
// @obj [Object] obj and method are optional. If you don't specify them, it will create an anonymous stub function.
// @method [String] The method of @obj to create a stub for.
Stubs.create(stubName, obj, method)

// You can just use stubs.spyName instead of this method.
Stubs.get(stubName)

// You can just use stubs.stubName.restore instead of this method.
Stubs.restore(stubName)

// Restore all stubs created with stubs.create
Stubs.restoreAll()
````

````js
todos = new Mongo.collection('Todos');
Stubs.create('findOne', todos, 'findOne');
Stubs.findOne.returns({name: 'My todo'});

// Your test code goes here.
...

// Later on in your test or test suite tear down
Stubs.restoreAll();
````


#### Testing User Interfaces  


````js
describe('fooTemplate', function(){
  it.client('should have customizable title', function(client){
    var card = Blaze.renderWithData(
    	Template.foo,
    	{title: "lorem ipsum...", description: "words, words, words..."},
    	document.body
  	);

  	expect.element('.foo').to.be.visible;
  	expect.element('.foo .title').text.to.contain('lorem ipsum');

  	Blaze.remove(card);
  });
});

````


#### Extended Example
```js

describe('suite1', function(){
  before(function (test){
    // Let's do 'cleanup' beforeEach too, in case another suite didn't clean up properly
    watchers.restoreAll();
    stubs.restoreAll();
    console.log("I'm beforeAll");
  });
  beforeEach(function (test){
    console.log("I'm beforeEach");
    watchers.create('log', console, 'log');
  });
  afterEach(function (test){
    watchers.restoreAll();
    console.log("I'm afterEach");
  });
  after(function (test){
    console.log("I'm afterAll");
    watchers.restoreAll();
    stubs.restoreAll();
  });
  it('test1', function(test){
    console.log('Hello world');
    expect(watchers.log).to.have.been.calledWith('Hello world');
  })
});
```



#### Contributions

Contributions are more than welcome. Here are some of our contributors:

* [@practicalmeteor](https://github.com/practicalmeteor) - original munit package author
* [@philcockfield](https://github.com/philcockfield) - added support for BDD style describe.it semantics.
* [@DominikGuzei](https://github.com/DominikGuzei) - added support for nested describe blocks.

#### Changelog

[CHANGELOG](https://github.com/practicalmeteor/meteor-munit/blob/master/CHANGELOG.md)

#### License

[MIT](https://github.com/practicalmeteor/meteor-munit/blob/master/LICENSE.txt)
