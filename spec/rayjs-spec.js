
describe("ray JS lib", function() {

    it("should instantiate an Action from a data-ray-action attrib", function() {
        var expectedSrc = "images/test2.jpg";

        //Arrange
        window.ChangeImageSrcAction=function(image) {
            image.setAttribute("src",expectedSrc);
        };

        var specContainer = document.getElementById("spec-container");
        specContainer.innerHTML=
            "<img data-ray-action='ChangeImageSrcAction' src='images/test1.jpg'>";

        //Act
        new Ray();

        //Assert
        var img=specContainer.getElementsByTagName("img")[0];
        expect(img.getAttribute("src")).toBe(expectedSrc);
    });

    it("should work with N namespaces", function() {
        var expectedSrc = "images/test2.jpg";

        //Arrange
        window.Namespace={};
        window.Namespace.ChangeImageSrcAction=function(image) {
            image.setAttribute("src",expectedSrc);
        };

        var specContainer = document.getElementById("spec-container");
        specContainer.innerHTML=
            "<img data-ray-action='Namespace.ChangeImageSrcAction' src='images/test1.jpg'>";

        //Act
        new Ray();

        //Assert
        var img=specContainer.getElementsByTagName("img")[0];
        expect(img.getAttribute("src")).toBe(expectedSrc);
    });




});
