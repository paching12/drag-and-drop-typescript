import axios from "../node_modules/axios/index";

window.addEventListener("load", () => {
  const form = document.querySelector("form")! as HTMLFormElement;
  const addressInput = document.getElementById("address")! as HTMLInputElement;

  console.log("form", form);

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

      console.log(coordinates);
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }

  form.addEventListener("submit", searchAddressHandler);
});
