
var salesData = [];

async function loadData() {
    if (salesData.length <= 0) {
        const response = await d3.csv("/data-set/supermarket_sales.csv");
        salesData = response;
    }
    return salesData;
}

function getAllProductnames(data) {
    if (data) {
        products = []
        _.uniqBy(data, "Product line").forEach((item) => {
            products.push(item["Product line"])
        });
        return products;
    }
}

function getAllBranchNames(data) {
    if (data) {
        products = []
        _.uniqBy(data, "Branch").forEach((item) => {
            products.push(item["Branch"])
        });
        return products;
    }
}

function getTotalSalesPerProduct(data) {
    productsSaleData = {};
    if (data) {
        data.forEach((item) => {
            productName = item["Product line"];
            value = item['Total'] ? parseFloat(item['Total']) : 0;
            if (productsSaleData[productName]) {
                totalSales = productsSaleData[productName].totalSales;
                totalSales = totalSales + value;
                productsSaleData[productName].totalSales = totalSales;
            }
            else {
                productsSaleData[productName] = {
                    'totalSales': value
                };
            }

        })
    }
    let salesList = []
    for (const key in productsSaleData) {
        salesList.push({
            'productLine': key,
            'totalSales': Math.floor(productsSaleData[key].totalSales)
        });
    }
    return salesList;
}

function processDataByBranch(data) {
    let processedData = [];
    let columns = ["branch", "maleVisitors", "femaleVisitors", "memberedCustomers", "normalCustomers", "totalSale"]
    if (data) {
        const branchNames = getAllBranchNames(data)
        branchNames.forEach((branchName) => {
            const filteredDataByBranchNames = data.filter((d) => d["Branch"] === branchName);
            const salesInfo = getTotalSalesPerProduct(filteredDataByBranchNames)
            let maleVisitorCount = 0;
            let femaleVisitorsCount = 0;
            let memberedCustomersCount = 0;
            let normalCustomersCount = 0;
            let totalSales = 0;
            // Loop through the filtered data
            filteredDataByBranchNames.forEach((d) => {
                const isMaleCustomer = d["Gender"]?.toLowerCase() == "male" ? true : false;
                const isFemaleCustomer = d["Gender"]?.toLowerCase() == "female" ? true : false;
                const isNormalCustomer = d["Customer type"]?.toLowerCase() == "normal" ? true : false;
                const isMemberCustomer = d["Customer type"]?.toLowerCase() == "member" ? true : false;
                isMaleCustomer && maleVisitorCount++;
                isFemaleCustomer && femaleVisitorsCount++;
                isMemberCustomer && memberedCustomersCount++;
                isNormalCustomer && normalCustomersCount++;
                totalSales = totalSales + parseFloat(d['Total']);
            });
            const payload = {
                "branch": branchName,
                "maleVisitors": Math.floor(maleVisitorCount),
                "femaleVisitors": Math.floor(femaleVisitorsCount),
                "memberedCustomers": Math.floor(memberedCustomersCount),
                "normalCustomers": Math.floor(normalCustomersCount),
                "totalSales": Math.floor(totalSales),
                "salesInfo": salesInfo,
            };
            processedData.push(payload);
        })
        return processedData;
    }

}