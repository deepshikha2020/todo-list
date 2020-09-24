var myTasks = JSON.parse(localStorage.getItem('storeTask')) || [] ;

/*const myTasks = {
    name: 'myTasks',
    status: 'parentElem',
}
JSON.parse(localStorage.getItem('myTasks'));


[
	{
		name: 'Task1',
		status: false
	},
	{
		name: 'Task2',
		status: true
	},
	{
		name: 'Task3',
		status: false
	}
]
*/

const displayTasks = () => {
	for (const task of myTasks) {
		displayTask(task);
	}
}

const displayTask = (data) => {
	const list = document.createElement('li');
	const textNode = document.createTextNode(data);
	
	var cb = document.createElement('input');
    cb.type = 'checkbox';
	cb.className='task-mark-complete';
	cb.addEventListener('click',check);
    list.appendChild(cb);
	list.appendChild(textNode);
	taskListUl.appendChild(list);
	userInput.value = '';
	
	
};

const removeTask = () => {
	const completedTasks = document.getElementsByClassName('completed-task');
	for(const task of completedTasks){
		task.remove();
	}
}

const check = (event) => {
	const parentElem = event.target.parentElement;
	if(event.target.checked){
		parentElem.className = 'completed-task';
	}else{
		parentElem.className = '';
	}
};

const addOnEnter = (event) => {
	if ( event.keyCode === 13) {
		const data = userInput.value;
		myTasks.push(data);
		displayTask(data);
		localStorage.setItem('storeTask', JSON.stringify(myTasks));
	}
};

addButton.addEventListener('click', () => {
	const data = userInput.value;
	myTasks.push(data);
	displayTask(data);
	localStorage.setItem('storeTask', JSON.stringify(myTasks));
});

deleteButton.addEventListener('click',removeTask);
userInput.addEventListener("keyup", addOnEnter);

displayTasks();