// //variable
//  const ctx = document.getElementById('lostItemsPieChart');
 
//  //hetch data
// async function keepgraph() {
//   try {
//     let data = await fetch('https://ressources.data.sncf.com/api/explore/v2.1/catalog/datasets/objets-trouves-gares/records?select=COUNT(*)%20as%20value&where=name%20is%20not%20null&group_by=gc_obo_gare_origine_r_name%20as%20name&order_by=value%20DESC&limit=20')
//     if (data.ok) {
//       let recupdata = await data.json();
//       let dataCity = recupdata.results;
//       return dataCity;
//     } else {
//       throw new Error('Erreur :' + error);
//     }
//   } catch (error) {
//     console.error(Error);
//     return null; // Or handle the error as needed
//   }
// }

// //test
// async function loopData() {
//   try {
//     // Fetch data and get labels and values
//     const getData = await keepgraph();
//     let labels = [];
//     let data = [];
    
//     for (let i = 0; i < getData.length; i++) {
//       const name = getData[i].name;
//       const value = getData[i].value;
//       labels.push(name);
//       data.push(value);
//       console.log(name, value);
//     }

//     // Create Chart.js chart using retrieved labels and values
//     new Chart(ctx, {
//       type: 'pie',
//       data: {
//         labels: labels, // Use retrieved labels
//         datasets: [{
//           label: '# of Objects',
//           data: data, // Use retrieved values
//           borderWidth: 4,
//           backgroundColor :['#e6194b', '#3cb44b', '#ffe119',
//            '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6',
//             '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324',
//              '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1',
//               '#000075', '#808080', '#ffffff', '#000000']
//         }]
//       },
//       options: {
//         scales: {
//           y: {
//             beginAtZero: true
//           }
//         }
//       }
//     });

//     const legend = {
//       display: false
//     }

//   } catch (error) {
//     console.error('Error:', error);
//   }
// }
// loopData();

// //variable
// const ctx2 = document.getElementById('lostItemsCategories');
// //hetch data
// async function keepgraph() {
//  try {
//    let data = await fetch('https://ressources.data.sncf.com/api/explore/v2.1/catalog/datasets/objets-trouves-gares/records?select=COUNT(*)%20as%20count&group_by=gc_obo_type_c%20as%20type&order_by=count%20DESC&limit=20&refine=date%3A%222023%22')
//    if (data.ok) {
//      let recupdata = await data.json();
//      let dataObject = recupdata.results;
//      return dataObject;
//    } else {
//      throw new Error('Erreur :' + error);
//    }
//  } catch (error) {
//    console.error(Error);
//    return null; // Or handle the error as needed
//  }
// }
// //test
// async function loopData() {
//  try {
//    // Fetch data and get labels and values
//    const getData = await keepgraph();
//    let labels = [];
//    let data = [];
//    for (let i = 0; i < getData.length; i++) {
//      const name = getData[i].type;
//      const value = getData[i].count;
//      labels.push(name);
//      data.push(value);
//      console.log(name, value);
//    }
//    // Create Chart.js chart using retrieved labels and values
//    new Chart(ctx2, {
//      type: 'bar',
//      data: {
//        labels: labels, // Use retrieved labels
//        datasets: [{
//          label: '# of Objects',
//          data: data, // Use retrieved values
//          borderWidth: 2,
//          backgroundColor :['#E6194B', '#3CB44B', '#FFE119',
//           '#4363D8', '#F58231', '#911EB4', '#46F0F0', '#F032E6',
//            '#BCF60C', '#FABEBE', '#008080', '#E6BEFF', '#9A6324',
//             '#FFFAC8', '#800000', '#AAFFC3', '#808000', '#FFD8B1',
//              '#000075', '#808080', '#FFFFFF', '#000000']
//        }]
//      },
//      options: {
//        scales: {
//          y: {
//            beginAtZero: true
//          }
//        }
//      }
//    });
//    const legend = {
//      display: false
//    }
//  } catch (error) {
//    console.error('Error:', error);
//  }
// }
// loopData();

// Fetch data function for Pie Chart
async function fetchDataForPieChart() {
  try {
    let data = await fetch('https://ressources.data.sncf.com/api/explore/v2.1/catalog/datasets/objets-trouves-gares/records?select=COUNT(*)%20as%20value&where=name%20is%20not%20null&group_by=gc_obo_gare_origine_r_name%20as%20name&order_by=value%20DESC&limit=20');
    if (data.ok) {
      let recupdata = await data.json();
      let dataCity = recupdata.results;
      return dataCity;
    } else {
      throw new Error('Error fetching data: ' + error);
    }
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

// Fetch data function for Bar Chart
async function fetchDataForBarChart() {
  try {
    let data = await fetch('https://ressources.data.sncf.com/api/explore/v2.1/catalog/datasets/objets-trouves-gares/records?select=COUNT(*)%20as%20count&group_by=gc_obo_type_c%20as%20type&order_by=count%20DESC&limit=20&refine=date%3A%222023%22');
    if (data.ok) {
      let recupdata = await data.json();
      let dataObject = recupdata.results;
      return dataObject;
    } else {
      throw new Error('Error fetching data: ' + error);
    }
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

// Render Pie Chart
async function renderPieChart() {
  try {
    const ctx = document.getElementById('lostItemsPieChart');
    const data = await fetchDataForPieChart();

    if (data) {
      let labels = [];
      let values = [];

      data.forEach(item => {
        labels.push(item.name);
        values.push(item.value);
      });

      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            label: '# of Objects',
            data: values,
            borderWidth: 4,
            backgroundColor: ['#e6194b', '#3cb44b', '#ffe119',
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
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Render Bar Chart
async function renderBarChart() {
  try {
    const ctx = document.getElementById('lostItemsCategories');
    const data = await fetchDataForBarChart();

    if (data) {
      let labels = [];
      let values = [];

      data.forEach(item => {
        labels.push(item.type);
        values.push(item.count);
      });

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: '# of Objects',
            data: values,
            borderWidth: 2,
            backgroundColor: ['#E6194B', '#3CB44B', '#FFE119', /*... add more colors if needed ... */]
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
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Call the functions to render charts
renderPieChart();
renderBarChart();
