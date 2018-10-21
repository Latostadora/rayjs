var StateComponent=function(data){
    var selectState=data.DOMElement;
    var bus=data.bus;
    bus.on(Events.COUNTRY_CHANGED, function(newCountry){
        if (newCountry==="US") {
            selectState.style.display="inline";
        } else{
            selectState.style.display="none";
        }
    });
};
