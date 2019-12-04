/**
 * Created by nbenik on 12/2/2019.
 */
describe("Test connection object creation", () => {
    it("Can be created by nested include", (done) => {
        requirejs(["PicSure/Connector/PIC-SURE_Connector"], function(PicSureClient) {
            let PicSureClient2 = requirejs('PicSure/Connector/PIC-SURE_Connector');
            expect(typeof PicSureClient).not.toBe(undefined);
            expect(typeof PicSureClient).toBe('object');
            done();
        });
    });
    it("Can be created by statement", (done) => {
        requirejs(["PicSure/Connector/PIC-SURE_Connector"], function() {
            let PicSureClient = requirejs('PicSure/Connector/PIC-SURE_Connector');
            expect(typeof PicSureClient).not.toBe(undefined);
            expect(typeof PicSureClient).toBe('object');
            done();
        });
    });
});




