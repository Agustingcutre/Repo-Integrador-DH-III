export async function getData(){
    try{ 
   const resultado = await fetch("https://randomuser.me/api/?results=10")
   const json = await resultado.json()

      return json.results;
    } catch(e){
        console.log("error al cargar los datos");
    }
    }

  