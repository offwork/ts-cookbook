import Handlebars   = require("handlebars");
import Promise      = require("bluebird");

/**
 * Model
 */
class Model {
    private modelUrl: string;
    private formatter: string;

    constructor(model: string, formatter: string) {
        this.modelUrl = model;
        this.formatter = formatter;
    }

    public getAsync(args: object): Promise<{}> {
        return this.genericAjaxCallAsync("GET", args);
    }

    private genericAjaxCallAsync(method: string, args: object): Promise<{}> {
        return new Promise((resolve, reject) => {
            $.ajax({
                data: args,
                error: (error) => {
                    reject(error);
                },
                success: (response) => {
                    if (typeof this.formatter === "function") {
                        response = this.formatter(response);
                    }
                    resolve(response);
                },
                url: this.modelUrl,
            });
        });
    }
}

export = Model;
