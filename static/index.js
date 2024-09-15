function confirmSubmission(event) {
  var form = event.target;
  if (!confirm('Are you sure you want to submit the form?')) {
    event.preventDefault(); // Prevent form submission
  }
}