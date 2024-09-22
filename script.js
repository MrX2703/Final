let jsonData = {};

// Load the JSON file on page load
window.onload = async function() {
  try {
    const response = await fetch('data.json'); // Change 'data.json' to the path of your JSON file
    jsonData = await response.json();
    console.log('Data loaded:', jsonData);
  } catch (error) {
    console.error('Error loading JSON data:', error);
  }
};

// Function to find student by PNR
function findStudentByPNR(pnr) {
  return jsonData.Sheet1.find(student => student && student.Column2 == pnr);
}

// Function to render the result in HTML
function renderResult(student) {
  const resultDiv = document.getElementById('result');
  if (!student) {
    resultDiv.innerHTML = '<p>No student found with the given PNR.</p>';
    return;
  }

  let resultHTML = `
    <h2>Student Information</h2>
    <table id="result-table">
      <tr>
        <th>Student Name</th>
        <th>PNR</th>
        <th>Design & Analysis of Algorithms</th>
        <th>Operating Systems</th>
        <th>Basic Human Rights</th>
        <th>Probability and Statistics</th>
        <th>Digital Logic Design & Microprocessors</th>
        <th>Operating Systems & Python Lab</th>
        <th>Seminar-II</th>
        <th>SGPA</th>
      </tr>
      <tr>
        <td>${student.Column3}</td>
        <td>${student.Column2}</td>
        <td>${student.Column9}</td>
        <td>${student.Column16}</td>
        <td>${student.Column23}</td>
        <td>${student.Column30}</td>
        <td>${student.Column37}</td>
        <td>${student.Column42}</td>
        <td>${student.Column47}</td>
        <td>${student.Column50}</td>
      </tr>
    </table>
    <button id="download-pdf">Download PDF</button>
  `;

  resultDiv.innerHTML = resultHTML;

  // Add PDF download functionality
  document.getElementById('download-pdf').addEventListener('click', () => {
    downloadPDF(student);
  });
}

// Function to download result as PDF
function downloadPDF(student) {
  const { jsPDF } = window.jspdf;

  const doc = new jsPDF();
  doc.text(20, 20, `Student Name: ${student.Column3}`);
  doc.text(20, 30, `PNR: ${student.Column2}`);
  doc.text(20, 40, `SGPA: ${student.Column50}`);

  doc.autoTable({
    startY: 50,
    head: [['Subject', 'Marks']],
    body: [
      ['Design & Analysis of Algorithms', student.Column9],
      ['Operating Systems', student.Column16],
      ['Basic Human Rights', student.Column23],
      ['Probability and Statistics', student.Column30],
      ['Digital Logic Design & Microprocessors', student.Column37],
      ['Operating Systems & Python Lab', student.Column42],
      ['Seminar-II', student.Column47]
    ]
  });

  doc.save(`${student.Column3}_Result.pdf`);
}

// Handle form submission
document.getElementById('search-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const pnr = document.getElementById('pnr').value;
  const student = findStudentByPNR(pnr);

  renderResult(student);
});
