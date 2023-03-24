const API_URL = "https://mindhub-xj03.onrender.com/api/amazing"
// let eventsArray 
// let pastEvents
// let upcomingEvents
// let currentDate

async function getData() {

    try{
      const response = await fetch(API_URL)
      const data = await response.json()

      const eventsArray = data.events
      const currentDate = data.currentDate

      const pastEvents = eventsArray.filter(event => event.date < currentDate)
      console.log("complete array",eventsArray)
      const upcomingEvents = eventsArray.filter(event => event.date >= currentDate)

      renderEventsStats(pastEvents) 
    }
    catch(error){
      console.log(error.message)
    }
}

getData()

function calcAttendancePercent(array){
  let highestPercentage = 0
  let highestPercentageId
  let lowestPercentage = 100
  let lowestPercentageId
  let highestCapacity = 0
  let highestCapacityId
  array.forEach(event => {
    if (event.assistance == undefined) {
      event.attendancePercentage = (event.estimate / event.capacity)*100
    } else {
      event.attendancePercentage = (event.assistance / event.capacity)*100
    } if (event.attendancePercentage > highestPercentage) {
      highestPercentage = event.attendancePercentage
      highestPercentageId = event._id
    } if (event.attendancePercentage < lowestPercentage) {
      lowestPercentage = event.attendancePercentage
      lowestPercentageId = event._id
    } if (event.capacity > highestCapacity) {
      highestCapacity = event.capacity
      highestCapacityId = event._id
    }
    array.push(event.attendancePercentage)
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

  function renderEventsStats(array){
    const [highestPercentageId, lowestPercentageId, highestCapacityId] = calcAttendancePercent(array) //PORQUE CALCULA Y PUSHEA attendancePercentage PARA TODOS LOS EVENTOS SI LE PASO EL ARRAY FILTRADO pastEvents? 
    console.log("array pastevents de renderEventsStats", array) // aca se ve el array filtrado con attendancePercentage incluso donde no hay objetos
    let highestPercent = getAttendancePercent(highestPercentageId,array)
    let highestName = getEventName(highestPercentageId, array)
    let lowestPercent = getAttendancePercent(lowestPercentageId, array)
    let lowestName = getEventName(lowestPercentageId, array)
    let lagerCapacityName = getEventName(highestCapacityId, array)
    let largerCapacity = getEventCapacity(highestCapacityId, array)

    const tableSummary = document.getElementById("table_Summary")
    tableSummary.innerHTML = `
    <tr>
      <td> ${highestName}: ${highestPercent}% </td>
      <td> ${lowestName}: ${lowestPercent}% </td>
      <td> ${lagerCapacityName}: ${largerCapacity} people </td>
    </tr>
    `
  }







function calculateIncome(array){
  let events = array
    const initialValue = 0;
    const totalIncome = events.reduce(
      (accumulator, currentValue) => {
        priceEvent = currentValue.price
        console.log("price: ", priceEvent)
        assistanceEvent = currentValue.assistance
        console.log("asistencia: ", assistanceEvent);
        estimatedAssistance = currentValue.estimate
        console.log("asisitencia estimada", estimatedAssistance);
    
        if (assistanceEvent == undefined){
          eventIncome = priceEvent * estimatedAssistance
        }else {
          eventIncome = priceEvent * assistanceEvent
        }
    
        console.log("ingreso de evento: ",currentValue.name ,eventIncome);
    
        return accumulator = accumulator + eventIncome
      },
      initialValue
    )
    console.log('Ingreso total: ', totalIncome);
}

