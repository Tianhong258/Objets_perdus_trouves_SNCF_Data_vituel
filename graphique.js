//variable
 const ctx = document.getElementById('myChart');
 
 //hetch data
async function keepgraph() {
  try {
    let data = await fetch('https://ressources.data.sncf.com/api/explore/v2.1/catalog/datasets/objets-trouves-gares/records?select=COUNT(*)%20as%20value&where=name%20is%20not%20null&group_by=gc_obo_gare_origine_r_name%20as%20name&order_by=value%20DESC&limit=20')
    if (data.ok) {
      let recupdata = await data.json();
      let dataCity = recupdata.results;
      return dataCity;
    } else {
      throw new Error('Erreur :' + error);
    }
  } catch (error) {
    console.error(Error);
    return null; // Or handle the error as needed
  }
}

//test
async function loopData() {
  try {
    // Fetch data and get labels and values
    const getData = await keepgraph();
    let labels = [];
    let data = [];
    
    for (let i = 0; i < getData.length; i++) {
      const name = getData[i].name;
      const value = getData[i].value;
      labels.push(name);
      data.push(value);
      console.log(name, value);
    }

    // Create Chart.js chart using retrieved labels and values
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels, // Use retrieved labels
        datasets: [{
          label: '# of Objects',
          data: data, // Use retrieved values
          borderWidth: 4,
          backgroundColor :['#e6194b', '#3cb44b', '#ffe119',
           '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6',
            '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324',
             '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1',
              '#000075', '#808080', '#ffffff', '#000000']
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    const legend = {
      display: false
    }

  } catch (error) {
    console.error('Error:', error);
  }
}
loopData();