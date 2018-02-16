var CountryStatesSelectorComponent=function(divComponent){
    var selectCountry=divComponent.querySelector("[data-country]");
    var selectState=divComponent.querySelector("[data-state]");
    if (selectCountry.options[selectCountry.selectedIndex].value==="US") {
        selectState.style.display="block";
    } else{
        selectState.style.display="none";
    }
};

