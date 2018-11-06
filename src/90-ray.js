class Ray {

    constructor(eventNamesToListen) {
        this.eventNamesToListen=eventNamesToListen || {document:'DOMContentLoaded', window:'load'};
        this.raydocument=new RayNS.Document(this.eventNamesToListen);
        this.bus=RayNS.Bus.create();
        this.commandDispatcher=new RayNS.CommandDispatcher(this.bus);
    }

    begin() {
        this.commandDispatcher.begin();
        this.raydocument.begin();
        const self = this;
        this.raydocument.ready(() => {
            self.bus.trigger(RayNS.Commands.EXECUTE_NEW_COMPONENTS);
        });
        this.intervalId=setInterval(() => {
            self.bus.trigger(RayNS.Commands.EXECUTE_NEW_COMPONENTS);
        },400);
    }

    end() {
        clearInterval(this.intervalId);
        this.raydocument.end();
        this.bus.end();
        this.commandDispatcher.end();
    }

    static get Events() {
        return RayNS.Events;
    }

    static get Commands() {
        return RayNS.Commands;
    }

    static createBus() {
        return RayNS.Bus.create();
    }

    static executeComponent(domElement, bus) {
        RayNS.Component.execute(domElement, bus);
    }

    static get HANDLEBARS_NOT_LOADED_ERROR_MESSAGE() {
        return "HandleBars object is not present. You need to load HandleBars before this";
    }

    static renderHtmlFromString(template, model){
        Ray.checkHandlebarsIsPresent();
        const compiledTemplate = Handlebars.compile(template);
        return compiledTemplate(model);
    }

    static checkHandlebarsIsPresent() {
        if (window.Handlebars === undefined) {
            throw new Error(Ray.HANDLEBARS_NOT_LOADED_ERROR_MESSAGE);
        }
    }

    static renderHtmlFromUrl(templateUrl, model) {
       Ray.checkHandlebarsIsPresent();
       const promise=new Promise((resolve, reject) => {
           fetch(templateUrl)
               .then(response => {
                   if (!response.ok) {
                       reject(response.statusText);
                       return;
                   }
                   response.text().then(templateString => {
                       resolve(Ray.renderHtmlFromString(templateString, model));
                   });
               })
               .catch(errorMessage => {
                   reject(errorMessage);
               });
       });
       return promise;
    }
}

window.Ray=Ray;
module.exports=Ray;
