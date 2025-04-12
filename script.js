// Mapa krvnih grupa
const bloodGroups = ["O_POSITIVE", "A_POSITIVE", "B_POSITIVE", "AB_POSITIVE", "O_NEGATIVE", "A_NEGATIVE", "B_NEGATIVE", "AB_NEGATIVE"];

// Postavke za kartu
const width = 1200;
const height = 800;

const svg = d3.select("#map")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

const projection = d3.geoMercator()
    .scale(150)
    .translate([width / 2, height / 1.5]);

const path = d3.geoPath().projection(projection);
const tooltip = d3.select("#tooltip");

// Skala boja
const colorScale = d3.scaleThreshold()
    .domain([0.1, 0.3, 0.8, 1.2])
    .range(d3.schemeBlues[5]);

// Učitavanje podataka o karti i krvnim grupama
Promise.all([
    d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"),
    d3.csv("country_wise_blood_distribution.csv")  // Zamijenite s vašom putanjom do CSV datoteke
]).then(data => {
    const mapData = data[0];
    const bloodData = data[1];

    const bloodGroupSelect = d3.select("#blood-group");
    bloodGroupSelect.on("input", function() {
        const selectedGroupIndex = this.value;
        const selectedGroup = bloodGroups[selectedGroupIndex];
        d3.select("#selected-blood-group").text(selectedGroup.replace("_", " "));
        updateMap(selectedGroup);
        updateLegend(selectedGroup);
    });

    function updateMap(bloodGroup) {
        svg.selectAll("path").remove();

        svg.selectAll("path")
            .data(mapData.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("fill", d => {
                const country = bloodData.find(c => c.Country === d.properties.name);
                return country ? colorScale(parseFloat(country[bloodGroup])) : "#ccc";
            })
            .on("mouseover", function(event, d) {
                const country = bloodData.find(c => c.Country === d.properties.name);
                const bloodInfo = country ? country[bloodGroup] : "No data";
                tooltip.style("opacity", 1)
                    .html(`<strong>${d.properties.name}</strong><br>Blood Type ${bloodGroup.replace("_", " ")}: ${bloodInfo}`)
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", function() {
                tooltip.style("opacity", 0);
            });
    }

    function updateLegend(bloodGroup) {
        const legend = d3.select("#legend");
        legend.selectAll("*").remove();

        const legendData = colorScale.domain().map((d, i) => {
            return {
                color: colorScale.range()[i],
                text: `>= ${d}%`
            };
        });

        const legendItem = legend.selectAll(".legend-item")
            .data(legendData)
            .enter()
            .append("div")
            .attr("class", "legend-item");

        legendItem.append("div")
            .attr("class", "legend-color")
            .style("background-color", d => d.color);

        legendItem.append("div")
            .text(d => d.text);
    }

    // Postavljanje početne krvne grupe i legende
    updateMap(bloodGroups[0]);
    updateLegend(bloodGroups[0]);

    d3.csv("ukupno.csv").then(function(data) {
        var margin = { top: 40, right: 30, bottom: 70, left: 150 },
            width = 1100 - margin.left - margin.right,
            height = 700 - margin.top - margin.bottom;
    
        // Dodavanje naslova
        d3.select("#barchart")
            .append("div")
            .attr("class", "barchart-title")
            .text("Gdje se koristi donirana krv?");
    
        var svg = d3.select("#barchart")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
        var x = d3.scaleBand()
            .domain(data.map(function(d) { return d.Specialty; }))
            .range([0, width])
            .padding(0.1);
    
        var y = d3.scaleLinear()
            .domain([0, d3.max(data, function(d) { return +d.Beds.replace(/,/g, ''); })])
            .range([height, 0]);
    
        svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("font-size", "18px") // Veličina fonta za brojeve na x osi
            .append("text")
            .attr("class", "x-axis")
            .attr("text-anchor", "middle")
            .text("Vrsta metode");
    
        svg.append("g")
            .attr("class", "y-axis")
            .call(d3.axisLeft(y))
            .selectAll("text")
            .attr("font-size", "18px"); // Veličina fonta za oznake na y osi
    
        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", function(d) { return x(d.Specialty); })
            .attr("y", function(d) { return y(+d.Beds.replace(/,/g, '')); })
            .attr("width", x.bandwidth())
            .attr("height", function(d) { return height - y(+d.Beds.replace(/,/g, '')); })
            .attr("fill", "#4CAF50")
            .on("mouseover", function(event, d) {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                tooltip.html("Blood Units: " + d.Estimated)
                    .style("left", (event.pageX) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
    
        var tooltip = d3.select("body").append("div")
            .attr("class", "barchart-tooltip")
            .style("opacity", 0);
    
        // Dodavanje labela za osi
        svg.append("text")
            .attr("class", "axis-label")
            .attr("text-anchor", "middle")
            .attr("x", width / 2)
            .attr("y", height + margin.bottom / 1)
            .text("Vrsta metode")
            .attr("font-size", "20px"); // Veličina fonta za oznaku x osi
    
        svg.append("text")
            .attr("class", "axis-label")
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .attr("y", -margin.left + 20)
            .attr("x", -height / 2)
            .attr("dy", ".75em")
            .text("Broj doza")
            .attr("font-size", "20px"); // Veličina fonta za oznaku y osi
    
        // Postavljanje veličine SVG-a prema stvarnoj veličini okvira
        var containerWidth = document.getElementById("barchart").clientWidth;
        var containerHeight = document.getElementById("barchart").clientHeight;
    
        svg.attr("width", containerWidth)
           .attr("height", containerHeight);
    });
    
    d3.csv("eu_donacije.csv").then(function(data) {
        // Sort data in descending order of blood donations
        data.sort(function(a, b) {
            return d3.descending(+a.blood_donations, +b.blood_donations);
        });
    
        var margin = { top: 60, right: 30, bottom: 70, left: 150 }, // Povećane gornje margine za naslov
        width = 1500 - margin.left - margin.right,
        height = 900 - margin.top - margin.bottom;
    
        // Dodavanje naslova
        d3.select("#bloodDonationChartEU")
        .append("div")
        .attr("class", "barchart-title")
        .text("Donacije krvi u EU");


    
        var svg = d3.select("#bloodDonationChartEU")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .style("border", "1px solid #ccc")
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
        var x = d3.scaleLinear()
            .domain([0, d3.max(data, function(d) { return +d.blood_donations; })])
            .range([0, width]);
    
        var y = d3.scaleBand()
            .domain(data.map(function(d) { return d.state; }))
            .range([0, height])
            .padding(0.1);
    
        svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).tickSizeOuter(0))
            .selectAll("text")
            .attr("font-size", "18px") // Veličina fonta za brojeve na x osi

    
        svg.append("g")
            .attr("class", "y-axis")
            .call(d3.axisLeft(y).tickSizeOuter(0))
            .selectAll("text")
            .attr("font-size", "18px"); // Veličina fonta za oznake na y osi
    
        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", 0)
            .attr("y", function(d) { return y(d.state); })
            .attr("width", function(d) { return x(+d.blood_donations); })
            .attr("height", y.bandwidth())
            .attr("fill", "#2196F3")
            .on("mouseover", function(event, d) {
                d3.select(this)
                    .attr("fill", "#1976D2");
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                tooltip.html("Blood Donations: " + d.blood_donations)
                    .style("left", (event.pageX) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                d3.select(this)
                    .attr("fill", "#2196F3");
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
    
        var tooltip = d3.select("body").append("div")
            .attr("class", "barchart-tooltip")
            .style("opacity", 0);
    
        // Dodavanje labela za osi
        svg.append("text")
            .attr("class", "axis-label")
            .attr("text-anchor", "middle")
            .attr("x", width / 2)
            .attr("y", height + margin.bottom - 10)
            .text("Broj doza")
            .attr("font-size", "18px"); // Veličina fonta za oznaku x osi
    
        svg.append("text")
            .attr("class", "axis-label")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-90)")
            .attr("y", -margin.left + 20)
            .attr("x", -height / 2)
            .attr("dy", ".75em")
            .text("Država")
            .attr("font-size", "18px"); // Veličina fonta za oznaku y osi
    });
    

    d3.csv("postoci.csv").then(function(data) {
        // Kreiranje padajućeg izbornika sa imenima država
        var countrySelect = d3.select("#country-select")
            .style("font-size", "24px"); // Promjena veličine fonta padajućeg izbornika

        // Popunjavanje padajućeg izbornika sa imenima država iz podataka
        var countries = data.map(function(d) { return d.State; });
        countries.forEach(function(country) {
            countrySelect.append("option").text(country).attr("value", country);
        });
    
        // Inicijalno prikazivanje pie chart-a za Austriju
        updatePieChart("Austria");
    
        // Event listener za promjenu izbora države
        countrySelect.on("change", function() {
            var selectedCountry = d3.select(this).property("value");
            
            if (selectedCountry !== "Odaberite državu...") {
                updatePieChart(selectedCountry);
            }
        });
    
        // Funkcija za ažuriranje pie chart-a na temelju odabrane države
        function updatePieChart(country) {
            var selectedData = data.find(function(d) { return d.State === country; });
    
            if (selectedData) {
                var malePercentage = parseFloat(selectedData.Male.replace(',', '.').replace('%', ''));
                var femalePercentage = parseFloat(selectedData.Female.replace(',', '.').replace('%', ''));
    
                var pieData = [
                    { label: "Muškarci", percentage: malePercentage },
                    { label: "Žene", percentage: femalePercentage }
                ];
    
                var width = 800;
                var height = 600;
                var radius = Math.min(width, height) / 2;
    
                var color = d3.scaleOrdinal()
                    .domain(pieData.map(function(d) { return d.label; }))
                    .range(["#2196F3", "#FFC107"]);
    
                var svg = d3.select("#genderPieChart")
                    .html("") // Očisti sadržaj prije crtanja novog pie chart-a
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .append("g")
                    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    
                svg.append("text")
                    .attr("x", 0)
                    .attr("y", -height / 2 - 20) // Prilagođavanje vertikalnog položaja naslova
                    .attr("text-anchor", "middle")
                    .attr("class", "chart-title")
                    .text("Postoci muških i ženskih donora");
    
                var pie = d3.pie()
                    .value(function(d) { return d.percentage; });
    
                var arc = d3.arc()
                    .innerRadius(0)
                    .outerRadius(radius);
    
                var arcs = svg.selectAll("arc")
                    .data(pie(pieData))
                    .enter()
                    .append("g")
                    .attr("class", "arc");
    
                arcs.append("path")
                    .attr("d", arc)
                    .attr("fill", function(d) { return color(d.data.label); });
    
                arcs.append("text")
                    .attr("transform", function(d) {
                        var centroid = arc.centroid(d);
                        return "translate(" + centroid[0] + "," + centroid[1] + ")";
                    })
                    .attr("text-anchor", "middle")
                    .text(function(d) { return d.data.label + " (" + d.data.percentage + "%)"; });
            }
        }
    });
    

});




