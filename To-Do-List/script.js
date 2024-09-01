const inputBar = document.querySelector('.input_bar');

const addTask = document.querySelector('.add_task');

const toDoListDiv = document.querySelector('.task_container_main');

const myArryData = JSON.parse(localStorage.getItem('myLocalData')) || [];

function renderTask() {

    toDoListDiv.innerHTML = '';

    myArryData.forEach((task, index) => {

        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task_div');

        const checkTaskDiv = document.createElement('div');
        checkTaskDiv.classList.add('check_task_div');

        const checkList = document.createElement('div');
        checkList.classList.add('check_list');
        checkList.innerHTML = `<i class="fa-solid fa-check"></i>`;
        if (task.completed) {
            checkList.classList.toggle('active');
        }

        const taskName = document.createElement('p');
        taskName.classList.add('task_name');
        taskName.innerText = task.item;
        if (task.completed) {
            taskName.classList.toggle('active');
        }

        const deleteTask = document.createElement('button');
        deleteTask.classList.add('delete_task');
        deleteTask.innerText = 'Delete';
        deleteTask.dataset.index = index;

        checkTaskDiv.appendChild(checkList);
        checkTaskDiv.appendChild(taskName);
        taskDiv.appendChild(checkTaskDiv);
        taskDiv.appendChild(deleteTask);

        toDoListDiv.appendChild(taskDiv);

        checkList.addEventListener('click', () => {
            console.log('clicked')
            checkList.classList.toggle('active');
            taskName.classList.toggle('active');
            task.completed = checkList.classList.contains('active');
            localStorage.setItem('myLocalData', JSON.stringify(myArryData));

        })

        deleteTask.addEventListener('click', (e) => {
            e.preventDefault();

            const index = e.currentTarget.dataset.index;
            myArryData.splice(index, 1);
            localStorage.setItem('myLocalData', JSON.stringify(myArryData));
            renderTask();
        })

    })
}



renderTask();

addTask.addEventListener('click', (e) => {
    e.preventDefault();

    const inputValue = inputBar.value.trim();
    inputBar.value = '';
    if (inputValue !== '') {
        if (myArryData.some((task) => task.item === inputValue)) {
            alert(`This task is alreay added`)

        } else {
            myArryData.push({ item: `${inputValue}`, completed: false });
            localStorage.setItem('myLocalData', JSON.stringify(myArryData));
            renderTask();
        }

    } else {
        alert(`Task can't be empty`)
    }

})

