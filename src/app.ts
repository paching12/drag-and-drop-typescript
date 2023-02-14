import axios from "../node_modules/axios/index";

declare const google: any;

declare global {
  interface Window {
    initMap: any;
  }
}

function initMap() {}

window.initMap = initMap;

window.addEventListener("load", () => {
  const form = document.querySelector("form")! as HTMLFormElement;
  const addressInput = document.getElementById("address")! as HTMLInputElement;

  const GOOGLE_API = "AIzaSyCjfT0bXL7xCUOvVSI5Mem3QompB31VIyM";

  async function searchAddressHandler(event: Event) {
    event.preventDefault();
    const enteredAddress = addressInput.value;

    type GoogleGeocodingResponse = {
      results: {
        geometry: {
          location: {
            lat: number;
            long: number;
          };
        };
      }[];
      status: "OK" | "ZERO_RESULTS";
    };

    try {
      // send this to Google's api
      const response = await axios.get<GoogleGeocodingResponse>(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
          enteredAddress
        )}&key=${GOOGLE_API}`
      );

      const {
        data: { results, status },
      } = response;

      if (!Array.isArray(results) || status !== "OK")
        throw new Error("Could not fetch location");
      const coordinates = response.data.results?.[0]?.geometry.location;

      // Initialize and add the map
      // The map, centered at Uluru
      const map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          zoom: 16,
          center: coordinates,
        }
      );

      // The marker, positioned at Uluru
      const marker = new google.maps.Marker({
        position: coordinates,
        map: map,
      });
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }

  form.addEventListener("submit", searchAddressHandler);
});
