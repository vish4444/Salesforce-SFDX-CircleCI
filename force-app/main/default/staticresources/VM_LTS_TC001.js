describe("LTS Examples 2", function() {
    afterEach(function() {
        $T.clearRenderedTestComponents();
    });
    describe('Rendering c:HelloWorld', function(){
        it('LTS Test 2', function(done) {
            $T.createComponent("c:HelloWorld", {}, true)
            .then(function(component) {
                expect(component.get('v.message')).toContain("welcome");
                done();
            }).catch(function(e) {
                done.fail(e);
            });
        });
    });
});