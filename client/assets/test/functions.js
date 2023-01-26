
function increaseCount() {
    return 1
}

function updateProgress(questionNum) {
    progressBarFill.style.width = (questionNum * (0.2 * 100)) + '%';
    progressBarFill.textContent = ((`${counterQ}/${fLength}`))
  }


if (typeof exports !== 'undefined') {
    module.exports = {
        increaseCount,
        updateProgress
    };
}
