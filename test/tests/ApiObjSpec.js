/**
 * Created by nbenik on 12/10/2019.
 */

describe("[API Object creation]", () => {
    it("Can be created by library call", (done) => {
        requirejs(["PicSure/Connector/Connector"], function(PicSureClient) {
            let test_url = "http://some.url/PIC-SURE/";
            let test_token = "some_jwt_token";
            let conn = PicSureClient.connect(test_url, test_token);
            let ApiObj = conn._api_obj();
            expect(typeof ApiObj).not.toBe(undefined);
            expect(typeof ApiObj).toBe('object');
            expect(ApiObj.constructor.name).toBe("PicSureConnectionAPI");
            expect(ApiObj.url).toBe(test_url);
            expect(ApiObj.token).toBe(test_token);
            done();
        });
    });
    it("Can NOT be created directly by statement", (done) => {
        requirejs(["PicSure/Connector/Connector"], function(PicSureClient) {
            expect(typeof PicSureConnectionAPI).toBe("undefined");
            expect(() => {
                let test_url = "http://some.url/PIC-SURE/";
                let test_token = "some_jwt_token";
                let ApiObj = new PicSureConnectionAPI(test_url, test_token);
            }).toThrow();
            done();
        });
    });
});

describe("[API Object functions]", () => {
    // setup AJAX mocking
    beforeEach(function() {
        jasmine.Ajax.install();
    });
    afterEach(function() {
        jasmine.Ajax.uninstall();
    });

    // ___HAPPY PATH EXAMPLE__________________________________________________
    it("info()", (done) => {
        requirejs(["PicSure/Connector/Connector"], function() {
            let test_url = "http://some.url/PIC-SURE/";
            let test_token = "some_jwt_token";
            let test_uuid = "1111-1111-1111-1111-1111";
            let PicSureClient = require('PicSure/Connector/Connector');
            let conn = PicSureClient.connect(test_url, test_token);
            let api_obj = conn._api_obj();
            expect(typeof api_obj.info).toBe("function");
            let jsonResults = JSON.stringify({"some":"json"});

            // Mock the AJAX call on jQuery
            jasmine.Ajax.stubRequest(
                /.*/,
                /.*/
            ).andReturn({
                // Respond to the AJAX call
                status: 200,
                statusText: "HTTP/1.1 200 OK",
                contentType: "application/json",
                responseText: jsonResults
            });

            api_obj.info(test_uuid).then((result) => {
                // the asynch call has resutls
                expect(result).toBe(jsonResults);
                let request = jasmine.Ajax.requests.mostRecent();
                expect(request.url).toBe(test_url + "info/" + test_uuid);
                expect(request.method).toBe("POST");
                expect(request.requestHeaders["Authorization"]).toBe("Bearer " + test_token);
                expect(request.responseText).toBe(jsonResults)
                done();
            });
        });
    });

    // ___HAPPY PATH EXAMPLE__________________________________________________
    it("search()", (done) => {
        requirejs(["PicSure/Connector/Connector"], function() {
            let test_url = "http://some.url/PIC-SURE/";
            let test_token = "some_jwt_token";
            let test_uuid = "1111-1111-1111-1111-1111";
            let PicSureClient = require('PicSure/Connector/Connector');
            let conn = PicSureClient.connect(test_url, test_token);
            let api_obj = conn._api_obj();
            expect(typeof api_obj.search).toBe("function");
            let jsonResults = JSON.stringify({"some":"json"});

            // Mock the AJAX call on jQuery
            jasmine.Ajax.stubRequest(
                /.*/,
                /.*/
            ).andReturn({
                // Respond to the AJAX call
                status: 200,
                statusText: "HTTP/1.1 200 OK",
                contentType: "application/json",
                responseText: jsonResults
            });

            api_obj.search(test_uuid).then((result) => {
                // the asynch call has resutls
                expect(result).toBe(jsonResults);
                let request = jasmine.Ajax.requests.mostRecent();
                expect(request.url).toBe(test_url + "search/" + test_uuid);
                expect(request.method).toBe("POST");
                expect(request.requestHeaders["Authorization"]).toBe("Bearer " + test_token);
                expect(request.params).toBe("query=");
                expect(request.responseText).toBe(jsonResults);
                done();
            });
        });
    });

    // ___HAPPY PATH EXAMPLE__________________________________________________
    it("search( w/term )", (done) => {
        requirejs(["PicSure/Connector/Connector"], function() {
            let test_url = "http://some.url/PIC-SURE/";
            let test_token = "some_jwt_token";
            let test_uuid = "1111-1111-1111-1111-1111";
            let test_term = "my_search_term";
            let PicSureClient = require('PicSure/Connector/Connector');
            let conn = PicSureClient.connect(test_url, test_token);
            let api_obj = conn._api_obj();
            expect(typeof api_obj.search).toBe("function");
            let jsonResults = JSON.stringify({"some":"json"});

            // Mock the AJAX call on jQuery
            jasmine.Ajax.stubRequest(
                /.*/,
                /.*/
            ).andReturn({
                // Respond to the AJAX call
                status: 200,
                statusText: "HTTP/1.1 200 OK",
                contentType: "application/json",
                responseText: jsonResults
            });

            api_obj.search(test_uuid, test_term).then((result) => {
                // the asynch call has resutls
                expect(result).toBe(jsonResults);
                let request = jasmine.Ajax.requests.mostRecent();
                expect(request.url).toBe(test_url + "search/" + test_uuid);
                expect(request.method).toBe("POST");
                expect(request.requestHeaders["Authorization"]).toBe("Bearer " + test_token);
                expect(request.params).toBe(test_term);
                expect(request.responseText).toBe(jsonResults);
                done();
            });
        });
    });

    // ___HAPPY PATH EXAMPLE__________________________________________________
    it("synchQuery()", (done) => {
        requirejs(["PicSure/Connector/Connector"], function() {
            let test_url = "http://some.url/PIC-SURE/";
            let test_token = "some_jwt_token";
            let test_uuid = "1111-1111-1111-1111-1111";
            let test_query = JSON.stringify({"query": {"my": "query"}});
            let PicSureClient = require('PicSure/Connector/Connector');
            let conn = PicSureClient.connect(test_url, test_token);
            let api_obj = conn._api_obj();
            expect(typeof api_obj.search).toBe("function");
            let jsonResults = JSON.stringify({"some":"json"});

            // Mock the AJAX call on jQuery
            jasmine.Ajax.stubRequest(
                /.*/,
                /.*/
            ).andReturn({
                // Respond to the AJAX call
                status: 200,
                statusText: "HTTP/1.1 200 OK",
                contentType: "application/json",
                responseText: jsonResults
            });

            api_obj.syncQuery(test_uuid, test_query).then((result) => {
                // the asynch call has resutls
                expect(result).toBe(jsonResults);
                let request = jasmine.Ajax.requests.mostRecent();
                expect(request.url).toBe(test_url + "query/sync");
                expect(request.method).toBe("POST");
                expect(request.requestHeaders["Authorization"]).toBe("Bearer " + test_token);
                expect(request.params).toBe(test_query);
                expect(request.responseText).toBe(jsonResults);
                done();
            });
        });
    });


    // expect(typeof api_obj.asyncQuery).toBe("function");
    it("asyncQuery()", (done) => {
        requirejs(["PicSure/Connector/Connector"], function() {
            let test_url = "http://some.url/PIC-SURE/";
            let test_token = "some_jwt_token";
            let test_uuid = "1111-1111-1111-1111-1111";
            let test_query = JSON.stringify({"query": {"my": "query"}});
            let PicSureClient = require('PicSure/Connector/Connector');
            let conn = PicSureClient.connect(test_url, test_token);
            let api_obj = conn._api_obj();
            expect(typeof api_obj.asyncQuery).toBe("function");
            let jsonResults = JSON.stringify({"some": "json"});

            // Mock the AJAX call on jQuery
            jasmine.Ajax.stubRequest(
                /.*/,
                /.*/
            ).andReturn({
                // Respond to the AJAX call
                status: 200,
                statusText: "HTTP/1.1 200 OK",
                contentType: "application/json",
                responseText: jsonResults
            });

            api_obj.asyncQuery(test_uuid, test_query).then((result) => {
                // the asynch call has resutls
                expect(result).toBe(jsonResults);
                let request = jasmine.Ajax.requests.mostRecent();
                expect(request.url).toBe(test_url + "query/sync");
                expect(request.method).toBe("POST");
                expect(request.requestHeaders["Authorization"]).toBe("Bearer " + test_token);
                expect(request.params).toBe(test_query);
                expect(request.responseText).toBe(jsonResults);
                done();
            });
        });
    });



    // ___HAPPY PATH EXAMPLE__________________________________________________
    // expect(typeof api_obj.queryStatus).toBe("function");
    it("queryStatus()", (done) => {
        requirejs(["PicSure/Connector/Connector"], function() {
            let test_url = "http://some.url/PIC-SURE/";
            let test_token = "some_jwt_token";
            let test_uuid = "1111-1111-1111-1111-1111";
            let test_query_id = "qqqq-qqqq-qqqq-qqqq-qqqq";
            let PicSureClient = require('PicSure/Connector/Connector');
            let conn = PicSureClient.connect(test_url, test_token);
            let api_obj = conn._api_obj();
            expect(typeof api_obj.queryStatus).toBe("function");
            let jsonResults = JSON.stringify({"some": "json"});

            // Mock the AJAX call on jQuery
            jasmine.Ajax.stubRequest(
                /.*/,
                /.*/
            ).andReturn({
                // Respond to the AJAX call
                status: 200,
                statusText: "HTTP/1.1 200 OK",
                contentType: "application/json",
                responseText: jsonResults
            });

            api_obj.queryStatus(test_uuid, test_query_id).then((result) => {
                // the asynch call has resutls
                expect(result).toBe(jsonResults);
                let request = jasmine.Ajax.requests.mostRecent();

                expect(request.url).toBe(test_url + "query/sync");
                expect(request.method).toBe("POST");
                expect(request.requestHeaders["Authorization"]).toBe("Bearer " + test_token);
                expect(request.params).toBe(test_query);
                expect(request.responseText).toBe(jsonResults);
                done();
            });
        });
    });




    // ___HAPPY PATH EXAMPLE__________________________________________________
    // expect(typeof api_obj.queryResult).toBe("function");
    it("queryResult()", (done) => {
        requirejs(["PicSure/Connector/Connector"], function() {
            let test_url = "http://some.url/PIC-SURE/";
            let test_token = "some_jwt_token";
            let test_uuid = "1111-1111-1111-1111-1111";
            let test_query_id = "qqqq-qqqq-qqqq-qqqq-qqqq";
            let PicSureClient = require('PicSure/Connector/Connector');
            let conn = PicSureClient.connect(test_url, test_token);
            let api_obj = conn._api_obj();
            expect(typeof api_obj.queryResult).toBe("function");
            let jsonResults = JSON.stringify({"some": "json"});

            // Mock the AJAX call on jQuery
            jasmine.Ajax.stubRequest(
                /.*/,
                /.*/
            ).andReturn({
                // Respond to the AJAX call
                status: 200,
                statusText: "HTTP/1.1 200 OK",
                contentType: "application/json",
                responseText: jsonResults
            });

            api_obj.queryResult(test_uuid, test_query_id).then((result) => {
                // the asynch call has resutls
                expect(result).toBe(jsonResults);
                let request = jasmine.Ajax.requests.mostRecent();

                expect(request.url).toBe(test_url + "query/sync");
                expect(request.method).toBe("POST");
                expect(request.requestHeaders["Authorization"]).toBe("Bearer " + test_token);
                expect(request.params).toBe(test_query);
                expect(request.responseText).toBe(jsonResults);
                done();
            });
        });
    });

});


