import axios from 'axios';
import FormData from 'form-data';

const url = 'https://api.example.com/data';

// Function to make the HTTP POST request
async function postData() {
    const formData = new FormData();
    formData.append('model', "Seiko 5 Automatic Snxs77  Snxs77k Men's Watch");
    formData.append('condition', "Unworn");
    formData.append('scopeOfDelivery', "WithBoxAndPapers");
    formData.append('templateProductId', 134179);
    formData.append('dialColorId', 710);
    formData.append('caseMaterialId', 4);
    formData.append('searchInput', "SNXS77K1");

    const config = {
        headers: {...formData.getHeaders()}
    };
    console.log(config.headers);
    const response = await axios.post('https://www.chrono24.com/info/valuation.htm', formData, config);

    // const response = await axios.post('https://www.chrono24.com/info/valuation.htm', {
    //     model: "Seiko 5 Automatic Snxs77  Snxs77k Men's Watch",
    //     condition: "Unworn",
    //     scopeOfDelivery: "WithBoxAndPapers",
    //     templateProductId: 134179,
    //     dialColorId: 710,
    //     caseMaterialId: 4,
    //     searchInput: "SNXS77K1",
    // });

    // Log the response data
    // console.log('Response:', response.data);
}

// Call the function to post data
postData();