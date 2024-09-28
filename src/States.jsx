import React,{useEffect,useState} from "react";

const States = () =>{
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const [message, setMessage] = useState("");
  useEffect(( )=>{
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
              setCities(data);
            } catch (error) {
              console.error("Error fetching cities:", error);
            }
          };
          fetchCities();
        }
      }, [selectedState, selectedCountry]);

      useEffect(() => {
        if (selectedCountry && selectedState && selectedCity) {
          setMessage(`You Selected ${selectedCity}, ${selectedState}, ${selectedCountry}`);
        }
      }, [selectedCountry, selectedState, selectedCity]);

    return(
        <div>
         <h1>Select Location</h1>

            <select 
            id="country"
             value={selectedCountry} 
            onChange={(e) => setSelectedCountry(e.target.value)}>
            <option value="">Select Country</option>
            {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
            </select>

            {selectedCountry && (
          <select
            id="state"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            disabled={!selectedCountry}
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
      )}

{selectedState && (
          <select
            id="city"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            disabled={!selectedState}
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
      )}

{message && <h3>{message}</h3>}

        </div>
    )
}

export default States;