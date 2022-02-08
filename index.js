(function(global, factory) {
    (global.js = factory());
}(this, function() {
    'use strict';

    window.generatePDF = (aData) => {
        let codes = 1;
        let currType = aData[0].type;
        const x = 50;
        let yImage = 20;
        let yText = 70;
        let doc = new window.jspdf.jsPDF();

        //aData = [aData[0], aData[1]]

        aData.map((oData) => {
            const { ID, areatype, type } = oData;
            
            const imgData = generateBarcode(ID);
            const text = type + (areatype ? "-" + areatype : "");

            doc.setFontSize(15);
            const yTextCalc = yText + (70 * (codes - 1));
            const yImageCalc = yImage + (70 * (codes - 1));
            doc.text(x, yTextCalc, text);
            doc.addImage(imgData, 'PNG', x, yImageCalc, 90, 40);

            if(codes === 5 || currType !== type) {
                currType = type;
                codes = 1;
                doc.addPage();
                return;
            }

            codes++;
        });

        doc.save("test.pdf");
    };

    const generateBarcode = (sCode) => {
        var canvas = document.createElement("canvas");
        JsBarcode(canvas, sCode || "ciao", {format: "CODE39"});
        return canvas.toDataURL("image/png");
    }

    return generatePDF;

}));