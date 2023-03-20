const API_URL = "https://mindhub-xj03.onrender.com/api/amazing"
let completeArray

fetch(API_URL)
  .then((response) => response.json())
  .then(array => {
    completeArray = array
    console.log("eventos desde API",completeArray.events)

    calculateIncome(completeArray)
    // let high = completeArray.sort((e1,e2) => e1.)
  })


function calculateIncome(array){
    const initialValue = 0;
    const totalIncome = [array].reduce(
      (accumulator, currentValue) => {
        priceEvent = currentValue.price
        // console.log("price: ", priceEvent)
        assistanceEvent = currentValue.assistance
        // console.log("asistencia: ", assistanceEvent);
        estimatedAssistance = currentValue.estimate
        // console.log("asisitencia estimada", estimatedAssistance);
    
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


 