/**
 * Created by nbeni on 5/17/2019.
 */
define(function(require) {

    let _PicSureApiVersion = "0.1.0";

    let Connection = class {
        help() {}
        about() {}
        list() {}
        getInfo() {}
        getResources() {}
        _api_obj() {}
    };


    let PicSureConnectionAPI = class {
        info(self, resource_uuid){}
        search(self, resource_uuid, query) {}
        asyncQuery(self, resource_uuid, query) {}
        syncQuery(self, resource_uuid, query) {}
        queryStatus(self, resource_uuid, query_uuid) {}
        queryResult(self, resource_uuid, query_uuid) {}
    };

    // this is the PicSure.Connection class
    return {
            version: () => {
                console.log("PicSureClient Javascript Library (version " + _PicSureApiVersion + ")");
            },
            help: () => {
                console.log(`
                    require(['PIC-SURE_Connector'], (psc) => { PicSureClient = psc });
                    
                    PicSureClient.version()                 give version information for the library
                    PicSureClient.connect(<url>, <token>)   returns a connection object instance
                    `);
            },
            connect: (url, token) => {
                return {}
            }
        }
});
