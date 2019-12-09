/**
 * Created by nbenik on 12/2/2019.
 */

describe("Test connection library creation (via RequireJS)", () => {
    it("Can be created by nested include", (done) => {
        requirejs(["PicSure/Connector/Connector"], function(PicSureClient) {
            expect(typeof PicSureClient).not.toBe(undefined);
            expect(typeof PicSureClient).toBe('object');
            done();
        });
    });
    it("Can be created by statement", (done) => {
        requirejs(["PicSure/Connector/Connector"], function() {
            let PicSureClient = requirejs('PicSure/Connector/Connector');
            expect(typeof PicSureClient).not.toBe(undefined);
            expect(typeof PicSureClient).toBe('object');
            done();
        });
    });
});


describe("Test connection object creation", () => {
    it("connect() returns created connection w/proper url/token", (done) => {
        requirejs(["PicSure/Connector/Connector"], function() {
            let test_url = "http://some.url/PIC-SURE/";
            let test_token = "some_jwt_token";
            let PicSureClient = require('PicSure/Connector/Connector');
            let conn = PicSureClient.connect(test_url, test_token);
            expect(typeof conn).not.toBe(undefined);
            expect(conn.constructor.name).toBe("Connection");
            expect(conn.url).toBe(test_url);
            expect(conn.token).toBe(test_token);
            done();
        });
    });
});


describe("Test connection object functions", () => {
    // setup AJAX mocking
    beforeEach(function() {
        jasmine.Ajax.install();
    });
    afterEach(function() {
        jasmine.Ajax.uninstall();
    });

    it("help()", (done) => {
        requirejs(["PicSure/Connector/Connector"], function() {
            let test_url = "http://some.url/PIC-SURE/";
            let test_token = "some_jwt_token";
            let PicSureClient = require('PicSure/Connector/Connector');
            let conn = PicSureClient.connect(test_url, test_token);
            expect(typeof conn.help).toBe("function");
            spyOn(console, "log");
            conn.help();
            expect(console.log).toHaveBeenCalled();
            done();
        });
    });
    it("about()", (done) => {
        requirejs(["PicSure/Connector/Connector"], function() {
            let test_url = "http://some.url/PIC-SURE/";
            let test_token = "some_jwt_token";
            let PicSureClient = require('PicSure/Connector/Connector');
            let conn = PicSureClient.connect(test_url, test_token);
            expect(typeof conn.about).toBe("function");

            // Mock the AJAX call on jQuery
            jasmine.Ajax.stubRequest(
                /.*/,
                /.*/
            ).andReturn({
                // Respond to the AJAX call
                status: 200,
                statusText: "HTTP/1.1 200 OK",
                contentType: "application/json",
                responseText: "[]"
            });

            // send the AJAX call to get a list of all resources
            conn.about().then((result) => {
                let request = jasmine.Ajax.requests.mostRecent();
                // the asynch call has resutls
                expect(request.url).toBe(test_url + "info/resources");
                expect(request.method).toBe("GET");
                let passed_auth_header = request.requestHeaders["Authorization"];
                expect(passed_auth_header).toBe("Bearer " + test_token);
                done();
            })
        });
    });

    it("about(uuid)", (done) => {
        requirejs(["PicSure/Connector/Connector"], function() {
            let test_url = "http://some.url/PIC-SURE/";
            let test_token = "some_jwt_token";
            let test_uuid = "0000-0000-0000-0000"
            let PicSureClient = require('PicSure/Connector/Connector');
            let conn = PicSureClient.connect(test_url, test_token);
            expect(typeof conn.about).toBe("function");

            // Mock the AJAX call on jQuery
            jasmine.Ajax.stubRequest(
                /.*/,
                /.*/
            ).andReturn({
                // Respond to the AJAX call
                status: 200,
                statusText: "HTTP/1.1 200 OK",
                contentType: "application/json",
                responseText: "[]"
            });

            // send the AJAX call to get a list of all resources
            conn.about(test_uuid).then((result) => {
                let request = jasmine.Ajax.requests.mostRecent();
                // the ajax call was made correctly
                expect(request.url).toBe(test_url + "info/" + test_uuid);
                expect(request.method).toBe("GET");
                let passed_auth_header = request.requestHeaders["Authorization"];
                expect(passed_auth_header).toBe("Bearer " + test_token);
                done();
            })
        });
    });

    it("list()", (done) => {
        requirejs(["PicSure/Connector/Connector"], function() {
            let test_url = "http://some.url/PIC-SURE/";
            let test_token = "some_jwt_token";
            let PicSureClient = require('PicSure/Connector/Connector');
            let conn = PicSureClient.connect(test_url, test_token);
            expect(typeof conn.list).toBe("function");


            // Mock the AJAX call on jQuery
            jasmine.Ajax.stubRequest(
                /.*/,
                /.*/
            ).andReturn({
                // Respond to the AJAX call
                status: 200,
                statusText: "HTTP/1.1 200 OK",
                contentType: "application/json",
                responseText: "[\"1111-1111-1111-1111-1111\"]"
            });

            spyOn(console, "dirxml");
            conn.list().then((result) => {
                let request = jasmine.Ajax.requests.mostRecent();
                // the asynch call has resutls
                expect(console.dirxml).toHaveBeenCalled();
                done();
            });
        });
    });
    it("getResources()", (done) => {
        requirejs(["PicSure/Connector/Connector"], function() {
            let test_url = "http://some.url/PIC-SURE/";
            let test_token = "some_jwt_token";
            let PicSureClient = require('PicSure/Connector/Connector');
            let conn = PicSureClient.connect(test_url, test_token);
            expect(typeof conn.getResources).toBe("function");

            // Mock the AJAX call on jQuery
            jasmine.Ajax.stubRequest(
                /.*/,
                /.*/
            ).andReturn({
                // Respond to the AJAX call
                status: 200,
                statusText: "HTTP/1.1 200 OK",
                contentType: "application/json",
                responseText: "[\"1111-1111-1111-1111-1111\"]"
            });

            conn.getResources().then((result) => {
                let request = jasmine.Ajax.requests.mostRecent();
                // the asynch call has resutls
                expect(request.url).toBe(test_url + "info/resources");
                expect(request.method).toBe("GET");
                let passed_auth_header = request.requestHeaders["Authorization"];
                expect(passed_auth_header).toBe("Bearer " + test_token);
                expect(request.responseText).toBe("[\"1111-1111-1111-1111-1111\"]")
                done();
            });
        });
    });
    it("_api_obj()", (done) => {
        requirejs(["PicSure/Connector/Connector"], function() {
            let test_url = "http://some.url/PIC-SURE/";
            let test_token = "some_jwt_token";
            let PicSureClient = require('PicSure/Connector/Connector');
            let conn = PicSureClient.connect(test_url, test_token);
            let api = conn._api_obj();
            expect(typeof api).not.toBe(undefined);
            expect(api.constructor.name).toBe("PicSureConnectionAPI");
            expect(api.url).toBe(test_url);
            expect(api.token).toBe(test_token);
            done();
        });
    });
});



