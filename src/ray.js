var Ray=function()
{
    document.querySelectorAll("[data-ray-action]").forEach(function(domElement){
        var actionName=domElement.getAttribute("data-ray-action");
        var action = window[actionName];
        action(domElement);
    });
};