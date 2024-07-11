import axios from "axios";

function template1(phon_no_id, token, from, userName) {
  axios({
    method: "POST",
    url:
      "https://graph.facebook.com/v20.0/" +
      phon_no_id +
      "/messages?access_token=" +
      token,
    data: {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: from,
      type: "template",
      template: {
        name: "template1",
        language: {
          code: "en_US",
        },
        components: [
          {
            type: "body",
            parameters: [
              {
                type: "text",
                text: userName,
              },
            ],
          },
        ],
      },
    },
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function template2(phon_no_id, token, from) {
  axios({
    method: "POST",
    url:
      "https://graph.facebook.com/v20.0/" +
      phon_no_id +
      "/messages?access_token=" +
      token,
    data: {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: from,
      type: "interactive",
      interactive: {
        type: "list",
        header: {
          type: "text",
          text: "Select Your State or union territory",
        },
        body: {
          text: "select your state or union territory from below list",
        },
        footer: {
          text: "This is a BJP bot, answer in a single line.",
        },
        action: {
          button: "States(28)",
          sections: [
            {
              title: "North",
              rows: [
                { id: "state_1", title: "Haryana" },
                { id: "state_2", title: "Himachal Pradesh" },
                { id: "state_3", title: "Punjab" },
                { id: "state_4", title: "Uttarakhand" },
                { id: "state_5", title: "Uttar Pradesh" },
                { id: "state_6", title: "Jammu & Kashmir" },
                { id: "state_28", title: "Sikkim" },
              ],
            },
            {
              title: "East",
              rows: [
                { id: "state_7", title: "Arunachal Pradesh" },
                { id: "state_8", title: "Assam" },
                { id: "state_9", title: "Bihar" },
                { id: "state_10", title: "Jharkhand" },
                { id: "state_11", title: "West Bengal" },
                { id: "state_12", title: "Manipur" },
                { id: "state_13", title: "Meghalaya" },
                { id: "state_14", title: "Mizoram" },
                { id: "state_15", title: "Nagaland" },
                { id: "state_16", title: "Odisha" },
              ],
            },
            {
              title: "West",
              rows: [
                { id: "state_17", title: "Chhattisgarh" },
                { id: "state_18", title: "Goa" },
                { id: "state_19", title: "Gujarat" },
                { id: "state_20", title: "Maharashtra" },
                { id: "state_21", title: "Rajasthan" },
                { id: "state_22", title: "Madhya Pradesh" },
              ],
            },
            {
              title: "South",
              rows: [
                { id: "state_23", title: "Andhra Pradesh" },
                { id: "state_24", title: "Karnataka" },
                { id: "state_25", title: "Kerala" },
                { id: "state_26", title: "Tamil Nadu" },
                { id: "state_27", title: "Telangana" },
              ],
            },
            {
              title: "Union Territories",
              rows: [
                { id: "ut_1", title: "Andaman and Nicobar Islands" },
                { id: "ut_2", title: "Chandigarh" },
                { id: "ut_3", title: "Dadra and Nagar Haveli and Daman & Diu" },
                { id: "ut_4", title: "Delhi" },
                { id: "ut_5", title: "Ladakh" },
                { id: "ut_6", title: "Lakshadweep" },
                { id: "ut_7", title: "Puducherry" },
                { id: "ut_8", title: "Jammu and Kashmi" },
              ],
            },
          ],
        },
      },
    },
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function template3(phon_no_id, token, from) {
  axios({
    method: "POST",
    url:
      "https://graph.facebook.com/v20.0/" +
      phon_no_id +
      "/messages?access_token=" +
      token,
    data: {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: from,
      type: "text",
      text: {
        preview_url: true,
        body: "Now you become a member of BJP, this is your membership card: https://whatsapp-bot-63e4.onrender.com",
      },
    },
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export { template1, template2, template3 };
