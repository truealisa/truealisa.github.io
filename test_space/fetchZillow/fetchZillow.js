const endpoint = 'http://www.zillow.com/webservice/';
const getSearchResultsPrefix = 'GetSearchResults.htm?';
const getCompsPrefix = 'GetComps.htm?';
const zwsid = "zws-id=X1-ZWz18yn3x1y5fv_5cfwc";
const addressPrefix = '&address=';
const citystatezipPrefix = '&citystatezip=';
const proxyurl = "https://cors-anywhere.herokuapp.com/";
const searchForm = document.querySelector('.search-form');
const results = document.querySelector('.results');
const notification = document.querySelector('#notification');
const submitButton = document.querySelector('button');
let zestimate, lastUpdated, valueChange, valuationRangeHigh, valuationRangeLow, zpidAndCount, error;
let comparables = [];

function submit(e) {
    e.preventDefault();
    notification.classList.add('hidden');
    submitButton.disabled = true;
    submitButton.textContent = 'Loading...';
    error = 0;
    let address = searchForm.querySelector('#address').value;
    let city = searchForm.querySelector('#city').value;
    let state = searchForm.querySelector('#state').value;
    let zip = searchForm.querySelector('#zip').value;
    //create query url
    let getSearchResultsURL = proxyurl + endpoint + getSearchResultsPrefix + zwsid + addressPrefix + encodeURIComponent(address) + citystatezipPrefix + encodeURIComponent(city + ', ' + state + ' ' + zip);
    //make XMLHttpRequest
    getSearchResults(getSearchResultsURL);
}

function getSearchResults(url) {
    var getSearchResultsXHR = new XMLHttpRequest();
    getSearchResultsXHR.open('GET', url, false);
    getSearchResultsXHR.send();
    if (getSearchResultsXHR.status != 200) {
        error = "XMLHttpRequest error";
        displayResults();
        return;
    } else {
        requestResult = (new window.DOMParser()).parseFromString(getSearchResultsXHR.responseText, "text/xml");
        if (parseInt(requestResult.querySelector("code").innerHTML) !== 0) {
            if (parseInt(requestResult.querySelector("code").innerHTML) === 508) {
                error = "No match found. This address is not found in Zillow database";
                displayResults();
                return;
            } else {
                error = "Zillow API is not unavailable. Try again later";
                displayResults();
                return;
            }
        } else {
            zestimate = '$' + requestResult.querySelector("amount").innerHTML + " " + requestResult.querySelector("amount").attributes.currency.value;
            lastUpdated = requestResult.querySelector("last-updated").innerHTML;
            valueChange = '$' + requestResult.querySelector("valueChange").innerHTML + " " + requestResult.querySelector("valueChange").attributes.currency.value;
            valuationRangeHigh = '$' + requestResult.querySelector("high").innerHTML + " " + requestResult.querySelector("high").attributes.currency.value;
            valuationRangeLow = '$' + requestResult.querySelector("low").innerHTML + " " + requestResult.querySelector("low").attributes.currency.value;
            //create string for getComps API request:
            zpidAndCount = '&zpid=' + requestResult.querySelector("zpid").innerHTML + '&count=10';
            const getCompsURL = proxyurl + endpoint + getCompsPrefix + zwsid + zpidAndCount; 

            getComps(getCompsURL);
        }
    }
    //display results
    displayResults();
}

function getComps(url) {
    var getCompsXHR = new XMLHttpRequest();
    getCompsXHR.open('GET', url, false);
    getCompsXHR.send();
    if (getCompsXHR.status != 200) {
        error = "XMLHttpRequest error";
        displayResults();
        return;
    } else {
        requestResult = (new window.DOMParser()).parseFromString(getCompsXHR.responseText, "text/xml");
        if (parseInt(requestResult.querySelector("code").innerHTML) !== 0) {
            if (parseInt(requestResult.querySelector("code").innerHTML) === 504) {
                error = "There were no comparables for the property you specified";
                displayResults();
                return;
            } else {
                error = "Zillow API is not unavailable. Try again later";
                displayResults();
                return;
            }
        } else {
            //display list of comps
            comparables = requestResult.querySelectorAll('comp');
            comparablesArray = Array.prototype.slice.call(comparables);
        }
    }
}

function displayResults() {
    if (!error) {
        //remove form
        searchForm.classList.add("hidden");
        //display main results
        results.querySelector('#results-address').innerHTML = address.value;
        results.querySelector('#results-citystatezip').innerHTML = city.value + ', ' + state.value + ' ' + zip.value;
        results.querySelector('#zestimate').innerHTML = numberWithCommas(zestimate);
        results.querySelector('#last-updated').innerHTML = lastUpdated;
        results.querySelector('#value-change').innerHTML = numberWithCommas(valueChange);
        results.querySelector('#valuation-range-high').innerHTML = numberWithCommas(valuationRangeHigh);
        results.querySelector('#valuation-range-low').innerHTML = numberWithCommas(valuationRangeLow);

        //display comparables list
        comparablesArray.forEach(comparable => {
            var newLi = document.createElement("li");
            newLi.innerHTML = `<span>`
                            + comparable.children[2].children[0].textContent + '<br>' 
                            + comparable.children[2].children[2].textContent + ', '  
                            + comparable.children[2].children[3].textContent + ' '  
                            + comparable.children[2].children[1].textContent + `</span>` + '<br>'
                            + 'Zestimate (in $): ' + numberWithCommas(comparable.children[3].children[0].textContent) + ' ' + comparable.children[3].children[0].attributes[0].textContent;
            results.querySelector("#comparables").appendChild(newLi);
            console.log(comparable);
        });

        results.classList.add("displayed");
        //clear form
        searchForm.reset();
    } else {
        //display error
        notification.innerHTML = error;
        submitButton.disabled = false;
        submitButton.textContent = 'Submit';
        notification.classList.add('error');
        notification.classList.remove('hidden');
    }
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

searchForm.addEventListener('submit', submit);
