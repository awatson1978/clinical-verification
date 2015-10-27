Package.describe({
    summary: "FDA Verification Testing for Meteor applications.",
    name: "clinical:verification",
    version: "3.0.0",
    git: "https://github.com/awatson/clinical-verification.git"
});

Package.onUse(function (api) {
  api.versionsFrom('0.9.3');

  api.use("coffeescript");
  api.use("underscore");
  api.use("tinytest");
  api.use("test-helpers");
  api.use('practicalmeteor:mocha');

  api.use([
    'practicalmeteor:loglevel@1.2.0_1',
    "practicalmeteor:chai@1.9.2_3",
    "practicalmeteor:sinon@1.10.3_2"]);

  api.imply(["tinytest","test-helpers"]);

  api.imply([
      'practicalmeteor:loglevel@1.2.0_1',
      "practicalmeteor:chai",
      "practicalmeteor:sinon@1.10.3_2"
  ]);

  api.addFiles("log.js");
  api.addFiles("namespaces.js");
  api.addFiles("async_multi.js");
  api.addFiles("Verification.coffee");
  api.addFiles("Helpers.coffee");
  api.addFiles("Describe.coffee");

  api.export(['lvTestAsyncMulti']);
  api.export(['Verification']);
  api.export(['describe', 'it', 'beforeAll', 'beforeEach', 'afterEach', 'afterAll']);
});

Package.onTest(function(api) {
    api.use(["coffeescript", "practicalmeteor:loglevel@1.2.0_1", "practicalmeteor:munit@2.1.4"]);
});
