$(document).ready(function() {
    // Load tasks from localStorage on page load
    loadTasks();

  
     
    // ... (remaining code remains unchanged)
    
    // Add task event
    $('#addTaskBtn').click(function() {
        addTask();
    });

    // Enter key press event
    $('#taskInput, #startDateInput, #dueDateInput').keypress(function(event) {
        if (event.which === 13) {
            addTask();
        }
    });

       // ... (remaining code remains unchanged)

    // Task completion event
    $('#taskList').on('click', '.complete-btn', function(event) {
        event.stopPropagation(); // Prevent task completion when clicking complete button
        var taskItem = $(this).parent();
        taskItem.toggleClass('completed');
        updateTaskButton(taskItem);

        // Remove the task item after a brief delay if it's completed
        if (taskItem.hasClass('completed')) {
            setTimeout(function() {
                taskItem.remove();
                saveTasks();
            }, 500); // Adjust the delay (in milliseconds) as needed
        } else {
            saveTasks();
        }
    })

    // Add task button click event
    $('#taskList').on('click', '.complete-btn', function(event) {
        event.stopPropagation(); // Prevent task completion when clicking complete button
        var taskItem = $(this).parent();
        taskItem.toggleClass('completed');
        updateTaskButton(taskItem);
        saveTasks();
    });

   // Add task function
function addTask() {
    var taskText = $('#taskInput').val();
    var startDate = $('#startDateInput').val();
    var dueDate = $('#dueDateInput').val();

    if (taskText.trim() !== '' && startDate !== '' && dueDate !== '') {
        var taskItem = $('<li>').text(taskText + ' - Start: ' + startDate + ' - Due: ' + dueDate);
        var completeBtn = $('<button class="complete-btn">Complete</button>');
        taskItem.append(completeBtn);

        // Check if due date is in the past
        var currentDate = new Date().toISOString().split('T')[0];
        if (dueDate < currentDate) {
            taskItem.addClass('past-due-date');
        }
        else {
            taskItem.addClass('future-due-date');
        }

        $('#taskList').append(taskItem);
        $('#taskInput').val('');
        $('#startDateInput').val('');
        $('#dueDateInput').val('');
        saveTasks();
    }
}

// Load tasks function
function loadTasks() {
    var storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        var tasks = JSON.parse(storedTasks);
        tasks.forEach(function(task) {
            var taskItem = $('<li>').text(task.text);
            if (task.completed) {
                taskItem.addClass('completed');
            }

            // Extract due date from task text
            var dueDate = task.text.split('- Due: ')[1].trim();

            // Check if due date is in the past
            var currentDate = new Date().toISOString().split('T')[0];
            if (dueDate < currentDate) {
                taskItem.addClass('past-due-date');
            }
            else {
                
                    taskItem.addClass('future-due-date');
            }
            

            var completeBtn = $('<button class="complete-btn">Complete</button>');
            taskItem.append(completeBtn);

            $('#taskList').append(taskItem);
            updateTaskButton(taskItem);
        });
    }
}

    // Function to update task button
    function updateTaskButton(taskItem) {
        var completeBtn = taskItem.find('.complete-btn');
        if (taskItem.hasClass('completed')) {
            completeBtn.text('Completed').css('background-color', 'green');
        } else {
            completeBtn.text('Complete').css('background-color', '');
        }

        // If the task is completed, remove the task item after a brief delay
        if (taskItem.hasClass('completed')) {
            setTimeout(function() {
                taskItem.remove();
                saveTasks();
            }, 500); // Adjust the delay (in milliseconds) as needed
        }
    }

    // Function to save tasks to localStorage
    function saveTasks() {
        var tasks = [];
        $('#taskList li').each(function() {
            var taskText = $(this).clone().children('.complete-btn').remove().end().text().trim();
            var isCompleted = $(this).hasClass('completed');
            tasks.push({ text: taskText, completed: isCompleted });
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

   

    // Array of motivational quotes
    var quotes = [
        { text: "Your only limit is your mind.", author: "Unknown" },
        { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
        { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
        // Add more quotes as needed
    ];

    // Function to display a random quote
    function displayRandomQuote() {
        var randomIndex = Math.floor(Math.random() * quotes.length);
        var randomQuote = quotes[randomIndex];
        $('.quote-text').text('"' + randomQuote.text + '"');
        $('.quote-author').text('- ' + randomQuote.author);
    }

    // Display a random quote on page load
    displayRandomQuote();

});
