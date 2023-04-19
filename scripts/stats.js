const API_URL = "https://mindhub-xj03.onrender.com/api/amazing"
// const API_URL = "./scripts/amazing.json"
const upcomingTable = document.getElementById("table_upcoming")
const pastTable = document.getElementById("table_past")

async function getData() {
    try{
      const response = await fetch(API_URL)
      const data = await response.json()

      const eventsArray = data.events
      const currentDate = data.currentDate
      const upcomingEvents = eventsArray.filter(event => event.date >= currentDate)
      const pastEvents = eventsArray.filter(event => event.date < currentDate)
      
      let categoryUpcom = statsByCategory(upcomingEvents)
      let categoryPast = statsByCategory(pastEvents)

      //PRIMERA TABLA eventos pasados resumen
      renderGeneralStats(pastEvents)
      //SEGUNDA TABLA eventos futuros por categoria
      renderByCategoryTable(categoryUpcom, upcomingTable)
      //TERCERA TABLA eventos pasados por categoria
      renderByCategoryTable(categoryPast, pastTable)

    }
    catch(error){
      console.log(error.message)
    }
}

getData()

 //getters
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

function calcAttendancePercent(array){
  let highestPercentage = 0
  let lowestPercentage = 100
  let highestCapacity = 0
  let highestPercentageId, lowestPercentageId, highestCapacityId
  array.forEach(event => {
    //estandarizo la asistencia sin importar si es evento pasado o futuro
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
  })
  return [highestPercentageId, lowestPercentageId, highestCapacityId]
 }

function statsByCategory(array) {
  calcAttendancePercent(array)
  //array de categorias existentes en el array pasado como parametro 
  let categories = Array.from (new Set(array.map((arr) => arr.category )))
  //array de objetos agrupados por categorias
  let eventCategories = categories.map(categ => array.filter(event=> event.category == categ))
  let result = eventCategories.map(eventCat => {
    let calculate = eventCat.reduce((acum, event) => {
      let assistanceStandard = event.assistance == undefined ? event.estimate : event.assistance
      acum.categoryName = event.category; //reemplaza no acumula
      acum.revenuesAccum += event.price * assistanceStandard
      acum.attendancePercentAccum += event.attendancePercentage
      return acum
    }, {
      categoryName: "",
      revenuesAccum: 0,
      attendancePercentAccum :0
    })
    calculate.attendance = calculate.attendancePercentAccum / eventCat.length
    return calculate
  })
  // Array de categorias
  console.log("result",result) 
  return result 
}

function renderGeneralStats(array){
  //destructuring para obtener las variables a pasar en las funciones siguientes
  const [highestPercentageId, lowestPercentageId, highestCapacityId] = calcAttendancePercent(array) 
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
//la misma funcion para las dos tablas
function renderByCategoryTable(array,tableName) {
  let tableRows = ""
  array.forEach(category=>{
    tableRows += `
    <tr>
      <td> ${category.categoryName} </td>
      <td> ${category.revenuesAccum} $ </td>
      <td> ${category.attendance.toFixed(2)} % </td>
    </tr>
    `
  })
  tableName.innerHTML = tableRows
}