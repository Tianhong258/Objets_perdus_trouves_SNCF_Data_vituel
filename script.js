document.addEventListener("DOMContentLoaded", function() {
    const landingTitle = document.querySelector('.landing h1');

    // Get today's date and format it as YYYY/MM/DD
    const today = new Date();
    const formattedDate = `${today.getFullYear()}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getDate().toString().padStart(2, '0')}`;

    // Construct the API URL with the dynamically generated date
    const apiUrl = `https://ressources.data.sncf.com/api/explore/v2.1/catalog/datasets/objets-trouves-gares/records?limit=1&refine=date%3A%22${formattedDate}%22`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const totalCount = data.total_count; // Retrieve the total count from the API response

            // Update the text content of the first h1 tag with the total count
            landingTitle.textContent = `Aujourd'hui, ${totalCount} objets ont été perdus sur le réseau SNCF`;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            landingTitle.textContent = `Aujourd'hui, ??? objets ont été perdus sur le réseau SNCF`;
        });
});