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

    static renderHtmlFromString(template, model){
        const compiledTemplate = Handlebars.compile(template);
        return compiledTemplate(model);
    }

    static renderHtmlFromUrl(templateUrl, model) {
       const promise=new Promise((resolve, reject) => {
           fetch(templateUrl)
               .then(function(response) {
                   if (!response.ok){
                       reject(response.statusText);
                   }
                   return response.text().then(function(templateString) {
                       const renderedHtml=Ray.renderHtmlFromString(templateString, model);
                       resolve(renderedHtml);
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
