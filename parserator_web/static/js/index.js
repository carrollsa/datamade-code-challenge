'use strict'

function parseSuccess(data) {
    
    // Hide error and display results on successful api call
    document.getElementById('error-results').style = "display: none"
    document.getElementById('address-results').style = "display: block"

    // Select elements to update
    var existingTable = document.querySelector('table.table tbody')
    var addressTypeSpan = document.getElementById('parse-type')

    // Render address type
    addressTypeSpan.innerText = data.address_type

    // Generate and append address components to existing table 
    let extendedTable = generateExtendedTable(data.address_components)
    existingTable.parentNode.replaceChild(extendedTable, existingTable)
}

function generateExtendedTable(data) {
    let extendedTable = document.createElement('tbody')
    for (const [key, value] of Object.entries(data)) {
        let newRow = generateTableRow(key, value)
        extendedTable.appendChild(newRow)
    }

    return extendedTable
}

function generateTableRow(key, value) {
    let newRow = document.createElement('tr')
    let keyCell = document.createElement('td')
    let valueCell = document.createElement('td')

    keyCell.appendChild(document.createTextNode(key))
    valueCell.append(document.createTextNode(value))
    newRow.appendChild(keyCell)
    newRow.appendChild(valueCell)

    return newRow
}

function parseFailure(errorResponse) {
    // Hide previous results
    document.getElementById('address-results').style = "display: none"
    
    var errorDiv = document.getElementById('error-results')

    // Display error response
    errorDiv.style = "display: block"
    errorDiv.innerHTML = errorResponse
}

document.getElementById('submit').addEventListener('click', function(event) {

    event.preventDefault()

    const api = ('/api/parse?')
    const inputString = document.getElementById('address').value

    if(inputString) {
        return fetch(api + new URLSearchParams({
            address: inputString
        }))
            .then(async (res) => {
                if (res.ok) {
                    return await res.json()
                } else {
                    throw ((await res.json()).detail)
                }
            }) 
            .then((data) => parseSuccess(data))
            .catch((e) => parseFailure(e))
    }
})