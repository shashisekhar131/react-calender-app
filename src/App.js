import { startOfMonth, endOfMonth, differenceInDays } from "date-fns";
import { useState } from "react";

function App() {
  const [currentDate, setCurrentDate] = useState(new Date("jan 2 2022"));
  const [showForm, setShowForm] = useState(false);

  const [data, setData] = useState([]);
  console.log(data);
  const [input, setInput] = useState();

  // startOfMonth() takes a date and gives start date of that month
  const startDate = startOfMonth(currentDate);
  const endDate = endOfMonth(currentDate);
  const numDays = differenceInDays(endDate, startDate) + 1;

  // .getDay() gives the index of or we can say day of start date
  const prefixDays = startDate.getDay();

  var prefixList = [];
  for (let i = 1; i <= prefixDays; i++) prefixList.push(<div className="grid-item"></div>);

  var datesList = [];

  for (let i = 1; i <= numDays; i++)
    datesList.push(
      <div className="grid-item" onClick={(e) => dateSelected(i)}>
        {i}{" "}
        <button className="add-btn" onClick={displayForm}>
          +
        </button>
      </div>
    );

  function displayForm() {
    setShowForm(true);
  }
  function dateSelected(i) {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
  }
  function displayNextMonth() {
    // new Date("jan 2023 1") gives date for jan 1 2023
    // new Date(.getFullYear(),month()+1,1) gives date of next month becuase +1 to month
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);

    setCurrentDate(nextMonth);
  }

  function displayPreviousMonth() {
    const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    setCurrentDate(previousMonth);
  }

  function displayNextYear() {
    const nextYear = new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), 1);
    setCurrentDate(nextYear);
  }
  function displayPreviousYear() {
    const previousYear = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1);
    setCurrentDate(previousYear);
  }

  function todayHandler() {
    setCurrentDate(new Date());
  }

  function saveHandler(e) {
    e.preventDefault();
    setData((prevData) => {
      return [...prevData, { date: currentDate, info: input }];
    });
    setInput("");
    setShowForm(false);
  }

  function deleteHandler(index) {
    setData((prevData) => {
      // Create a new array excluding the item at the specified index
      const newData = prevData.filter((item, i) => i !== index);
      return newData;
    });
  }

  return (
    <div className="App">
      <div className="app-container">
        <div className="calender-top">
          <h3>Date Selected:{currentDate.toLocaleDateString()}</h3>
          <button onClick={todayHandler}>Today</button>
        </div>
        <div className="grid-container">
          <div className="grid-item" onClick={displayPreviousYear}>
            {"<<"}
          </div>
          <div className="grid-item" onClick={displayPreviousMonth}>
            {"<"}
          </div>
          <div className="grid-item current-date">{currentDate.toLocaleString()}</div>
          <div className="grid-item" onClick={displayNextMonth}>
            {">"}
          </div>
          <div className="grid-item" onClick={displayNextYear}>
            {">>"}
          </div>
          <div className="grid-item">Sun</div>
          <div className="grid-item">Mon</div>
          <div className="grid-item">Tue</div>
          <div className="grid-item">Wed</div>
          <div className="grid-item">thu</div>
          <div className="grid-item">Fri</div>
          <div className="grid-item">Sat</div>
          {prefixList}
          {datesList}{" "}
        </div>

        {showForm ? (
          <div className="form-container">
            <div className="data-form">
              {" "}
              <span className="close-btn" onClick={(e) => setShowForm(false)}>
                X
              </span>
              <form>
                enter event:
                <br />
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
                <button className="save-btn" onClick={(e) => saveHandler(e)}>
                  save
                </button>
              </form>{" "}
            </div>
          </div>
        ) : null}

        <div className="events-section">
          <h1> Events </h1>
          {data.map((task, index) => (
            <div key={index}>
              <b>date:</b>
              {task.date && task.date instanceof Date ? task.date.toLocaleDateString() : ""}
              <span className="task-name">
                <b>event:</b>
                {task.info}
              </span>
              <button className="delete-btn" onClick={(e) => deleteHandler(index)}>
                delete{" "}
              </button>
            </div>
          ))}
          {data.length ? null : <h2>no events to display</h2>}
        </div>
      </div>
    </div>
  );
}

export default App;
