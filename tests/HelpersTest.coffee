describe "Verification.virtuals", ->
  it "should exist", ->
    expect(Verification.virtuals).to.be.an 'object'
    expect(Verification.virtuals.restoreAll).to.be.a 'function'


describe "Verification.stubs", ->
  it "should exist", ->
    expect(Verification.stubs).to.be.an 'object'
    expect(Verification.stubs.restoreAll).to.be.a 'function'


describe "Verification.wrap", ->
  it "should set Verification.lastError to the thrown exception", ->
    fn = (msg)->
      throw new Error(msg)

    expect(Verification.wrap(->fn("wrapped"))).to.throw(Error, 'wrapped')
    expect(Verification.lastError).to.be.instanceof Error
    expect(Verification.lastError.message).to.equal 'wrapped'


describe "Verification.wrap", ->
  it "should set Verification.lastError to null if not excpetion was thrown", ->
    fn = (msg)->
      return

    expect(Verification.wrap(->fn("wrapped"))).to.not.throw()
    expect(Verification.lastError).to.be.null

