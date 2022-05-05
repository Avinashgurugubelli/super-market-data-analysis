$(document).ready(function () {
    // set the dimensions and margins of the graph
    const margin = { top: 10, right: 30, bottom: 20, left: 50 },
        width = 670 - margin.left - margin.right,
        height = 550 - margin.top - margin.bottom;

    function renderGroupBarChat(selector, data, subgroups, groups, colors) {
        const svg = d3.select(selector)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        svg.append("rect")
            .attr("transform", "translate(160,10)")
            .attr("x", 50)
            .attr("y", 50);

        subgroups.map((value, index) => {
            cy = 15 + (20 * index)
            svg.append("text")
                .attr("transform", `translate(465,${cy})`)
                .attr("x", 10)
                .attr("y", 10)
                .attr("font-size", "15px")
                .text(value)
        });

        // Add X axis
        const x = d3.scaleBand()
            .domain(groups)
            .range([0, width])
            .padding([0.2])
        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x).tickSize(0));

        // Add Y axis
        const y = d3.scaleLinear()
            .domain([5000, 30000])
            .range([height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y));

        // Another scale for subgroup position?
        const xSubgroup = d3.scaleBand()
            .domain(subgroups)
            .range([0, x.bandwidth()])
            .padding([0.3])

        const color = d3.scaleOrdinal()
            .domain(subgroups)
            .range(colors)

        // Show the bars
        svg.append("g")
            .selectAll("g")
            // Enter in data = loop group per group
            .data(data)
            .join("g")
            .attr("transform", d => `translate(${x(d.branch)}, 0)`)
            .selectAll("rect")
            .data(function (d) { return subgroups.map(function (key) { return { key: key, value: d[key] }; }); })
            .join("rect")
            .attr("x", d => xSubgroup(d.key))
            .attr("y", d => y(d.value))
            .attr("width", xSubgroup.bandwidth())
            .attr("height", d => height - y(d.value))
            .attr("fill", d => color(d.key));

        var circleEnter = svg.selectAll("circle")
            .data(data)
            .enter();

        colors.map((value, index) => {
            cy = 10 + index * 20;
            circleEnter.append("circle")
                .attr("cx", 10)
                .attr("cy", 10)
                .attr("r", 7)
                .attr("transform", `translate(450, ${cy})`)
                .attr("fill", value);
        })

    }

    function renderCustomerTypeChart(data) {
        // append the svg object to the body of the page
        const svg = d3.select("#customer-type-viz")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        svg.append("text")
            .attr("transform", "translate(365,15)")
            .attr("x", 10)
            .attr("y", 10)
            .attr("font-size", "15px")
            .text("Male visitors")

        svg.append("text")
            .attr("transform", "translate(365,35)")
            .attr("x", 10)
            .attr("y", 10)
            .attr("font-size", "15px")
            .text("Female visitors")

        svg.append("text")
            .attr("transform", "translate(365,55)")
            .attr("x", 10)
            .attr("y", 10)
            .attr("font-size", "15px")
            .text("Membered customers")
        svg.append("text")
            .attr("transform", "translate(365,75)")
            .attr("x", 10)
            .attr("y", 10)
            .attr("font-size", "15px")
            .text("Normal customers");

        const columns = ["branch", "maleVisitors", "femaleVisitors", "memberedCustomers", "normalCustomers"]
        const subgroups = columns.slice(1);
        const groups = ["A", "B", "C"]
        const colors = ['orange', 'lightgreen', 'lightblue', 'pink', 'teal'];

        // Add X axis
        const x = d3.scaleBand()
            .domain(groups)
            .range([0, width])
            .padding([0.2])
        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x).tickSize(0));

        // Add Y axis
        const y = d3.scaleLinear()
            .domain([0, 250])
            .range([height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y));

        // Another scale for subgroup position?
        const xSubgroup = d3.scaleBand()
            .domain(subgroups)
            .range([0, x.bandwidth()])
            .padding([0.3])

        const color = d3.scaleOrdinal()
            .domain(subgroups)
            .range(colors)

        // Show the bars
        svg.append("g")
            .selectAll("g")
            // Enter in data = loop group per group
            .data(data)
            .join("g")
            .attr("transform", d => `translate(${x(d.branch)}, 0)`)
            .selectAll("rect")
            .data(function (d) { return subgroups.map(function (key) { return { key: key, value: d[key] }; }); })
            .join("rect")
            .attr("x", d => xSubgroup(d.key))
            .attr("y", d => y(d.value))
            .attr("width", xSubgroup.bandwidth())
            .attr("height", d => height - y(d.value))
            .attr("fill", d => color(d.key));

        var circleEnter = svg.selectAll("circle")
            .data(data)
            .enter();

        circleEnter.append("circle")
            .attr("cx", 10)
            .attr("cy", 10)
            .attr("r", 7)
            .attr("transform", "translate(" + 350 + "," + 10 + ")")
            .attr("fill", "orange");

        circleEnter.append("circle")
            .attr("cx", 10)
            .attr("cy", 10)
            .attr("r", 7)
            .attr("transform", "translate(" + 350 + "," + 30 + ")")
            .attr("fill", "lightgreen");

        circleEnter.append("circle")
            .attr("cx", 10)
            .attr("cy", 10)
            .attr("r", 7)
            .attr("transform", "translate(" + 350 + "," + 50 + ")")
            .attr("fill", "lightblue");

        circleEnter.append("circle")
            .attr("cx", 10)
            .attr("cy", 10)
            .attr("r", 7)
            .attr("transform", "translate(" + 350 + "," + 70 + ")")
            .attr("fill", "pink");
    }


    function renderBranchWiseProductsSaleChart(payload) {
        // append the svg object to the body of the page
        const data = payload.map((d) => {
            salesInfo = d.salesInfo.reduce((accumulator, obj) => {
                accumulator[obj.productLine] = obj.totalSales;
                return accumulator;
            }, {});
            return {
                branch: d.branch,
                ...salesInfo
            };
        });
        const subgroups = ["Food and beverages", "Fashion accessories", "Electronic accessories", "Sports and travel", "Home and lifestyle", "Health and beauty"];
        const groups = ["A", "B", "C"];
        const colors = ['#5DADE2', '#48C9B0', '#F4D03F', '#AF7AC5', '#FADBD8', '#A9DFBF'];
        renderGroupBarChat("#branch-sales-viz", data, subgroups, groups, colors);
        // const svg = d3.select("#branch-sales-viz")
        //     .append("svg")
        //     .attr("width", width + margin.left + margin.right)
        //     .attr("height", height + margin.top + margin.bottom)
        //     .append("g")
        //     .attr("transform", `translate(${margin.left},${margin.top})`);

        // svg.append("rect")
        //     .attr("transform", "translate(160,10)")
        //     .attr("x", 50)
        //     .attr("y", 50);

        // subgroups.map((value, index) => {
        //     cy = 15 + (20 * index)
        //     svg.append("text")
        //         .attr("transform", `translate(465,${cy})`)
        //         .attr("x", 10)
        //         .attr("y", 10)
        //         .attr("font-size", "15px")
        //         .text(value)
        // });

        // // Add X axis
        // const x = d3.scaleBand()
        //     .domain(groups)
        //     .range([0, width])
        //     .padding([0.2])
        // svg.append("g")
        //     .attr("transform", `translate(0, ${height})`)
        //     .call(d3.axisBottom(x).tickSize(0));

        // // Add Y axis
        // const y = d3.scaleLinear()
        //     .domain([5000, 30000])
        //     .range([height, 0]);
        // svg.append("g")
        //     .call(d3.axisLeft(y));

        // // Another scale for subgroup position?
        // const xSubgroup = d3.scaleBand()
        //     .domain(subgroups)
        //     .range([0, x.bandwidth()])
        //     .padding([0.3])

        // const color = d3.scaleOrdinal()
        //     .domain(subgroups)
        //     .range(colors)

        // // Show the bars
        // svg.append("g")
        //     .selectAll("g")
        //     // Enter in data = loop group per group
        //     .data(data)
        //     .join("g")
        //     .attr("transform", d => `translate(${x(d.branch)}, 0)`)
        //     .selectAll("rect")
        //     .data(function (d) { return subgroups.map(function (key) { return { key: key, value: d[key] }; }); })
        //     .join("rect")
        //     .attr("x", d => xSubgroup(d.key))
        //     .attr("y", d => y(d.value))
        //     .attr("width", xSubgroup.bandwidth())
        //     .attr("height", d => height - y(d.value))
        //     .attr("fill", d => color(d.key));

        // var circleEnter = svg.selectAll("circle")
        //     .data(data)
        //     .enter();

        // colors.map((value, index) => {
        //     cy = 10 + index * 20;
        //     circleEnter.append("circle")
        //         .attr("cx", 10)
        //         .attr("cy", 10)
        //         .attr("r", 7)
        //         .attr("transform", `translate(450, ${cy})`)
        //         .attr("fill", value);
        // })

    }

    loadData().then((response) => {
        const data = processDataByBranch(response);
        renderCustomerTypeChart(data);
        renderBranchWiseProductsSaleChart(data);
    })
})