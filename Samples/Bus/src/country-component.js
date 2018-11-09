var CountryComponent=function(data){
    this.selectCountry=data.DOMElement;
    var bus = data.bus;

    this.selectCountry.style.backgroundColor = data.params.background;

    var self=this;
    setTimeout(function(){
        bus.trigger(Events.COUNTRY_CHANGED, self.getCurrentCountry());
    }, 100);

    this.selectCountry.onchange=function changeEventHandler(event) {
        event.preventDefault();
        bus.trigger(Events.COUNTRY_CHANGED, self.getCurrentCountry());
    };
};

CountryComponent.prototype.getCurrentCountry=function() {
    var selectedCountryIndex = this.selectCountry.selectedIndex;
    var selectedCountryOption = this.selectCountry.options[selectedCountryIndex];
    return selectedCountryOption.value;
};
window.CountryComponent=CountryComponent;


