function getTodaysDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

function updateItemCount(elementId, count) {
    document.getElementById(elementId).textContent = count;
}

function fetchItemsData(url, elementId, countField) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const itemCount = data[countField] || 0;
            updateItemCount(elementId, itemCount);
        })
        .catch(error => {
            console.log(`Error fetching ${elementId} data:`, error);
        });
}

document.addEventListener('DOMContentLoaded', function() {
    const todayDate = getTodaysDate();
    const formattedDate = encodeURIComponent(todayDate); // Encoding the date for URL usage

    const lostItemsUrl = `https://ressources.data.sncf.com/api/explore/v2.1/catalog/datasets/objets-trouves-gares/records?limit=1&refine=date%3A%22${formattedDate}%22`;
    const returnedItemsUrl = `https://ressources.data.sncf.com/api/explore/v2.1/catalog/datasets/objets-trouves-restitution/records?limit=1&refine=date%3A%222023%22&refine=gc_obo_date_heure_restitution_c%3A%22${formattedDate}%22`;

    fetchItemsData(lostItemsUrl, 'totalLost', 'total_count');
    fetchItemsData(returnedItemsUrl, 'totalReturned', 'total_count');
});

function sum(number){
    let sum = 0
    //console.log(number)
    for (i=0; i<number.results.length; i++){
        sum += number.results[i].count
    }
    return sum
} //calculer les objets totals

async function percentageSixMonths(){
    let resultSumLost
    let resultSumFined
    await fetch("https://ressources.data.sncf.com/api/explore/v2.1/catalog/datasets/objets-trouves-gares/records?select=COUNT(*)%20as%20count&group_by=RANGE(date%2C%201%20month)%20as%20date&order_by=date%20DESC&limit=6")
        .then(response => response.json())
        .then(data => {
            //console.log(data)
            resultSumLost = sum(data)
           //console.log(resultSumLost)
           return resultSumLost
        })
        .catch(error => {
            console.log(`Error fetching resultSumLost data:`, error);
        });
    await fetch("https://ressources.data.sncf.com/api/explore/v2.1/catalog/datasets/objets-trouves-restitution/records?select=COUNT(*)%20as%20count&group_by=RANGE(date%2C%201%20month)%20as%20date&order_by=date%20DESC&limit=6")
        .then(response => response.json())
        .then(data => {
            //console.log(data)
            resultSumFined = sum(data)
           //console.log(resultSumFined)
           return resultSumFined
        })
        .catch(error => {
            console.log(`Error fetching resultSumFined data:`, error);
        });
    let percentage = (resultSumFined/resultSumLost*100).toFixed(2)
    //console.log(percentage)
    document.getElementById("percentageSixMonths").innerHTML = percentage
    }
percentageSixMonths()