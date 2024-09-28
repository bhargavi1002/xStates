import React,{useEffect,useState} from "react";

const States = () =>{
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(()=>{
    const fetchCountries = async () => {
        try {
          const response = await fetch("https://crio-location-selector.onrender.com/countries");
          const data = await response.json();
          setCountries(data);
        } catch (error) {
          console.error("Error fetching countries:", error);
        }
      };
      fetchCountries();
    }, []);

    useEffect(() => {
        if (selectedCountry) {
          const fetchStates = async () => {
            try {
              const response = await fetch(
                `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
              );
              const data = await response.json();
              setStates(data);
            } catch (error) {
              console.error("Error fetching states:", error);
            }
          };
          fetchStates();
          setCities([]);
          setSelectedState("");
          setSelectedCity("");
        }
      }, [selectedCountry]);

      useEffect(() => {
        if (selectedState) {
          const fetchCities = async () => {
            try {
              const response = await fetch(
                `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
              );
              const data = await response.json();
              if (Array.isArray(data)) {
                setCities(data);
              } else {
                console.error("Unexpected data format for cities:", data);
                setCities([]);
              }
            } catch (error) {
              console.error("Error fetching cities:", error);
            }
          };
          fetchCities();
        }
      }, [selectedState, selectedCountry]);



    return(
        <div>
         <h1>Select Location</h1>

         <div>
            <select 
            id="country"
             value={selectedCountry} 
            onChange={(e) => setSelectedCountry(e.target.value)}>
            <option value="" disabled>Select Country</option>
            {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
            </select>

          <select
            id="state"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            disabled={!selectedCountry}
          >
            <option value="" disabled>Select State</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>


          <select
            id="city"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            disabled={!selectedState}
          >
            <option value="" disabled>Select City</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          </div>
          {selectedCity && (
            <h2>You selected <span>{selectedCountry}</span>
            <span>{" "}
            {selectedState},{selectedCity}</span>
            </h2>
          )}


        </div>
    )
}

export default States;