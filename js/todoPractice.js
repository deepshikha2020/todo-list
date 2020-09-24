var myTasks = JSON.parse(localStorage.getItem('storedData')) || [];
var taskIndex = -1;

const displayTasks = (tasks) => {
	taskListUl.innerHTML = '';
	if (tasks.length === 0) {
		noTaskMessage();
	} else {
		taskListUl.classList.remove('list-unstyled');
		for (const task of tasks) {
			displayTask(task.task, task.status);
		}
	}
}

const noTaskMessage = () => {
	const list = document.createElement('li');
	list.className = 'text-center font-italic ';
	list.innerText = 'No Task Available';
	taskListUl.appendChild(list);
	taskListUl.classList.add('list-unstyled');
}

const displayTask = (data, status = false) => {
	const list = document.createElement('li');
	list.className = 'forHover border-bottom mt-2';
	const textNode = document.createTextNode(data);
	list.appendChild(textNode);
	if (status === true) {
		list.classList.add('text-removal-line');
	}
	taskListUl.appendChild(list);
	userInput.value = '';
	validateTaskText();
	const editText = document.createElement('input');
	editText.type = 'button';
	editText.className = 'editTxt bg-light font-weight-lighter';
	editText.value = 'EDIT';
	editText.addEventListener('click', edit);
	list.appendChild(editText);
	const label = document.createElement('label');
	label.className = 'custom-checkbox float-right';
	const cb = document.createElement('input');
	cb.type = 'checkbox';
	cb.className = 'task-mark-complete';
	cb.checked = status;
	cb.addEventListener('change', checkedTasks);
	const span = document.createElement('span');
	span.className = 'checkmark';
	label.appendChild(cb);
	label.appendChild(span);
	list.appendChild(label);
}


const edit = (event) => {
	addButton.value = "EDIT TASK";
	var parentElm = event.target.parentElement;
	taskIndex = Array.prototype.indexOf.call(taskListUl.childNodes, parentElm);
	userInput.value = parentElm.textContent;
	validateTaskText();
	userInput.focus();
}

const cancelTask = () => {
	addButton.value = "ADD TASK";
	taskIndex = -1;
	userInput.value = '';
	validateTaskText();
}

const checkedTasks = (event) => {
	const parentElm = event.target.parentElement.parentElement;
	const index = Array.prototype.indexOf.call(taskListUl.childNodes, parentElm);
	if (event.target.checked) {
		parentElm.classList.add('text-removal-line');
		myTasks[index].status = true;
	}
	else {
		parentElm.classList.remove('text-removal-line');
		myTasks[index].status = false;
	}
	localStorage.setItem('storedData', JSON.stringify(myTasks));
}

const removeCompletedTasks = () => {
	const tasks = document.getElementsByClassName('task-mark-complete');
	for (var i = tasks.length - 1; i >= 0; i--) {
		if (tasks[i].checked) {
			myTasks.splice(i, 1);
		}
	}
	displayTasks(myTasks);
	localStorage.setItem('storedData', JSON.stringify(myTasks));
	cancelTask();
}

const displayOnEnter = (event) => {
	if (event.keyCode === 13) {
		addUpdateTask();
	}
}

const addUpdateTask = () => {
	var data = userInput.value.replace(/^\s+|\s+$/gm, '');
	if (data !== '') {
		if (taskIndex === -1) {
			myTasks.push({
				task: data,
				status: false
			});
		} else {
			myTasks[taskIndex].task = data;
			taskIndex = -1;
			addButton.value = "ADD TASK";
		}

		displayTasks(myTasks);
		localStorage.setItem('storedData', JSON.stringify(myTasks));
	}
}

const validateTaskText = () => {
	var data = userInput.value.replace(/^\s+|\s+$/gm, '');
	if (data === '') {
		addButton.disabled = true;
	} else {
		addButton.disabled = false;
	}
}

userInput.addEventListener('input', validateTaskText);

addButton.addEventListener('click', addUpdateTask);

deleteButton.addEventListener('click', removeCompletedTasks);

cancleButton.addEventListener('click', cancelTask);

userInput.addEventListener("keyup", displayOnEnter);

displayTasks(myTasks);