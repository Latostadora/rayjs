var CountryStatesSelectorComponent=function(divComponent){
    var selectCountry=divComponent.querySelector("[data-country]");
    var selectState=divComponent.querySelector("[data-state]");

    var selectedCountry = selectCountry.options[selectCountry.selectedIndex];
    this._changeStateVisibility(selectedCountry, selectState);

    var self=this;
    selectCountry.onchange=function changeEventHandler(event) {
        self._changeStateVisibility(event.target, selectState);
    };
};

CountryStatesSelectorComponent.prototype._changeStateVisibility= function(selectedCountry, selectState){
    if (selectedCountry.value==="US") {
        selectState.style.display="block";
    } else{
        selectState.style.display="none";
    }
};

