import Handlebars   = require("handlebars");
import Promise      = require("bluebird");
import Model        = require("./model");

/**
 * View
 */
class View {
  private container: string;
  private templateUrl: string;
  private model: Model;

  constructor(templateUrl: string, container: string, model: Model) {
    this.container = container;
    this.templateUrl = templateUrl;
    this.model = model;
  }

  public render() {
    $.ajax({
      error: (error) => {
        // error
      },
      success: (text) => {
        const template: any = Handlebars.compile(text);
        const html = template({});
        $(this.container).html(html);
      },
      url: this.templateUrl,
    });
  }
}

export = View;
