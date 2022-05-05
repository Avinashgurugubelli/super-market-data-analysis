
$(document).ready(function () {
    
    loadData().then((result) => {
        products = getAllProductnames(result);
        totalSales = getTotalSalesPerProduct(result);
        console.log(`products: ${JSON.stringify(totalSales)}`);

        const svg = d3.create("svg").attr("width", "100%")
            .attr("height", "300px")
        var elem = svg.selectAll("div").data(totalSales);
        var elemEnter = elem.enter().append("g")

        // This function will iterate your data
        totalSales.map(function (element, index) {
            const cxBase = 200;
            const cxOffset = 100;
            var cx = cxBase * (index) + cxOffset; // Here CX is calculated

            var circles = elemEnter.append("circle")
                .attr("cx", cx)
                .attr("cy", 100)
                .attr("r", 95)
                .style("fill", "#2874A6")

            elemEnter
                .append("text")
                .style("fill", "white")
                .attr("dy", function (d) {
                    return 105;
                })
                .attr("dx", function (d) {
                    return cx - (element.productLine.length * 3.5);
                })
                .text(function (d) {
                    return element.productLine
                });

            priceTextXPosition = index == 0 ? 40 : 40 + (index * 200);
            // priceTextYPosition = 120 * index;
            svg.append("text")
                .attr("transform", `translate(${priceTextXPosition},${120})`)
                .attr("x", 20)
                .attr("y", 20)
                .attr("font-size", "25px")
                .text(`${element.totalSales} $`)
                .style("fill", "white")
        });
        document.getElementById("productLineSummary").append(svg.node())
    });
})

