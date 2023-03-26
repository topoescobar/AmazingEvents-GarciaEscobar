const API_URL = "https://mindhub-xj03.onrender.com/api/amazing"
// const API_URL = "./scripts/amazing.json"

async function getData() {
    try{
      const response = await fetch(API_URL)
      const data = await response.json()

      const eventsArray = data.events
      const currentDate = data.currentDate

      const upcomingEvents = eventsArray.filter(event => event.date >= currentDate)
      console.log("upcoming events", upcomingEvents);
      const pastEvents = eventsArray.filter(event => event.date < currentDate)
      console.log("past events", pastEvents);
      const upcomingTable = document.getElementById("table_upcoming")
      const pastTable = document.getElementById("table_past")
      
      let categoryUpcom = statsByCategory(upcomingEvents)
      let categoryPast = statsByCategory(pastEvents)

      renderGeneralStats(pastEvents)
      renderTable(categoryUpcom, upcomingTable)
      renderTable(categoryPast, pastTable)

    }
    catch(error){
      console.log(error.message)
    }
}

getData()

function calcAttendancePercent(array){
  // console.log("array calc", array);
  let highestPercentage = 0
  let highestPercentageId
  let lowestPercentage = 100
  let lowestPercentageId
  let highestCapacity = 0
  let highestCapacityId
  array.forEach(event => {
    let assistanceStandard = event.assistance == undefined ? event.estimate : event.assistance
    event.attendancePercentage = (assistanceStandard / event.capacity)*100
     if (event.attendancePercentage > highestPercentage) {
      highestPercentage = event.attendancePercentage
      highestPercentageId = event._id
    } if (event.attendancePercentage < lowestPercentage) {
      lowestPercentage = event.attendancePercentage
      lowestPercentageId = event._id
    } if (event.capacity > highestCapacity) {
      highestCapacity = event.capacity
      highestCapacityId = event._id
    }
    // array.push(event.attendancePercentage)
    console.log("event", event);
    console.log("att perc", event.attendancePercentage);
  })
  return [highestPercentageId, lowestPercentageId, highestCapacityId]
 }

  function getEventName(id, array) {
    let eventName
    array.forEach(event =>{
      if (event._id == id){
        eventName = event.name
      }
    })
    return eventName
  }

  function getAttendancePercent(id, array) {
    let attendancePercById
    array.forEach(event=> {
      if(event._id == id) {
        attendancePercById = event.attendancePercentage
      }
    })
    return attendancePercById
  }

  function getEventCapacity(id, array){
    let capacityById
    array.forEach(event=>{
      if(event._id == id) {
        capacityById = event.capacity
      }
    })
    return capacityById
  }

  function renderGeneralStats(array){
    const [highestPercentageId, lowestPercentageId, highestCapacityId] = calcAttendancePercent(array) //PORQUE CALCULA Y PUSHEA attendancePercentage PARA TODOS LOS EVENTOS SI LE PASO EL ARRAY FILTRADO pastEvents? 
    // console.log("array pastevents de renderGeneralStats", array) // aca se ve el array filtrado con attendancePercentage incluso donde no hay objetos
    let highestPercent = getAttendancePercent(highestPercentageId,array)
    let highestName = getEventName(highestPercentageId, array)
    let lowestPercent = getAttendancePercent(lowestPercentageId, array)
    let lowestName = getEventName(lowestPercentageId, array)
    let lagerCapacityName = getEventName(highestCapacityId, array)
    let largerCapacity = getEventCapacity(highestCapacityId, array)

    const tableSummary = document.getElementById("table_Summary")
    tableSummary.innerHTML = `
    <tr>
      <td> ${highestName}: ${highestPercent.toFixed(2)}% </td>
      <td> ${lowestName}: ${lowestPercent}% </td>
      <td> ${lagerCapacityName}: ${largerCapacity} people </td>
    </tr>
    `
  }

function statsByCategory(array) {
  //array of existent categories
  let categories = Array.from (new Set(array.map((arr) => arr.category )))
  //array of objects grouped by category
  let eventCategories = categories.map(categ => array.filter(event=> event.category == categ))
  // console.log("categories", categories);
  // console.log("eventCategories", eventCategories);
  let result = eventCategories.map(eventCat => {
    let calculate = eventCat.reduce((acc, event) => {
      let assistanceStandard = event.assistance == undefined ? event.estimate : event.assistance
      // console.log("event:",event)
      acc.categoryName = event.category; //reemplaza no acumula
      // console.log("acc.category", acc.category);
      acc.revenues += event.price * assistanceStandard
      // console.log("acc.revenues",acc.revenues);
      acc.attendance += assistanceStandard * 100 / event.capacity
      // console.log("acc.attendance", acc.attendance);
      // console.log("att percent", event.attendancePercentage);
      return acc
    }, {
      categoryName: "",
      revenues: 0,
      attendance: 0
    })
    calculate.attendance = calculate.attendance / eventCat.length
    // console.log("calculate", calculate)
    return calculate
  })
  // Array de categorias
  // console.log("result",result) 
  return result 
}

function renderTable(array,tableName) {
  let tableRows = ""
  array.forEach(category=>{
    tableRows += `
    <tr>
      <td> ${category.categoryName} </td>
      <td> $ ${category.revenues} </td>
      <td> ${category.attendance.toFixed(2)} % </td>
    </tr>
    `
  })
  tableName.innerHTML = tableRows
}




// function calculateIncome(array){
//   let events = array
//     const initialValue = 0;
//     const totalIncome = events.reduce(
//       (accumulator, currentValue) => {
//         priceEvent = currentValue.price
//         console.log("price: ", priceEvent)
//         assistanceEvent = currentValue.assistance
//         console.log("asistencia: ", assistanceEvent);
//         estimatedAssistance = currentValue.estimate
//         console.log("asisitencia estimada", estimatedAssistance);
    
//         if (assistanceEvent == undefined){
//           eventIncome = priceEvent * estimatedAssistance
//         }else {
//           eventIncome = priceEvent * assistanceEvent
//         }
    
//         console.log("ingreso de evento: ",currentValue.name ,eventIncome);
    
//         return accumulator = accumulator + eventIncome
//       },
//       initialValue
//     )
//     console.log('Ingreso total: ', totalIncome);
// }

