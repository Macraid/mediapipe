document.addEventListener('DOMContentLoaded', () => {
    const labels = document.querySelectorAll('.label');
    const cells = document.querySelectorAll('.seating-chart td');

    let draggedLabel = null;

    // --- Event listeners for draggable labels ---

    labels.forEach(label => {
        // When dragging starts
        label.addEventListener('dragstart', (e) => {
            draggedLabel = e.target;
            e.dataTransfer.setData('text/plain', e.target.id);
            setTimeout(() => {
                e.target.classList.add('dragging');
            }, 0);
        });

        // When dragging ends
        label.addEventListener('dragend', (e) => {
            e.target.classList.remove('dragging');
        });
    });

    // --- Event listeners for drop target cells ---

    cells.forEach(cell => {
        // When a draggable element enters the drop target
        cell.addEventListener('dragover', (e) => {
            e.preventDefault(); // Necessary to allow dropping
            e.target.classList.add('drag-over');
        });

        // When a draggable element leaves the drop target
        cell.addEventListener('dragleave', (e) => {
            e.target.classList.remove('drag-over');
        });

        // When a draggable element is dropped on the target
        cell.addEventListener('drop', (e) => {
            e.preventDefault();
            e.target.classList.remove('drag-over');

            // Prevent dropping on a cell that already has a label
            if (e.target.children.length === 0) {
                e.target.appendChild(draggedLabel);
            }
        });
    });

    // Allow labels to be dropped back into the "labels" container
    const labelsContainer = document.querySelector('.labels');
    labelsContainer.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    labelsContainer.addEventListener('drop', (e) => {
        e.preventDefault();
        if (draggedLabel) {
            labelsContainer.appendChild(draggedLabel);
        }
    });
});