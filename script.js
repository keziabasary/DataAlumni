document.getElementById('alumniForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const graduationYear = document.getElementById('graduationYear').value;
    const degree = document.getElementById('degree').value;

    const table = document.getElementById('alumniTable').getElementsByTagName('tbody')[0];
    const row = table.insertRow();
    
    const nameCell = row.insertCell(0);
    const yearCell = row.insertCell(1);
    const degreeCell = row.insertCell(2);
    const actionCell = row.insertCell(3);
    
    nameCell.innerHTML = name;
    yearCell.innerHTML = graduationYear;
    degreeCell.innerHTML = degree;

    const deleteButton = document.createElement('button');
    deleteButton.appendChild(document.createTextNode('Hapus'));
    deleteButton.addEventListener('click', function() {
        table.removeChild(row);
        updateChart();
    });
    actionCell.appendChild(deleteButton);

    updateChart();
    document.getElementById('alumniForm').reset();
});

function updateChart() {
    const table = document.getElementById('alumniTable').getElementsByTagName('tbody')[0];
    const rows = table.getElementsByTagName('tr');
    const yearCounts = {};

    for (let i = 0; i < rows.length; i++) {
        const year = rows[i].getElementsByTagName('td')[1].innerText;
        yearCounts[year] = (yearCounts[year] || 0) + 1;
    }

    const years = Object.keys(yearCounts);
    const counts = Object.values(yearCounts);

    const ctx = document.getElementById('alumniChart').getContext('2d');
    if (window.alumniChart) {
        window.alumniChart.destroy();
    }

    window.alumniChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: years,
            datasets: [{
                label: 'Jumlah Alumni',
                data: counts,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
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
