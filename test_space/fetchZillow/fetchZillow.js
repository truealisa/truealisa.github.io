const endpoint = 'http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz18yn3x1y5fv_5cfwc';
const searchForm = document.querySelector('.search-form');
const results = document.querySelector('.results');
const errorNotification = document.querySelector('#error');
const addressPrefix = '&address=';
const citystatezipPrefix = '&citystatezip=';
const proxyurl = "https://cors-anywhere.herokuapp.com/";
let zestimate, lastUpdated, valueChange, valuationRangeHigh, valuationRangeLow, percentile, error;

function submit(e) {
    e.preventDefault();
    errorNotification.classList.add('hidden');
    error = 0;
    let address = searchForm.querySelector('#address').value;
    let city = searchForm.querySelector('#city').value;
    let state = searchForm.querySelector('#state').value;
    let zip = searchForm.querySelector('#zip').value;
    //create query url
    let queryURL = proxyurl + endpoint + addressPrefix + encodeURIComponent(address) + citystatezipPrefix + encodeURIComponent(city + ', ' + state + ' ' + zip);
    //make XMLHttpRequest
    makeRequest(queryURL);
}

function makeRequest(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send();
    if (xhr.status != 200) {
        error = "XMLHttpRequest error";
        displayResults();
        return;
    } else {
        requestResult = (new window.DOMParser()).parseFromString(xhr.responseText, "text/xml");
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
            zestimate = '$' + requestResult.querySelector("amount").innerHTML;
            lastUpdated = requestResult.querySelector("last-updated").innerHTML;
            valueChange = '$' + requestResult.querySelector("valueChange").innerHTML;
            valuationRangeHigh = '$' + requestResult.querySelector("high").innerHTML;
            valuationRangeLow = '$' + requestResult.querySelector("low").innerHTML;
            percentile = requestResult.querySelector("percentile").innerHTML;
        }
    }
    //display results
    displayResults();
}

function displayResults() {
    if (!error) {
        //remove form
        searchForm.classList.add("hidden");
        //display results
        results.querySelector('#results-address').innerHTML = address.value;
        results.querySelector('#results-citystatezip').innerHTML = city.value + ', ' + state.value + ' ' + zip.value;
        results.querySelector('#zestimate').innerHTML = zestimate;
        results.querySelector('#last-updated').innerHTML = lastUpdated;
        results.querySelector('#value-change').innerHTML = valueChange;
        results.querySelector('#valuation-range-high').innerHTML = valuationRangeHigh;
        results.querySelector('#valuation-range-low').innerHTML = valuationRangeLow;
        results.querySelector('#percentile').innerHTML = percentile;
        results.classList.add("displayed");
        //clear form
        searchForm.reset();
    } else {
        //display error
        errorNotification.innerHTML = error;
        errorNotification.classList.remove('hidden');
    }
}

searchForm.addEventListener('submit', submit);
